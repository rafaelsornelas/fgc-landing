import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

type DiagnosticoStepperProps = {
  step: number;
  totalSteps: number;
  sectorsCount: number;
  canGoNext: boolean;
  hasPrefilledData: boolean;
  onNext: () => void;
  onBack: () => void;
  children: ReactNode;
};

export function DiagnosticoStepper({
  step,
  totalSteps,
  sectorsCount,
  canGoNext,
  hasPrefilledData,
  onNext,
  onBack,
  children,
}: DiagnosticoStepperProps) {
  const progress = (step / (totalSteps - 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#111827] to-[#0a0e1a] text-white">
      <header className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-fgc.png" alt="FGC" className="h-8" />
            <span className="text-sm text-slate-400 hidden sm:inline">Diagnóstico Empresarial</span>
          </div>
          <div className="text-sm text-slate-500">
            {step >= 2 && step <= sectorsCount + 1 && `${step - 1} de ${sectorsCount} setores`}
          </div>
        </div>
        <div className="h-1 bg-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
        {children}

        {step <= sectorsCount + 1 && (
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-800/50">
            <button
              onClick={onBack}
              disabled={step === 0 || (hasPrefilledData && step === 1)}
              className="flex items-center gap-2 px-5 py-3 text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>
            <button
              onClick={onNext}
              disabled={!canGoNext}
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: canGoNext ? 'linear-gradient(135deg, #f59e0b, #d97706)' : undefined,
                color: canGoNext ? '#0a0e1a' : '#64748b',
              }}
            >
              {step === sectorsCount + 1 ? 'Ver Resultado' : 'Próximo'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
