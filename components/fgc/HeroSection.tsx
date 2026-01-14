'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';

export default function HeroSection() {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    // URL do Webhook (Use a de TESTE para debugar, depois troque pela de PRODUÇÃO tirando o "-test")
    const WEBHOOK_URL = 'https://n8n.rafaelornelas.cloud/webhook/contato-fgc';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    origem: 'Landing Page FGC',
                    data: new Date().toISOString()
                }),
            });

            if (response.ok) {
                setStatus('success');
                // Limpa o formulário
                setFormData({ name: '', email: '' });
                // Reseta o status após 5 segundos para permitir novo envio
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                throw new Error('Falha no envio');
            }
        } catch (error) {
            console.error('Erro ao enviar:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/20 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 py-20 lg:py-0">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm mb-8"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Consultoria Empresarial 360º</span>
                        </motion.div>

                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {/* IMAGEM DA LOGO AQUI - Certifique-se de que o arquivo existe em public/ */}
                            <img
                                src="/logo-fgc.png"
                                alt="FGC Expertise Logo"
                                className="h-auto w-48 md:w-64 object-contain"
                            />
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            Transforme a gestão do seu{' '}
                            <span className="relative">
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                                    negócio
                                </span>
                                <motion.span
                                    className="absolute bottom-2 left-0 w-full h-3 bg-amber-500/20 -z-0"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ delay: 0.8, duration: 0.6 }}
                                />
                            </span>
                        </h1>

                        <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-lg">
                            Consultoria personalizada para estruturar processos,
                            aumentar produtividade e liberar você para crescer.
                        </p>

                        <div className="flex gap-12">
                            {[
                                { value: '20+', label: 'Anos de experiência' },
                                { value: '360º', label: 'Visão completa' },
                                { value: '100%', label: 'Personalizado' }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                >
                                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                                    <div className="text-sm text-slate-500">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:justify-self-end w-full max-w-md"
                    >
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-3xl blur-xl" />

                            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        Diagnóstico Gratuito
                                    </h3>
                                    <p className="text-slate-400">
                                        Descubra como transformar sua gestão
                                    </p>
                                </div>

                                {status === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-8"
                                    >
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                                            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-2">Solicitação Enviada!</h4>
                                        <p className="text-slate-400 text-sm">Em breve entraremos em contato.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-2">Nome completo</label>
                                            <Input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-12 rounded-xl focus:border-amber-500 focus:ring-amber-500/20"
                                                placeholder="Seu nome"
                                                disabled={status === 'loading'}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-2">E-mail</label>
                                            <Input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-12 rounded-xl focus:border-amber-500 focus:ring-amber-500/20"
                                                placeholder="seu@email.com"
                                                disabled={status === 'loading'}
                                            />
                                        </div>

                                        {status === 'error' && (
                                            <p className="text-red-400 text-sm text-center">Erro ao enviar. Tente novamente.</p>
                                        )}

                                        <Button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full h-12 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold rounded-xl transition-all duration-300 group"
                                        >
                                            {status === 'loading' ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 className="w-4 h-4 animate-spin" /> Enviando...
                                                </span>
                                            ) : (
                                                <>
                                                    Quero meu diagnóstico
                                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}

                                <p className="text-center text-xs text-slate-500 mt-6">
                                    Seus dados estão seguros conosco
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-6 h-10 rounded-full border-2 border-slate-700 flex justify-center pt-2">
                    <div className="w-1 h-2 bg-amber-500 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}