
console.log("DEBUG: Starting model-selection isolation check...");
(async () => {
    try {
        const load = import("./src/agents/model-selection.ts");
        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("TIMEOUT")), 3000));
        await Promise.race([load, timeout]);
        console.log("✅ Loaded: ./src/agents/model-selection.ts");
    } catch (e: any) {
        console.error("❌ FAILED: ./src/agents/model-selection.ts");
        console.error(e);
    }
})();
