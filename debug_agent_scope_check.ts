
console.log("Trace: Start");
(async () => {
    try {
        console.log("Trace: Importing agents/agent-scope.ts");
        await import("./src/agents/agent-scope.ts");
        console.log("Trace: Success");
    } catch (e) {
        console.error("Trace: Failed", e);
    }
})();
