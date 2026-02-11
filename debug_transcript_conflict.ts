
console.log("Trace: Start");
(async () => {
    try {
        console.log("Trace: Importing config/markdown-tables.ts");
        await import("./src/config/markdown-tables.ts");
        console.log("Trace: Markdown Tables Loaded");

        console.log("Trace: Importing config/sessions/transcript.ts");
        await import("./src/config/sessions/transcript.ts");
        console.log("Trace: Transcript Loaded");

        console.log("Trace: Success");
    } catch (e) {
        console.error("Trace: Failed", e);
    }
})();
