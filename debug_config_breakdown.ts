
const deps = [
    "./src/config/io.ts",
    "./src/config/legacy-migrate.ts",
    "./src/config/paths.ts",
    "./src/config/runtime-overrides.ts",
    "./src/config/types.ts",
    "./src/config/validation.ts",
    "./src/config/zod-schema.ts"
];

console.log("DEBUG: Starting config breakdown...");

(async () => {
    for (const dep of deps) {
        console.log(`Loading: ${dep}`);
        try {
            const load = import(dep);
            const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("TIMEOUT")), 3000));
            await Promise.race([load, timeout]);
            console.log(`✅ Loaded: ${dep}`);
        } catch (e: any) {
            console.error(`❌ FAILED: ${dep}`);
            // console.error(e);
        }
    }
    console.log("Done");
})();
