
const deps = [
    "./src/agents/auth-profiles/store.ts",
    "./src/agents/auth-profiles/profiles.ts",
    "./src/agents/bedrock-discovery.ts",
    "./src/agents/cloudflare-ai-gateway.ts",
    "./src/agents/model-auth.ts",
    "./src/agents/synthetic-models.ts",
    "./src/agents/together-models.ts",
    "./src/agents/venice-models.ts",
    "./src/providers/github-copilot-token.ts"
];

console.log("DEBUG: Starting providers breakdown...");

(async () => {
    for (const dep of deps) {
        console.log(`Loading: ${dep}`);
        try {
            const load = import(dep);
            const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("TIMEOUT")), 3000));
            await Promise.race([load, timeout]);
            console.log(`✅ Loaded: ${dep}`);
        } catch (e: any) {
            console.error(`❌ FAILED: ${dep}`);
            console.error(e);
        }
    }
    console.log("Done");
})();
