
const deps = [
    "./src/infra/outbound/targets.ts",
    "./src/infra/outbound/deliver.ts",
    "./src/infra/heartbeat-events.ts",
    "./src/infra/heartbeat-wake.ts",
    "./src/auto-reply/heartbeat.ts"
];

console.log("DEBUG: Starting outbound deps check...");

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
