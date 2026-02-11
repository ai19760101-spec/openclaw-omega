import { validateConfigObjectWithPlugins } from "./src/config/validation.js";
import fs from "fs";
import JSON5 from "json5";

const raw = fs.readFileSync("openclaw.json", "utf-8");
const parsed = JSON5.parse(raw);

console.log("Running Full Validation...");
const result = validateConfigObjectWithPlugins(parsed);

if (!result.ok) {
    console.log("Validation Failed:");
    result.issues.forEach(issue => {
        console.log(`- Path: ${issue.path}`);
        console.log(`  Message: ${issue.message}`);
    });
} else {
    console.log("Validation Succeeded!");
    if (result.warnings.length > 0) {
        console.log("Warnings:");
        result.warnings.forEach(w => console.log(`- ${w.path}: ${w.message}`));
    }
}
