
console.log("Starting sessions breakdown test...");

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
    await test("group", "./src/config/sessions/group.js");
    await test("metadata", "./src/config/sessions/metadata.js");
    await test("main-session", "./src/config/sessions/main-session.js");
    await test("paths", "./src/config/sessions/paths.js");
    await test("reset", "./src/config/sessions/reset.js");
    await test("session-key", "./src/config/sessions/session-key.js");
    await test("store", "./src/config/sessions/store.js");
    await test("types", "./src/config/sessions/types.js");
    await test("transcript", "./src/config/sessions/transcript.js");
    console.log("Sessions breakdown complete.");
}

run();
