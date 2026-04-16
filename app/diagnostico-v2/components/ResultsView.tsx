import { AlertTriangle, TrendingUp } from 'lucide-react';
import type { ContactData, DiagnosticoResult, Interpretation } from '../types';
import { IEEGauge } from './IEEGauge';
import { RadarChart } from './RadarChart';

type ResultsViewProps = {
  results: DiagnosticoResult;
  interpretation: Interpretation;
  contact: ContactData;
};

export function ResultsView({ results, interpretation, contact }: ResultsViewProps) {
  const applicableScores = results.sectorScores.filter((s) => !s.isNotApplicable);

  return (
    <div className="space-y-6">
      {/* IEE Score */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${interpretation.color}25` }}
      >
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>
          Índice de Eficiência Empresarial
        </p>
        <IEEGauge iee={results.iee} color={interpretation.color} />
        <h2 className="text-lg font-bold mt-4 flex items-center justify-center gap-2" style={{ color: interpretation.color }}>
          {(interpretation.level === 'vulneravel' || interpretation.level === 'risco') && (
            <AlertTriangle className="w-5 h-5" />
          )}
          {interpretation.level === 'saudavel' && <TrendingUp className="w-5 h-5" />}
          {interpretation.title}
        </h2>
        <p className="text-sm mt-3 max-w-lg mx-auto leading-relaxed" style={{ color: '#9ca3af' }}>
          {interpretation.text}
        </p>
      </div>

      {/* Radar */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-sm font-semibold mb-4 text-center" style={{ color: '#e2e8f0' }}>Visão Geral por Setor</h3>
        <RadarChart scores={applicableScores} />
      </div>

      {/* Critical / Strong */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl p-5" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)' }}>
          <h3 className="text-xs font-semibold uppercase tracking-wide mb-4 flex items-center gap-2" style={{ color: '#f87171' }}>
            <AlertTriangle className="w-3.5 h-3.5" /> Setores Mais Críticos
          </h3>
          <div className="space-y-3">
            {results.critical.map((sector) => (
              <div key={sector.id} className="flex items-center justify-between gap-3">
                <span className="text-sm" style={{ color: '#d1d5db' }}>{sector.icon} {sector.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-14 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full" style={{ width: `${sector.percentage}%`, background: '#ef4444' }} />
                  </div>
                  <span className="text-xs font-bold tabular-nums w-8 text-right" style={{ color: '#f87171' }}>{sector.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-5" style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.15)' }}>
          <h3 className="text-xs font-semibold uppercase tracking-wide mb-4 flex items-center gap-2" style={{ color: '#34d399' }}>
            <TrendingUp className="w-3.5 h-3.5" /> Mais Estruturados
          </h3>
          <div className="space-y-3">
            {results.strong.map((sector) => (
              <div key={sector.id} className="flex items-center justify-between gap-3">
                <span className="text-sm" style={{ color: '#d1d5db' }}>{sector.icon} {sector.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-14 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full" style={{ width: `${sector.percentage}%`, background: '#10b981' }} />
                  </div>
                  <span className="text-xs font-bold tabular-nums w-8 text-right" style={{ color: '#34d399' }}>{sector.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All sectors breakdown */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-xs font-semibold uppercase tracking-wide mb-5" style={{ color: '#6b7280' }}>Detalhamento por Setor</h3>
        <div className="space-y-3">
          {results.sectorScores.map((sector) => (
            <div key={sector.id} className="flex items-center gap-3">
              <span className="text-sm w-36 truncate shrink-0" style={{ color: '#94a3b8' }}>{sector.icon} {sector.name}</span>
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                {sector.isNotApplicable ? (
                  <div className="h-full rounded-full" style={{ width: '100%', background: 'rgba(255,255,255,0.08)' }} />
                ) : (
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${sector.percentage}%`,
                      background: sector.percentage >= 70 ? '#10b981' : sector.percentage >= 50 ? '#f59e0b' : '#ef4444',
                    }}
                  />
                )}
              </div>
              <span className="text-xs font-bold tabular-nums w-10 text-right shrink-0" style={{ color: sector.isNotApplicable ? '#374151' : '#9ca3af' }}>
                {sector.isNotApplicable ? 'N/A' : `${sector.percentage}%`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <h3 className="text-lg font-bold mb-2 text-white">Próximo Passo Recomendado</h3>
        <p className="text-sm mb-5 max-w-md mx-auto leading-relaxed" style={{ color: '#9ca3af' }}>
          Agende um bate-papo estratégico com a equipe da FGC Expertise e descubra como elevar sua eficiência de forma estruturada.
        </p>
        <a
          href={`https://wa.me/5531998760724?text=Olá! Fiz o diagnóstico empresarial pelo site e gostaria de agendar uma consultoria. Meu IEE foi de ${results.iee}%.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#0d1117', boxShadow: '0 4px 20px rgba(245,158,11,0.3)' }}
        >
          Agendar Diagnóstico Estratégico
        </a>
        <p className="text-xs mt-4" style={{ color: '#374151' }}>
          Diagnóstico de {contact.name} — {contact.empresa}
        </p>
      </div>
    </div>
  );
}
