
console.log("Trace: Start");
(async () => {
    try {
        console.log("Trace: Importing health.js");
        await import("./src/commands/health.ts");
        console.log("Trace: Success");
    } catch (e) {
        console.error("Trace: Failed", e);
    }
})();
