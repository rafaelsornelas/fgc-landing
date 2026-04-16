import { motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
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
const TEMPO_MERCADO_OPTIONS = ['Menos de 1 ano', '1 a 3 anos', '3 a 5 anos', '5 a 10 anos', 'Mais de 10 anos'];

const inputClass = 'w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 transition-all focus:outline-none';
const inputStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' };

function SelectGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wide mb-3" style={{ color: '#94a3b8' }}>{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className="px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-150"
              style={{
                border: isSelected ? '1.5px solid #f59e0b' : '1.5px solid rgba(255,255,255,0.08)',
                background: isSelected ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.03)',
                color: isSelected ? '#fbbf24' : '#6b7280',
                fontWeight: isSelected ? 700 : 400,
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

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
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
          style={{ background: 'rgba(245,158,11,0.08)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}
        >
          Dados da Empresa
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Conte-nos sobre sua empresa</h2>
        <p className="text-sm max-w-lg mx-auto" style={{ color: '#6b7280' }}>Essas informações personalizam seu diagnóstico.</p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Cargo */}
        <div>
          <label className="block text-xs font-medium uppercase tracking-wide mb-2" style={{ color: '#94a3b8' }}>Seu Cargo</label>
          <input
            type="text"
            value={contact.cargo}
            onChange={(e) => onChange('cargo', e.target.value)}
            placeholder="Ex: Sócio, Diretor, Gerente..."
            className={inputClass}
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)'; e.currentTarget.style.background = 'rgba(245,158,11,0.04)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
          />
        </div>

        {/* CNPJ */}
        <div>
          <label className="block text-xs font-medium uppercase tracking-wide mb-2" style={{ color: '#94a3b8' }}>CNPJ da Empresa</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={contact.cnpj}
              onChange={(e) => onChange('cnpj', maskCNPJ(e.target.value))}
              placeholder="00.000.000/0000-00"
              maxLength={18}
              className={`flex-1 ${inputClass}`}
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)'; e.currentTarget.style.background = 'rgba(245,158,11,0.04)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            />
            <button
              type="button"
              onClick={onLookupCNPJ}
              disabled={cnpjLoading || contact.cnpj.replace(/\D/g, '').length !== 14}
              className="px-4 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#0d1117' }}
            >
              {cnpjLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Buscar'}
            </button>
          </div>
          {cnpjError && <p className="text-red-400 text-xs mt-2">{cnpjError}</p>}

          {cnpj && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 rounded-xl p-4 space-y-1"
              style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">Empresa encontrada</span>
              </div>
              <p className="text-xs" style={{ color: '#94a3b8' }}><span style={{ color: '#475569' }}>Razão Social: </span>{cnpj.razao_social}</p>
              {cnpj.nome_fantasia && <p className="text-xs" style={{ color: '#94a3b8' }}><span style={{ color: '#475569' }}>Fantasia: </span>{cnpj.nome_fantasia}</p>}
              <p className="text-xs" style={{ color: '#94a3b8' }}><span style={{ color: '#475569' }}>Situação: </span>{cnpj.descricao_situacao_cadastral}</p>
              {cnpj.cnae_fiscal_descricao && <p className="text-xs" style={{ color: '#94a3b8' }}><span style={{ color: '#475569' }}>Atividade: </span>{cnpj.cnae_fiscal_descricao}</p>}
              {(cnpj.municipio ?? cnpj.uf) && <p className="text-xs" style={{ color: '#94a3b8' }}><span style={{ color: '#475569' }}>Local: </span>{cnpj.municipio} - {cnpj.uf}</p>}
            </motion.div>
          )}
        </div>

        <SelectGroup
          label="👥 Número de Colaboradores"
          options={COLABORADORES_OPTIONS}
          value={contact.colaboradores}
          onChange={(v) => onChange('colaboradores', v)}
        />

        <SelectGroup
          label="💰 Faturamento Mensal Médio"
          options={FATURAMENTO_OPTIONS}
          value={contact.faturamento}
          onChange={(v) => onChange('faturamento', v)}
        />

        <div>
          <label className="block text-xs font-medium uppercase tracking-wide mb-1" style={{ color: '#94a3b8' }}>🏢 Tempo de Mercado</label>
          <p className="text-xs mb-3" style={{ color: '#4b5563' }}>Independente do CNPJ atual — quanto tempo a empresa já atua no mercado?</p>
          <div className="flex flex-wrap gap-2">
            {TEMPO_MERCADO_OPTIONS.map((option) => {
              const isSelected = contact.tempo_mercado === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onChange('tempo_mercado', option)}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-150"
                  style={{
                    border: isSelected ? '1.5px solid #f59e0b' : '1.5px solid rgba(255,255,255,0.08)',
                    background: isSelected ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.03)',
                    color: isSelected ? '#fbbf24' : '#6b7280',
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
