
console.log("DEBUG: Starting imports...");
try {
    await import("./src/cli/profile.js");
    console.log("DEBUG: Included ./src/cli/profile.js");

    await import("./src/infra/env.js");
    console.log("DEBUG: Included ./src/infra/env.js");

    await import("./src/infra/warning-filter.js");
    console.log("DEBUG: Included ./src/infra/warning-filter.js");

    await import("./src/process/child-process-bridge.js");
    console.log("DEBUG: Included ./src/process/child-process-bridge.js");


    // Route.js dependencies
    await import("./src/cli/banner.js");
    console.log("DEBUG: Included ./src/cli/banner.js");

    await import("./src/cli/program/config-guard.js");
    console.log("DEBUG: Included ./src/cli/program/config-guard.js");

    // This one imports many commands, likely the culprit
    await import("./src/cli/program/command-registry.js");
    console.log("DEBUG: Included ./src/cli/program/command-registry.js");

    // Finally check run-main
    await import("./src/cli/run-main.js");
    console.log("DEBUG: Included ./src/cli/run-main.js");

} catch (e) {
    console.error("DEBUG: IMPORT ERROR:", e);
}
console.log("DEBUG: Imports finished.");
```
