import { NextResponse } from 'next/server';

export async function GET() {
  const blockchains = [
    'bitcoin',
    'ethereum',
    'cardano',
    'polkadot',
    'solana',
    'avalanche-2',
    'binancecoin',
    'tezos',
    'algorand',
    'cosmos',
    'near',
    'aptos',
    'sui',
    'starknet',
    'zksync-era',
    'scroll-token',
    'optimism',
    'arbitrum',
    'shiba-inu',
    'dogecoin',
    'tron',
    'litecoin',
    'dash',
    'monero',
    'zcash',
    'stellar',
    'eos',
  ];

  const randomBlockchains = blockchains
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return NextResponse.json({ blockchains: randomBlockchains });
}
