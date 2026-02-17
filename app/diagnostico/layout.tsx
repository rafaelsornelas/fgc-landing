import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Diagnóstico Empresarial Gratuito | FGC Expertise',
    description: 'Descubra o Índice de Eficiência da sua empresa em 10 minutos. Diagnóstico inteligente com análise de 12 setores estratégicos.',
};

export default function DiagnosticoLayout({ children }: { children: React.ReactNode }) {
    return children;
}
