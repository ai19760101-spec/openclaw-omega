
console.log("Starting metadata breakdown test...");

async function test(name: string, path: string) {
    console.log(`Testing ${name}...`);
    try {
        await import(path);
        console.log(`✅ ${name} passed`);
    } catch (e) {
        console.log(`❌ ${name} failed:`, e);
    }
}

async function run() {
    await test("chat-type", "./src/channels/chat-type.js");
    await test("conversation-label", "./src/channels/conversation-label.js");
    await test("dock", "./src/channels/dock.js");
    await test("plugins-index", "./src/channels/plugins/index.js");
    await test("message-channel", "./src/utils/message-channel.js");
    await test("group", "./src/config/sessions/group.js");
    console.log("Metadata breakdown complete.");
}

run();
