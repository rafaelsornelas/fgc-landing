interface RateLimitEntry {
    count: number;
    resetAt: number;
    blockedUntil?: number;
}

export function createRateLimiter(
    max: number,
    windowMs: number,
    blockDurationMs = windowMs
) {
    const store = new Map<string, RateLimitEntry>();

    setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of store) {
            if (now > entry.resetAt && (!entry.blockedUntil || now > entry.blockedUntil)) {
                store.delete(key);
            }
        }
    }, windowMs * 2);

    return function check(ip: string): { limited: boolean; retryAfter?: number } {
        const now = Date.now();
        const entry = store.get(ip);

        if (entry?.blockedUntil && now < entry.blockedUntil) {
            return { limited: true, retryAfter: Math.ceil((entry.blockedUntil - now) / 1000) };
        }

        if (!entry || now > entry.resetAt) {
            store.set(ip, { count: 1, resetAt: now + windowMs });
            return { limited: false };
        }

        entry.count++;

        if (entry.count > max) {
            entry.blockedUntil = now + blockDurationMs;
            return { limited: true, retryAfter: Math.ceil(blockDurationMs / 1000) };
        }

        return { limited: false };
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
