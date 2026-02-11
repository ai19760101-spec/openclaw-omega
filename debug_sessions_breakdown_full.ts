
console.log("Start debug_sessions_breakdown_full");

try {
    console.log("Importing sessions/types...");
    await import("./src/config/sessions/types.js");
    console.log("Imported sessions/types");
} catch (e) {
    console.error("Failed sessions/types", e);
}

try {
    console.log("Importing sessions/group...");
    await import("./src/config/sessions/group.js");
    console.log("Imported sessions/group");
} catch (e) {
    console.error("Failed sessions/group", e);
}

try {
    console.log("Importing sessions/metadata...");
    await import("./src/config/sessions/metadata.js");
    console.log("Imported sessions/metadata");
} catch (e) {
    console.error("Failed sessions/metadata", e);
}

try {
    console.log("Importing sessions/paths...");
    await import("./src/config/sessions/paths.js");
    console.log("Imported sessions/paths");
} catch (e) {
    console.error("Failed sessions/paths", e);
}

try {
    console.log("Importing sessions/store...");
    await import("./src/config/sessions/store.js");
    console.log("Imported sessions/store");
} catch (e) {
    console.error("Failed sessions/store", e);
}

try {
    console.log("Importing sessions/main-session...");
    await import("./src/config/sessions/main-session.js");
    console.log("Imported sessions/main-session");
} catch (e) {
    console.error("Failed sessions/main-session", e);
}

try {
    console.log("Importing sessions/reset...");
    await import("./src/config/sessions/reset.js");
    console.log("Imported sessions/reset");
} catch (e) {
    console.error("Failed sessions/reset", e);
}

try {
    console.log("Importing sessions/session-key...");
    await import("./src/config/sessions/session-key.js");
    console.log("Imported sessions/session-key");
} catch (e) {
    console.error("Failed sessions/session-key", e);
}

try {
    console.log("Importing sessions/transcript...");
    await import("./src/config/sessions/transcript.js");
    console.log("Imported sessions/transcript");
} catch (e) {
    console.error("Failed sessions/transcript", e);
}

console.log("Done debug_sessions_breakdown_full");
