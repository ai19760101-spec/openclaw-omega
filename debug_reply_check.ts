
console.log("Trace: Start");
(async () => {
    try {
        console.log("Trace: Importing auto-reply/reply.ts");
        await import("./src/auto-reply/reply.ts");
        console.log("Trace: Success");
    } catch (e) {
        console.error("Trace: Failed", e);
    }
})();
