import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 1000;

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
        return false;
    }

    entry.count++;
    return entry.count > RATE_LIMIT_MAX;
}

function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateWhatsApp(phone: string): boolean {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 13;
}

function sanitize(str: string): string {
    return str.trim().slice(0, 200);
}

export async function POST(request: Request) {
    try {
        // Rate limiting
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Muitas requisições. Tente novamente em instantes.' },
                { status: 429 }
            );
        }

        const data = await request.json();

        // Validate required fields
        const name = typeof data.name === 'string' ? sanitize(data.name) : '';
        const email = typeof data.email === 'string' ? sanitize(data.email) : '';
        const whatsapp = typeof data.whatsapp === 'string' ? sanitize(data.whatsapp) : '';
        const empresa = typeof data.empresa === 'string' ? sanitize(data.empresa) : '';

        if (!name || name.length < 2) {
            return NextResponse.json({ error: 'Nome inválido' }, { status: 400 });
        }
        if (!email || !validateEmail(email)) {
            return NextResponse.json({ error: 'E-mail inválido' }, { status: 400 });
        }
        if (!whatsapp || !validateWhatsApp(whatsapp)) {
            return NextResponse.json({ error: 'WhatsApp inválido' }, { status: 400 });
        }
        if (!empresa || empresa.length < 2) {
            return NextResponse.json({ error: 'Nome da empresa inválido' }, { status: 400 });
        }

        // Validate diagnostic data
        const iee = typeof data.iee === 'number' ? data.iee : 0;
        const nivel = typeof data.nivel === 'string' ? sanitize(data.nivel) : '';
        const respostas = typeof data.respostas === 'object' ? data.respostas : {};
        const setores_criticos = typeof data.setores_criticos === 'string' ? data.setores_criticos : '';
        const setores_fortes = typeof data.setores_fortes === 'string' ? data.setores_fortes : '';
        const detalhes = typeof data.detalhes === 'string' ? data.detalhes : '';

        // 1. Save to PocketBase
        const pbUrl = process.env.POCKETBASE_URL;
        if (pbUrl) {
            try {
                const pb = new PocketBase(pbUrl);
                await pb.collection('diagnosticos').create({
                    nome: name,
                    email,
                    whatsapp,
                    empresa,
                    iee,
                    nivel,
                    respostas,
                    setores_criticos,
                    setores_fortes,
                    detalhes,
                });
                console.log('✅ Diagnóstico salvo no PocketBase');
            } catch (pbError) {
                console.error('❌ Erro ao salvar no PocketBase:', pbError);
                // Don't fail the request if PocketBase save fails
                // The webhook will still fire below
            }
        } else {
            console.warn('⚠️ POCKETBASE_URL não configurada, pulando salvamento no banco');
        }

        // 2. Send to n8n webhook (existing behavior)
        try {
            const response = await fetch('https://n8n.rafaelornelas.cloud/webhook/contato-fgc', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'diagnostico',
                    name,
                    email,
                    whatsapp,
                    empresa,
                    iee,
                    nivel,
                    setores_criticos,
                    setores_fortes,
                    detalhes,
                    origem: 'Diagnóstico Empresarial - Landing Page FGC',
                    data: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                console.error('Webhook error:', response.status);
            }
        } catch (webhookError) {
            console.error('Erro no webhook:', webhookError);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Diagnostico API error:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}
