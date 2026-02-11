import { spawn } from "node:child_process";

console.log("Starting gateway test...");

const child = spawn("npx", ["tsx", "src/main.ts", "gateway", "start"], {
    cwd: process.cwd(),
    env: { ...process.env, OPENCLAW_DISABLE_CONFIG_CACHE: "1" },
    shell: true
});

child.stdout.on("data", (data) => {
    const str = data.toString();
    console.log(`[STDOUT] ${str.trim()}`);
});

child.stderr.on("data", (data) => {
    const str = data.toString();
    console.log(`[STDERR] ${str.trim()}`);
});

const timeout = setTimeout(() => {
    console.log("Test timed out after 15s (expected if it hangs, unexpected if it should finish)");
    child.kill();
    process.exit(1);
}, 15000);

// We expect success if we see something like "Gateway listening"
child.stdout.on("data", (data) => {
    if (data.toString().includes("Gateway listening") || data.toString().includes("started")) {
        console.log("✅ GATEWAY STARTED SUCCESSFULLY");
        clearTimeout(timeout);
        child.kill();
        process.exit(0);
    }
});

child.on("close", (code) => {
    console.log(`Gateway process closed with code ${code}`);
});
