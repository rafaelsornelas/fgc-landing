import { AlertTriangle, Calendar, TrendingUp } from 'lucide-react';
import type { ContactData, DiagnosticoResult, Interpretation } from '../types';
import { IEEGauge } from './IEEGauge';
import { RadarChart } from './RadarChart';

type ResultsViewProps = {
  results: DiagnosticoResult;
  interpretation: Interpretation;
  contact: ContactData;
};

export function ResultsView({ results, interpretation, contact }: ResultsViewProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-slate-500 text-sm uppercase tracking-wider mb-2">Índice de Eficiência Empresarial</p>
        <IEEGauge iee={results.iee} color={interpretation.color} />
        <h2 className="text-xl font-bold mt-4" style={{ color: interpretation.color }}>
          {(interpretation.level === 'vulneravel' || interpretation.level === 'risco') && <AlertTriangle className="w-5 h-5 inline mr-2" />}
          {interpretation.level === 'saudavel' && <TrendingUp className="w-5 h-5 inline mr-2" />}
          {interpretation.title}
        </h2>
        <p className="text-slate-400 text-sm mt-3 max-w-lg mx-auto leading-relaxed">{interpretation.text}</p>
      </div>

      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">Visão Geral por Setor</h3>
        <RadarChart scores={results.sectorScores} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Setores Mais Críticos
          </h3>
          <div className="space-y-2">
            {results.critical.map((sector) => (
              <div key={sector.id} className="flex items-center justify-between">
                <span className="text-sm text-slate-300">{sector.icon} {sector.name}</span>
                <span className="text-sm font-bold text-red-400">{sector.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Setores Mais Estruturados
          </h3>
          <div className="space-y-2">
            {results.strong.map((sector) => (
              <div key={sector.id} className="flex items-center justify-between">
                <span className="text-sm text-slate-300">{sector.icon} {sector.name}</span>
                <span className="text-sm font-bold text-emerald-400">{sector.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">Detalhamento por Setor</h3>
        <div className="space-y-3">
          {results.sectorScores.map((sector) => (
            <div key={sector.id} className="flex items-center gap-3">
              <span className="text-sm w-36 truncate text-slate-400">{sector.icon} {sector.name}</span>
              <div className="flex-1 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${sector.percentage}%`,
                    background: sector.percentage >= 70 ? '#10b981' : sector.percentage >= 50 ? '#f59e0b' : '#ef4444',
                  }}
                />
              </div>
              <span className="text-sm font-bold w-10 text-right text-slate-300">{sector.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 text-center">
        <p className="text-amber-300 text-sm leading-relaxed mb-1"><strong>⚡ Alerta Estratégico:</strong></p>
        <p className="text-slate-400 text-sm leading-relaxed">
          Empresas abaixo de 70% costumam crescer com esforço excessivo, dependência do gestor e baixa previsibilidade de resultados.
        </p>
      </div>

      <div className="text-center space-y-4 pt-4">
        <h3 className="text-xl font-bold">Próximo Passo Recomendado</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Agende um bate-papo estratégico com um consultor da FGC Expertise para entender como elevar sua eficiência de forma estruturada.
        </p>
        <a
          href={`https://wa.me/5531998760724?text=Olá! Fiz o diagnóstico empresarial pelo site e gostaria de agendar uma consultoria. Meu IEE foi de ${results.iee}%.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold rounded-xl transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#0a0e1a' }}
        >
          <Calendar className="w-5 h-5" />
          Agendar Diagnóstico Estratégico
        </a>
        <p className="text-slate-600 text-xs mt-2">Diagnóstico realizado por {contact.name} — {contact.empresa}</p>
      </div>
    </div>
  );
}
