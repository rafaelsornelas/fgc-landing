'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    const socialLinks = [
        {
            icon: Instagram,
            href: "https://www.instagram.com/fgcexpertise",
            label: "Instagram"
        },
        {
            icon: Facebook,
            href: "https://www.facebook.com/fgcexpertise",
            label: "Facebook"
        },
        {
            icon: Linkedin,
            href: "https://www.linkedin.com/company/105539965",
            label: "LinkedIn"
        }
    ];

    return (
        <footer className="bg-slate-950 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Main Footer */}
                <div className="py-16 border-b border-slate-800">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Brand */}
                        <div className="lg:col-span-2">
                            {/* Logo */}
                            <div className="mb-6">
                                <img
                                    src="/logo-fgc.png"
                                    alt="FGC Expertise Logo"
                                    className="h-auto w-40 object-contain brightness-0 invert"
                                />

                            </div>

                            <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
                                Transformando a gestão de negócios com consultoria personalizada 360º.
                                Mais de 20 anos de experiência para ajudar você a crescer de forma sustentável.
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-amber-500 flex items-center justify-center transition-colors group"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-white font-semibold mb-6">Links Rápidos</h4>
                            <ul className="space-y-3">
                                {['Diagnóstico Gratuito', 'Nossos Serviços', 'Sobre a FGC', 'Contato'].map((link, index) => (
                                    <li key={index}>
                                        <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-white font-semibold mb-6">Contato</h4>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-slate-400">
                                    <Mail className="w-5 h-5 text-amber-500" />
                                    <span>contato@fgcexpertise.com</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-400">
                                    <Phone className="w-5 h-5 text-amber-500" />
                                    <span>(11) 99999-9999</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-slate-500 text-sm">
                        <p>Foco Gestão Corporativa LTDA</p>
                        <p>CNPJ: 57.965.476/0001-84</p>
                    </div>
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} FGC Expertise. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}