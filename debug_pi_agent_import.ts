
console.log("Start debug_pi_agent_import");

try {
    console.log("Importing @mariozechner/pi-coding-agent...");
    await import("@mariozechner/pi-coding-agent");
    console.log("Imported @mariozechner/pi-coding-agent");
} catch (e) {
    console.error("Failed @mariozechner/pi-coding-agent", e);
}

try {
    console.log("Importing config/sessions/transcript...");
    await import("./src/config/sessions/transcript.js");
    console.log("Imported config/sessions/transcript");
} catch (e) {
    console.error("Failed config/sessions/transcript", e);
}

console.log("Done debug_pi_agent_import");
