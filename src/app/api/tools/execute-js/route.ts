import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Code parameter is required and must be a string" },
        { status: 400 }
      );
    }

    let result: any;
    let logs: string[] = [];

    // Capture console.log output
    const originalConsoleLog = console.log;
    console.log = (...args: any[]) => {
      logs.push(
        args
          .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
          )
          .join(" ")
      );
    };

    try {
      // Execute the code
      result = eval(code);
    } catch (error) {
      console.log = originalConsoleLog;
      return NextResponse.json({
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown execution error",
        logs: logs.length > 0 ? logs : undefined,
      });
    }

    // Restore original console.log
    console.log = originalConsoleLog;

    // Format the result
    let formattedResult;
    if (result === undefined) {
      formattedResult = "undefined";
    } else if (result === null) {
      formattedResult = "null";
    } else if (typeof result === "object") {
      try {
        formattedResult = JSON.stringify(result, null, 2);
      } catch {
        formattedResult = "[Object - not serializable]";
      }
    } else {
      formattedResult = String(result);
    }

    return NextResponse.json({
      success: true,
      result: formattedResult,
      type: typeof result,
      logs: logs.length > 0 ? logs : undefined,
    });
  } catch (error) {
    console.error("Error in JavaScript execution:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to execute JavaScript code",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Also support GET for simple expressions
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Code parameter is required in query string" },
        { status: 400 }
      );
    }

    // Forward to POST handler
    const mockRequest = {
      json: async () => ({ code }),
    } as Request;

    return POST(mockRequest);
  } catch (error) {
    console.error("Error in GET JavaScript execution:", error);
    return NextResponse.json(
      { error: "Failed to execute JavaScript code" },
      { status: 500 }
    );
  }
}
