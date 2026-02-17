'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('fgc-cookie-consent');
        if (!consent) {
            // Show after a short delay so it doesn't compete with initial load
            const timer = setTimeout(() => setVisible(true), 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('fgc-cookie-consent', 'accepted');
        setVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('fgc-cookie-consent', 'declined');
        setVisible(false);
        // Optionally disable analytics here
        if (typeof window !== 'undefined') {
            (window as any)['ga-disable-G-JCH294WZL4'] = true;
        }
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl shadow-black/20">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            {/* Icon + Text */}
                            <div className="flex items-start gap-3 flex-1">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Cookie className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-medium mb-1">
                                        Utilizamos cookies 🍪
                                    </p>
                                    <p className="text-slate-400 text-xs leading-relaxed">
                                        Este site utiliza cookies e tecnologias semelhantes para melhorar sua experiência,
                                        analisar o tráfego e personalizar conteúdo. Ao continuar navegando, você concorda
                                        com nossa{' '}
                                        <a
                                            href="/politica-de-privacidade"
                                            className="text-amber-400 hover:text-amber-300 underline underline-offset-2"
                                        >
                                            Política de Privacidade
                                        </a>.
                                    </p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <button
                                    onClick={handleDecline}
                                    className="flex-1 md:flex-none px-5 py-2.5 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded-xl transition-colors"
                                >
                                    Recusar
                                </button>
                                <Button
                                    onClick={handleAccept}
                                    className="flex-1 md:flex-none px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold rounded-xl text-sm"
                                >
                                    Aceitar cookies
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
