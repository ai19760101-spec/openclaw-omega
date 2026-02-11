
console.log("Trace: Start");
(async () => {
    try {
        console.log("Trace: Importing channels/plugins/types.ts");
        await import("./src/channels/plugins/types.ts");
        console.log("Trace: Success");
    } catch (e) {
        console.error("Trace: Failed", e);
    }
})();
