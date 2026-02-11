
console.log("Starting clack import test...");
import("@clack/prompts").then(() => {
    console.log("✅ @clack/prompts passed");
}).catch((e) => {
    console.log("❌ @clack/prompts failed:", e);
});
