import { motion } from 'framer-motion';
import { CheckCircle, Loader2, Target, User } from 'lucide-react';
import type { DiagnosticoFormData, NotesMap } from '../types';
import { StepNotes } from './StepNotes';

type StepCompanyDetailsProps = {
  contact: DiagnosticoFormData;
  cnpjData: Record<string, unknown> | null;
  cnpjLoading: boolean;
  cnpjError: string;
  notes: NotesMap;
  openNotes: string | null;
  onChange: (field: keyof DiagnosticoFormData, value: string) => void;
  onLookupCNPJ: () => Promise<void>;
  onToggleNotes: (key: string) => void;
  onChangeNote: (key: string, value: string) => void;
  maskCNPJ: (value: string) => string;
};

const COLABORADORES_OPTIONS = ['1 a 10', '11 a 50', '51 a 100', '101 a 200', 'Mais de 200'];
const FATURAMENTO_OPTIONS = ['Até R$ 10 mil', 'R$ 10 mil a R$ 50 mil', 'R$ 50 mil a R$ 200 mil', 'Acima de R$ 200 mil'];

export function StepCompanyDetails({
  contact,
  cnpjData,
  cnpjLoading,
  cnpjError,
  notes,
  openNotes,
  onChange,
  onLookupCNPJ,
  onToggleNotes,
  onChangeNote,
  maskCNPJ,
}: StepCompanyDetailsProps) {
  const cnpj = cnpjData as {
    razao_social?: string;
    nome_fantasia?: string;
    descricao_situacao_cadastral?: string;
    cnae_fiscal_descricao?: string;
    municipio?: string;
    uf?: string;
  } | null;

  return (
    <motion.div key="company" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
          <Target className="w-4 h-4" /> Dados da Empresa
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Conte-nos sobre sua empresa</h2>
        <p className="text-slate-400 max-w-lg mx-auto text-sm">Essas informações nos ajudam a personalizar seu diagnóstico.</p>
      </div>

      <div className="max-w-md mx-auto space-y-5">
        <div>
          <label className="block text-sm text-slate-400 mb-2"><User className="w-4 h-4 inline mr-1" />Seu Cargo</label>
          <input
            type="text"
            value={contact.cargo}
            onChange={(event) => onChange('cargo', event.target.value)}
            placeholder="Ex: Sócio, Diretor, Gerente..."
            className="w-full bg-slate-800/60 border border-slate-700 text-white rounded-xl px-4 py-3 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2"><Target className="w-4 h-4 inline mr-1" />CNPJ da Empresa</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={contact.cnpj}
              onChange={(event) => {
                onChange('cnpj', maskCNPJ(event.target.value));
              }}
              placeholder="00.000.000/0000-00"
              maxLength={18}
              className="flex-1 bg-slate-800/60 border border-slate-700 text-white rounded-xl px-4 py-3 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
            />
            <button
              type="button"
              onClick={onLookupCNPJ}
              disabled={cnpjLoading || contact.cnpj.replace(/\D/g, '').length !== 14}
              className="px-4 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#0a0e1a' }}
            >
              {cnpjLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Buscar'}
            </button>
          </div>
          {cnpjError && <p className="text-red-400 text-xs mt-2">{cnpjError}</p>}

          {cnpj && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">Empresa encontrada!</span>
              </div>
              <p className="text-sm text-slate-300"><span className="text-slate-500">Razão Social:</span> {cnpj.razao_social}</p>
              {cnpj.nome_fantasia && <p className="text-sm text-slate-300"><span className="text-slate-500">Nome Fantasia:</span> {cnpj.nome_fantasia}</p>}
              <p className="text-sm text-slate-300"><span className="text-slate-500">Situação:</span> {cnpj.descricao_situacao_cadastral}</p>
              {cnpj.cnae_fiscal_descricao && <p className="text-sm text-slate-300"><span className="text-slate-500">Atividade:</span> {cnpj.cnae_fiscal_descricao}</p>}
              {(cnpj.municipio || cnpj.uf) && <p className="text-sm text-slate-300"><span className="text-slate-500">Local:</span> {cnpj.municipio} - {cnpj.uf}</p>}
            </motion.div>
          )}

        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-3">👥 Número de Colaboradores</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {COLABORADORES_OPTIONS.map((option) => {
              const isSelected = contact.colaboradores === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onChange('colaboradores', option)}
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

        <div>
          <label className="block text-sm text-slate-400 mb-3">💰 Faturamento Mensal Médio</label>
          <div className="grid grid-cols-2 gap-2">
            {FATURAMENTO_OPTIONS.map((option) => {
              const isSelected = contact.faturamento === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onChange('faturamento', option)}
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

        <StepNotes
          noteKey="dados_empresa"
          label="Observações sobre Dados da Empresa"
          value={notes.dados_empresa || ''}
          isOpen={openNotes === 'dados_empresa'}
          placeholder="Anotações adicionais sobre o contexto da empresa..."
          onToggle={onToggleNotes}
          onChange={onChangeNote}
        />
      </div>
    </motion.div>
  );
}
