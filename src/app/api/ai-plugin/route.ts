import { NextResponse } from "next/server";
import { DEPLOYMENT_URL } from "vercel-url";

const key = JSON.parse(process.env.BITTE_KEY || "{}");

if (!key?.accountId) {
  console.error("no account");
}

let bitteDevJson: { url?: string; };
try {
    bitteDevJson = require("@/bitte.dev.json");
} catch (error) {
    console.warn("Failed to import bitte.dev.json, using default values");
    bitteDevJson = { url: undefined };
}

export async function GET() {
    const pluginData = {
        openapi: "3.0.0",
        info: {
            title: "Boilerplate",
            description: "API for the boilerplate",
            version: "1.0.0",
        },
        servers: [
            {
                url: bitteDevJson.url || DEPLOYMENT_URL,
            },
        ],
        "x-mb": {
            "account-id": key.accountId,
            assistant: {
                name: "Your Assistant",
                description: "An assistant that answers with blockchain information",
                instructions: "You answer with a list of blockchains. Use the tools to get blockchain information."
            },
        },
        paths: {
            "/api/tools/get-blockchains": {
                get: {
                    summary: "Get blockchain token symbols",
                    description: "Respond with a list of random blockchain token symbols (using CoinGecko IDs)",
                    operationId: "get-blockchains",
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            blockchains: {
                                                type: "array",
                                                items: {
                                                    type: "string"
                                                },
                                                description: "An array of blockchain token symbols (CoinGecko IDs)",
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
                    description: "Respond with user account ID",
                    operationId: "get-user",
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
                                                description: "The user's account ID",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/tools/twitter-share": {
                get: {
                    summary: "Share text on Twitter",
                    description: "Generate a Twitter share URL for the given text",
                    operationId: "twitter-share",
                    parameters: [
                        {
                            name: "text",
                            in: "query",
                            description: "The text to be shared on Twitter",
                            required: true,
                            schema: {
                                type: "string"
                            }
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
                                            url: {
                                                type: "string",
                                                description: "The Twitter intent URL for sharing",
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
                    },
                },
            },
            "/api/tools/get-crypto-price": {
                get: {
                    summary: "Get cryptocurrency price",
                    description: "Fetch the current price of a cryptocurrency in USD",
                    operationId: "get-crypto-price",
                    parameters: [
                        {
                            name: "symbol",
                            in: "query",
                            description: "The symbol of the cryptocurrency",
                            required: true,
                            schema: {
                                type: "string"
                            }
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
                                            symbol: {
                                                type: "string",
                                                description: "The symbol of the cryptocurrency",
                                            },
                                            price: {
                                                type: "number",
                                                description: "The current price in USD",
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
                        "404": {
                            description: "Cryptocurrency not found",
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
                            description: "Internal server error",
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
        },
    };

    return NextResponse.json(pluginData);
}