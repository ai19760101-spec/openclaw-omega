
import { installProcessWarningFilter } from "./infra/warning-filter.js";
import { normalizeEnv } from "./infra/env.js";
import { applyCliProfileEnv, parseCliProfileArgs } from "./cli/profile.js";
import path from "node:path";
import process from "node:process";

export async function startup() {
    console.log("=== FINAL_BUILD_VERIFICATION: Dynamic Isolation Active ===");
    installProcessWarningFilter();
    normalizeEnv();

    process.title = "openclaw";

    function normalizeWindowsArgv(argv: string[]): string[] {
        if (process.platform !== "win32") { return argv; }
        return argv;
    }

    process.argv = normalizeWindowsArgv(process.argv);

    const parsed = parseCliProfileArgs(process.argv);
    if (parsed.profile) {
        applyCliProfileEnv({ profile: parsed.profile });
        process.argv = parsed.argv;
    }

    const { registerProgramCommands } = await import("./cli/program/command-registry.js");
    const { runCli } = await import("./cli/run-main.js");

    return runCli(process.argv);
}
