'use client';
import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, Loader2, User, Mail, Phone, BarChart3, Target, AlertTriangle, TrendingUp, Calendar, ChevronDown, PenLine } from 'lucide-react';

// =============================================
// DADOS DO DIAGNÓSTICO
// =============================================
const SECTORS = [
    {
        id: 'societario', name: 'Societário', weight: 1, icon: '⚖️',
        questions: [
            'Existe contrato social atualizado e alinhado à realidade da empresa?',
            'As responsabilidades dos sócios estão formalmente definidas?',
            'Existe acordo de sócios ou regras claras de tomada de decisão?',
        ]
    },
    {
        id: 'comercial', name: 'Comercial', weight: 1.5, icon: '💼',
        questions: [
            'A empresa possui metas comerciais claras e mensais?',
            'Existe um processo definido de vendas (funil)?',
            'Os resultados de vendas são acompanhados com indicadores?',
            'A equipe comercial recebe treinamento ou orientação periódica?',
        ]
    },
    {
        id: 'financeiro', name: 'Financeiro', weight: 1.5, icon: '💰',
        questions: [
            'Existe controle de entradas e saídas atualizado?',
            'A empresa separa finanças pessoais das empresariais?',
            'Existe DRE ou visão clara de lucro/prejuízo?',
            'A empresa trabalha com projeção de caixa?',
        ]
    },
    {
        id: 'marketing', name: 'Marketing', weight: 1.2, icon: '📢',
        questions: [
            'A empresa possui posicionamento claro no mercado?',
            'Existe estratégia de atração de clientes (orgânico ou pago)?',
            'As ações de marketing são mensuradas?',
            'Marketing gera oportunidades reais de venda?',
        ]
    },
    {
        id: 'tecnologia', name: 'Tecnologia', weight: 1, icon: '💻',
        questions: [
            'A empresa utiliza sistemas de gestão (ERP, CRM, etc.)?',
            'As informações estão centralizadas?',
            'Os processos dependem menos de pessoas e mais de sistemas?',
            'Existe segurança e backup de dados?',
        ]
    },
    {
        id: 'contabil', name: 'Contábil', weight: 1, icon: '📊',
        questions: [
            'O contador entrega relatórios compreensíveis?',
            'A contabilidade é usada para tomada de decisão?',
            'A empresa entende seus números contábeis?',
        ]
    },
    {
        id: 'fiscal', name: 'Fiscal', weight: 1, icon: '📋',
        questions: [
            'A empresa conhece sua carga tributária real?',
            'Existe planejamento tributário?',
            'A empresa já passou por problemas fiscais ou multas?',
        ]
    },
    {
        id: 'estoque', name: 'Estoque', weight: 1, icon: '📦',
        questions: [
            'Existe controle de estoque atualizado?',
            'Há perdas frequentes ou falta de produtos?',
            'O estoque é integrado às vendas/compras?',
        ]
    },
    {
        id: 'compras', name: 'Compras', weight: 1, icon: '🛒',
        questions: [
            'Existe processo de compras definido?',
            'Há negociação estratégica com fornecedores?',
            'Compras são planejadas ou reativas?',
        ]
    },
    {
        id: 'planejamento', name: 'Planejamento', weight: 1.5, icon: '🎯',
        questions: [
            'A empresa possui planejamento anual?',
            'Metas são revisadas periodicamente?',
            'As decisões são baseadas em dados?',
        ]
    },
    {
        id: 'pessoas', name: 'Pessoas / Gestão', weight: 1.5, icon: '👥',
        questions: [
            'Funções e responsabilidades estão claras?',
            'Existe acompanhamento de desempenho?',
            'Há rotinas de feedback ou alinhamento?',
            'A empresa depende excessivamente do dono?',
        ]
    },
    {
        id: 'processos', name: 'Processos', weight: 1.3, icon: '⚙️',
        questions: [
            'Os processos estão documentados?',
            'Existe padronização das rotinas?',
            'Novos colaboradores aprendem rápido?',
            'A empresa funciona mesmo sem o gestor presente?',
        ]
    },
];

const SCALE_LABELS = [
    { value: 0, label: 'Não existe' },
    { value: 1, label: 'Informal' },
    { value: 2, label: 'Desorganizado' },
    { value: 3, label: 'Parcial' },
    { value: 4, label: 'Funcional' },
    { value: 5, label: 'Estratégico' },
];

const SCALE_COLORS = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#10b981'];

// =============================================
// COMPONENTE PRINCIPAL
// =============================================
// =============================================
// COMPONENTE WRAPPER (Suspense boundary para useSearchParams)
// =============================================
export default function DiagnosticoPageWrapper() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#111827] to-[#0a0e1a] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
        }>
            <DiagnosticoPage />
        </Suspense>
    );
}

const STORAGE_KEY = 'fgc_diagnostico_rascunho';

function DiagnosticoPage() {
    const searchParams = useSearchParams();

    // Verifica se veio da landing page (com dados pré-preenchidos)
    const prefillName = searchParams.get('name') || '';
    const prefillEmail = searchParams.get('email') || '';
    const prefillWhatsapp = searchParams.get('whatsapp') || '';
    const hasPrefilledData = !!(prefillName && prefillEmail && prefillWhatsapp);

    // Step: 0 = dados pessoais, 1 = dados da empresa, 2-13 = setores, 14 = resultado
    const [step, setStep] = useState(hasPrefilledData ? 1 : 0);
    const [contact, setContact] = useState({
        name: prefillName,
        email: prefillEmail,
        whatsapp: prefillWhatsapp,
        cargo: '',
        cnpj: '',
        empresa: '',
        colaboradores: '',
        faturamento: '',
    });
    const [cnpjData, setCnpjData] = useState<any>(null);
    const [cnpjLoading, setCnpjLoading] = useState(false);
    const [cnpjError, setCnpjError] = useState('');
    const [answers, setAnswers] = useState<Record<string, number[]>>({});
    const [notes, setNotes] = useState<Record<string, string>>({});
    const [openNotes, setOpenNotes] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showResume, setShowResume] = useState(false);

    // ── Recuperar rascunho salvo no localStorage ──
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const draft = JSON.parse(saved);
                // Só mostra o diálogo se houver progresso real (pelo menos step > 0 ou respostas)
                if (draft.step > 0 || Object.keys(draft.answers || {}).length > 0) {
                    setShowResume(true);
                }
            }
        } catch { /* localStorage indisponível ou JSON inválido */ }
    }, []);

    const resumeDraft = () => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const draft = JSON.parse(saved);
                if (draft.contact) setContact(draft.contact);
                if (draft.answers) setAnswers(draft.answers);
                if (draft.notes) setNotes(draft.notes);
                if (draft.cnpjData) setCnpjData(draft.cnpjData);
                if (typeof draft.step === 'number') setStep(draft.step);
            }
        } catch { /* ignora */ }
        setShowResume(false);
    };

    const discardDraft = () => {
        try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignora */ }
        setShowResume(false);
    };

    // ── Auto-save no localStorage a cada mudança de step ──
    useEffect(() => {
        // Não salva se está na tela de resultado final já submetida
        if (submitted) return;
        try {
            const draft = { step, contact, answers, notes, cnpjData, savedAt: new Date().toISOString() };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
        } catch { /* localStorage cheio ou indisponível */ }
    }, [step, contact, answers, notes, cnpjData, submitted]);

    const totalSteps = SECTORS.length + 3; // contact + company + sectors + result
    const progress = (step / (totalSteps - 1)) * 100;

    // Máscara WhatsApp
    const maskWhatsApp = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        if (digits.length <= 2) return `(${digits}`;
        if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    };

    // Máscara CNPJ: XX.XXX.XXX/XXXX-XX
    const maskCNPJ = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 14);
        if (digits.length <= 2) return digits;
        if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
        if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
        if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
        return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
    };

    // Busca CNPJ na BrasilAPI
    const lookupCNPJ = async () => {
        const digits = contact.cnpj.replace(/\D/g, '');
        if (digits.length !== 14) {
            setCnpjError('CNPJ deve ter 14 dígitos');
            return;
        }
        setCnpjLoading(true);
        setCnpjError('');
        try {
            const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digits}`);
            if (!res.ok) throw new Error('CNPJ não encontrado');
            const data = await res.json();
            setCnpjData(data);
            setContact(prev => ({
                ...prev,
                empresa: data.nome_fantasia || data.razao_social || '',
            }));
        } catch (e) {
            setCnpjError('CNPJ não encontrado. Verifique e tente novamente.');
            setCnpjData(null);
        } finally {
            setCnpjLoading(false);
        }
    };

    // Set answer for a specific sector/question
    const setAnswer = (sectorId: string, questionIndex: number, value: number) => {
        setAnswers(prev => {
            const sectorAnswers = [...(prev[sectorId] || [])];
            sectorAnswers[questionIndex] = value;
            return { ...prev, [sectorId]: sectorAnswers };
        });
    };

    // Check if current sector is complete
    const isSectorComplete = (sectorIndex: number) => {
        const sector = SECTORS[sectorIndex];
        const sectorAnswers = answers[sector.id] || [];
        return sector.questions.every((_, i) => sectorAnswers[i] !== undefined);
    };

    // Calculate results
    const results = useMemo(() => {
        let totalWeightedScore = 0;
        let totalWeightedMax = 0;
        const sectorScores: { name: string; score: number; maxScore: number; percentage: number; weight: number; icon: string }[] = [];

        SECTORS.forEach(sector => {
            const sectorAnswers = answers[sector.id] || [];
            const score = sectorAnswers.reduce((sum, val) => sum + (val || 0), 0);
            const maxScore = sector.questions.length * 5;
            const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

            totalWeightedScore += score * sector.weight;
            totalWeightedMax += maxScore * sector.weight;

            sectorScores.push({
                name: sector.name,
                score,
                maxScore,
                percentage,
                weight: sector.weight,
                icon: sector.icon,
            });
        });

        const iee = totalWeightedMax > 0 ? Math.round((totalWeightedScore / totalWeightedMax) * 100) : 0;

        const sorted = [...sectorScores].sort((a, b) => a.percentage - b.percentage);
        const critical = sorted.slice(0, 3);
        const strong = [...sectorScores].sort((a, b) => b.percentage - a.percentage).slice(0, 3);

        return { iee, sectorScores, critical, strong };
    }, [answers]);

    // Generate interpretive text
    const getInterpretation = () => {
        const { iee } = results;
        if (iee >= 70) return {
            level: 'saudavel',
            title: 'Empresa Saudável',
            color: '#10b981',
            text: `Sua empresa apresenta um bom nível de organização e maturidade, com um IEE de ${iee}%. Mesmo assim, existem oportunidades de otimização que podem acelerar seus resultados e reduzir esforço operacional. Empresas nesse patamar costumam ganhar ainda mais velocidade com ajustes estratégicos pontuais.`,
        };
        if (iee >= 50) return {
            level: 'risco',
            title: 'Risco Silencioso',
            color: '#f59e0b',
            text: `Sua empresa apresenta estrutura operacional funcional, porém com fragilidades estratégicas que limitam o crescimento e aumentam riscos financeiros e operacionais. Com um IEE de ${iee}%, há pontos que precisam de atenção imediata para evitar problemas maiores no futuro.`,
        };
        return {
            level: 'vulneravel',
            title: 'Empresa Vulnerável',
            color: '#ef4444',
            text: `Com um IEE de ${iee}%, sua empresa apresenta desorganização significativa em áreas críticas. Isso gera crescimento com esforço excessivo, dependência do gestor e baixa previsibilidade de resultados. É fundamental estruturar os pilares de gestão o quanto antes.`,
        };
    };

    const [submitError, setSubmitError] = useState('');

    // Submit results
    const handleSubmit = async () => {
        setSubmitting(true);
        setSubmitError('');
        try {
            const interpretation = getInterpretation();
            const response = await fetch('/api/diagnostico', {
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
                    cnpj_data: cnpjData,
                    iee: results.iee,
                    nivel: interpretation.title,
                    respostas: answers,
                    notas: notes,
                    setores_criticos: results.critical.map(s => `${s.name} (${s.percentage}%)`).join(', '),
                    setores_fortes: results.strong.map(s => `${s.name} (${s.percentage}%)`).join(', '),
                    detalhes: results.sectorScores.map(s => `${s.name}: ${s.percentage}%`).join(' | '),
                }),
            });
            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || 'Erro ao salvar diagnóstico');
            }
            setSubmitted(true);
            // Limpa rascunho do localStorage após salvar com sucesso
            try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignora */ }
        } catch (e: any) {
            console.error('Erro ao enviar diagnóstico:', e);
            setSubmitError(e.message || 'Erro de conexão. Verifique sua internet e tente novamente.');
        } finally {
            setSubmitting(false);
        }
    };

    // Navigate
    const canGoNext = () => {
        if (step === 0) return contact.name && contact.email && contact.whatsapp;
        if (step === 1) return contact.cargo && contact.empresa && contact.colaboradores && contact.faturamento;
        if (step >= 2 && step <= SECTORS.length + 1) return isSectorComplete(step - 2);
        return true;
    };

    const goNext = () => {
        if (step === SECTORS.length + 1) {
            // Last sector → show results and submit
            setStep(step + 1);
            handleSubmit();
        } else {
            setStep(step + 1);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#111827] to-[#0a0e1a] text-white">
            {/* ── Diálogo de Recuperação de Rascunho ── */}
            {showResume && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl"
                    >
                        <div className="text-center mb-5">
                            <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <BarChart3 className="w-6 h-6 text-amber-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Diagnóstico em andamento</h3>
                            <p className="text-sm text-slate-400 mt-2">
                                Encontramos um diagnóstico que não foi finalizado. Deseja continuar de onde parou?
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={discardDraft}
                                className="flex-1 px-4 py-3 text-sm font-medium rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors"
                            >
                                Começar Novo
                            </button>
                            <button
                                onClick={resumeDraft}
                                className="flex-1 px-4 py-3 text-sm font-semibold rounded-xl transition-all"
                                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#0a0e1a' }}
                            >
                                Continuar
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            {/* Header */}
            <header className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/logo-fgc.png" alt="FGC" className="h-8" />
                        <span className="text-sm text-slate-400 hidden sm:inline">Diagnóstico Empresarial</span>
                    </div>
                    <div className="text-sm text-slate-500">
                        {step >= 2 && step <= SECTORS.length + 1 && `${step - 1} de ${SECTORS.length} setores`}
                    </div>
                </div>
                {/* Progress bar */}
                <div className="h-1 bg-slate-800">
                    <motion.div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </header>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
                <AnimatePresence mode="wait">
                    {/* ===== STEP 0: Welcome + Contact ===== */}
                    {step === 0 && (
                        <motion.div key="contact" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
                                    <BarChart3 className="w-4 h-4" /> Diagnóstico Gratuito
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                    Descubra o Índice de Eficiência<br />
                                    <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">da sua empresa</span>
                                </h1>
                                <p className="text-slate-400 max-w-lg mx-auto">
                                    Responda perguntas sobre 12 áreas estratégicas e receba um diagnóstico completo com recomendações personalizadas. Leva apenas 10 minutos.
                                </p>
                            </div>

                            <div className="max-w-md mx-auto space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2"><User className="w-4 h-4 inline mr-1" />Seu Nome</label>
                                    <input type="text" value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} placeholder="Nome completo" className="w-full bg-slate-800/60 border border-slate-700 text-white rounded-xl px-4 py-3 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30" />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2"><Mail className="w-4 h-4 inline mr-1" />Seu E-mail</label>
                                    <input type="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} placeholder="seu@email.com" className="w-full bg-slate-800/60 border border-slate-700 text-white rounded-xl px-4 py-3 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30" />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2"><Phone className="w-4 h-4 inline mr-1" />WhatsApp</label>
                                    <input type="tel" value={contact.whatsapp} onChange={e => setContact({ ...contact, whatsapp: maskWhatsApp(e.target.value) })} placeholder="(31) 99999-9999" maxLength={15} className="w-full bg-slate-800/60 border border-slate-700 text-white rounded-xl px-4 py-3 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ===== STEP 1: Dados da Empresa ===== */}
                    {step === 1 && (
                        <motion.div key="company" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
                                    <Target className="w-4 h-4" /> Dados da Empresa
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                                    Conte-nos sobre sua empresa
                                </h2>
                                <p className="text-slate-400 max-w-lg mx-auto text-sm">
                                    Essas informações nos ajudam a personalizar seu diagnóstico.
                                </p>
                            </div>

                            <div className="max-w-md mx-auto space-y-5">
                                {/* Cargo */}
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2"><User className="w-4 h-4 inline mr-1" />Seu Cargo</label>
                                    <input type="text" value={contact.cargo} onChange={e => setContact({ ...contact, cargo: e.target.value })} placeholder="Ex: Sócio, Diretor, Gerente..." className="w-full bg-slate-800/60 border border-slate-700 text-white rounded-xl px-4 py-3 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30" />
                                </div>

                                {/* CNPJ */}
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2"><Target className="w-4 h-4 inline mr-1" />CNPJ da Empresa</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={contact.cnpj}
                                            onChange={e => {
                                                setCnpjError('');
                                                setCnpjData(null);
                                                setContact(prev => ({ ...prev, cnpj: maskCNPJ(e.target.value), empresa: '' }));
                                            }}
                                            placeholder="00.000.000/0000-00"
                                            maxLength={18}
                                            className="flex-1 bg-slate-800/60 border border-slate-700 text-white rounded-xl px-4 py-3 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                                        />
                                        <button
                                            type="button"
                                            onClick={lookupCNPJ}
                                            disabled={cnpjLoading || contact.cnpj.replace(/\D/g, '').length !== 14}
                                            className="px-4 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                            style={{
                                                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                                color: '#0a0e1a',
                                            }}
                                        >
                                            {cnpjLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Buscar'}
                                        </button>
                                    </div>
                                    {cnpjError && <p className="text-red-400 text-xs mt-2">{cnpjError}</p>}

                                    {/* Dados retornados da BrasilAPI */}
                                    {cnpjData && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 space-y-1"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                                <span className="text-sm font-semibold text-emerald-400">Empresa encontrada!</span>
                                            </div>
                                            <p className="text-sm text-slate-300"><span className="text-slate-500">Razão Social:</span> {cnpjData.razao_social}</p>
                                            {cnpjData.nome_fantasia && <p className="text-sm text-slate-300"><span className="text-slate-500">Nome Fantasia:</span> {cnpjData.nome_fantasia}</p>}
                                            <p className="text-sm text-slate-300"><span className="text-slate-500">Situação:</span> {cnpjData.descricao_situacao_cadastral}</p>
                                            {cnpjData.cnae_fiscal_descricao && <p className="text-sm text-slate-300"><span className="text-slate-500">Atividade:</span> {cnpjData.cnae_fiscal_descricao}</p>}
                                            {(cnpjData.municipio || cnpjData.uf) && <p className="text-sm text-slate-300"><span className="text-slate-500">Local:</span> {cnpjData.municipio} - {cnpjData.uf}</p>}
                                        </motion.div>
                                    )}

                                    {/* Input manual da empresa (aparece após buscar com sucesso OU se quiser editar) */}
                                    {(cnpjData || contact.empresa) && (
                                        <div className="mt-3">
                                            <label className="block text-xs text-slate-500 mb-1">Nome da empresa (editável)</label>
                                            <input type="text" value={contact.empresa} onChange={e => setContact({ ...contact, empresa: e.target.value })} className="w-full bg-slate-800/60 border border-slate-700 text-white rounded-xl px-4 py-3 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 text-sm" />
                                        </div>
                                    )}
                                </div>

                                {/* Número de Colaboradores */}
                                <div>
                                    <label className="block text-sm text-slate-400 mb-3">👥 Número de Colaboradores</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {['1 a 10', '11 a 50', '51 a 100', '101 a 200', 'Mais de 200'].map((option) => {
                                            const isSelected = contact.colaboradores === option;
                                            return (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => setContact({ ...contact, colaboradores: option })}
                                                    className="px-4 py-3 rounded-xl text-sm transition-all duration-200"
                                                    style={{
                                                        border: isSelected ? '2px solid #f59e0b' : '2px solid rgba(100,116,139,0.3)',
                                                        background: isSelected ? 'rgba(245,158,11,0.15)' : 'transparent',
                                                        color: isSelected ? '#fbbf24' : '#94a3b8',
                                                        fontWeight: isSelected ? 700 : 400,
                                                    }}
                                                >
                                                    {option}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Faturamento Mensal Médio */}
                                <div>
                                    <label className="block text-sm text-slate-400 mb-3">💰 Faturamento Mensal Médio</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Até R$ 10 mil', 'R$ 10 mil a R$ 50 mil', 'R$ 50 mil a R$ 200 mil', 'Acima de R$ 200 mil'].map((option) => {
                                            const isSelected = contact.faturamento === option;
                                            return (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => setContact({ ...contact, faturamento: option })}
                                                    className="px-4 py-3 rounded-xl text-sm transition-all duration-200"
                                                    style={{
                                                        border: isSelected ? '2px solid #f59e0b' : '2px solid rgba(100,116,139,0.3)',
                                                        background: isSelected ? 'rgba(245,158,11,0.15)' : 'transparent',
                                                        color: isSelected ? '#fbbf24' : '#94a3b8',
                                                        fontWeight: isSelected ? 700 : 400,
                                                    }}
                                                >
                                                    {option}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ===== STEPS 2-13: Sectors ===== */}
                    {step >= 2 && step <= SECTORS.length + 1 && (() => {
                        const sector = SECTORS[step - 2];
                        const sectorAnswers = answers[sector.id] || [];
                        return (
                            <motion.div key={sector.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-3xl">{sector.icon}</span>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wider">Setor {step - 1} de {SECTORS.length}</p>
                                            <h2 className="text-2xl font-bold">{sector.name}</h2>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 text-sm mt-1">
                                        Avalie cada item de 0 (não existe) a 5 (estratégico e monitorado)
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {sector.questions.map((question, qi) => (
                                        <div key={qi} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5">
                                            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                                                <span className="text-amber-400 font-bold mr-2">{qi + 1}.</span>
                                                {question}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {SCALE_LABELS.map(({ value, label }) => {
                                                    const isSelected = sectorAnswers[qi] === value;
                                                    return (
                                                        <button
                                                            key={value}
                                                            onClick={() => setAnswer(sector.id, qi, value)}
                                                            className="transition-all duration-200"
                                                            style={{
                                                                padding: '8px 14px',
                                                                borderRadius: 10,
                                                                fontSize: '0.8rem',
                                                                fontWeight: isSelected ? 700 : 400,
                                                                border: isSelected ? `2px solid ${SCALE_COLORS[value]}` : '2px solid rgba(100,116,139,0.3)',
                                                                background: isSelected ? `${SCALE_COLORS[value]}20` : 'transparent',
                                                                color: isSelected ? SCALE_COLORS[value] : '#94a3b8',
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            <span className="font-bold mr-1">{value}</span> {label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* ── Accordion de Notas ── */}
                                <div className="mt-6 border-t border-slate-700/50 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setOpenNotes(openNotes === sector.id ? null : sector.id)}
                                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors w-full"
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0' }}
                                    >
                                        <PenLine className="w-4 h-4" />
                                        <span>Observações sobre {sector.name}</span>
                                        <ChevronDown
                                            className="w-4 h-4 ml-auto transition-transform duration-200"
                                            style={{ transform: openNotes === sector.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                        />
                                    </button>
                                    {openNotes === sector.id && (
                                        <motion.div
                                            key="notes-box"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <textarea
                                                value={notes[sector.id] || ''}
                                                onChange={e => setNotes(prev => ({ ...prev, [sector.id]: e.target.value }))}
                                                placeholder={`Anote aqui observações sobre ${sector.name.toLowerCase()} da sua empresa...`}
                                                rows={4}
                                                className="w-full mt-2 bg-slate-800/60 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 resize-none"
                                            />
                                        </motion.div>
                                    )}
                                </div>

                            </motion.div>
                        );
                    })()}

                    {/* ===== STEP FINAL: Results ===== */}
                    {step === SECTORS.length + 2 && (
                        <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            {submitting ? (
                                <div className="text-center py-20">
                                    <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto mb-4" />
                                    <p className="text-slate-400">Analisando suas respostas...</p>
                                </div>
                            ) : (
                                <>
                                    {submitError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center justify-between gap-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                                <p className="text-sm text-red-300">{submitError}</p>
                                            </div>
                                            <button
                                                onClick={handleSubmit}
                                                className="px-4 py-2 text-sm font-semibold rounded-lg flex-shrink-0 transition-all"
                                                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#0a0e1a' }}
                                            >
                                                Tentar Novamente
                                            </button>
                                        </motion.div>
                                    )}
                                    <ResultsView results={results} interpretation={getInterpretation()} contact={contact} />
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                {step <= SECTORS.length + 1 && (
                    <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-800/50">
                        <button
                            onClick={() => setStep(Math.max(hasPrefilledData ? 1 : 0, step - 1))}
                            disabled={step === 0 || (hasPrefilledData && step === 1)}
                            className="flex items-center gap-2 px-5 py-3 text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Voltar
                        </button>
                        <button
                            onClick={goNext}
                            disabled={!canGoNext()}
                            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            style={{
                                background: canGoNext() ? 'linear-gradient(135deg, #f59e0b, #d97706)' : undefined,
                                color: canGoNext() ? '#0a0e1a' : '#64748b',
                            }}
                        >
                            {step === SECTORS.length + 1 ? 'Ver Resultado' : 'Próximo'}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div >
    );
}

// =============================================
// RADAR CHART (SVG)
// =============================================
function RadarChart({ scores }: { scores: { name: string; percentage: number }[] }) {
    const size = 300;
    const center = size / 2;
    const radius = 120;
    const levels = 5;
    const count = scores.length;

    const angleStep = (2 * Math.PI) / count;
    const startAngle = -Math.PI / 2;

    const getPoint = (index: number, value: number) => {
        const angle = startAngle + index * angleStep;
        const r = (value / 100) * radius;
        return {
            x: center + r * Math.cos(angle),
            y: center + r * Math.sin(angle),
        };
    };

    // Grid lines
    const gridLines = Array.from({ length: levels }, (_, i) => {
        const r = ((i + 1) / levels) * radius;
        const points = Array.from({ length: count }, (_, j) => {
            const angle = startAngle + j * angleStep;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
        }).join(' ');
        return points;
    });

    // Data points
    const dataPoints = scores.map((s, i) => getPoint(i, s.percentage));
    const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z';

    // Axis lines
    const axisLines = scores.map((_, i) => {
        const angle = startAngle + i * angleStep;
        return {
            x2: center + radius * Math.cos(angle),
            y2: center + radius * Math.sin(angle),
        };
    });

    // Labels
    const labels = scores.map((s, i) => {
        const angle = startAngle + i * angleStep;
        const labelR = radius + 28;
        return {
            x: center + labelR * Math.cos(angle),
            y: center + labelR * Math.sin(angle),
            name: s.name,
            pct: s.percentage,
        };
    });

    return (
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[400px] mx-auto">
            {/* Grid */}
            {gridLines.map((points, i) => (
                <polygon key={i} points={points} fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="1" />
            ))}
            {/* Axes */}
            {axisLines.map((line, i) => (
                <line key={i} x1={center} y1={center} x2={line.x2} y2={line.y2} stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
            ))}
            {/* Data area */}
            <path d={dataPath} fill="rgba(245,158,11,0.15)" stroke="#f59e0b" strokeWidth="2" />
            {/* Data points */}
            {dataPoints.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="4" fill="#f59e0b" stroke="#0a0e1a" strokeWidth="2" />
            ))}
            {/* Labels */}
            {labels.map((l, i) => (
                <text key={i} x={l.x} y={l.y} textAnchor="middle" dominantBaseline="middle" className="text-[7px] fill-slate-400" style={{ fontFamily: 'system-ui' }}>
                    {l.name}
                </text>
            ))}
        </svg>
    );
}

// =============================================
// RESULTS VIEW
// =============================================
function ResultsView({ results, interpretation, contact }: {
    results: { iee: number; sectorScores: { name: string; percentage: number; icon: string }[]; critical: { name: string; percentage: number; icon: string }[]; strong: { name: string; percentage: number; icon: string }[] };
    interpretation: { level: string; title: string; color: string; text: string };
    contact: { name: string; empresa: string };
}) {
    return (
        <div className="space-y-8">
            {/* IEE Header */}
            <div className="text-center">
                <p className="text-slate-500 text-sm uppercase tracking-wider mb-2">Índice de Eficiência Empresarial</p>
                <div className="relative inline-flex items-center justify-center">
                    <svg viewBox="0 0 120 120" className="w-40 h-40">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="8" />
                        <circle
                            cx="60" cy="60" r="52" fill="none"
                            stroke={interpretation.color}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${(results.iee / 100) * 327} 327`}
                            transform="rotate(-90 60 60)"
                            className="transition-all duration-1000"
                        />
                    </svg>
                    <div className="absolute text-center">
                        <span className="text-4xl font-bold" style={{ color: interpretation.color }}>{results.iee}%</span>
                    </div>
                </div>
                <h2 className="text-xl font-bold mt-4" style={{ color: interpretation.color }}>
                    {interpretation.level === 'vulneravel' && <AlertTriangle className="w-5 h-5 inline mr-2" />}
                    {interpretation.level === 'risco' && <AlertTriangle className="w-5 h-5 inline mr-2" />}
                    {interpretation.level === 'saudavel' && <TrendingUp className="w-5 h-5 inline mr-2" />}
                    {interpretation.title}
                </h2>
                <p className="text-slate-400 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
                    {interpretation.text}
                </p>
            </div>

            {/* Radar Chart */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Visão Geral por Setor</h3>
                <RadarChart scores={results.sectorScores} />
            </div>

            {/* Critical & Strong */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
                    <h3 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Setores Mais Críticos
                    </h3>
                    <div className="space-y-2">
                        {results.critical.map((s, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <span className="text-sm text-slate-300">{s.icon} {s.name}</span>
                                <span className="text-sm font-bold text-red-400">{s.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
                    <h3 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" /> Setores Mais Estruturados
                    </h3>
                    <div className="space-y-2">
                        {results.strong.map((s, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <span className="text-sm text-slate-300">{s.icon} {s.name}</span>
                                <span className="text-sm font-bold text-emerald-400">{s.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* All Sectors Breakdown */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-slate-300 mb-4">Detalhamento por Setor</h3>
                <div className="space-y-3">
                    {results.sectorScores.map((s, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <span className="text-sm w-36 truncate text-slate-400">{s.icon} {s.name}</span>
                            <div className="flex-1 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        width: `${s.percentage}%`,
                                        background: s.percentage >= 70 ? '#10b981' : s.percentage >= 50 ? '#f59e0b' : '#ef4444',
                                    }}
                                />
                            </div>
                            <span className="text-sm font-bold w-10 text-right text-slate-300">{s.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Strategic Alert */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 text-center">
                <p className="text-amber-300 text-sm leading-relaxed mb-1">
                    <strong>⚡ Alerta Estratégico:</strong>
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Empresas abaixo de 70% costumam crescer com esforço excessivo, dependência do gestor e baixa previsibilidade de resultados.
                </p>
            </div>

            {/* CTA */}
            <div className="text-center space-y-4 pt-4">
                <h3 className="text-xl font-bold">Próximo Passo Recomendado</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Agende um bate-papo estratégico com um consultor da FGC Expertise para entender como elevar sua eficiência de forma estruturada.
                </p>
                <a
                    href={`https://wa.me/5531998760724?text=Olá! Fiz o diagnóstico empresarial pelo site e gostaria de agendar uma consultoria. Meu IEE foi de ${results.iee}%.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold rounded-xl transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#0a0e1a' }}
                >
                    <Calendar className="w-5 h-5" />
                    Agendar Diagnóstico Estratégico
                </a>
                <p className="text-slate-600 text-xs mt-2">
                    Diagnóstico realizado por {contact.name} — {contact.empresa}
                </p>
            </div>
        </div>
    );
}
