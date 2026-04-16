import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

type DraftResumeDialogProps = {
  open: boolean;
  onResume: () => void;
  onDiscard: () => void;
};

export function DraftResumeDialog({ open, onResume, onDiscard }: DraftResumeDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-2xl p-6 max-w-md w-full shadow-2xl"
        style={{ background: '#161b27', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(245,158,11,0.12)' }}>
            <BarChart3 className="w-6 h-6" style={{ color: '#f59e0b' }} />
          </div>
          <h3 className="text-lg font-bold text-white">Diagnóstico em andamento</h3>
          <p className="text-sm mt-2" style={{ color: '#9ca3af' }}>
            Encontramos um diagnóstico que não foi finalizado. Deseja continuar de onde parou?
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onDiscard}
            className="flex-1 px-4 py-3 text-sm font-medium rounded-xl transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', background: 'transparent' }}
          >
            Começar Novo
          </button>
          <button
            onClick={onResume}
            className="flex-1 px-4 py-3 text-sm font-bold rounded-xl transition-all"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#0d1117' }}
          >
            Continuar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
