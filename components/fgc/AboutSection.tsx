'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function AboutSection() {
    const credentials = [
        { icon: GraduationCap, text: "Comunicação Social & Relações Públicas" },
        { icon: Award, text: "MBA em Gestão e Desenvolvimento de Pessoas" },
        { icon: Award, text: "Especialização em Marketing e Mídias Digitais" },
        { icon: Briefcase, text: "20+ anos de experiência corporativa" }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-amber-600 font-medium text-sm tracking-wider uppercase mb-4 block">
                            Sobre a FGC
                        </span>

                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            Transformar desafios em{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                                oportunidades
                            </span>{' '}
                            é a nossa essência
                        </h2>

                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            A <strong className="text-slate-900">FGC</strong> nasceu em 2024 da visão de{' '}
                            <strong className="text-slate-900">Aline Oliveira</strong>, uma profissional com mais de duas décadas
                            de experiência nas áreas corporativa, financeira e comercial.
                        </p>

                        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                            Identificando a necessidade do mercado por uma consultoria verdadeiramente
                            360º especializada em clínicas e consultórios, Aline criou a FGC para
                            oferecer soluções personalizadas que realmente transformam negócios.
                        </p>

                        {/* Credentials */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-10">
                            {credentials.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                                        <item.icon className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <span className="text-sm text-slate-700 font-medium">{item.text}</span>
                                </motion.div>
                            ))}
                        </div>

                        <Button
                            className="h-14 px-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold rounded-xl group"
                            onClick={() => window.open('https://chat.rafaelornelas.cloud/fgcexpertise', '_blank')}
                        >
                            Construa seu planejamento agora
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>

                    {/* Right - Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative">
                            {/* Background Shape */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-amber-100 to-amber-50 rounded-3xl transform rotate-3" />

                            {/* Main Image */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                                    alt="Aline Oliveira - FGC"
                                    className="w-full h-[600px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                            </div>

                            {/* Experience Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="absolute -bottom-6 -left-6 bg-slate-900 text-white rounded-2xl p-6 shadow-xl"
                            >
                                <div className="text-4xl font-bold text-amber-500">20+</div>
                                <div className="text-sm text-slate-300">Anos de experiência</div>
                            </motion.div>

                            {/* Expertise Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-sm font-medium text-slate-700">Coaching Empresarial</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}