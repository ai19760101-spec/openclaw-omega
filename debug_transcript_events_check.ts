
console.log("Trace: Start");
(async () => {
    try {
        console.log("Trace: Importing sessions/transcript-events.ts");
        await import("./src/sessions/transcript-events.ts");
        console.log("Trace: Success");
    } catch (e) {
        console.error("Trace: Failed", e);
    }
})();
