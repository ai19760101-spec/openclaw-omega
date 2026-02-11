
console.log("DEBUG: Starting AUTH deps check...");

const deps = [
    "./src/agents/auth-profiles/constants.js",
    "./src/agents/auth-profiles/display.js",
    "./src/agents/auth-profiles/doctor.js",
    "./src/agents/auth-profiles/oauth.js",
    "./src/agents/auth-profiles/order.js",
    "./src/agents/auth-profiles/paths.js",
    "./src/agents/auth-profiles/profiles.js",
    "./src/agents/auth-profiles/repair.js",
    "./src/agents/auth-profiles/store.js",
    "./src/agents/auth-profiles/usage.js"
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
