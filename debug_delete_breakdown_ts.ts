
const deps = [
    "./src/runtime.ts",
    "./src/agents/agent-scope.ts",
    "./src/config/config.ts",
    "./src/config/logging.ts",
    "./src/config/sessions.ts",
    "./src/routing/session-key.ts",
    "./src/wizard/clack-prompter.ts",
    "./src/commands/agents.command-shared.ts",
    "./src/commands/agents.config.ts",
    "./src/commands/onboard-helpers.ts"
];

console.log("DEBUG: Starting delete breakdown...");

(async () => {
    for (const dep of deps) {
        console.log(`Loading: ${dep}`);
        try {
            const load = import(dep);
            const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("TIMEOUT")), 3000));
            await Promise.race([load, timeout]);
            console.log(`✅ Loaded: ${dep}`);
        } catch (e) {
            console.error(`❌ Failed: ${dep}`, e);
            process.exit(1);
        }
    }
    console.log("Done");
})();
