import { NextResponse } from 'next/server';
import { createRateLimiter, sanitize, validateEmail, validateWhatsApp } from '../../../lib/api-utils';

const RATE_LIMIT_MAX = 5; // max requests
const RATE_LIMIT_WINDOW = 60 * 1000; // per 1 minute
const isRateLimited = createRateLimiter(RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);

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