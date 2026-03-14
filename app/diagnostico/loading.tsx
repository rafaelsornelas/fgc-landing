import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#111827] to-[#0a0e1a] flex items-center justify-center px-6">
            <div className="text-center">
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto mb-4" />
                <p className="text-sm text-slate-400">Carregando diagnóstico...</p>
            </div>
        </div>
    );
}
