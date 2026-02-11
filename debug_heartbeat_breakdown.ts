
const deps = [
    "./src/agents/identity.ts",
    "./src/auto-reply/heartbeat.ts",
    "./src/auto-reply/reply.ts",
    "./src/auto-reply/tokens.ts",
    "./src/cli/parse-duration.ts",
    "./src/config/config.ts",
    "./src/logging/subsystem.ts",
    "./src/process/command-queue.ts",
    "./src/process/lanes.ts",
    "./src/infra/errors.ts",
    "./src/infra/heartbeat-events.ts",
    "./src/infra/heartbeat-visibility.ts",
    "./src/infra/heartbeat-wake.ts",
    "./src/infra/outbound/deliver.ts",
    "./src/infra/outbound/targets.ts",
    "./src/infra/system-events.ts"
];

console.log("DEBUG: Starting heartbeat deps check...");

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
