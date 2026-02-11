
console.log("Trace: Start");
(async () => {
    try {
        console.log("Trace: Importing plugins/runtime.ts");
        await import("./src/plugins/runtime.ts");
        console.log("Trace: Success");
    } catch (e) {
        console.error("Trace: Failed", e);
    }
})();
