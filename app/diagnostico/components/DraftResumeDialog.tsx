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
            onClick={onDiscard}
            className="flex-1 px-4 py-3 text-sm font-medium rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            Começar Novo
          </button>
          <button
            onClick={onResume}
            className="flex-1 px-4 py-3 text-sm font-semibold rounded-xl transition-all"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#0a0e1a' }}
          >
            Continuar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
