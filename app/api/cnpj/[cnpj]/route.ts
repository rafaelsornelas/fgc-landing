import { NextResponse } from 'next/server';

type CnpjData = {
  razao_social?: string;
  nome_fantasia?: string;
  descricao_situacao_cadastral?: string;
  situacao_cadastral?: string;
  cnae_fiscal_descricao?: string;
  municipio?: string;
  uf?: string;
  [key: string]: unknown;
};

async function fetchFromMinhaReceita(cnpj: string): Promise<CnpjData> {
  const response = await fetch(`https://minhareceita.org/${cnpj}`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`MinhaReceita: ${response.status}`);
  const data = await response.json() as CnpjData;
  // Normaliza campo de situação cadastral
  if (data.situacao_cadastral && !data.descricao_situacao_cadastral) {
    data.descricao_situacao_cadastral = String(data.situacao_cadastral);
  }
  return data;
}

async function fetchFromBrasilAPI(cnpj: string): Promise<CnpjData> {
  const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(8000),
  });
  if (response.status === 429) throw new Error('rate_limit');
  if (!response.ok) throw new Error(`BrasilAPI: ${response.status}`);
  return response.json() as Promise<CnpjData>;
}

export async function GET(_request: Request, { params }: { params: Promise<{ cnpj: string }> }) {
  const { cnpj } = await params;
  const digits = cnpj.replace(/\D/g, '');

  if (digits.length !== 14) {
    return NextResponse.json({ error: 'CNPJ deve ter 14 dígitos' }, { status: 400 });
  }

  // Tenta Minha Receita primeiro, fallback para BrasilAPI
  const apis = [
    { name: 'MinhaReceita', fn: () => fetchFromMinhaReceita(digits) },
    { name: 'BrasilAPI', fn: () => fetchFromBrasilAPI(digits) },
  ];

  for (const api of apis) {
    try {
      const data = await api.fn();
      return NextResponse.json(data, {
        headers: { 'Cache-Control': 'public, max-age=86400' }, // cache 24h
      });
    } catch (err) {
      console.warn(`[CNPJ] ${api.name} falhou:`, err instanceof Error ? err.message : err);
    }
  }

  return NextResponse.json(
    { error: 'CNPJ não encontrado. Verifique o número e tente novamente.' },
    { status: 404 }
  );
}
