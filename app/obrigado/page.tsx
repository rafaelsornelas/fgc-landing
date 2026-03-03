'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export default function ObrigadoPage() {
    useEffect(() => {
        // Dispara evento de conversão no Google Analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'conversion', {
                event_category: 'Diagnóstico',
                event_label: 'Formulário Enviado',
                value: 1,
            });
        }
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #211A60 0%, #3730a3 100%)',
            padding: '40px 20px',
            textAlign: 'center',
        }}>
            {/* Ícone de sucesso */}
            <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'rgba(16,185,129,0.2)',
                border: '3px solid #10b981',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 32, fontSize: '2.5rem',
            }}>
                ✅
            </div>

            <h1 style={{ color: '#fff', fontSize: '2.2rem', margin: '0 0 16px', fontWeight: 800 }}>
                Diagnóstico recebido!
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', maxWidth: 500, margin: '0 0 40px', lineHeight: 1.7 }}>
                Obrigado por compartilhar as informações da sua empresa.
                Nossa equipe analisará o diagnóstico e entrará em contato em breve.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 360, alignItems: 'center' }}>
                <a
                    href="https://wa.me/5531998760724?text=Ol%C3%A1%2C%20acabei%20de%20preencher%20o%20diagn%C3%B3stico%20da%20FGC%20Expertise%20e%20gostaria%20de%20conversar!"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                        width: '100%', padding: '16px 24px', borderRadius: 12,
                        background: '#25d366', color: '#fff',
                        fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
                        transition: 'opacity 0.2s',
                    }}
                >
                    💬 Falar pelo WhatsApp agora
                </a>

                <Link
                    href="/"
                    style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '100%', padding: '14px 24px', borderRadius: 12,
                        background: 'rgba(255,255,255,0.1)', color: '#fff',
                        fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none',
                        border: '1px solid rgba(255,255,255,0.2)',
                        transition: 'background 0.2s',
                    }}
                >
                    ← Voltar ao site
                </Link>
            </div>

            {/* Logo */}
            <div style={{ marginTop: 60, opacity: 0.5 }}>
                <img src="/logo-fgc.png" alt="FGC Expertise" style={{ height: 40, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
        </div>
    );
}
