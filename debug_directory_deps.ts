
console.log("DEBUG: Starting directory deps check...");

const deps = [
    "./src/discord/accounts.js",
    "./src/slack/accounts.js",
    "./src/telegram/accounts.js",
    "./src/web/accounts.js",
    "./src/whatsapp/normalize.js",
    "./src/channels/plugins/normalize/slack.js"
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
