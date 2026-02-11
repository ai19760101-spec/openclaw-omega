
console.log("Trace: Start");
(async () => {
    try {
        console.log("Trace: Importing config/sessions/store.ts");
        await import("./src/config/sessions/store.ts");
        console.log("Trace: Success");
    } catch (e) {
        console.error("Trace: Failed", e);
    }
})();
