import type { AnswersMap, DiagnosticoResult, Interpretation, ScaleLabel, SectorDefinition } from '../types';

export const SECTORS: SectorDefinition[] = [
  {
    id: 'societario', name: 'Societário', weight: 1, icon: '⚖️',
    questions: [
      'Existe contrato social atualizado e alinhado à realidade da empresa?',
      'As responsabilidades dos sócios estão formalmente definidas?',
      'Existe acordo de sócios ou regras claras de tomada de decisão?',
    ],
  },
  {
    id: 'comercial', name: 'Comercial', weight: 1.5, icon: '💼',
    questions: [
      'A empresa possui metas comerciais claras e mensais?',
      'Existe um processo definido de vendas (funil)?',
      'Os resultados de vendas são acompanhados com indicadores?',
      'A equipe comercial recebe treinamento ou orientação periódica?',
    ],
  },
  {
    id: 'financeiro', name: 'Financeiro', weight: 1.5, icon: '💰',
    questions: [
      'Existe controle de entradas e saídas atualizado?',
      'A empresa separa finanças pessoais das empresariais?',
      'Existe DRE ou visão clara de lucro/prejuízo?',
      'A empresa trabalha com projeção de caixa?',
    ],
  },
  {
    id: 'marketing', name: 'Marketing', weight: 1.2, icon: '📢',
    questions: [
      'A empresa possui posicionamento claro no mercado?',
      'Existe estratégia de atração de clientes (orgânico ou pago)?',
      'As ações de marketing são mensuradas?',
      'Marketing gera oportunidades reais de venda?',
    ],
  },
  {
    id: 'tecnologia', name: 'Tecnologia', weight: 1, icon: '💻',
    questions: [
      'A empresa utiliza sistemas de gestão (ERP, CRM, etc.)?',
      'As informações estão centralizadas?',
      'Os processos dependem menos de pessoas e mais de sistemas?',
      'Existe segurança e backup de dados?',
    ],
  },
  {
    id: 'contabil', name: 'Contábil', weight: 1, icon: '📊',
    questions: [
      'O contador entrega relatórios compreensíveis?',
      'A contabilidade é usada para tomada de decisão?',
      'A empresa entende seus números contábeis?',
    ],
  },
  {
    id: 'fiscal', name: 'Fiscal', weight: 1, icon: '📋',
    questions: [
      'A empresa conhece sua carga tributária real?',
      'Existe planejamento tributário?',
      'A empresa já passou por problemas fiscais ou multas?',
    ],
  },
  {
    id: 'estoque', name: 'Estoque', weight: 1, icon: '📦',
    questions: [
      'Existe controle de estoque atualizado?',
      'Há perdas frequentes ou falta de produtos?',
      'O estoque é integrado às vendas/compras?',
    ],
  },
  {
    id: 'compras', name: 'Compras', weight: 1, icon: '🛒',
    questions: [
      'Existe processo de compras definido?',
      'Há negociação estratégica com fornecedores?',
      'Compras são planejadas ou reativas?',
    ],
  },
  {
    id: 'planejamento', name: 'Planejamento', weight: 1.5, icon: '🎯',
    questions: [
      'A empresa possui planejamento anual?',
      'Metas são revisadas periodicamente?',
      'As decisões são baseadas em dados?',
    ],
  },
  {
    id: 'pessoas', name: 'Pessoas / Gestão', weight: 1.5, icon: '👥',
    questions: [
      'Funções e responsabilidades estão claras?',
      'Existe acompanhamento de desempenho?',
      'Há rotinas de feedback ou alinhamento?',
      'A empresa depende excessivamente do dono?',
    ],
  },
  {
    id: 'processos', name: 'Processos', weight: 1.3, icon: '⚙️',
    questions: [
      'Os processos estão documentados?',
      'Existe padronização das rotinas?',
      'Novos colaboradores aprendem rápido?',
      'A empresa funciona mesmo sem o gestor presente?',
    ],
  },
];

export const SCALE_LABELS: ScaleLabel[] = [
  { value: 0, label: 'Não existe' },
  { value: 1, label: 'Informal' },
  { value: 2, label: 'Desorganizado' },
  { value: 3, label: 'Parcial' },
  { value: 4, label: 'Funcional' },
  { value: 5, label: 'Estratégico' },
];

export function isSectorComplete(sectorIndex: number, answers: AnswersMap): boolean {
  const sector = SECTORS[sectorIndex];
  const sectorAnswers = answers[sector.id] || [];
  return sector.questions.every((_, index) => sectorAnswers[index] !== undefined);
}

export function calculateDiagnosticoResults(answers: AnswersMap): DiagnosticoResult {
  let totalWeightedScore = 0;
  let totalWeightedMax = 0;

  const sectorScores = SECTORS.map((sector) => {
    const sectorAnswers = answers[sector.id] || [];
    const score = sectorAnswers.reduce((sum, value) => sum + (value || 0), 0);
    const maxScore = sector.questions.length * 5;
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    totalWeightedScore += score * sector.weight;
    totalWeightedMax += maxScore * sector.weight;

    return {
      id: sector.id,
      name: sector.name,
      score,
      maxScore,
      percentage,
      weight: sector.weight,
      icon: sector.icon,
    };
  });

  const iee = totalWeightedMax > 0 ? Math.round((totalWeightedScore / totalWeightedMax) * 100) : 0;
  const critical = [...sectorScores].sort((a, b) => a.percentage - b.percentage).slice(0, 3);
  const strong = [...sectorScores].sort((a, b) => b.percentage - a.percentage).slice(0, 3);

  return { iee, sectorScores, critical, strong };
}

export function getInterpretation(iee: number): Interpretation {
  if (iee >= 70) {
    return {
      level: 'saudavel',
      title: 'Empresa Saudável',
      color: '#10b981',
      text: `Sua empresa apresenta um bom nível de organização e maturidade, com um IEE de ${iee}%. Mesmo assim, existem oportunidades de otimização que podem acelerar seus resultados e reduzir esforço operacional. Empresas nesse patamar costumam ganhar ainda mais velocidade com ajustes estratégicos pontuais.`,
    };
  }

  if (iee >= 50) {
    return {
      level: 'risco',
      title: 'Risco Silencioso',
      color: '#f59e0b',
      text: `Sua empresa apresenta estrutura operacional funcional, porém com fragilidades estratégicas que limitam o crescimento e aumentam riscos financeiros e operacionais. Com um IEE de ${iee}%, há pontos que precisam de atenção imediata para evitar problemas maiores no futuro.`,
    };
  }

  return {
    level: 'vulneravel',
    title: 'Empresa Vulnerável',
    color: '#ef4444',
    text: `Com um IEE de ${iee}%, sua empresa apresenta desorganização significativa em áreas críticas. Isso gera crescimento com esforço excessivo, dependência do gestor e baixa previsibilidade de resultados. É fundamental estruturar os pilares de gestão o quanto antes.`,
  };
}
