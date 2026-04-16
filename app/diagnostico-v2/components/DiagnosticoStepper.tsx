import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
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
  const isLastStep = step === sectorsCount + 1;
  const showNav = step <= sectorsCount + 1;
  const isSectorStep = step >= 2 && step <= sectorsCount + 1;

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(160deg, #0d1117 0%, #111827 50%, #0d1117 100%)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ background: 'rgba(13,17,23,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img src="/logo-fgc.png" alt="FGC" className="h-7 shrink-0" />
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
              <span>Diagnóstico Empresarial</span>
              {isSectorStep && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-slate-400">Setor {step - 1} de {sectorsCount}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium tabular-nums" style={{ color: '#f59e0b' }}>
              {Math.round(progress)}%
            </span>
            <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-5 py-8 md:py-12">
        {children}

        {showNav && (
          <div className="flex justify-between items-center mt-10 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button
              onClick={onBack}
              disabled={step === 0 || (hasPrefilledData && step === 1)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all disabled:opacity-20 disabled:cursor-not-allowed hover:bg-slate-800/50"
              style={{ color: '#94a3b8' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>

            <button
              onClick={onNext}
              disabled={!canGoNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
              style={canGoNext ? {
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#0d1117',
                boxShadow: '0 4px 20px rgba(245,158,11,0.3)',
              } : {
                background: 'rgba(100,116,139,0.15)',
                color: '#475569',
              }}
            >
              {isLastStep ? 'Ver Resultado' : 'Próximo'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
