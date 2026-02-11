
console.log("DEBUG: Starting ADD command deps check...");

const deps = [
    "./src/agents/agent-scope.js",
    "./src/agents/auth-profiles.js",
    "./src/commands/agents.config.js",
    "./src/commands/agents.command-shared.js",
    "./src/commands/onboard-channels.js"
];

async function testDeps() {
    for (const dep of deps) {
        console.log(`Loading: ${dep}`);
        try {
            const load = import(dep);
            const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("TIMEOUT")), 2000));
            await Promise.race([load, timeout]);
            console.log(`✅ Loaded: ${dep}`);
        } catch (e) {
            console.error(`❌ FAILED: ${dep}`, e);
            if (e.message === "TIMEOUT") {
                console.error(`!!! DETECTED HANG in ${dep} !!!`);
                process.exit(1);
            }
        }
    }
}

testDeps().then(() => console.log("Done"));
