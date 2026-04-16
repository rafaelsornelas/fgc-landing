import type { AnswersMap, DiagnosticoResult, Interpretation, NotApplicableMap, ScaleLabel, SectorDefinition } from '../types';

export const SECTORS: SectorDefinition[] = [
  {
    id: 'societario',
    name: 'Societário',
    weight: 1,
    icon: '⚖️',
    questions: [
      {
        text: 'A estrutura da sociedade está devidamente formalizada em contrato social atualizado?',
        hint: 'O contrato social deve refletir a realidade atual da empresa, incluindo participações, atividades e cláusulas de resolução de conflitos.',
      },
      {
        text: 'As responsabilidades e quotas dos sócios estão formalmente definidas e reconhecidas por todos?',
        hint: 'Inclui reconhecimento mútuo das quotas, direitos e deveres de cada sócio dentro do negócio.',
      },
      {
        text: 'Existe acordo de sócios com regras claras de tomada de decisão e resolução de conflitos?',
        hint: 'O acordo de sócios define como decisões importantes são tomadas, quórum mínimo, direito de preferência, saída de sócios, etc.',
      },
      {
        text: 'Há separação clara das despesas pessoais dos sócios com os compromissos financeiros da empresa?',
        hint: 'Sócios não devem usar a conta da empresa para despesas pessoais, e vice-versa. Essa separação é fundamental para a saúde financeira.',
      },
      {
        text: 'Possui política de pró-labore estabelecida e formalizada para os sócios?',
        hint: 'Remuneração paga aos sócios pela sua atuação na empresa, contribuindo para a gestão financeira pessoal e transparência nas finanças da empresa.',
      },
      {
        text: 'A empresa possui política clara e formal para distribuição de lucros?',
        hint: 'Divisão dos ganhos obtidos pela empresa entre os sócios, seguindo critérios previamente estabelecidos e dentro do prazo legal.',
      },
    ],
  },
  {
    id: 'comercial',
    name: 'Comercial',
    weight: 1.5,
    icon: '💼',
    questions: [
      {
        text: 'A empresa possui metas de vendas definidas, mensuráveis e comunicadas aos responsáveis?',
        hint: 'As metas representam objetivos quantitativos como: volume de vendas, quantidade de novos clientes ou quantidade de produtos vendidos.',
      },
      {
        text: 'Existe um processo definido de vendas com funil estruturado e etapas claras?',
        hint: 'Um funil de vendas bem definido permite prever receitas, identificar gargalos e treinar a equipe de forma padronizada.',
      },
      {
        text: 'A empresa utiliza algum sistema CRM para gerenciar vendas e relacionamento com clientes?',
        hint: 'Um CRM ajuda a acompanhar leads, manter registros de interações, gerenciar pipeline de vendas e automatizar processos, impulsionando as vendas.',
      },
      {
        text: 'Existe metodologia clara para precificar os serviços/produtos?',
        hint: 'Fatores como custos de produção, concorrência, valor percebido pelo cliente e objetivos de lucratividade devem ser considerados na precificação.',
      },
      {
        text: 'Há relatórios que ofereçam suporte ao acompanhamento diário, semanal e/ou mensal das vendas?',
        hint: 'Relatórios de vendas permitem identificar tendências, comparar períodos e tomar decisões mais ágeis sobre a operação comercial.',
      },
      {
        text: 'São realizadas reuniões mensais com a equipe comercial para avaliação dos resultados?',
        hint: 'Reuniões de governança comercial garantem alinhamento, identificação de problemas e oportunidades de melhoria nos processos de venda.',
      },
      {
        text: 'Há acompanhamento de indicadores de vendas para otimizar as estratégias comerciais?',
        hint: 'Métricas como volume de vendas, taxas de conversão, ticket médio e tempo de ciclo de vendas são fundamentais para gestão comercial.',
      },
      {
        text: 'A equipe comercial recebe treinamento e capacitação periódica?',
        hint: 'Treinamentos regulares mantêm a equipe atualizada sobre produtos, técnicas de vendas e novas estratégias comerciais.',
      },
    ],
  },
  {
    id: 'financeiro',
    name: 'Financeiro',
    weight: 1.5,
    icon: '💰',
    questions: [
      {
        text: 'Possui um plano de contas gerencial dividido por recebimentos (entradas) e pagamentos (saídas)?',
        hint: 'O plano de contas deve ser aderente à operação da empresa, permitindo visão clara de todas as movimentações financeiras.',
      },
      {
        text: 'Todas as obrigações com fornecedores (contas a pagar) estão devidamente registradas e controladas?',
        hint: 'Contas a pagar bem gerenciadas evitam atrasos, multas e problemas de relacionamento com fornecedores.',
      },
      {
        text: 'Todas as movimentações de direitos das vendas aos clientes (contas a receber) estão registradas e controladas?',
        hint: 'Contas a receber organizadas permitem monitorar inadimplência e planejar o fluxo de caixa com precisão.',
      },
      {
        text: 'A empresa realiza conciliação bancária regularmente com o sistema devidamente atualizado?',
        hint: 'Processo de comparação entre os registros financeiros da empresa e os extratos bancários, garantindo que todas as transações estejam corretamente registradas.',
      },
      {
        text: 'A empresa tem um controle eficaz e confiável do seu fluxo de caixa com projeção futura?',
        hint: 'Há o registro das entradas e saídas de dinheiro de qualquer natureza, que permite gerenciar as finanças de forma proativa e garantir recursos para despesas planejadas.',
      },
      {
        text: 'A empresa gerencia suas atividades de crédito e cobrança para minimizar inadimplência?',
        hint: 'São atividades desse setor: avaliar a concessão de crédito, estabelecer políticas de pagamento, monitorar contas em atraso e recuperar valores devidos.',
      },
      {
        text: 'A gestão recebe relatórios financeiros recorrentes (DRE, fluxo de caixa, análises)?',
        hint: 'Relatórios financeiros fornecem informações sobre a saúde financeira e o desempenho do negócio: demonstração de resultados, fluxos de caixa e análises financeiras.',
      },
    ],
  },
  {
    id: 'controladoria',
    name: 'Controladoria',
    weight: 1.5,
    icon: '📈',
    questions: [
      {
        text: 'A empresa possui capital de giro suficiente para manter o nível das suas operações?',
        hint: 'Capital de giro é o recurso disponível para cumprir com as obrigações de curto prazo, como pagamento de fornecedores, salários e impostos.',
      },
      {
        text: 'A empresa tem metas financeiras claras e mensuráveis (faturamento, lucro, margem)?',
        hint: 'São metas quantitativas como: aumento de 20% no faturamento, manutenção da margem acima de 30%, redução de custos fixos em 10%.',
      },
      {
        text: 'A empresa possui orçamento anual que é utilizado e acompanhado ao longo do ano?',
        hint: 'Deve detalhar as receitas esperadas, despesas planejadas e investimentos previstos. Serve como guia para o controle financeiro e a tomada de decisões.',
      },
      {
        text: 'A empresa conhece seu ponto de equilíbrio (receita mínima para não haver prejuízo)?',
        hint: 'Ou seja, qual é o nível de receita necessário para que não haja prejuízos, cobrindo todos os custos fixos e variáveis da operação.',
      },
      {
        text: 'Existe acompanhamento do planejamento orçamentário com resultados previstos vs realizados?',
        hint: 'Esta prática auxilia na identificação de oportunidades, desvios de rota e na implementação de correções necessárias antes que os problemas se agravem.',
      },
      {
        text: 'Existe método para realizar uma gestão e controle efetivo de custos e despesas mensais?',
        hint: 'Inclui categorização de custos fixos e variáveis, análise de desvios e busca contínua por eficiência operacional sem comprometer a qualidade.',
      },
      {
        text: 'Existe análise da evolução dos números (análise horizontal) e da representatividade (análise vertical)?',
        hint: 'Análise horizontal avalia a evolução ao longo do tempo. Análise vertical avalia a representatividade de cada item em relação ao total, mapeando riscos.',
      },
      {
        text: 'A empresa monitora seus indicadores financeiros regularmente (liquidez, rentabilidade, margem, endividamento)?',
        hint: 'Métricas como liquidez, rentabilidade, endividamento, margem de contribuição, margem líquida e geração de caixa operacional fornecem insights para tomada de decisão.',
      },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    weight: 1.2,
    icon: '📢',
    questions: [
      {
        text: 'A empresa possui um plano de marketing e comunicação alinhado aos seus objetivos comerciais?',
        hint: 'Exemplo: planos para promover produtos alinhados à meta de vendas, com comunicação orientada a aumentar a visibilidade da marca e atrair clientes.',
      },
      {
        text: 'A empresa possui posicionamento claro no mercado com proposta de valor e diferenciais definidos?',
        hint: 'Posicionamento é como a empresa quer ser percebida pelo mercado, definindo para quem serve, o que oferece e como se diferencia da concorrência.',
      },
      {
        text: 'Há time interno ou parceiro externo dedicado às ações de marketing?',
        hint: 'Há um time interno dedicado a pensar as ações de marketing? Caso não, a empresa conta com um parceiro externo para auxiliar na execução e avaliação dos investimentos.',
      },
      {
        text: 'A equipe documenta, organiza e analisa dados de aquisição de clientes para tomada de decisões?',
        hint: 'A empresa toma decisões de marketing com base em dados históricos do comportamento de compra dos clientes, e não apenas por intuição.',
      },
      {
        text: 'A empresa possui canais de aquisição de clientes diversificados e analisados periodicamente?',
        hint: 'A empresa deve possuir pelo menos 6 canais de aquisição mapeados, reduzindo o risco de dependência de um canal específico e abrindo novas fontes de clientes.',
      },
      {
        text: 'Há estratégia de comunicação interna (endomarketing) direcionada para os colaboradores?',
        hint: 'O objetivo é criar um ambiente de trabalho motivador e alinhado com os valores da empresa: comunicação interna eficaz, treinamentos e eventos corporativos.',
      },
      {
        text: 'As ações de marketing são mensuradas e geram oportunidades reais de venda?',
        hint: 'Métricas como custo por lead, taxa de conversão e ROI de campanhas devem ser acompanhadas regularmente para garantir o retorno sobre o investimento.',
      },
    ],
  },
  {
    id: 'tecnologia',
    name: 'Tecnologia',
    weight: 1,
    icon: '💻',
    questions: [
      {
        text: 'A empresa possui sistema para dar suporte à gestão financeira, simplificando e automatizando tarefas operacionais?',
        hint: 'Exemplo: Sistema ERP para lidar com faturamento, contas a receber/pagar e cobrança, buscando simplificar e automatizar tarefas e ações operacionais.',
      },
      {
        text: 'As informações estão centralizadas e os processos dependem menos de pessoas e mais de sistemas?',
        hint: 'A centralização de dados evita retrabalho, perda de informações e garante que todos trabalhem com as mesmas informações atualizadas.',
      },
      {
        text: 'Há treinamento e suporte contínuo quanto ao uso do sistema de gestão e outras tecnologias?',
        hint: 'O suporte técnico e o treinamento contínuo garantem que a equipe use as ferramentas de forma eficiente e atualizada, maximizando o retorno do investimento.',
      },
      {
        text: 'Existe rotina ou processo para proteger e armazenar devidamente os dados da empresa?',
        hint: 'Inclui backup regular, controle de acesso, proteção contra ataques cibernéticos e políticas de segurança da informação para dados financeiros e operacionais.',
      },
      {
        text: 'A empresa possui equipamentos e infraestrutura suficientes para o bom funcionamento da gestão?',
        hint: 'Infraestrutura de TI adequada é fundamental para garantir a produtividade e a continuidade das operações sem interrupções por falhas técnicas.',
      },
      {
        text: 'A empresa utiliza sistemas integrados (ERP, CRM) que conectam as diferentes áreas do negócio?',
        hint: 'A integração entre sistemas evita duplicidade de informações, reduz erros manuais e melhora a eficiência operacional conectando financeiro, comercial e operações.',
      },
    ],
  },
  {
    id: 'contabil',
    name: 'Contábil',
    weight: 1,
    icon: '📊',
    questions: [
      {
        text: 'A empresa recebe mensalmente o balancete e DRE da contabilidade (até o dia 10 de cada mês)?',
        hint: 'Balancete e DRE mensais permitem acompanhar a saúde financeira e contábil da empresa com informações atualizadas para tomada de decisão.',
      },
      {
        text: 'Existe integração contábil com as atividades financeiras (faturamento, contas a receber, contas a pagar)?',
        hint: 'A integração contábil garante que as movimentações de débitos e créditos estejam automaticamente refletidas na contabilidade, eliminando lançamentos manuais.',
      },
      {
        text: 'Os documentos das movimentações (notas fiscais, recibos, comprovantes, contratos) estão organizados?',
        hint: 'Documentação organizada facilita auditorias, recuperação de informações e cumprimento de obrigações fiscais junto à Receita Federal.',
      },
      {
        text: 'É realizada reunião periódica com a contabilidade para identificar oportunidades e pontos de melhoria?',
        hint: 'Reuniões com o contador permitem identificar oportunidades de economia tributária, ajustes contábeis e melhorias na gestão financeira.',
      },
      {
        text: 'A contabilidade é utilizada como ferramenta de tomada de decisão e a empresa entende seus números?',
        hint: 'A contabilidade gerencial vai além das obrigações legais, sendo usada para análise de custos, rentabilidade e suporte às decisões estratégicas do negócio.',
      },
    ],
  },
  {
    id: 'fiscal',
    name: 'Fiscal',
    weight: 1,
    icon: '📋',
    questions: [
      {
        text: 'A empresa está enquadrada no melhor regime tributário e realizou estudo de planejamento tributário nos últimos 18 meses?',
        hint: 'Foi avaliado se é possível, de forma legal, reduzir a carga tributária da empresa? O regime tributário atual é o mais adequado para a atividade econômica?',
      },
      {
        text: 'Os impostos e taxas são pagos rigorosamente em dia?',
        hint: 'O pagamento pontual evita multas, juros e problemas com o Fisco, além de manter a regularidade fiscal e certidões negativas de débitos.',
      },
      {
        text: 'A empresa realiza apuração de 100% das suas vendas?',
        hint: 'A apuração fiscal completa garante que todos os impostos sejam calculados corretamente e que a empresa esteja em conformidade com a legislação tributária.',
      },
      {
        text: 'Existe integração fiscal (faturamento) com as atividades financeiras da empresa?',
        hint: 'A automação fiscal garante que o faturamento esteja conectado ao controle financeiro (contas a receber, cobrança, contas a pagar), evitando inconsistências.',
      },
      {
        text: 'A empresa conhece sua carga tributária real e os impactos nas decisões de precificação e resultado?',
        hint: 'Entender a carga tributária real permite precificar corretamente os produtos/serviços e tomar decisões financeiras mais precisas e lucrativas.',
      },
    ],
  },
  {
    id: 'capital_humano',
    name: 'Capital Humano',
    weight: 1.5,
    icon: '👥',
    questions: [
      {
        text: 'Funções e responsabilidades estão claramente definidas e documentadas para todos os colaboradores?',
        hint: 'Descrições de cargo claras evitam sobreposição de funções, reduzem conflitos e facilitam o processo de contratação e avaliação de desempenho.',
      },
      {
        text: 'Existe plano de cargos e salários formalizado, praticado e conhecido por todos os colaboradores?',
        hint: 'O plano está registrado, é praticado na empresa e é conhecido por todos os colaboradores nos seus respectivos níveis dentro da organização.',
      },
      {
        text: 'Existe algum plano de benefícios na empresa (saúde, odontológico, reembolsos, outros)?',
        hint: 'Benefícios bem estruturados contribuem para a atração, retenção e motivação dos colaboradores, reduzindo turnover e custos de recontratação.',
      },
      {
        text: 'A apuração e o recolhimento dos encargos sociais são realizados rigorosamente em dia?',
        hint: 'O cumprimento das obrigações trabalhistas evita passivos, multas e problemas legais com colaboradores, além de garantir regularidade junto ao eSocial.',
      },
      {
        text: 'Existe iniciativa de PLR (Participação nos Lucros e Resultados) ou modelo de remuneração estratégica?',
        hint: 'Existe alguma iniciativa para premiação através de PLR? Existe um Modelo de Remuneração Estratégica ou Participação nos Resultados que incentive a equipe?',
      },
      {
        text: 'Existe acompanhamento de desempenho com feedback periódico para todos os colaboradores?',
        hint: 'Avaliações de desempenho regulares permitem identificar talentos, necessidades de desenvolvimento e alinhar expectativas entre gestores e colaboradores.',
      },
      {
        text: 'A empresa funciona de forma eficaz mesmo sem a presença constante do gestor/dono?',
        hint: 'A dependência excessiva do dono é um risco operacional grave. Processos bem definidos e equipes capacitadas garantem a continuidade e o crescimento do negócio.',
      },
    ],
  },
  {
    id: 'planejamento',
    name: 'Planejamento',
    weight: 1.5,
    icon: '🎯',
    questions: [
      {
        text: 'A empresa possui planejamento anual com metas definidas, comunicadas e revisadas periodicamente?',
        hint: 'O planejamento anual deve incluir objetivos, metas mensuráveis, responsáveis e prazos para cada área do negócio, com revisões ao longo do ano.',
      },
      {
        text: 'A empresa promove inovação em suas operações e produtos/serviços?',
        hint: 'Isso pode incluir criação de novos serviços, novas fontes de receitas, desenvolvimento de processos mais eficientes e revisão do modelo de negócios.',
      },
      {
        text: 'Existe planejamento de médio e longo prazo para crescimento e expansão do negócio?',
        hint: 'Existe um planejamento construído de forma conjunta entre sócios e líderes, registrado num plano de ação que é acompanhado consistentemente ao longo do tempo.',
      },
      {
        text: 'As estratégias são revisadas anualmente e compartilhadas com todos os níveis da organização?',
        hint: 'As estratégias de curto, médio e longo prazo são construídas de forma estruturada e coletiva, aprovadas pelos sócios e desdobradas para toda a organização.',
      },
      {
        text: 'As decisões são baseadas em dados e indicadores confiáveis?',
        hint: 'Uma cultura de dados garante que as decisões sejam mais assertivas, reduzindo o risco de erros por intuição ou falta de informação atualizada.',
      },
    ],
  },
  {
    id: 'estoque',
    name: 'Estoque',
    weight: 1,
    icon: '📦',
    questions: [
      {
        text: 'Os itens de estoque estão catalogados de forma organizada com parâmetros definidos (estoque máximo, mínimo, ponto de pedido)?',
        hint: 'Os itens (mercadorias, matérias-primas, produtos próprios, consumo) devem estar catalogados com parâmetros como Estoque Máximo, Estoque de Segurança e Tempo de Suprimento.',
      },
      {
        text: 'Existe procedimento de conferência no recebimento das compras (padrões, prazos, preços, quantidades)?',
        hint: 'É conferido o pedido de compras autorizado junto com a nota fiscal do fornecedor, verificando condições, prazos, preços e quantidades solicitadas?',
      },
      {
        text: 'Todas as movimentações de estoque (entradas, saídas, transferências, estornos) são registradas imediatamente?',
        hint: 'O registro imediato das movimentações garante que o estoque virtual esteja sempre atualizado e reflita a realidade física, evitando divergências.',
      },
      {
        text: 'A empresa realiza contagem de inventário de maneira recorrente (pelo menos a cada 3 meses)?',
        hint: 'Inventários regulares garantem que o estoque contábil esteja alinhado com o estoque físico, evitando surpresas, perdas e problemas fiscais.',
      },
      {
        text: 'Os espaços físicos de armazenagem são adequados, organizados e sinalizados corretamente?',
        hint: 'O estoque está organizado de forma que os itens mais solicitados fiquem acessíveis? Itens de mesma categoria, família e grupo estão agrupados e sinalizados?',
      },
      {
        text: 'A empresa utiliza Curva ABC para acompanhar a movimentação dos itens por valor, margem e quantidade?',
        hint: 'Ferramentas de Curva ABC permitem identificar quais itens representam maior valor e impacto no negócio, otimizando o foco da gestão de estoque.',
      },
      {
        text: 'A empresa dimensiona periodicamente o valor financeiro que possui em estoque?',
        hint: 'Conhecer o valor financeiro do estoque é essencial para o controle do capital de giro, tomada de decisões de compra e avaliação do imobilizado.',
      },
      {
        text: 'Há controle de perdas, desperdícios e segurança para prevenção de fraudes e extravios?',
        hint: 'Existe controle de movimentação de itens em estoque para prevenir fraudes, desvios, erros de coleta e despacho? Itens danificados ou extraviados são registrados?',
      },
    ],
  },
  {
    id: 'compras',
    name: 'Compras',
    weight: 1,
    icon: '🛒',
    questions: [
      {
        text: 'A empresa possui processo bem definido de requisição, ordem de compras, cotação e pedido?',
        hint: 'Um processo de compras estruturado evita compras desnecessárias, garante rastreabilidade e melhora o controle de custos e a governança financeira.',
      },
      {
        text: 'A empresa realiza cotação com pelo menos 3 fornecedores e registra o processo em sistema?',
        hint: 'O processo de cotação de preços leva em consideração os impostos incidentes e outras regras fiscais que possam onerar ou beneficiar a empresa compradora.',
      },
      {
        text: 'A empresa acompanha os prazos estabelecidos pelos fornecedores e comunica os responsáveis?',
        hint: 'Rastrear as entregas permite agir proativamente em casos de atraso, garantindo que a produção ou as vendas não sejam impactadas por falta de insumos.',
      },
      {
        text: 'Existe centralização e responsabilidade clara sobre quem realiza as compras na empresa?',
        hint: 'Por exemplo, um setor ou profissional responsável com essa atribuição, evitando compras duplicadas, não autorizadas ou fora das condições negociadas.',
      },
      {
        text: 'Existem estudos sobre a evolução das necessidades de compra e o impacto financeiro no orçamento?',
        hint: 'O planejamento de compras permite antecipar necessidades, negociar melhores condições e evitar despesas emergenciais que comprometem o orçamento.',
      },
      {
        text: 'Há negociação estratégica com fornecedores buscando melhores condições de preço, prazo e qualidade?',
        hint: 'Parcerias estratégicas com fornecedores podem gerar vantagens competitivas: exclusividade, melhores preços, condições de pagamento e suporte técnico diferenciado.',
      },
    ],
  },
  {
    id: 'processos',
    name: 'Processos',
    weight: 1.3,
    icon: '⚙️',
    questions: [
      {
        text: 'Os processos estão documentados e existe padronização das rotinas operacionais?',
        hint: 'Processos documentados garantem que o conhecimento não fique concentrado em pessoas específicas e facilitam a melhoria contínua e a escalabilidade.',
      },
      {
        text: 'Novos colaboradores conseguem aprender os processos rapidamente com mínima dependência do gestor?',
        hint: 'Um bom processo de onboarding reduz o tempo de adaptação, minimiza erros e garante que a empresa opere com qualidade mesmo com novos membros.',
      },
      {
        text: 'A empresa funciona de forma eficaz mesmo sem o gestor presente?',
        hint: 'Processos bem definidos e equipes capacitadas garantem a continuidade das operações independentemente da presença do gestor ou dono.',
      },
      {
        text: 'Existe cultura de melhoria contínua dos processos com revisões e atualizações periódicas?',
        hint: 'A melhoria contínua garante que os processos se adaptem às mudanças do negócio e incorporem novas melhores práticas, mantendo a empresa competitiva.',
      },
    ],
  },
];

export const SCALE_LABELS: ScaleLabel[] = [
  { value: 0, label: 'Não Existe' },
  { value: 1, label: 'Existe (Mas Informalmente)' },
  { value: 2, label: 'Existe de Forma Básica' },
  { value: 3, label: 'Existe de Forma Padronizada' },
  { value: 4, label: 'Funciona Bem (Pode Melhorar)' },
  { value: 5, label: 'É Referência / Funciona Perfeitamente' },
];

export function isSectorComplete(sectorIndex: number, answers: AnswersMap, notApplicable?: NotApplicableMap): boolean {
  const sector = SECTORS[sectorIndex];
  if (notApplicable?.[sector.id]) return true;
  const sectorAnswers = answers[sector.id] || [];
  return sector.questions.every((_, index) => sectorAnswers[index] !== undefined);
}

export function calculateDiagnosticoResults(answers: AnswersMap, notApplicable?: NotApplicableMap): DiagnosticoResult {
  let totalWeightedScore = 0;
  let totalWeightedMax = 0;

  const sectorScores = SECTORS.map((sector) => {
    const isNA = notApplicable?.[sector.id] ?? false;

    if (isNA) {
      return { id: sector.id, name: sector.name, score: 0, maxScore: 0, percentage: 0, weight: sector.weight, icon: sector.icon, isNotApplicable: true };
    }

    const sectorAnswers = answers[sector.id] || [];
    const score = sectorAnswers.reduce((sum, value) => sum + (value || 0), 0);
    const maxScore = sector.questions.length * 5;
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    totalWeightedScore += score * sector.weight;
    totalWeightedMax += maxScore * sector.weight;

    return { id: sector.id, name: sector.name, score, maxScore, percentage, weight: sector.weight, icon: sector.icon, isNotApplicable: false };
  });

  const iee = totalWeightedMax > 0 ? Math.round((totalWeightedScore / totalWeightedMax) * 100) : 0;
  const applicable = sectorScores.filter((s) => !s.isNotApplicable);
  const critical = [...applicable].sort((a, b) => a.percentage - b.percentage).slice(0, 3);
  const strong = [...applicable].sort((a, b) => b.percentage - a.percentage).slice(0, 3);

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
