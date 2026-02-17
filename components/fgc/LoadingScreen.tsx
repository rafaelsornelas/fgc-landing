'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hide after page has loaded
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[100] bg-gradient-to-br from-[#211A60] to-slate-950 flex flex-col items-center justify-center"
                >
                    {/* Logo */}
                    <motion.img
                        src="/logo-fgc.png"
                        alt="FGC Expertise"
                        className="w-32 md:w-40 mb-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    />

                    {/* Loading bar */}
                    <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.2, ease: 'easeInOut' }}
                        />
                    </div>

                    {/* Tagline */}
                    <motion.p
                        className="mt-6 text-slate-500 text-sm tracking-wider"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Consultoria Empresarial 360º
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
