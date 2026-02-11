
const deps = [
    "./src/runtime.js",
    "./src/agents/agent-scope.js",
    "./src/config/config.js",
    "./src/config/logging.js",
    "./src/config/sessions.js",
    "./src/routing/session-key.js",
    "./src/wizard/clack-prompter.js",
    "./src/commands/agents.command-shared.js",
    "./src/commands/agents.config.js",
    "./src/commands/onboard-helpers.js"
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
