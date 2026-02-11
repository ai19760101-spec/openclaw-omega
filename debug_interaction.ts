
console.log("Start debug_interaction");

try {
    console.log("Importing agents/agent-scope...");
    await import("./src/agents/agent-scope.js");
    console.log("Imported agents/agent-scope");
} catch (e) { console.error("Failed agents/agent-scope", e); }

try {
    console.log("Importing commands/onboard-helpers...");
    await import("./src/commands/onboard-helpers.js");
    console.log("Imported commands/onboard-helpers");
} catch (e) { console.error("Failed commands/onboard-helpers", e); }

console.log("Done debug_interaction");
