'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { SCALE_LABELS } from '../lib/diagnostico-engine-v2';
import type { SectorDefinition } from '../types';

const SCALE_COLORS = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#10b981'];

type StepSectorQuestionsProps = {
  sector: SectorDefinition;
  step: number;
  totalSectors: number;
  sectorAnswers: number[];
  onSetAnswer: (sectorId: string, questionIndex: number, value: number) => void;
  children?: ReactNode;
};

export function StepSectorQuestions({ sector, step, totalSectors, sectorAnswers, onSetAnswer, children }: StepSectorQuestionsProps) {
  return (
    <motion.div key={sector.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{sector.icon}</span>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Setor {step - 1} de {totalSectors}</p>
            <h2 className="text-2xl font-bold">{sector.name}</h2>
          </div>
        </div>
        <p className="text-slate-500 text-sm mt-1">Avalie cada item de 0 (não existe) a 5 (referência / funciona perfeitamente)</p>
      </div>

      <div className="space-y-6">
        {sector.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5">
            <p className="text-sm text-slate-300 mb-1 leading-relaxed">
              <span className="text-amber-400 font-bold mr-2">{questionIndex + 1}.</span>
              {question.text}
            </p>
            {question.hint && (
              <p className="text-xs text-emerald-400/70 mb-4 leading-relaxed pl-5 italic">
                {question.hint}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-3">
              {SCALE_LABELS.map(({ value, label }) => {
                const isSelected = sectorAnswers[questionIndex] === value;
                return (
                  <button
                    key={value}
                    onClick={() => onSetAnswer(sector.id, questionIndex, value)}
                    className="transition-all duration-200"
                    style={{
                      padding: '8px 14px',
                      borderRadius: 10,
                      fontSize: '0.78rem',
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

      {children}
    </motion.div>
  );
}
