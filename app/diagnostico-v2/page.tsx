'use client';

import { Suspense, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { DiagnosticoStepper } from './components/DiagnosticoStepper';
import { DraftResumeDialog } from './components/DraftResumeDialog';
import { ResultsView } from './components/ResultsView';
import { StepCompanyDetails } from './components/StepCompanyDetails';
import { StepContactInfo } from './components/StepContactInfo';
import { StepNotes } from './components/StepNotes';
import { StepSectorQuestions } from './components/StepSectorQuestions';
import { SECTORS } from './lib/diagnostico-engine-v2';
import { maskCNPJ, maskWhatsApp, useDiagnosticoWizard } from './lib/useDiagnosticoWizard';

export default function DiagnosticoV2PageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#111827] to-[#0a0e1a] flex items-center justify-center"><Loader2 className="w-8 h-8 text-amber-500 animate-spin" /></div>}>
      <DiagnosticoV2Page />
    </Suspense>
  );
}

function DiagnosticoV2Page() {
  const [step, setStep] = useState(0);
  const wizard = useDiagnosticoWizard({ step, setStep });
  const sector = wizard.step >= 2 && wizard.step <= SECTORS.length + 1 ? SECTORS[wizard.step - 2] : null;

  return (
    <DiagnosticoStepper step={wizard.step} totalSteps={wizard.totalSteps} sectorsCount={SECTORS.length} hasPrefilledData={wizard.hasPrefilledData} canGoNext={wizard.canGoNext} onNext={wizard.goNext} onBack={wizard.goBack}>
      <DraftResumeDialog open={wizard.showResume} onResume={wizard.resumeDraft} onDiscard={wizard.discardDraft} />
      <AnimatePresence mode="wait">
        {wizard.step === 0 && <StepContactInfo contact={wizard.contact} onChange={wizard.setContactField} maskWhatsApp={maskWhatsApp} />}
        {wizard.step === 1 && <StepCompanyDetails contact={wizard.contact} cnpjData={wizard.cnpjData} cnpjLoading={wizard.cnpjLoading} cnpjError={wizard.cnpjError} notes={wizard.notes} openNotes={wizard.openNotes} onChange={wizard.setContactField} onLookupCNPJ={wizard.lookupCNPJ} onToggleNotes={wizard.toggleNotes} onChangeNote={wizard.setNote} maskCNPJ={maskCNPJ} />}
        {sector && (
          <StepSectorQuestions sector={sector} step={wizard.step} totalSectors={SECTORS.length} sectorAnswers={wizard.answers[sector.id] || []} isNotApplicable={!!wizard.notApplicable[sector.id]} onSetAnswer={wizard.setAnswer} onToggleNotApplicable={wizard.toggleNotApplicable}>
            <div className="mt-6 border-t border-slate-700/50 pt-4">
              <StepNotes
                noteKey={sector.id}
                label={`Observações sobre ${sector.name}`}
                value={wizard.notes[sector.id] || ''}
                isOpen={wizard.openNotes === sector.id}
                placeholder={`Anote aqui observações sobre ${sector.name.toLowerCase()} da sua empresa...`}
                onToggle={wizard.toggleNotes}
                onChange={wizard.setNote}
              />
            </div>
          </StepSectorQuestions>
        )}
        {wizard.step === SECTORS.length + 2 && (
          <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {wizard.submitting ? (
              <div className="text-center py-20">
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto mb-4" />
                <p className="text-slate-400">Analisando suas respostas...</p>
              </div>
            ) : (
              <>
                {wizard.submitError && (
                  <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <p className="text-sm text-red-300">{wizard.submitError}</p>
                    </div>
                    <button
                      onClick={wizard.retrySubmit}
                      className="px-4 py-2 text-sm font-semibold rounded-lg flex-shrink-0 transition-all"
                      style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#0a0e1a' }}
                    >
                      Tentar Novamente
                    </button>
                  </div>
                )}
                <ResultsView results={wizard.results} interpretation={wizard.interpretation} contact={wizard.contact} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </DiagnosticoStepper>
  );
}
