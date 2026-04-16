import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Diagnóstico Empresarial Profissional | FGC Expertise',
    description: 'Descubra o Índice de Eficiência da sua empresa. Diagnóstico completo com análise de 13 setores estratégicos e mais de 80 pontos de avaliação.',
};

export default function DiagnosticoV2Layout({ children }: { children: React.ReactNode }) {
    return children;
}
