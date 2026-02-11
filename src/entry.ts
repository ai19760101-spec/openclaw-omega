// Ensure module evaluation finishes before starting the app to avoid ESM circular deadlocks.
setImmediate(async () => {
  try {
    const { startup } = await import("./startup.js");
    await startup();
  } catch (error) {
    console.error("[openclaw] Failed to start CLI:", error);
    process.exitCode = 1;
  }
});
