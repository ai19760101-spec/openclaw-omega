
console.log("Starting health breakdown test...");

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
    await test("agent-scope", "./src/agents/agent-scope.js");
    await test("helpers", "./src/channels/plugins/helpers.js");
    await test("active", "./src/channels/plugins/active.js");
    await test("config", "./src/config/config.js");
    await test("sessions", "./src/config/sessions.js");
    await test("call", "./src/gateway/call.js");
    await test("heartbeat-runner", "./src/infra/heartbeat-runner.js");
    await test("bindings", "./src/routing/bindings.js");
    console.log("Health breakdown complete.");
}

run();
