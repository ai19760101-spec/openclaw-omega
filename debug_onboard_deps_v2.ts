
console.log("Start debug_onboard_deps_v2");

try {
    console.log("Importing @clack/prompts...");
    await import("@clack/prompts");
    console.log("Imported @clack/prompts");
} catch (e) { console.error("Failed @clack/prompts", e); }

try {
    console.log("Importing config/config...");
    await import("./src/config/config.js");
    console.log("Imported config/config");
} catch (e) { console.error("Failed config/config", e); }

try {
    console.log("Importing agents/workspace...");
    await import("./src/agents/workspace.js");
    console.log("Imported agents/workspace");
} catch (e) { console.error("Failed agents/workspace", e); }

try {
    console.log("Importing config/sessions...");
    await import("./src/config/sessions.js");
    console.log("Imported config/sessions");
} catch (e) { console.error("Failed config/sessions", e); }

try {
    console.log("Importing gateway/call...");
    await import("./src/gateway/call.js");
    console.log("Imported gateway/call");
} catch (e) { console.error("Failed gateway/call", e); }

try {
    console.log("Importing gateway/control-ui-shared...");
    await import("./src/gateway/control-ui-shared.js");
    console.log("Imported gateway/control-ui-shared");
} catch (e) { console.error("Failed gateway/control-ui-shared", e); }

try {
    console.log("Importing gateway/net...");
    await import("./src/gateway/net.js");
    console.log("Imported gateway/net");
} catch (e) { console.error("Failed gateway/net", e); }

try {
    console.log("Importing infra/exec-safety...");
    await import("./src/infra/exec-safety.js");
    console.log("Imported infra/exec-safety");
} catch (e) { console.error("Failed infra/exec-safety", e); }

try {
    console.log("Importing infra/tailnet...");
    await import("./src/infra/tailnet.js");
    console.log("Imported infra/tailnet");
} catch (e) { console.error("Failed infra/tailnet", e); }

try {
    console.log("Importing infra/wsl...");
    await import("./src/infra/wsl.js");
    console.log("Imported infra/wsl");
} catch (e) { console.error("Failed infra/wsl", e); }

try {
    console.log("Importing process/exec...");
    await import("./src/process/exec.js");
    console.log("Imported process/exec");
} catch (e) { console.error("Failed process/exec", e); }

try {
    console.log("Importing terminal/prompt-style...");
    await import("./src/terminal/prompt-style.js");
    console.log("Imported terminal/prompt-style");
} catch (e) { console.error("Failed terminal/prompt-style", e); }

try {
    console.log("Importing utils...");
    await import("./src/utils.js");
    console.log("Imported utils");
} catch (e) { console.error("Failed utils", e); }

try {
    console.log("Importing utils/message-channel...");
    await import("./src/utils/message-channel.js");
    console.log("Imported utils/message-channel");
} catch (e) { console.error("Failed utils/message-channel", e); }

try {
    console.log("Importing commands/onboard-helpers...");
    await import("./src/commands/onboard-helpers.js");
    console.log("Imported commands/onboard-helpers");
} catch (e) { console.error("Failed commands/onboard-helpers", e); }

console.log("Done debug_onboard_deps_v2");
