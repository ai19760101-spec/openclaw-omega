
console.log("Trace: Start");
(async () => {
    try {
        console.log("Trace: Importing signal/format.ts");
        await import("./src/signal/format.ts");
        console.log("Trace: Success");
    } catch (e) {
        console.error("Trace: Failed", e);
    }
})();
