import { runPythonWithManifest } from "@/src/lib/wasmer";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');

        console.log(code);

        if (!code) {
            return new Response(JSON.stringify({ error: "No code provided" }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const output = await runPythonWithManifest(code);

        return new Response(JSON.stringify({ output }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
