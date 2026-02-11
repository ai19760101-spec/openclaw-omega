
console.log("Start debug_delete_deps");

try {
    console.log("Importing agent-scope...");
    await import("./src/agents/agent-scope.js");
    console.log("Imported agent-scope");
} catch (e) {
    console.error("Failed agent-scope", e);
}

try {
    console.log("Importing config/config...");
    await import("./src/config/config.js");
    console.log("Imported config/config");
} catch (e) {
    console.error("Failed config/config", e);
}

try {
    console.log("Importing config/logging...");
    await import("./src/config/logging.js");
    console.log("Imported config/logging");
} catch (e) {
    console.error("Failed config/logging", e);
}

try {
    console.log("Importing config/sessions...");
    await import("./src/config/sessions.js");
    console.log("Imported config/sessions");
} catch (e) {
    console.error("Failed config/sessions", e);
}

try {
    console.log("Importing routing/session-key...");
    await import("./src/routing/session-key.js");
    console.log("Imported routing/session-key");
} catch (e) {
    console.error("Failed routing/session-key", e);
}

try {
    console.log("Importing wizard/clack-prompter...");
    await import("./src/wizard/clack-prompter.js");
    console.log("Imported wizard/clack-prompter");
} catch (e) {
    console.error("Failed wizard/clack-prompter", e);
}

try {
    console.log("Importing agents.command-shared...");
    await import("./src/commands/agents.command-shared.js");
    console.log("Imported agents.command-shared");
} catch (e) {
    console.error("Failed agents.command-shared", e);
}

try {
    console.log("Importing agents.config...");
    await import("./src/commands/agents.config.js");
    console.log("Imported agents.config");
} catch (e) {
    console.error("Failed agents.config", e);
}

try {
    console.log("Importing onboard-helpers...");
    await import("./src/commands/onboard-helpers.js");
    console.log("Imported onboard-helpers");
} catch (e) {
    console.error("Failed onboard-helpers", e);
}

console.log("Done debug_delete_deps");
