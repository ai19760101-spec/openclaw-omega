
const deps = [
    "./src/agents/defaults.ts",
    "./src/agents/model-selection.ts",
    "./src/config/agent-limits.ts",
    "./src/config/talk.ts"
];

console.log("DEBUG: Starting defaults breakdown...");

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
