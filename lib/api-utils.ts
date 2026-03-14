export function createRateLimiter(max: number, windowMs: number) {
    const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

    return function isRateLimited(ip: string): boolean {
        const now = Date.now();
        const entry = rateLimitMap.get(ip);

        if (!entry || now > entry.resetAt) {
            rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
            return false;
        }

        entry.count++;
        return entry.count > max;
    };
}

export function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateWhatsApp(phone: string): boolean {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 13;
}

export function sanitize(str: string, maxLen = 200): string {
    return str.trim().slice(0, maxLen);
}
