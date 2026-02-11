
const deps = [
    "./src/cli/program/command-registry.ts"
];

console.log("DEBUG: Starting registry deps check...");

(async () => {
    for (const dep of deps) {
        console.log(`Loading: ${dep}`);
        try {
            const load = import(dep);
            const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("TIMEOUT")), 5000));
            await Promise.race([load, timeout]);
            console.log(`✅ Loaded: ${dep}`);
        } catch (e: any) {
            console.error(`❌ FAILED: ${dep}`);
            console.error(e);
            process.exit(1);
        }
    }
    console.log("Done");
})();
