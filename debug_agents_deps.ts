
import fs from 'node:fs';
console.log("DEBUG: Starting agents deps check...");

const deps = [
    "./src/commands/test_dummy.ts",
    "./src/commands/agents.bindings.ts",
    "./src/commands/agents.commands.add.ts",
    "./src/commands/agents.commands.delete.ts",
    "./src/commands/agents.commands.identity.ts",
    "./src/commands/agents.commands.list.ts",
    "./src/commands/agents.config.ts"
];

async function testDeps() {
    for (const dep of deps) {
        console.log(`Loading: ${dep}`);
        try {
            const load = import(dep);
            const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("TIMEOUT")), 5000));
            await Promise.race([load, timeout]);
            console.log(`✅ Loaded: ${dep}`);
        } catch (e: any) {
            console.error(`❌ FAILED: ${dep}`);
            const stack = `Error: ${e.message}\nCode: ${e.code}\nStack: ${e.stack}\nDetails: ${JSON.stringify(e)}`;
            console.error(stack);
            fs.writeFileSync('deps_error.log', `FAILED: ${dep}\n${stack}\n`);
            if (e.message === "TIMEOUT") {
                console.error(`!!! DETECTED HANG in ${dep} !!!`);
                process.exit(1);
            }
        }
    }
}

testDeps().then(() => console.log("Done"));
