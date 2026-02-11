import { normalizeProviderId } from "./provider-utils.js";

const ANTHROPIC_MODEL_ALIASES: Record<string, string> = {
    "opus-4.6": "claude-opus-4-6",
    "opus-4.5": "claude-opus-4-5",
    "sonnet-4.5": "claude-sonnet-4-5",
};

export function normalizeAnthropicModelId(model: string): string {
    const trimmed = model.trim();
    if (!trimmed) {
        return trimmed;
    }
    const lower = trimmed.toLowerCase();
    return ANTHROPIC_MODEL_ALIASES[lower] ?? trimmed;
}

export function normalizeGoogleModelId(id: string): string {
    if (id === "gemini-3-pro") {
        return "gemini-3-pro-preview";
    }
    if (id === "gemini-3-flash") {
        return "gemini-3-flash-preview";
    }
    return id;
}

function normalizeProviderModelId(provider: string, model: string): string {
    if (provider === "anthropic") {
        return normalizeAnthropicModelId(model);
    }
    if (provider === "google") {
        return normalizeGoogleModelId(model);
    }
    return model;
}

export type ModelRef = {
    provider: string;
    model: string;
};

export function parseModelRef(raw: string, defaultProvider: string): ModelRef | null {
    const trimmed = raw.trim();
    if (!trimmed) {
        return null;
    }
    const slash = trimmed.indexOf("/");
    if (slash === -1) {
        const provider = normalizeProviderId(defaultProvider);
        const model = normalizeProviderModelId(provider, trimmed);
        return { provider, model };
    }
    const providerRaw = trimmed.slice(0, slash).trim();
    const provider = normalizeProviderId(providerRaw);
    const model = trimmed.slice(slash + 1).trim();
    if (!provider || !model) {
        return null;
    }
    const normalizedModel = normalizeProviderModelId(provider, model);
    return { provider, model: normalizedModel };
}

export function modelKey(provider: string, model: string) {
    return `${provider}/${model}`;
}
