
console.log("Starting full registry breakdown test...");

async function test(name: string, path: string) {
    console.log(`Testing ${name}...`);
    try {
        await import(path);
        console.log(`✅ ${name} passed`);
    } catch (e) {
        console.log(`❌ ${name} failed:`, e);
    }
}

async function run() {
    await test("config-cli", "./src/cli/config-cli.js");
    await test("memory-cli", "./src/cli/memory-cli.js");
    await test("maintenance", "./src/cli/program/register.maintenance.js");
    await test("message", "./src/cli/program/register.message.js");
    await test("onboard", "./src/cli/program/register.onboard.js");
    await test("setup", "./src/cli/program/register.setup.js");
    await test("status-health-sessions", "./src/cli/program/register.status-health-sessions.js");
    await test("subclis", "./src/cli/program/register.subclis.js");
    await test("browser-cli", "./src/cli/browser-cli.js");
    console.log("Full registry breakdown complete.");
}

run();
