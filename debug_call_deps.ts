
const deps = [
    "./src/infra/device-identity.ts",
    "./src/infra/tailnet.ts",
    "./src/infra/tls/gateway.ts",
    "./src/utils/message-channel.ts",
    "./src/gateway/client.ts",
    "./src/gateway/net.ts",
    "./src/gateway/protocol/index.ts"
];

console.log("DEBUG: Starting call deps check...");

(async () => {
    for (const dep of deps) {
        console.log(`Loading: ${dep}`);
        try {
            const load = import(dep);
            const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("TIMEOUT")), 3000));
            await Promise.race([load, timeout]);
            console.log(`✅ Loaded: ${dep}`);
        } catch (e: any) {
            console.error(`❌ FAILED: ${dep}`);
            // console.error(e);
        }
    }
    console.log("Done");
})();
