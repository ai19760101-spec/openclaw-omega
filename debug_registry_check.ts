
console.log("Trace: Start");
(async () => {
    try {
        console.log("Trace: Importing channels/registry.ts");
        await import("./src/channels/registry.ts");
        console.log("Trace: Success");
    } catch (e) {
        console.error("Trace: Failed", e);
    }
})();
