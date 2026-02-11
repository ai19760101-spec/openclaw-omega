import fs from "node:fs";
import { spawnSync } from "node:child_process";

async function testImport(filepath: string) {
    process.stdout.write(`Testing ${filepath}... `);

    const result = spawnSync("npx", ["tsx", "-e", `import("./${filepath}").then(() => console.log("OK")).catch(e => { console.error(e); process.exit(1); })`], {
        cwd: process.cwd(),
        timeout: 5000,
        encoding: "utf8"
    });

    if (result.status === 0 && result.stdout.includes("OK")) {
        console.log("✅ SUCCESS");
    } else if (result.error && (result.error as any).code === "ETIMEDOUT") {
        console.log("❌ TIMEOUT");
    } else {
        console.log("❌ FAILED");
        // console.log(result.stderr || result.stdout);
    }
}

async function run() {
    const files = fs.readdirSync("src/commands")
        .filter(f => f.endsWith(".ts") && !f.includes(".test.ts") && !f.includes(".bak") && !f.startsWith("debug_"));

    for (const file of files) {
        await testImport(`src/commands/${file}`);
    }
}

run().catch(console.error);
