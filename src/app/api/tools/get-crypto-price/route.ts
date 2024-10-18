import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto price');
    }

    const data = await response.json();

    if (!data[symbol.toLowerCase()]) {
      return NextResponse.json({ error: 'Cryptocurrency not found' }, { status: 404 });
    }

    const price = data[symbol.toLowerCase()].usd;

    return NextResponse.json({ symbol, price });
  } catch (error) {
    console.error('Error fetching crypto price:', error);
    return NextResponse.json({ error: 'Failed to fetch crypto price' }, { status: 500 });
  }
}
