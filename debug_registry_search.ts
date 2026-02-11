
const groups = {
    "Group A (Basic)": [
        "../../commands/health.js",
        "../../commands/sessions.js",
        "../../commands/status.js"
    ],
    "Group B (CLI)": [
        "../browser-cli.js",
        "../config-cli.js",
        "../memory-cli.js"
    ],
    "Group C (Complex Registers)": [
        "./register.onboard.js",
        "./register.configure.js",
        "./register.setup.js",
        "./register.message.js"
    ],
    "Group D (Others)": [
        "./register.maintenance.js",
        "./register.subclis.js",
        "./register.status-health-sessions.js"
    ]
};

console.log("DEBUG: Starting Registry Binary Search...");

(async () => {
    for (const [name, files] of Object.entries(groups)) {
        console.log(`\nTesting ${name}...`);
        for (const file of files) {
            process.stdout.write(`  Loading ${file}... `);
            try {
                const load = import(`./src/cli/program/${file}`);
                const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("TIMEOUT")), 2000));
                await Promise.race([load, timeout]);
                console.log("✅ OK");
            } catch (e: any) {
                console.log("❌ FAILED");
                console.error(e);
                process.exit(1);
            }
        }
    }
    console.log("\nAll Done!");
})();
