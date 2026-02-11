
console.log("Trace: Start");
(async () => {
    try {
        console.log("Trace: Importing config/config.js");
        await import("./src/config/config.js");
        console.log("Trace: Success");
    } catch (e) {
        console.error("Trace: Failed", e);
    }
})();
