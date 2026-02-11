
console.log("DEBUG: Checking debug_helper via dynamic import...");
try {
    await import("./src/commands/debug_helper.ts");
    console.log("DEBUG: Success");
} catch (e) {
    console.error("DEBUG: Failed", e);
    process.exit(1);
}
