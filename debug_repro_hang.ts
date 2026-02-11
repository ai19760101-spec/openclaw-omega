
console.log("Start debug_repro_hang");

try {
    console.log("Importing config/sessions...");
    await import("./src/config/sessions.js");
    console.log("Imported config/sessions");
} catch (e) {
    console.error("Failed config/sessions", e);
}

try {
    console.log("Importing gateway/call...");
    await import("./src/gateway/call.js");
    console.log("Imported gateway/call");
} catch (e) {
    console.error("Failed gateway/call", e);
}

console.log("Done debug_repro_hang");
