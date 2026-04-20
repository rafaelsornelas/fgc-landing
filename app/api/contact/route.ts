import { NextResponse } from 'next/server';
import { createRateLimiter, sanitize, validateEmail, validateWhatsApp } from '../../../lib/api-utils';

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 1000;
const checkRateLimit = createRateLimiter(RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);

export async function POST(request: Request) {
    try {
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

        const rl = checkRateLimit(ip);
        if (rl.limited) {
            return NextResponse.json(
                { error: 'Muitas requisições. Tente novamente em instantes.' },
                { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } }
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