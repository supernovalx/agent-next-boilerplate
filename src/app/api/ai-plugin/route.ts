import { ACCOUNT_ID } from "@/app/config";
import { NextResponse } from "next/server";
import {
  chainIdParam,
  addressParam,
  SignRequestResponse200,
  AddressSchema,
  MetaTransactionSchema,
  SignRequestSchema,
} from "@bitte-ai/agent-sdk";

export async function GET() {
  const pluginData = {
    openapi: "3.0.0",
    info: {
      title: "Boilerplate Agent",
      description: "API for the boilerplate",
      version: "1.0.0",
    },
    servers: [
      {
        // Enter the base and open url of your agent here, make sure it is reachable
        url: "https://agent-next-boilerplate.vercel.app/",
      },
    ],
    "x-mb": {
      // The account id of the user who created the agent found in .env file
      "account-id": ACCOUNT_ID,
      // The email of the user who created the agent
      email: "youremail@gmail.com",
      assistant: {
        name: "Blockchain Assistant",
        description:
          "An assistant that answers with blockchain information, tells the user's account id, interacts with twitter, creates transaction payloads for EVM blockchains, performs token swaps, flips coins, and executes JavaScript code.",
        instructions:
          "You create evm transactions, perform token swaps, give blockchain information, tell the user's account id, interact with twitter, flip coins, and execute JavaScript code. For blockchain transactions, first generate a transaction payload using the appropriate endpoint (/api/tools/create-evm-transaction for transfers or /api/tools/create-evm-swap for token swaps), then explicitly use the 'generate-evm-tx' tool for EVM to actually send the transaction on the client side. For EVM transactions, make sure to provide the 'to' address (recipient) and 'amount' (in ETH) parameters when calling /api/tools/create-evm-transaction. For token swaps, use /api/tools/create-evm-swap with destToken and amountWei parameters - this swaps from native ETH to the destination token on Base network only. Simply getting the payload from the endpoints is not enough - the corresponding tool must be used to execute the transaction. For JavaScript execution, use /api/tools/execute-js to run arbitrary JavaScript code - this is useful for calculations, data processing, algorithm testing, and educational purposes.",
        tools: [
          { type: "generate-transaction" },
          { type: "generate-evm-tx" },
          { type: "sign-message" },
          { type: "get-portfolio" },
        ],
        // Thumbnail image for your agent
        image: `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/bitte.svg`,
        // The repo url for your agent https://github.com/your-username/your-agent-repo
        repo: "https://github.com/BitteProtocol/agent-next-boilerplate",
        // The categories your agent supports ["DeFi", "DAO", "NFT", "Social"]
        categories: ["DeFi", "DAO", "Social"],
        // The chains your agent supports 1 = mainnet, 8453 = base
        chainIds: [8453],
      },
    },
    paths: {
      "/api/tools/get-blockchains": {
        get: {
          summary: "get blockchain information",
          description: "Respond with a list of blockchains",
          operationId: "get-blockchains",
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        description: "The list of blockchains",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/tools/get-user": {
        get: {
          summary: "get user information",
          description: "Returns user account ID and EVM address",
          operationId: "get-user",
          parameters: [
            {
              name: "accountId",
              in: "query",
              required: false,
              schema: {
                type: "string",
              },
              description: "The user's account ID",
            },
            {
              name: "evmAddress",
              in: "query",
              required: false,
              schema: {
                type: "string",
              },
              description: "The user's EVM address",
            },
          ],
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      accountId: {
                        type: "string",
                        description:
                          "The user's account ID, if you dont have it, return an empty string",
                      },
                      evmAddress: {
                        type: "string",
                        description:
                          "The user's EVM address, if you dont have it, return an empty string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/tools/twitter": {
        get: {
          operationId: "getTwitterShareIntent",
          summary: "Generate a Twitter share intent URL",
          description:
            "Creates a Twitter share intent URL based on provided parameters",
          parameters: [
            {
              name: "text",
              in: "query",
              required: true,
              schema: {
                type: "string",
              },
              description: "The text content of the tweet",
            },
            {
              name: "url",
              in: "query",
              required: false,
              schema: {
                type: "string",
              },
              description: "The URL to be shared in the tweet",
            },
            {
              name: "hashtags",
              in: "query",
              required: false,
              schema: {
                type: "string",
              },
              description: "Comma-separated hashtags for the tweet",
            },
            {
              name: "via",
              in: "query",
              required: false,
              schema: {
                type: "string",
              },
              description: "The Twitter username to attribute the tweet to",
            },
          ],
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      twitterIntentUrl: {
                        type: "string",
                        description: "The generated Twitter share intent URL",
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        description: "Error message",
                      },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Error response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        description: "Error message",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      //   "/api/tools/create-near-transaction": {
      //     get: {
      //       operationId: "createNearTransaction",
      //       summary: "Create a NEAR transaction payload",
      //       description:
      //         "Generates a NEAR transaction payload for transferring tokens to be used directly in the generate-tx tool",
      //       parameters: [
      //         {
      //           name: "receiverId",
      //           in: "query",
      //           required: true,
      //           schema: {
      //             type: "string",
      //           },
      //           description: "The NEAR account ID of the receiver",
      //         },
      //         {
      //           name: "amount",
      //           in: "query",
      //           required: true,
      //           schema: {
      //             type: "string",
      //           },
      //           description: "The amount of NEAR tokens to transfer",
      //         },
      //       ],
      //       responses: {
      //         "200": {
      //           description: "Successful response",
      //           content: {
      //             "application/json": {
      //               schema: {
      //                 type: "object",
      //                 properties: {
      //                   transactionPayload: {
      //                     type: "object",
      //                     properties: {
      //                       receiverId: {
      //                         type: "string",
      //                         description: "The receiver's NEAR account ID",
      //                       },
      //                       actions: {
      //                         type: "array",
      //                         items: {
      //                           type: "object",
      //                           properties: {
      //                             type: {
      //                               type: "string",
      //                               description:
      //                                 "The type of action (e.g., 'Transfer')",
      //                             },
      //                             params: {
      //                               type: "object",
      //                               properties: {
      //                                 deposit: {
      //                                   type: "string",
      //                                   description:
      //                                     "The amount to transfer in yoctoNEAR",
      //                                 },
      //                               },
      //                             },
      //                           },
      //                         },
      //                       },
      //                     },
      //                   },
      //                 },
      //               },
      //             },
      //           },
      //         },
      //         "400": {
      //           description: "Bad request",
      //           content: {
      //             "application/json": {
      //               schema: {
      //                 type: "object",
      //                 properties: {
      //                   error: {
      //                     type: "string",
      //                     description: "Error message",
      //                   },
      //                 },
      //               },
      //             },
      //           },
      //         },
      //         "500": {
      //           description: "Error response",
      //           content: {
      //             "application/json": {
      //               schema: {
      //                 type: "object",
      //                 properties: {
      //                   error: {
      //                     type: "string",
      //                     description: "Error message",
      //                   },
      //                 },
      //               },
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      "/api/tools/create-evm-transaction": {
        get: {
          operationId: "createEvmTransaction",
          summary: "Create EVM transaction",
          description:
            "Generate an EVM transaction payload with specified recipient and amount to be used directly in the generate-evm-tx tool",
          parameters: [
            {
              name: "to",
              in: "query",
              required: true,
              schema: {
                type: "string",
              },
              description: "The EVM address of the recipient",
            },
            {
              name: "amount",
              in: "query",
              required: true,
              schema: {
                type: "string",
              },
              description: "The amount of ETH to transfer",
            },
          ],
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      evmSignRequest: {
                        type: "object",
                        properties: {
                          to: {
                            type: "string",
                            description: "Receiver address",
                          },
                          value: {
                            type: "string",
                            description: "Transaction value",
                          },
                          data: {
                            type: "string",
                            description: "Transaction data",
                          },
                          from: {
                            type: "string",
                            description: "Sender address",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        description: "Error message",
                      },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Server error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        description: "Error message",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/tools/create-evm-swap": {
        get: {
          operationId: "createEvmSwap",
          summary: "Create EVM token swap",
          description:
            "Generate an EVM token swap transaction using the Zircuit trading engine. Swaps from native ETH to destination token on Base network.",
          parameters: [
            {
              name: "destToken",
              in: "query",
              required: true,
              schema: {
                type: "string",
              },
              description: "The destination token contract address",
            },
            {
              name: "amountWei",
              in: "query",
              required: true,
              schema: {
                type: "string",
              },
              description: "The amount of ETH to swap in wei (smallest unit)",
            },
            {
              name: "userAccount",
              in: "query",
              required: false,
              schema: {
                type: "string",
              },
              description: "The user's wallet address",
            },
            {
              name: "slippageBps",
              in: "query",
              required: false,
              schema: {
                type: "string",
                default: "100",
              },
              description:
                "Slippage tolerance in basis points (default: 100 = 1%)",
            },
          ],
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        description:
                          "Whether the swap preparation was successful",
                      },
                      tradeId: {
                        type: "string",
                        description: "Unique trade identifier",
                      },
                      expectedAmount: {
                        type: "string",
                        description: "Expected amount of destination tokens",
                      },
                      minExpectedAmount: {
                        type: "string",
                        description:
                          "Minimum expected amount considering slippage",
                      },
                      fees: {
                        type: "object",
                        description: "Fee breakdown for the trade",
                      },
                      approvalNeeded: {
                        type: "boolean",
                        description: "Whether token approval is required",
                      },
                      approvalTransaction: {
                        type: "object",
                        description: "Approval transaction if needed",
                      },
                      swapTransaction: {
                        type: "object",
                        description: "The swap transaction to execute",
                      },
                      evmSignRequest: {
                        type: "object",
                        description:
                          "EVM transaction for compatibility with generate-evm-tx tool",
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        description: "Error message",
                      },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Server error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        description: "Error message",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/tools/coinflip": {
        get: {
          summary: "Coin flip",
          description: "Flip a coin and return the result (heads or tails)",
          operationId: "coinFlip",
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      result: {
                        type: "string",
                        description:
                          "The result of the coin flip (heads or tails)",
                        enum: ["heads", "tails"],
                      },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Error response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        description: "Error message",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/tools/eth-sign-request": {
        get: {
          summary: "returns ethereum signature requests",
          description:
            "Constructs requested signature requests (eth_sign, personal_sign, eth_signTypedData, eth_signTypedData_v4)",
          operationId: "eth-sign",
          parameters: [
            { $ref: "#/components/parameters/chainId" },
            { $ref: "#/components/parameters/evmAddress" },
            { $ref: "#/components/parameters/method" },
            { $ref: "#/components/parameters/message" },
          ],
          responses: {
            "200": { $ref: "#/components/responses/SignRequestResponse200" },
          },
        },
      },
      "/api/tools/execute-js": {
        get: {
          summary: "Execute JavaScript code",
          description:
            "Execute arbitrary JavaScript code and return the result",
          operationId: "execute-js",
          parameters: [
            {
              name: "code",
              in: "query",
              required: true,
              schema: {
                type: "string",
              },
              description: "The JavaScript code to execute",
            },
          ],
          responses: {
            "200": {
              description: "Successful execution",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        description: "Whether execution was successful",
                      },
                      result: {
                        type: "string",
                        description: "The result of the executed code",
                      },
                      type: {
                        type: "string",
                        description: "The type of the returned value",
                      },
                      logs: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        description:
                          "Console.log output from the executed code",
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad request - invalid code or dangerous operations",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        description: "Error message",
                      },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Execution error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        description: "Will be false for errors",
                      },
                      error: {
                        type: "string",
                        description: "Error message",
                      },
                      logs: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        description: "Console.log output before error",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Execute JavaScript code (POST)",
          description: "Execute arbitrary JavaScript code using POST request",
          operationId: "execute-js-post",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      description: "The JavaScript code to execute",
                    },
                  },
                  required: ["code"],
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Successful execution",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        description: "Whether execution was successful",
                      },
                      result: {
                        type: "string",
                        description: "The result of the executed code",
                      },
                      type: {
                        type: "string",
                        description: "The type of the returned value",
                      },
                      logs: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        description:
                          "Console.log output from the executed code",
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad request - invalid code or dangerous operations",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        description: "Error message",
                      },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Execution error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        description: "Will be false for errors",
                      },
                      error: {
                        type: "string",
                        description: "Error message",
                      },
                      logs: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        description: "Console.log output before error",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      parameters: {
        evmAddress: { ...addressParam, name: "evmAddress" },
        method: {
          name: "method",
          description: "The signing method to be used.",
          in: "query",
          required: true,
          schema: {
            type: "string",
            enum: [
              "eth_sign",
              "personal_sign",
              "eth_signTypedData",
              "eth_signTypedData_v4",
            ],
          },
          example: "eth_sign",
        },
        chainId: { ...chainIdParam, example: 8453, required: false },
        message: {
          name: "message",
          in: "query",
          required: false,
          description: "any text message",
          schema: { type: "string" },
          example: "Hello Bitte",
        },
      },
      responses: {
        SignRequestResponse200,
      },
      schemas: {
        Address: AddressSchema,
        MetaTransaction: MetaTransactionSchema,
        SignRequest: SignRequestSchema,
      },
    },
  };

  return NextResponse.json(pluginData);
}
