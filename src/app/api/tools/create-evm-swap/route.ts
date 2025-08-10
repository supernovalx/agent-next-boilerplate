import { NextResponse } from "next/server";
import { signRequestFor } from "@bitte-ai/agent-sdk";
import {
  createWalletClient,
  http,
  getAddress,
  erc20Abi,
  createPublicClient,
  encodeFunctionData,
  type Address,
  type Hash,
  type Chain,
  type Account,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import {
  base,
  optimism,
  zircuit,
  arbitrum,
  mainnet,
  baseSepolia,
  optimismSepolia,
  arbitrumSepolia,
  sepolia,
} from "viem/chains";

// Type definitions from trade.ts
interface QuoteRequest {
  srcChainId: number;
  srcToken: Address;
  srcAmountWei: string;
  destToken: Address;
  destChainId: number;
  slippageBps: number;
  userAccount?: Address;
  destReceiver?: Address;
  feeRecipient?: Address;
  feeBps?: string;
}

interface TradeEstimate {
  tradeId: string;
  expectedAmount: string;
  minExpectedAmount: string;
  txData: {
    to: Address;
    value: string;
    data: `0x${string}`;
  };
  fees: any;
}

interface ApiRequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

const API_BASE_URL = "https://trading.ai.zircuit.com/api/engine/v1";
const API_KEY = process.env.API_KEY;

const SUPPORTED_CHAINS = [
  base,
  optimism,
  zircuit,
  arbitrum,
  mainnet,
  baseSepolia,
  optimismSepolia,
  arbitrumSepolia,
  sepolia,
];

const isNativeToken = (tokenAddress: Address): boolean => {
  return (
    getAddress(tokenAddress) ===
    getAddress("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
  );
};

const getPublicClient = (chainId: number) => {
  const chain = SUPPORTED_CHAINS.find((c) => c.id === chainId);
  if (!chain) {
    throw new Error(`Unsupported chain: ${chainId}`);
  }
  return createPublicClient({ chain, transport: http() });
};

// Helper function for API requests
async function apiRequest(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<any> {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch {
      errorMessage = errorText || errorMessage;
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

async function getTradeEstimate(
  quoteRequest: QuoteRequest
): Promise<TradeEstimate> {
  try {
    const response = await apiRequest("/order/estimate", {
      method: "POST",
      body: JSON.stringify(quoteRequest),
    });

    console.log("Trade estimate:", response);

    // Extract important data for next steps
    const { trade, tx } = response.data;

    return {
      tradeId: trade.tradeId,
      expectedAmount: trade.destTokenAmount,
      minExpectedAmount: trade.destTokenMinAmount,
      txData: tx,
      fees: trade.fees,
    };
  } catch (error) {
    console.error("Failed to get trade estimate:", error);
    throw error;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // Hard code source token to native ETH
    const srcToken = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    // Hard code chain ID to Base
    const chainId = "8453";
    const destToken = searchParams.get("destToken");
    const amountWei = searchParams.get("amountWei");
    const userAccount = searchParams.get("userAccount");
    const slippageBps = searchParams.get("slippageBps") || "100"; // Default 1% slippage

    if (!destToken || !amountWei) {
      return NextResponse.json(
        {
          error: '"destToken" and "amountWei" are required parameters',
        },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json(
        {
          error: "API_KEY environment variable not set",
        },
        { status: 500 }
      );
    }

    // Validate destination token address
    try {
      getAddress(destToken);
    } catch {
      return NextResponse.json(
        {
          error: "Invalid destination token address provided",
        },
        { status: 400 }
      );
    }

    const parsedChainId = parseInt(chainId);
    if (!SUPPORTED_CHAINS.find((c) => c.id === parsedChainId)) {
      return NextResponse.json(
        {
          error: `Unsupported chain ID: ${parsedChainId}`,
        },
        { status: 400 }
      );
    }

    // Create quote request
    const quoteRequest: QuoteRequest = {
      srcChainId: parsedChainId,
      srcToken: srcToken as Address,
      srcAmountWei: amountWei,
      destToken: destToken as Address,
      destChainId: parsedChainId, // Same chain for now
      slippageBps: parseInt(slippageBps),
      userAccount: (userAccount as Address) || undefined,
      destReceiver: (userAccount as Address) || undefined,
    };

    // Get trade estimate
    const estimate = await getTradeEstimate(quoteRequest);

    // No approval needed for native ETH
    const approvalNeeded = false;
    const approvalTx = null;

    // Create the swap transaction
    const swapTransaction = signRequestFor({
      chainId: parsedChainId,
      metaTransactions: [
        {
          to: estimate.txData.to,
          value: estimate.txData.value as `0x${string}`,
          data: estimate.txData.data,
        },
      ],
    });

    return NextResponse.json(
      {
        // success: true,
        // tradeId: estimate.tradeId,
        // expectedAmount: estimate.expectedAmount,
        // minExpectedAmount: estimate.minExpectedAmount,
        // fees: estimate.fees,
        // approvalNeeded,
        // approvalTransaction: approvalTx,
        // swapTransaction,
        evmSignRequest: swapTransaction, // For compatibility with existing tools
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating EVM swap:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create EVM swap",
      },
      { status: 500 }
    );
  }
}
