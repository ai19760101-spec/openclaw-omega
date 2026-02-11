
console.log("Trace: Start");
(async () => {
  try {
    console.log("Trace: Importing config/config.ts");
    await import("./src/config/config.ts");
    console.log("Trace: Success");
  } catch (e) {
    console.error("Trace: Failed", e);
  }
})();
