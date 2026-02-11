
console.log("DEBUG: Starting delete isolation check...");
(async () => {
    try {
        const load = import("./src/commands/agents.commands.delete.ts");
        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("TIMEOUT")), 3000));
        await Promise.race([load, timeout]);
        console.log("✅ Loaded: ./src/commands/agents.commands.delete.ts");
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
