
console.log("Starting maintenance breakdown test...");

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
    await test("dashboard", "./src/commands/dashboard.js");
    await test("doctor", "./src/commands/doctor.js");
    await test("reset", "./src/commands/reset.js");
    await test("uninstall", "./src/commands/uninstall.js");
    console.log("Maintenance breakdown complete.");
}

run();
