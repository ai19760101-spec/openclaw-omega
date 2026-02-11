
const deps = [
    "./src/auto-reply/chunk.ts",
    "./src/channels/plugins/media-limits.ts",
    "./src/channels/plugins/outbound/load.ts",
    "./src/config/markdown-tables.ts",
    "./src/config/sessions/transcript.ts",
    "./src/signal/format.ts",
    "./src/signal/send.ts",
    "./src/infra/outbound/abort.ts",
    "./src/infra/outbound/payloads.ts"
];

console.log("DEBUG: Starting deliver full breakdown...");

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
