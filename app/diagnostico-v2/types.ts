export type InterpretationLevel = 'saudavel' | 'risco' | 'vulneravel';

export type Question = {
  text: string;
  hint?: string;
};

export type SectorDefinition = {
  id: string;
  name: string;
  weight: number;
  icon: string;
  questions: Question[];
};

export type ScaleLabel = {
  value: number;
  label: string;
};

export type SectorScore = {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  weight: number;
  icon: string;
  isNotApplicable?: boolean;
};

export type DiagnosticoResult = {
  iee: number;
  sectorScores: SectorScore[];
  critical: SectorScore[];
  strong: SectorScore[];
};

export type Interpretation = {
  level: InterpretationLevel;
  title: string;
  color: string;
  text: string;
};

export type ContactData = {
  name: string;
  email: string;
  whatsapp: string;
  empresa: string;
};

export type CompanyData = {
  cargo: string;
  cnpj: string;
  colaboradores: string;
  faturamento: string;
  tempo_mercado: string;
};

export type DiagnosticoFormData = ContactData & CompanyData;

export type AnswersMap = Record<string, number[]>;
export type NotesMap = Record<string, string>;
export type NotApplicableMap = Record<string, boolean>;
