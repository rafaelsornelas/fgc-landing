import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { useSearchParams } from 'next/navigation';
import { calculateDiagnosticoResults, getInterpretation, isSectorComplete, SECTORS } from './diagnostico-engine-v2';
import type { AnswersMap, DiagnosticoFormData, NotesMap } from '../types';

const STORAGE_KEY = 'fgc_diagnostico_v2_rascunho';

const EMPTY_FORM: DiagnosticoFormData = {
  name: '',
  email: '',
  whatsapp: '',
  cargo: '',
  cnpj: '',
  empresa: '',
  colaboradores: '',
  faturamento: '',
  tempo_mercado: '',
};

export function maskWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function maskCNPJ(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

type UseDiagnosticoWizardParams = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export function useDiagnosticoWizard({ step, setStep }: UseDiagnosticoWizardParams) {
  const searchParams = useSearchParams();
  const prefillName = searchParams.get('name') || '';
  const prefillEmail = searchParams.get('email') || '';
  const prefillWhatsapp = searchParams.get('whatsapp') || '';
  const hasPrefilledData = Boolean(prefillName && prefillEmail && prefillWhatsapp);

  const [contact, setContact] = useState<DiagnosticoFormData>({ ...EMPTY_FORM, name: prefillName, email: prefillEmail, whatsapp: prefillWhatsapp });
  const [cnpjData, setCnpjData] = useState<Record<string, unknown> | null>(null);
  const [cnpjLoading, setCnpjLoading] = useState(false);
  const [cnpjError, setCnpjError] = useState('');
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [notes, setNotes] = useState<NotesMap>({});
  const [openNotes, setOpenNotes] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    if (hasPrefilledData && step === 0) setStep(1);
  }, [hasPrefilledData, setStep, step]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const draft = JSON.parse(saved) as { step?: number; answers?: AnswersMap };
      if ((draft.step || 0) > 0 || Object.keys(draft.answers || {}).length > 0) setShowResume(true);
    } catch {
      // Ignora indisponibilidade de localStorage e JSON inválido.
    }
  }, []);

  useEffect(() => {
    if (submitted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, contact, answers, notes, cnpjData, savedAt: new Date().toISOString() }));
    } catch {
      // Ignora indisponibilidade de localStorage.
    }
  }, [step, contact, answers, notes, cnpjData, submitted]);

  const results = useMemo(() => calculateDiagnosticoResults(answers), [answers]);
  const interpretation = useMemo(() => getInterpretation(results.iee), [results.iee]);
  const totalSteps = SECTORS.length + 3;

  const canGoNext = useMemo(() => {
    if (step === 0) return Boolean(contact.name && contact.email && contact.whatsapp && contact.empresa);
    if (step === 1) return Boolean(contact.cargo && contact.colaboradores && contact.faturamento);
    if (step >= 2 && step <= SECTORS.length + 1) return isSectorComplete(step - 2, answers);
    return true;
  }, [answers, contact, step]);

  const setAnswer = (sectorId: string, questionIndex: number, value: number) => {
    setAnswers((prev) => {
      const sectorAnswers = [...(prev[sectorId] || [])];
      sectorAnswers[questionIndex] = value;
      return { ...prev, [sectorId]: sectorAnswers };
    });
  };

  const setContactField = (field: keyof DiagnosticoFormData, value: string) => {
    if (field === 'cnpj') {
      setCnpjError('');
      setCnpjData(null);
    }
    setContact((prev) => ({ ...prev, [field]: value }));
  };

  const setNote = (key: string, value: string) => setNotes((prev) => ({ ...prev, [key]: value }));

  const toggleNotes = (key: string) => setOpenNotes((prev) => (prev === key ? null : key));

  const lookupCNPJ = async () => {
    const digits = contact.cnpj.replace(/\D/g, '');
    if (digits.length !== 14) {
      setCnpjError('CNPJ deve ter 14 dígitos');
      return;
    }
    setCnpjLoading(true);
    setCnpjError('');
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digits}`);
      if (response.status === 429) throw new Error('Muitas consultas ao serviço. Aguarde alguns segundos e tente novamente.');
      if (!response.ok) throw new Error('CNPJ não encontrado. Verifique o número e tente novamente.');
      const data = await response.json() as { nome_fantasia?: string; razao_social?: string } & Record<string, unknown>;
      setCnpjData(data);
      setContact((prev) => ({ ...prev, empresa: prev.empresa || data.nome_fantasia || data.razao_social || '' }));
    } catch (err) {
      setCnpjError(err instanceof Error ? err.message : 'Erro ao consultar CNPJ. Tente novamente.');
      setCnpjData(null);
    } finally {
      setCnpjLoading(false);
    }
  };

  const submit = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/diagnostico-v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          whatsapp: contact.whatsapp,
          cargo: contact.cargo,
          cnpj: contact.cnpj,
          empresa: contact.empresa,
          colaboradores: contact.colaboradores,
          faturamento: contact.faturamento,
          tempo_mercado: contact.tempo_mercado,
          cnpj_data: cnpjData,
          iee: results.iee,
          nivel: interpretation.title,
          respostas: answers,
          notas: notes,
          setores_criticos: results.critical.map((sector) => `${sector.name} (${sector.percentage}%)`).join(', '),
          setores_fortes: results.strong.map((sector) => `${sector.name} (${sector.percentage}%)`).join(', '),
          detalhes: results.sectorScores.map((sector) => `${sector.name}: ${sector.percentage}%`).join(' | '),
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erro ao salvar diagnóstico' }));
        throw new Error(errorData.error || 'Erro ao salvar diagnóstico');
      }
      setSubmitted(true);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignora indisponibilidade de localStorage.
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro de conexão. Verifique sua internet e tente novamente.';
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const goNext = () => {
    if (step === SECTORS.length + 1) {
      setStep((currentStep) => currentStep + 1);
      void submit();
      return;
    }
    setStep((currentStep) => currentStep + 1);
  };

  const goBack = () => setStep((currentStep) => Math.max(hasPrefilledData ? 1 : 0, currentStep - 1));

  const resumeDraft = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const draft = JSON.parse(saved) as {
        step?: number;
        contact?: DiagnosticoFormData;
        answers?: AnswersMap;
        notes?: NotesMap;
        cnpjData?: Record<string, unknown>;
      };
      if (draft.contact) setContact(draft.contact);
      if (draft.answers) setAnswers(draft.answers);
      if (draft.notes) setNotes(draft.notes);
      if (draft.cnpjData) setCnpjData(draft.cnpjData);
      if (typeof draft.step === 'number') setStep(draft.step);
    } catch {
      // Ignora indisponibilidade de localStorage e JSON inválido.
    }
    setShowResume(false);
  };

  const discardDraft = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignora indisponibilidade de localStorage.
    }
    setShowResume(false);
  };

  return {
    step,
    totalSteps,
    hasPrefilledData,
    contact,
    cnpjData,
    cnpjLoading,
    cnpjError,
    answers,
    notes,
    openNotes,
    submitting,
    submitError,
    showResume,
    results,
    interpretation,
    canGoNext,
    setAnswer,
    setContactField,
    setNote,
    toggleNotes,
    lookupCNPJ,
    retrySubmit: submit,
    goNext,
    goBack,
    resumeDraft,
    discardDraft,
  };
}
