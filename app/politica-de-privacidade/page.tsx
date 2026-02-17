import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Política de Privacidade | FGC Expertise',
    description: 'Política de Privacidade da FGC Expertise — Consultoria Empresarial e Financeira.',
};

export default function PoliticaDePrivacidade() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#211A60] to-slate-950 py-20">
                <div className="container mx-auto px-6 lg:px-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-sm mb-8"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Voltar ao site
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Política de Privacidade
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Última atualização: {new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 lg:px-12 py-16 max-w-4xl">
                <div className="prose prose-slate prose-lg max-w-none">
                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Introdução</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        A <strong>Foco Gestão Corporativa LTDA</strong> (&ldquo;FGC Expertise&rdquo;), inscrita no CNPJ 57.965.476/0001-84,
                        está comprometida em proteger a privacidade dos seus dados pessoais, em conformidade com a
                        Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Dados que Coletamos</h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                        Ao utilizar nosso site, podemos coletar os seguintes dados:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
                        <li><strong>Dados pessoais fornecidos:</strong> Nome, e-mail e WhatsApp, quando preenchidos no formulário de contato.</li>
                        <li><strong>Dados de navegação:</strong> Informações sobre seu dispositivo, navegador, páginas visitadas e tempo de permanência, coletados automaticamente via cookies e ferramentas de análise.</li>
                        <li><strong>Dados de interação:</strong> Cliques, scroll e interações com elementos do site, coletados via Microsoft Clarity.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Como Utilizamos seus Dados</h2>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
                        <li>Responder às solicitações de contato e diagnóstico gratuito.</li>
                        <li>Enviar comunicações relacionadas aos nossos serviços (com seu consentimento).</li>
                        <li>Melhorar a experiência de navegação e otimizar nosso site.</li>
                        <li>Realizar análises estatísticas sobre o uso do site.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Cookies e Tecnologias</h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                        Utilizamos as seguintes tecnologias de rastreamento:
                    </p>
                    <div className="bg-slate-50 rounded-xl p-6 mb-6">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="text-left py-2 text-slate-900 font-semibold">Ferramenta</th>
                                    <th className="text-left py-2 text-slate-900 font-semibold">Finalidade</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-600">
                                <tr className="border-b border-slate-100">
                                    <td className="py-2">Google Analytics 4</td>
                                    <td className="py-2">Análise de tráfego e comportamento dos visitantes</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <td className="py-2">Microsoft Clarity</td>
                                    <td className="py-2">Mapas de calor e gravação de sessões (anonimizadas)</td>
                                </tr>
                                <tr>
                                    <td className="py-2">Typebot</td>
                                    <td className="py-2">Chatbot para atendimento automatizado</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        Você pode gerenciar suas preferências de cookies a qualquer momento através do banner de consentimento
                        exibido no site, ou configurando diretamente seu navegador.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Compartilhamento de Dados</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        Seus dados pessoais <strong>não são vendidos</strong> a terceiros. Podemos compartilhar informações
                        apenas com parceiros tecnológicos necessários para a operação do site (Google, Microsoft),
                        sempre em conformidade com a LGPD.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Seus Direitos (LGPD)</h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                        Conforme a LGPD, você tem direito a:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
                        <li>Confirmar a existência de tratamento de dados.</li>
                        <li>Acessar seus dados pessoais.</li>
                        <li>Corrigir dados incompletos ou desatualizados.</li>
                        <li>Solicitar a anonimização, bloqueio ou eliminação de dados.</li>
                        <li>Revogar o consentimento a qualquer momento.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. Segurança dos Dados</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais
                        contra acessos não autorizados, perda ou destruição.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">8. Contato</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        Para exercer seus direitos ou tirar dúvidas sobre esta política, entre em contato:
                    </p>
                    <div className="bg-amber-50 rounded-xl p-6 mb-6">
                        <p className="text-slate-700 font-medium">Foco Gestão Corporativa LTDA</p>
                        <p className="text-slate-600">E-mail: comercial@focogestaocorporativa.com</p>
                        <p className="text-slate-600">Telefone: (31) 99876-0724</p>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">9. Alterações</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        Esta política pode ser atualizada periodicamente. Recomendamos que visite esta página
                        regularmente para se manter informado sobre como protegemos seus dados.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 py-8 border-t border-slate-200">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} FGC Expertise. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </div>
    );
}
