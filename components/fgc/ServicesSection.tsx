'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
    Target,
    BarChart3,
    Cpu,
    TrendingUp,
    Users,
    ArrowUpRight
} from 'lucide-react';

export default function ServicesSection() {
    const services = [
        {
            icon: Target,
            title: "Diagnóstico Estratégico",
            description: "Analisamos profundamente sua clínica ou consultório para identificar pontos fortes, áreas de melhoria e oportunidades únicas.",
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: BarChart3,
            title: "Planejamento 360º",
            description: "Desenvolvemos estratégias sob medida, alinhadas aos seus objetivos, garantindo impacto direto no crescimento.",
            color: "from-amber-500 to-amber-600"
        },
        {
            icon: Cpu,
            title: "Tecnologias Inovadoras",
            description: "Implementamos soluções tecnológicas avançadas para otimizar processos e aumentar a produtividade.",
            color: "from-purple-500 to-purple-600"
        },
        {
            icon: TrendingUp,
            title: "Gestão Comercial",
            description: "Monitoramos resultados e ajustamos estratégias para que seu negócio atinja objetivos de forma sustentável.",
            color: "from-green-500 to-green-600"
        },
        {
            icon: Users,
            title: "Capacitação de Equipes",
            description: "Treinamentos estratégicos para que sua equipe esteja alinhada e preparada para a excelência.",
            color: "from-rose-500 to-rose-600"
        }
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.05),transparent_50%)]" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="text-amber-600 font-medium text-sm tracking-wider uppercase mb-4 block">
                        Nossos Serviços
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Quer levar sua empresa para o{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                            próximo nível?
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600">
                        Oferecemos soluções completas para transformar a gestão do seu negócio
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="h-full bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 relative overflow-hidden">
                                {/* Gradient Overlay on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <service.icon className="w-7 h-7 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Arrow */}
                                <div className="mt-6 flex items-center text-amber-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-sm">Saiba mais</span>
                                    <ArrowUpRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}