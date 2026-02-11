
console.log("Starting maintenance registration breakdown test...");

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
    await test("links", "./src/terminal/links.js");
    await test("theme", "./src/terminal/theme.js");
    await test("cli-utils", "./src/cli/cli-utils.js");
    await test("runtime", "./src/runtime.js");
    await test("register-maintenance", "./src/cli/program/register.maintenance.js");
    console.log("Maintenance registration breakdown complete.");
}

run();
