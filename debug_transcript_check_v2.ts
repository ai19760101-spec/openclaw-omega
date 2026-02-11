
console.log("Trace: Start");
(async () => {
    try {
        console.log("Trace: Importing config/sessions/transcript.ts");
        await import("./src/config/sessions/transcript.ts");
        console.log("Trace: Success");
    } catch (e) {
        console.error("Trace: Failed", e);
    }
})();
