import { motion } from 'framer-motion';
import { Building2, Mail, Phone, User } from 'lucide-react';
import type { ContactData } from '../types';

type StepContactInfoProps = {
  contact: ContactData;
  onChange: (field: keyof ContactData, value: string) => void;
  maskWhatsApp: (value: string) => string;
};

const inputClass = 'w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 transition-all focus:outline-none';
const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
};

export function StepContactInfo({ contact, onChange, maskWhatsApp }: StepContactInfoProps) {
  return (
    <motion.div key="contact" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
          style={{ background: 'rgba(245,158,11,0.08)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}
        >
          Diagnóstico Gratuito
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          Descubra a eficiência{' '}
          <span style={{ background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            da sua empresa
          </span>
        </h1>
        <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: '#6b7280' }}>
          Avalie 13 áreas estratégicas em ~15 minutos e receba um diagnóstico com seu Índice de Eficiência Empresarial.
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        {[
          { field: 'name' as const, label: 'Seu Nome', icon: User, placeholder: 'Nome completo', type: 'text' },
          { field: 'email' as const, label: 'E-mail', icon: Mail, placeholder: 'seu@email.com', type: 'email' },
          { field: 'whatsapp' as const, label: 'WhatsApp', icon: Phone, placeholder: '(31) 99999-9999', type: 'tel', maxLength: 15 },
          { field: 'empresa' as const, label: 'Empresa', icon: Building2, placeholder: 'Nome da empresa', type: 'text' },
        ].map(({ field, label, icon: Icon, placeholder, type, maxLength }) => (
          <div key={field}>
            <label className="flex items-center gap-1.5 text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: '#94a3b8' }}>
              <Icon className="w-3.5 h-3.5" />
              {label}
            </label>
            <input
              type={type}
              value={contact[field]}
              onChange={(e) => onChange(field, field === 'whatsapp' ? maskWhatsApp(e.target.value) : e.target.value)}
              placeholder={placeholder}
              maxLength={maxLength}
              className={inputClass}
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)'; e.currentTarget.style.background = 'rgba(245,158,11,0.04)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
