import { NextResponse } from 'next/server';

// Simple in-memory rate limiter (resets on server restart, which is fine for edge/serverless)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5; // max requests
const RATE_LIMIT_WINDOW = 60 * 1000; // per 1 minute

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
    // Accept Brazilian phone formats: (XX) XXXXX-XXXX, XXXXXXXXXXX, +55XXXXXXXXXXX, etc.
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 13;
}

function sanitize(str: string): string {
    return str.trim().slice(0, 200); // limit length and trim whitespace
}

export async function POST(request: Request) {
    try {
        // Rate limiting by IP
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

        if (!name || name.length < 2) {
            return NextResponse.json({ error: 'Nome inválido' }, { status: 400 });
        }

        if (!email || !validateEmail(email)) {
            return NextResponse.json({ error: 'E-mail inválido' }, { status: 400 });
        }

        if (!whatsapp || !validateWhatsApp(whatsapp)) {
            return NextResponse.json({ error: 'WhatsApp inválido' }, { status: 400 });
        }

        // Send only validated/sanitized data to webhook
        const response = await fetch('https://n8n.rafaelornelas.cloud/webhook/contato-fgc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                whatsapp,
                origem: 'Landing Page FGC',
                data: new Date().toISOString(),
            }),
        });

        if (!response.ok) {
            console.error('Webhook error:', response.status);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}