
console.log("Start debug_helper in src/commands");
import { moveToTrash } from "./onboard-helpers.js";

type AgentsDeleteOptions = {
    id: string;
};

export async function agentsDeleteCommand(
    opts: AgentsDeleteOptions,
    runtime: any = {},
) {
    console.log("Mock agentsDeleteCommand called");
    await moveToTrash("foo", runtime);
}
console.log("Loaded both with function export");
