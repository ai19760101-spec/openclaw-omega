
import os from "node:os";
import path from "node:path";

function normalize(value) {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
}

function resolveRawHomeDir(env, homedir) {
    const explicitHome = normalize(env.OPENCLAW_HOME);
    if (explicitHome) {
        if (explicitHome === "~" || explicitHome.startsWith("~/") || explicitHome.startsWith("~\\")) {
            const fallbackHome = normalize(env.HOME) ?? normalize(env.USERPROFILE) ?? homedir();
            if (fallbackHome) {
                return explicitHome.replace(/^~(?=$|[\\/])/, fallbackHome);
            }
        }
        return explicitHome;
    }
    const envHome = normalize(env.HOME);
    if (envHome) return envHome;
    const userProfile = normalize(env.USERPROFILE);
    if (userProfile) return userProfile;
    return homedir();
}

function resolveRequiredHomeDir(env, homedir) {
    const raw = resolveRawHomeDir(env, homedir);
    return raw ? path.resolve(raw) : path.resolve(process.cwd());
}

function expandHomePrefix(input, home) {
    if (!input.startsWith("~")) return input;
    if (!home) return input;
    // THE VULNERABLE REGEX
    const result = input.replace(/^~(?=$|[\\/])/, home);
    return result;
}

const env = process.env;
const home = resolveRequiredHomeDir(env, os.homedir);
console.log("Resolved Home:", home);

const stateDirInput = "~/.openclaw";
const expanded = expandHomePrefix(stateDirInput, home);
console.log("Expanded ~/.openclaw:", expanded);

const dotStateDirInput = "~.openclaw";
const expandedDot = expandHomePrefix(dotStateDirInput, home);
console.log("Expanded ~.openclaw:", expandedDot);

console.log("path.join(home, '.openclaw'):", path.join(home, ".openclaw"));
