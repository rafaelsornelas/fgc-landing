'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function PainPointsSection() {
    const painPoints = [
        "Sente que falta organização interna",
        "Está sobrecarregado e quer delegar com segurança",
        "Quer crescer, mas sente que a operação trava"
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-100 rounded-full -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative">
                            {/* Main Image Container */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                                    alt="Gestão empresarial"
                                    className="w-full h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                            </div>

                            {/* Floating Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 max-w-xs"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">📊</span>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900">360º</div>
                                        <div className="text-sm text-slate-500">Planejamento completo</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-amber-600 font-medium text-sm tracking-wider uppercase mb-4 block">
                            Identificamos seu problema
                        </span>

                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            Sua empresa{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                                está travada
                            </span>{' '}
                            e você não sabe o que fazer?
                        </h2>

                        <p className="text-lg text-slate-600 mb-10">
                            Você não está sozinho. Muitos empresários enfrentam os mesmos desafios.
                            A boa notícia é que existe um caminho claro para destravar seu crescimento.
                        </p>

                        {/* Pain Points */}
                        <div className="space-y-4 mb-10">
                            {painPoints.map((point, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-4 p-4 bg-red-50 border border-red-100 rounded-xl"
                                >
                                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                                    <span className="text-slate-700 font-medium">{point}</span>
                                </motion.div>
                            ))}
                        </div>

                        <Button
                            className="h-14 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-xl group"
                            onClick={() => window.open('https://chat.rafaelornelas.cloud/fgcexpertise', '_blank')}
                        >
                            Quero meu planejamento 360º
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}