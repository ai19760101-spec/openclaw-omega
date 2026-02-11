
console.log("Start debug_repro_hang_full");

try {
    console.log("Importing globals...");
    await import("./src/globals.js");
    console.log("Imported globals");
} catch (e) {
    console.error("Failed globals", e);
}

try {
    console.log("Importing exec...");
    await import("./src/process/exec.js");
    console.log("Imported exec");
} catch (e) {
    console.error("Failed exec", e);
}

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

console.log("Done debug_repro_hang_full");
