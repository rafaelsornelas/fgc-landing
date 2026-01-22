'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function CTASection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-slate-50" />

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
                            <div className="absolute -inset-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl transform -rotate-3" />
                            <div className="relative rounded-3xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                                    alt="Equipe de consultoria"
                                    className="w-full h-[500px] object-cover"
                                />
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-slate-900">Diagnóstico</div>
                                        <div className="text-xs text-green-600">100% Gratuito</div>
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
                            Dê o primeiro passo
                        </span>

                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            Seu negócio{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                                está travado
                            </span>{' '}
                            e você não sabe por onde começar?
                        </h2>

                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Nossa equipe faz um diagnóstico direto e estratégico para identificar os
                            principais gargalos da sua gestão – e te mostra por onde agir primeiro.
                        </p>

                        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                            <strong className="text-slate-900">Agende sua análise gratuita</strong> e dê o primeiro
                            passo rumo à profissionalização do seu negócio.
                        </p>

                        {/* Benefits */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            {[
                                "Sem compromisso",
                                "100% personalizado",
                                "Resultados rápidos",
                                "Equipe especializada"
                            ].map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-slate-700 font-medium">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>

                        <Button
                            className="h-14 px-10 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold text-lg rounded-xl group shadow-lg shadow-amber-500/25"
                            onClick={() => window.open('https://chat.rafaelornelas.cloud/fgcexpertise', '_blank')}
                        >
                            Quero meu diagnóstico gratuito
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}