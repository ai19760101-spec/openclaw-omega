
console.log("DEBUG: Starting onboard-helpers isolation check...");
(async () => {
    try {
        const load = import("./src/commands/onboard-helpers.ts");
        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("TIMEOUT")), 3000));
        await Promise.race([load, timeout]);
        console.log("✅ Loaded: ./src/commands/onboard-helpers.ts");
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
