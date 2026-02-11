
console.log("Starting direct register-maintenance import test...");
import("./src/cli/program/register.maintenance.js").then(() => {
    console.log("✅ register-maintenance passed");
}).catch((e) => {
    console.log("❌ register-maintenance failed:", e);
});
