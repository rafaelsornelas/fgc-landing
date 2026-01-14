'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Rocket, Building2 } from 'lucide-react';

export default function MethodSection() {
    const methodSteps = [
        {
            icon: Lightbulb,
            title: "Descubra Novas Oportunidades",
            description: "Aumente sua receita e otimize processos internos.",
            gradient: "from-amber-400 to-orange-500"
        },
        {
            icon: Rocket,
            title: "Plano de Expansão Sustentável",
            description: "Desenvolva uma estratégia de longo prazo para crescimento sólido.",
            gradient: "from-blue-400 to-indigo-500"
        },
        {
            icon: Building2,
            title: "Cultura Organizacional Sólida",
            description: "Capacite líderes para fortalecer o desempenho da equipe.",
            gradient: "from-green-400 to-emerald-500"
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="text-amber-500 font-medium text-sm tracking-wider uppercase mb-4 block">
                        Método Exclusivo
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        O <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Método FGC</span> é o passo que faltava
                    </h2>
                    <p className="text-xl text-slate-400">
                        Estruture sua gestão e destrave o crescimento do seu negócio
                    </p>
                </motion.div>

                {/* Method Steps */}
                <div className="grid md:grid-cols-3 gap-8">
                    {methodSteps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="relative group"
                        >
                            {/* Connection Line */}
                            {index < methodSteps.length - 1 && (
                                <div className="hidden md:block absolute top-16 left-full w-full h-px bg-gradient-to-r from-slate-700 to-transparent z-0" />
                            )}

                            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:border-amber-500/30 transition-all duration-500 h-full">
                                {/* Step Number */}
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center">
                                    <span className="text-amber-500 font-bold">{String(index + 1).padStart(2, '0')}</span>
                                </div>

                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <step.icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-slate-400 mb-6">
                        Pronto para transformar sua gestão?
                    </p>
                    <div className="inline-flex items-center gap-2 text-amber-500 font-medium hover:text-amber-400 transition-colors cursor-pointer">
                        <span>Agende sua consultoria gratuita</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}