
import { defaultRuntime } from "./src/runtime.js";
console.log("Starting breakdown test...");

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
    // We know command-registry hangs. Let's look at its direct core imports.
    await test("health", "./src/commands/health.js");
    await test("sessions", "./src/commands/sessions.js");
    await test("status", "./src/commands/status.js");
    await test("agents-barrel", "./src/commands/agents.js");
    await test("register-agent", "./src/cli/program/register.agent.js");
    await test("register-configure", "./src/cli/program/register.configure.js");
    console.log("Breakdown complete.");
}

run();
