
import type { ChannelId, ChannelPlugin } from "./types.js";
import { requireActivePluginRegistry } from "../../plugins/runtime.js";
import { CHAT_CHANNEL_ORDER, type ChatChannelId, normalizeAnyChannelId } from "../registry.js";

function listPluginChannels(): ChannelPlugin[] {
    const registry = requireActivePluginRegistry();
    return registry.channels.map((entry) => entry.plugin);
}

function dedupeChannels(channels: ChannelPlugin[]): ChannelPlugin[] {
    const seen = new Set<string>();
    const resolved: ChannelPlugin[] = [];
    for (const plugin of channels) {
        const id = String(plugin.id).trim();
        if (!id || seen.has(id)) {
            continue;
        }
        seen.add(id);
        resolved.push(plugin);
    }
    return resolved;
}

export function listChannelPlugins(): ChannelPlugin[] {
    const combined = dedupeChannels(listPluginChannels());
    return combined.toSorted((a, b) => {
        const indexA = CHAT_CHANNEL_ORDER.indexOf(a.id as ChatChannelId);
        const indexB = CHAT_CHANNEL_ORDER.indexOf(b.id as ChatChannelId);
        const orderA = a.meta.order ?? (indexA === -1 ? 999 : indexA);
        const orderB = b.meta.order ?? (indexB === -1 ? 999 : indexB);
        if (orderA !== orderB) {
            return orderA - orderB;
        }
        return a.id.localeCompare(b.id);
    });
}

export function getChannelPlugin(id: ChannelId): ChannelPlugin | undefined {
    const resolvedId = String(id).trim();
    if (!resolvedId) {
        return undefined;
    }
    return listChannelPlugins().find((plugin) => plugin.id === resolvedId);
}

export function normalizeChannelId(raw?: string | null): ChannelId | null {
    // Channel docking: keep input normalization centralized in src/channels/registry.ts.
    // Plugin registry must be initialized before calling.
    return normalizeAnyChannelId(raw);
}
