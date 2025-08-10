# 🤖 MirrorAgent - ETH Vietnam 2025

**AI-Powered Cross-Chain Portfolio Copying for DeFi**

MirrorAgent brings the proven $10B+ daily copy trading market from CEX platforms to DeFi with intelligent agents and seamless cross-chain execution. Built for **Zircuit Track** and **Bitte Open Agents** at ETH Vietnam 2025.

## 🎯 The Problem

| **CEX Success** ✅ | **DeFi Opportunity** 📈 |
|-------------------|-------------------------|
| $10B+ daily copy trading volume | Limited user-friendly solutions |
| 45M+ active copy traders | Complex multi-step processes |
| 8,500+ lead traders (OKX) | Cross-chain friction |
| Mature profit-sharing models | Discovery & analysis barriers |

## 🚀 The Solution

**MirrorAgent** - An AI agent that makes copying DeFi portfolios as simple as talking to ChatGPT.

### Core Innovation
- **From Discovery to Execution**: Go from finding a portfolio on Farcaster to copying it in under 2 minutes
- **AI-Driven Analysis**: Intelligent portfolio breakdown and optimization strategies
- **Cross-Chain Execution**: Powered by Zircuit GUD Trading Engine for best quotes
- **Fee Sharing**: Built-in mechanism to share profits with original portfolio holders

## 🛠️ Architecture

### AI Agent Core
**Powered by Bitte Protocol + Zircuit GUD Trading Engine**

### Three Key Tools:
1. **📊 Get Portfolio** - Bitte built-in tool to analyze any EVM address portfolio composition
2. **⚡ Execute JS** - Custom tool for complex calculations, allocation strategies, and portfolio optimization
3. **🔄 Swap** - Zircuit GUD Trading Engine for best quotes and cross-chain execution with fee collection

### Two Access Methods:
1. **🌐 Chrome Extension** - Hover any EVM address → Click "Analyze with Agent" → Instant portfolio chat
2. **🔗 MCP Protocol** - ChatGPT, Claude, and other AI platforms → Agent-to-Agent communication

## 🎬 User Journey: A Day in the Life of a DeFi Degenerate

```
📱 Discovery          👆 One-Click Analysis    💬 Nerd Out with AI      🚀 Liftoff
──────────────────────────────────────────────────────────────────────────────────
Scrolling Farcaster,  →  Hover, click         →  "Agent, show me      →  Agent fires up 
a wild degen KOL          "Analyze with           the goods." It          Zircuit, finds
appears! Their            MirrorAgent".           breaks down their       best swaps, and
wallet is fire.           Boom. Instant chat      crazy returns.          executes. Portfolio
I need that alpha.        with an AI that         "Okay, ape me in,       is now legendary.
                          gets it.                but with a twist."      To the moon! 🚀
```

**Result**: From Farcaster Feed to Copied Trades in Under 2 Minutes

## 🌟 Key Features

- 🤖 **Intelligent Portfolio Analysis** - AI-powered breakdown of any EVM portfolio
- 🔗 **Cross-Chain Execution** - Seamless swaps across multiple networks via Zircuit
- 🛠️ **Advanced Tools**:
  - Portfolio composition analysis and optimization
  - Custom allocation strategies with JavaScript execution
  - Automated token swapping with slippage protection
  - Fee collection and profit-sharing mechanisms
- ⚡ **Next.js 15** with App Router and TypeScript
- 🎨 **Modern Development Stack** - Tailwind CSS, ESLint, TypeScript
- 🚀 **Production Ready** - Built-in deployment scripts and Vercel integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- A Bitte wallet account
- Git

### 1. Clone and Setup

```bash
git clone https://github.com/BitteProtocol/agent-next-boilerplate.git
cd agent-next-boilerplate
pnpm install
```

### 2. Environment Configuration

Create a `.env.local` file:

```bash
# Required: Get your API key from https://key.bitte.ai
BITTE_API_KEY='your-api-key'

# Required: Your NEAR account ID (e.g., yourname.near)
ACCOUNT_ID='your-account.near'

# Optional: For local development
NEXT_PUBLIC_HOST='localhost'
PORT=3000
```

### 3. Start Development

```bash
pnpm run dev
```

This command will:
- Start your Next.js application on `http://localhost:3000`
- Launch `make-agent` development mode
- Prompt you to sign a message in your Bitte wallet to authenticate
- Open your agent in the Bitte playground for testing
- Enable hot reload for seamless development

### 4. Build for Production

```bash
# Build without deployment
pnpm run build

# Build and deploy to production
pnpm run build:deploy
```

## 🔧 Available Tools

The agent includes nine functional tools for blockchain operations, computation, and utility functions:

### Core Tools

### 1. **EVM Transaction Generator** (`/api/tools/create-evm-transaction`)
- **Purpose**: Creates EVM transaction payloads for ETH transfers on Base network
- **Parameters**: `to` (recipient address), `amount` (ETH amount)
- **Implementation**: Uses viem for proper ETH amount parsing
- **Integration**: Works with Bitte's `generate-evm-tx` tool for wallet execution

### 2. **EVM Token Swap** (`/api/tools/create-evm-swap`)
- **Purpose**: Creates token swap transactions using Zircuit trading engine
- **Parameters**: `destToken` (token address), `amountWei` (ETH amount in wei), `slippageBps` (slippage tolerance)
- **Implementation**: Swaps from native ETH to any destination token on Base network
- **Features**: Automatic slippage protection, trade estimation, no approval needed for ETH
- **Integration**: Works with Bitte's `generate-evm-tx` tool for execution

### 3. **JavaScript Executor** (`/api/tools/execute-js`)
- **Purpose**: Executes arbitrary JavaScript code for computational tasks
- **Methods**: Both GET and POST support
- **Features**: Console.log capture, error handling, result formatting
- **Use Case**: Portfolio calculations, mathematical operations, data processing
- **Security**: Sandboxed execution environment

### 4. **User Information** (`/api/tools/get-user`)
- **Purpose**: Returns user's account ID and EVM address
- **Context-Aware**: Automatically populated by Bitte's context system
- **Use Case**: Accessing authenticated user information for transactions

### 5. **Ethereum Message Signing** (`/api/tools/eth-sign-request`)
- **Purpose**: Creates various Ethereum signature requests
- **Methods**: `eth_sign`, `personal_sign`, `eth_signTypedData`, `eth_signTypedData_v4`
- **Parameters**: `evmAddress`, `chainId`, `method`, `message`
- **Implementation**: Supports both simple messages and typed data structures

### Legacy Tools

### 6. **NEAR Transaction Generator** (`/api/tools/create-near-transaction`)
- **Purpose**: Creates NEAR transaction payloads for token transfers
- **Parameters**: `receiverId` (NEAR account), `amount` (NEAR tokens)
- **Implementation**: Converts amounts to yoctoNEAR (10^24) for precision

### 7. **Blockchain Information** (`/api/tools/get-blockchains`)
- **Purpose**: Returns a randomized list of 3 blockchain networks
- **Implementation**: Static list with random selection
- **Use Case**: General blockchain information retrieval

### 8. **Twitter Integration** (`/api/tools/twitter`)
- **Purpose**: Generates Twitter share intent URLs
- **Parameters**: `text` (required), `url`, `hashtags`, `via`
- **Implementation**: Proper URL encoding for all parameters

### 9. **Coin Flip** (`/api/tools/coinflip`)
- **Purpose**: Simple randomization tool returning "heads" or "tails"
- **Implementation**: Cryptographically random using Math.random()

## 🤖 MirrorAgent Configuration

MirrorAgent is configured through the AI plugin manifest at `/api/ai-plugin/route.ts` as a specialized portfolio copying assistant:

### Agent Metadata
```typescript
{
  name: "MirrorAgent - Portfolio Copying Assistant",
  description: "AI agent that analyzes and copies DeFi portfolios with intelligent allocation strategies and cross-chain execution via Zircuit.",
  instructions: "You are MirrorAgent, specializing in DeFi portfolio analysis and copying. Your core workflow: 1) Use get-portfolio to analyze target portfolios, 2) Use execute-js for allocation calculations and optimization strategies, 3) Use create-evm-swap with Zircuit for cross-chain execution, 4) Use generate-evm-tx to execute trades. You help users discover alpha, analyze successful portfolios, and copy them with intelligent modifications based on their risk tolerance and capital.",
  tools: [
    { type: "generate-evm-tx" },       // Cross-chain transaction execution
    { type: "sign-message" },          // Message signing for verification
    { type: "get-portfolio" }          // Portfolio composition analysis
  ],
  categories: ["DeFi", "Copy Trading", "Portfolio Management"],
  chainIds: [8453, 1, 137, 42161]     // Base, Ethereum, Polygon, Arbitrum
}
```

### Core Capabilities

1. **Portfolio Discovery & Analysis**: Analyze any EVM address portfolio composition and performance
2. **Intelligent Allocation**: Calculate optimal token distributions based on user preferences and risk tolerance
3. **Cross-Chain Execution**: Execute trades across multiple networks using Zircuit GUD Trading Engine
4. **Fee Management**: Built-in fee collection mechanism for profit-sharing with original portfolio creators
5. **Risk Management**: Automatic slippage protection and portfolio optimization strategies
6. **Real-Time Execution**: From analysis to trade execution in under 2 minutes

## 📝 Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `BITTE_API_KEY` | ✅ | Your Bitte API key from [key.bitte.ai](https://key.bitte.ai) | `bitte_key_...` |
| `ACCOUNT_ID` | ✅ | Your blockchain account ID | `yourname.near` |
| `NEXT_PUBLIC_HOST` | ❌ | Development host | `localhost` |
| `PORT` | ❌ | Development port | `3000` |
| `NEXT_PUBLIC_BASE_URL` | ❌ | Base URL for assets | `https://yourdomain.com` |

## 🛠️ Development Scripts

```bash
# Development with hot reload and make-agent
pnpm run dev

# Next.js development only (without make-agent)
pnpm run dev:agent

# Production build (local)
pnpm run build

# Build and deploy to production
pnpm run build:deploy

# Linting
pnpm run lint
```

## 🚀 Deployment

### Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `BITTE_API_KEY`
   - `ACCOUNT_ID`
4. Deploy! The build process automatically runs `make-agent deploy`

### Manual Deployment

```bash
# Build and deploy manually
pnpm run build:deploy
```

## 🔨 Creating Custom Tools

To add your own tools to the agent:

### 1. Create the Tool Endpoint

```typescript
// src/app/api/tools/my-tool/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const param = searchParams.get('param');

  // Your tool logic here

  return NextResponse.json({ result: 'success' });
}
```

### 2. Add to Agent Manifest

Update `/api/ai-plugin/route.ts`:

```typescript
paths: {
  // ... existing paths
  "/api/tools/my-tool": {
    get: {
      summary: "My custom tool",
      description: "Description of what your tool does",
      operationId: "my-tool",
      parameters: [
        {
          name: "param",
          in: "query",
          required: true,
          schema: { type: "string" }
        }
      ],
      responses: {
        "200": {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  result: { type: "string" }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### 3. Update Agent Instructions

Modify the `instructions` field in the agent configuration to include guidance on when and how to use your new tool.

## 📖 Key Dependencies

- **[@bitte-ai/agent-sdk](https://www.npmjs.com/package/@bitte-ai/agent-sdk)** - Core SDK for Bitte integration
- **[make-agent](https://www.npmjs.com/package/make-agent)** - Development and deployment tooling
- **[viem](https://viem.sh)** - TypeScript Ethereum library for transaction handling
- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[vercel-url](https://www.npmjs.com/package/vercel-url)** - Automatic deployment URL detection

## 🏆 ETH Vietnam 2025 Hackathon

### Tracks
- **🔥 Zircuit Track**: Leveraging Zircuit GUD Trading Engine for optimal cross-chain swaps and fee collection
- **🤖 Bitte Open Agents**: Built on Bitte Protocol for seamless AI agent integration and MCP compatibility

### Innovation Highlights
- **Market Opportunity**: Tapping into the $10B+ daily copy trading market for DeFi
- **User Experience**: From discovery on social platforms to trade execution in under 2 minutes  
- **Technical Innovation**: AI-driven portfolio analysis with cross-chain execution
- **Economic Model**: Built-in profit-sharing mechanism with original portfolio creators

### Demo Scenario
1. **Discovery**: User finds a successful trader on Farcaster/Twitter
2. **Analysis**: One-click portfolio analysis via Chrome extension
3. **Optimization**: AI agent calculates personalized allocation strategy
4. **Execution**: Cross-chain swaps executed via Zircuit with optimal pricing
5. **Profit Sharing**: Fees automatically shared with original portfolio creator

## 🌐 Community & Support

- 📚 [Bitte Protocol Documentation](https://docs.bitte.ai)
- 🔗 [Zircuit Documentation](https://docs.zircuit.com)
- 💬 [Join Bitte Telegram](https://t.me/bitteai) - Get help and connect with other developers
- 🐛 [Report Issues](https://github.com/BitteProtocol/agent-next-boilerplate/issues)
- 📋 [Next.js Documentation](https://nextjs.org/docs)

## 📋 Project Structure

```
agent-next-boilerplate/
├── src/app/
│   ├── api/
│   │   ├── ai-plugin/route.ts      # Agent manifest endpoint
│   │   └── tools/                  # Tool endpoints
│   │       ├── create-evm-transaction/    # Core: ETH transfers
│   │       ├── create-evm-swap/          # Core: Token swaps
│   │       ├── execute-js/               # Core: JavaScript execution
│   │       ├── get-user/                 # Core: User information
│   │       ├── eth-sign-request/         # Core: Message signing
│   │       ├── create-near-transaction/  # Legacy: NEAR transactions
│   │       ├── get-blockchains/          # Legacy: Blockchain info
│   │       ├── twitter/                  # Legacy: Social sharing
│   │       └── coinflip/                 # Legacy: Randomization
│   ├── config.ts                   # Environment configuration
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Home page
├── public/                         # Static assets
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**🤖 MirrorAgent** - Built with ❤️ for ETH Vietnam 2025  
Powered by [Bitte Protocol](https://bitte.ai) × [Zircuit](https://zircuit.com)

*From Farcaster Feed to Copied Trades in Under 2 Minutes* 🚀
