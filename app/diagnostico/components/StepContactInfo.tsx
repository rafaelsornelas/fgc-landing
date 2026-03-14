import { motion } from 'framer-motion';
import { BarChart3, Building2, Mail, Phone, User } from 'lucide-react';
import type { ContactData } from '../types';

type StepContactInfoProps = {
  contact: ContactData;
  onChange: (field: keyof ContactData, value: string) => void;
  maskWhatsApp: (value: string) => string;
};

export function StepContactInfo({ contact, onChange, maskWhatsApp }: StepContactInfoProps) {
  return (
    <motion.div key="contact" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
          <BarChart3 className="w-4 h-4" /> Diagnóstico Gratuito
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Descubra o Índice de Eficiência
          <br />
          <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">da sua empresa</span>
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto">
          Responda perguntas sobre 12 áreas estratégicas e receba um diagnóstico completo com recomendações personalizadas. Leva apenas 10 minutos.
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-2"><User className="w-4 h-4 inline mr-1" />Seu Nome</label>
          <input
            type="text"
            value={contact.name}
            onChange={(event) => onChange('name', event.target.value)}
            placeholder="Nome completo"
            className="w-full bg-slate-800/60 border border-slate-700 text-white rounded-xl px-4 py-3 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-2"><Mail className="w-4 h-4 inline mr-1" />Seu E-mail</label>
          <input
            type="email"
            value={contact.email}
            onChange={(event) => onChange('email', event.target.value)}
            placeholder="seu@email.com"
            className="w-full bg-slate-800/60 border border-slate-700 text-white rounded-xl px-4 py-3 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-2"><Phone className="w-4 h-4 inline mr-1" />WhatsApp</label>
          <input
            type="tel"
            value={contact.whatsapp}
            onChange={(event) => onChange('whatsapp', maskWhatsApp(event.target.value))}
            placeholder="(31) 99999-9999"
            maxLength={15}
            className="w-full bg-slate-800/60 border border-slate-700 text-white rounded-xl px-4 py-3 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-2"><Building2 className="w-4 h-4 inline mr-1" />Empresa</label>
          <input
            type="text"
            value={contact.empresa}
            onChange={(event) => onChange('empresa', event.target.value)}
            placeholder="Nome da empresa"
            className="w-full bg-slate-800/60 border border-slate-700 text-white rounded-xl px-4 py-3 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
          />
        </div>
      </div>
    </motion.div>
  );
}
