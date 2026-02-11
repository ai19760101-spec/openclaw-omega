
console.log("Trace: Start");
(async () => {
    try {
        console.log("Trace: Importing agents/model-catalog.ts");
        await import("./src/agents/model-catalog.ts");
        console.log("Trace: Success");
    } catch (e) {
        console.error("Trace: Failed", e);
    }
})();
