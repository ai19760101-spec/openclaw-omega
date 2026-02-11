
console.log("DEBUG: Starting dependency check...");

const deps = [
    "../../commands/agents.js",
    "../../commands/health.js",
    "../../commands/sessions.js",
    "../../commands/status.js",
    "../../runtime.js",
    "../argv.js",
    "../browser-cli.js",
    "../config-cli.js",
    "../memory-cli.js",
    "./register.agent.js",
    "./register.configure.js",
    "./register.maintenance.js",
    "./register.message.js",
    "./register.onboard.js",
    "./register.setup.js",
    "./register.status-health-sessions.js",
    "./register.subclis.js"
];

async function testDeps() {
    for (const dep of deps) {
        console.log(`Loading: ${dep}`);
        try {
            // Use a timeout to detect hangs
            const load = import(`./src/cli/program/${dep}`);
            const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("TIMEOUT")), 2000));
            await Promise.race([load, timeout]);
            console.log(`✅ Loaded: ${dep}`);
        } catch (e) {
            console.error(`❌ FAILED: ${dep}`, e);
            if (e.message === "TIMEOUT") {
                console.error("!!! DETECTED HANG !!!");
                process.exit(1);
            }
        }
    }
}

testDeps().then(() => console.log("Done"));
