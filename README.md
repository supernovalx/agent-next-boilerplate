# ETHVN2025 Portfolio Agent

A comprehensive blockchain assistant agent built with the Bitte Protocol, Zircuit and Next.js. This agent specializes in EVM blockchain operations, token swaps, JavaScript execution, and portfolio management.

## 🌟 Features

- 🤖 **Blockchain Assistant** - AI agent focused on DeFi, DAO, and Social blockchain operations
- 🔗 **EVM Integration** - Built-in support for EVM transactions on Base network
- 🛠️ **Ready-to-Use Tools**:
  - EVM transaction generation for ETH transfers
  - Token swaps using Zircuit trading engine (ETH to any token on Base)
  - JavaScript code execution for computational tasks
  - Portfolio copying functionality with automatic calculation
  - Ethereum message signing (eth_sign, personal_sign, typed data)
  - User account & EVM address retrieval
  - Legacy tools: NEAR transactions, Twitter sharing, coin flip, blockchain info
- ⚡ **Next.js 15** with App Router and TypeScript
- 🎨 **Modern Development Stack** - Tailwind CSS, ESLint, TypeScript
- 🚀 **One-Command Development** - Integrated with `make-agent` for seamless development
- 📋 **Production Ready** - Built-in deployment scripts and Vercel integration

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

## 🤖 Agent Configuration

The agent is configured through the AI plugin manifest at `/api/ai-plugin/route.ts`. This endpoint returns an OpenAPI specification that defines:

### Agent Metadata
```typescript
{
  name: "Blockchain Assistant",
  description: "An assistant that tells the user's account id, creates transaction payloads for EVM blockchains, performs token swaps, and executes JavaScript code.",
  instructions: "You create evm transactions, perform token swaps, tell the user's account id, and execute JavaScript code. For blockchain transactions, first generate a transaction payload using the appropriate endpoint (/api/tools/create-evm-transaction for transfers or /api/tools/create-evm-swap for token swaps), then explicitly use the 'generate-evm-tx' tool for EVM to actually send the transaction on the client side. You can help the user copy portfolio of other users by using the get-portfolio tool, then use execute-js to calculate the amount of tokens (in wei) that need to be swap for each token in the target portfolio, then create-evm-swap and use generate-evm-tx to actually send the transaction on the client side.",
  tools: [
    { type: "generate-transaction" },  // NEAR transactions (legacy)
    { type: "generate-evm-tx" },       // EVM transactions  
    { type: "sign-message" },          // Message signing
    { type: "get-portfolio" }          // Portfolio retrieval
  ],
  categories: ["DeFi", "DAO", "Social"],
  chainIds: [8453]  // Base network only
}
```

### Important Configuration Notes

1. **Primary Focus**: The agent specializes in EVM operations on Base network (Chain ID 8453)
2. **Tool Integration**: Uses Bitte's built-in tools to execute blockchain operations after generating payloads
3. **Two-Step Process**: 
   - Generate transaction payloads via API endpoints
   - Execute transactions using Bitte's tools (`generate-evm-tx`, `generate-transaction`, `sign-message`)
4. **Portfolio Copying**: Can retrieve portfolios via `get-portfolio` tool and calculate swap amounts using JavaScript execution
5. **Computational Support**: JavaScript execution enables complex calculations for DeFi operations
6. **Deployment URL**: Automatically detected from Vercel or environment variables

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

## 🌐 Community & Support

- 📚 [Bitte Protocol Documentation](https://docs.bitte.ai)
- 💬 [Join our Telegram](https://t.me/bitteai) - Get help and connect with other developers
- 🐛 [Report Issues](https://github.com/BitteProtocol/agent-next-boilerplate/issues)
- 🔗 [Next.js Documentation](https://nextjs.org/docs)
- 📋 [OpenAPI Specification](https://swagger.io/specification/)

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

Built with ❤️ using [Bitte Protocol](https://bitte.ai)
