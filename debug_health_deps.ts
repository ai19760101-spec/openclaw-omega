
const deps = [
    "./src/channels/plugins/active.ts", // Replaced index.ts
    "./src/infra/heartbeat-runner.ts",
    "./src/routing/bindings.ts",
    "./src/gateway/call.ts",
    "./src/config/sessions.ts"
];

console.log("DEBUG: Starting health deps check (v2)...");

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
            // console.error(e);
        }
    }
    console.log("Done");
})();
