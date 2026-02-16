'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const navLinks = [
    { label: 'Início', href: '#hero' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Método', href: '#metodo' },
    { label: 'Contato', href: '#contato' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? 'bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-slate-800/50'
                        : 'bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <a
                            href="#hero"
                            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
                            className="flex-shrink-0"
                        >
                            <img
                                src="/logo-fgc.png"
                                alt="FGC Expertise"
                                className="h-10 lg:h-12 w-auto object-contain"
                            />
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                    className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <Button
                                className="h-10 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold rounded-xl text-sm group"
                                onClick={() => handleNavClick('#hero')}
                            >
                                Diagnóstico Gratuito
                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
                            aria-label="Menu"
                        >
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-slate-900/98 backdrop-blur-xl pt-20 lg:hidden"
                    >
                        <div className="container mx-auto px-6 py-8">
                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                        className="text-2xl font-medium text-slate-300 hover:text-amber-400 transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <Button
                                    className="h-14 mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold rounded-xl text-lg group"
                                    onClick={() => handleNavClick('#hero')}
                                >
                                    Diagnóstico Gratuito
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
