console.log("Start");
try {
    await import("./src/commands/agents.commands.add.ts");
    console.log("End");
} catch (e) {
    console.error(e);
}
