'use client';

import { motion } from 'framer-motion';
import { Ban } from 'lucide-react';
import type { ReactNode } from 'react';
import { SCALE_LABELS } from '../lib/diagnostico-engine-v2';
import type { SectorDefinition } from '../types';

const SCALE_COLORS = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#10b981'];

type StepSectorQuestionsProps = {
  sector: SectorDefinition;
  step: number;
  totalSectors: number;
  sectorAnswers: number[];
  isNotApplicable: boolean;
  onSetAnswer: (sectorId: string, questionIndex: number, value: number) => void;
  onToggleNotApplicable: (sectorId: string) => void;
  children?: ReactNode;
};

export function StepSectorQuestions({
  sector,
  step,
  totalSectors,
  sectorAnswers,
  isNotApplicable,
  onSetAnswer,
  onToggleNotApplicable,
  children,
}: StepSectorQuestionsProps) {
  const answered = isNotApplicable ? sector.questions.length : sectorAnswers.filter((v) => v !== undefined).length;
  const total = sector.questions.length;
  const pct = total > 0 ? Math.round((answered / total) * 100) : 0;

  return (
    <motion.div key={sector.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      {/* Sector header */}
      <div className="mb-7">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
              {sector.icon}
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: '#6b7280' }}>
                Setor {step - 1} / {totalSectors}
              </p>
              <h2 className="text-xl font-bold text-white">{sector.name}</h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onToggleNotApplicable(sector.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 shrink-0 mt-1"
            style={{
              border: isNotApplicable ? '1.5px solid #f59e0b' : '1.5px solid rgba(100,116,139,0.25)',
              background: isNotApplicable ? 'rgba(245,158,11,0.1)' : 'transparent',
              color: isNotApplicable ? '#fbbf24' : '#64748b',
            }}
          >
            <Ban className="w-3 h-3" />
            Não se aplica
          </button>
        </div>

        {/* Progress bar for this sector */}
        {!isNotApplicable && (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-xs tabular-nums shrink-0" style={{ color: '#6b7280' }}>{answered}/{total}</span>
          </div>
        )}
      </div>

      {isNotApplicable ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl p-10 text-center"
          style={{ background: 'rgba(245,158,11,0.04)', border: '1px solid rgba(245,158,11,0.15)' }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(245,158,11,0.1)' }}>
            <Ban className="w-6 h-6" style={{ color: '#f59e0b' }} />
          </div>
          <p className="font-semibold text-white mb-1">Setor não aplicável</p>
          <p className="text-sm mb-5" style={{ color: '#6b7280' }}>Este setor não será considerado no cálculo do IEE.</p>
          <button
            type="button"
            onClick={() => onToggleNotApplicable(sector.id)}
            className="text-xs underline underline-offset-4 transition-colors hover:text-amber-300"
            style={{ color: '#f59e0b' }}
          >
            Desfazer — este setor se aplica à empresa
          </button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {sector.questions.map((question, questionIndex) => {
            const selected = sectorAnswers[questionIndex];
            const hasAnswer = selected !== undefined;

            return (
              <div
                key={questionIndex}
                className="rounded-2xl p-5 transition-all duration-200"
                style={{
                  background: hasAnswer ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.02)',
                  border: hasAnswer ? `1px solid ${SCALE_COLORS[selected]}30` : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div className="mb-3">
                  <p className="text-sm leading-relaxed" style={{ color: '#e2e8f0' }}>
                    <span className="text-xs font-bold mr-2 tabular-nums" style={{ color: '#f59e0b' }}>{String(questionIndex + 1).padStart(2, '0')}</span>
                    {question.text}
                  </p>
                  {question.hint && (
                    <p className="text-xs mt-1.5 leading-relaxed pl-6 italic" style={{ color: '#4ade80', opacity: 0.7 }}>
                      {question.hint}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mt-4">
                  {SCALE_LABELS.map(({ value, label }) => {
                    const isSelected = selected === value;
                    const color = SCALE_COLORS[value];
                    return (
                      <button
                        key={value}
                        onClick={() => onSetAnswer(sector.id, questionIndex, value)}
                        className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl transition-all duration-150"
                        style={{
                          background: isSelected ? `${color}18` : 'rgba(255,255,255,0.03)',
                          border: isSelected ? `1.5px solid ${color}` : '1.5px solid rgba(255,255,255,0.07)',
                          color: isSelected ? color : '#475569',
                        }}
                      >
                        <span className="text-base font-bold leading-none" style={{ color: isSelected ? color : '#94a3b8' }}>{value}</span>
                        <span className="text-center leading-tight hidden sm:block" style={{ fontSize: '0.6rem', opacity: isSelected ? 0.9 : 0.5 }}>{label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Label hint below on mobile */}
                {hasAnswer && (
                  <p className="text-xs mt-2 sm:hidden" style={{ color: SCALE_COLORS[selected], opacity: 0.8 }}>
                    {selected} — {SCALE_LABELS[selected]?.label}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!isNotApplicable && children}
    </motion.div>
  );
}
