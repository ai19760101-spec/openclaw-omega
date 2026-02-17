# File: services/gemini.py
"""
Gemini Service Layer (google.genai SDK)

Encapsulates all interaction with the Google GenAI SDK (new version).
Converts OpenAI-style message history into Gemini's native format,
calls the model, and returns the raw text response.
"""

import logging
import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

from dotenv import load_dotenv
from google import genai
from google.genai import types
from pydantic import BaseModel
from typing import List, Optional, Union, Dict, Any

class Message(BaseModel):
    role: str
    content: Union[str, List[Dict[str, Any]], None] = None

logger = logging.getLogger(__name__)

# ─── Load environment on module import ────────────────────────────────
load_dotenv()

_API_KEY = os.getenv("GOOGLE_API_KEY", "")
_DEFAULT_MODEL = os.getenv("DEFAULT_GEMINI_MODEL", "gemini-2.0-flash")

if not _API_KEY:
    logger.warning(
        "GOOGLE_API_KEY is not set! "
        "The proxy will fail on any request until a valid key is provided."
    )

# ─── Lazy Client Initialization ──────────────────────────────────────
# NOTE: The Client raises ValueError if api_key is empty at construction.
# We defer creation until the first request so the server can still boot
# and serve health-check / docs endpoints without a key.
_client: genai.Client | None = None


def _get_client() -> genai.Client:
    """Return the shared Client instance, creating it lazily."""
    global _client  # noqa: PLW0603
    if _client is None:
        key = os.getenv("GOOGLE_API_KEY", "")
        if not key:
            raise ValueError(
                "GOOGLE_API_KEY is not configured. "
                "Please set it in the .env file or as an environment variable."
            )
        _client = genai.Client(api_key=key)
        logger.info("Gemini Client initialised successfully.")
    return _client


# ─── Model name mapping ──────────────────────────────────────────────
# NOTE: OpenClaw may send model names like "gpt-4", "gemini-pro", etc.
# This map normalises them to valid Gemini model identifiers.
MODEL_ALIAS_MAP: dict[str, str] = {
    # Direct Gemini names (pass-through)
    "gemini-pro": "gemini-1.5-pro",
    "gemini-flash": "gemini-2.0-flash",
    "gemini-3-flash": "gemini-3-flash-preview",  # User's naming convention
    "gemini-3-pro": "gemini-3-pro-preview",    # User's naming convention
    "gemini-2.0-flash": "gemini-2.0-flash",
    "gemini-2.0-pro": "gemini-2.5-pro", # Upgrade to 2.5
    "gemini-1.5-pro": "gemini-2.5-pro", # Fallback to 2.5
    "gemini-1.5-flash": "gemini-2.5-flash", # Fallback to 2.5
    "gemini-3.0": "gemini-3-pro-preview",
    "gemini-3.0-pro": "gemini-3-pro-preview",
    "gemini-3.0-flash": "gemini-3-flash-preview",
    # Catch-all aliases (OpenClaw sends these if user forces gpt-*)
    "gpt-4": "gemini-2.0-flash",
    "gpt-4o": "gemini-2.0-flash",
    "gpt-3.5-turbo": "gemini-2.0-flash",
    "gpt-5.2-preview-0214": "gemini-2.5-pro",
}


def _resolve_model_name(requested_model: str) -> str:
    """Resolve an incoming model name to a valid Gemini model identifier."""
    # Strip openai/ prefix if present
    if requested_model.startswith("openai/"):
        requested_model = requested_model.replace("openai/", "")
        
    resolved = MODEL_ALIAS_MAP.get(requested_model, requested_model)
    logger.info("Model mapping: '%s' -> '%s'", requested_model, resolved)
    return resolved


def _extract_text_content(content) -> str:
    """
    Extract plain text from OpenAI message content.

    Content can be:
    - str: plain text
    - list: array of content blocks [{"type": "text", "text": "..."}]
    - None/null: empty
    """
    if content is None:
        return ""
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts = []
        for item in content:
            if isinstance(item, dict):
                if item.get("type") == "text":
                    parts.append(item.get("text", ""))
                # NOTE: image_url and other types are skipped for now
            elif isinstance(item, str):
                parts.append(item)
        return "\n".join(parts)
    # Fallback: convert to string
    return str(content)


def _convert_messages_to_gemini_format(
    messages: list[Message],
) -> tuple[str | None, list[types.Content]]:
    """
    Convert OpenAI-style messages to Gemini's Content format.

    Returns:
        (system_instruction, contents)
        - system_instruction: extracted from 'system' role messages, or None
        - contents: list of types.Content objects for the conversation
    """
    system_parts: list[str] = []
    contents: list[types.Content] = []

    for msg in messages:
        text = _extract_text_content(msg.content)
        if msg.role == "system":
            if text:
                system_parts.append(text)
        elif msg.role == "user":
            if text:
                contents.append(
                    types.Content(
                        role="user",
                        parts=[types.Part.from_text(text=text)],
                    )
                )
        elif msg.role == "assistant":
            if text:
                contents.append(
                    types.Content(
                        role="model",
                        parts=[types.Part.from_text(text=text)],
                    )
                )
        else:
            logger.warning("Unknown message role '%s', treating as user", msg.role)
            if text:
                contents.append(
                    types.Content(
                        role="user",
                        parts=[types.Part.from_text(text=text)],
                    )
                )

    system_instruction = "\n\n".join(system_parts) if system_parts else None
    return system_instruction, contents


async def generate_response(
    messages: list[Message],
    model_name: str = "",
    temperature: float | None = None,
    max_tokens: int | None = None,
    top_p: float | None = None,
) -> tuple[str, str]:
    """
    Generate a response from Gemini using the new google.genai SDK.

    Args:
        messages: OpenAI-format message list
        model_name: requested model identifier
        temperature: sampling temperature
        max_tokens: maximum output tokens
        top_p: nucleus sampling parameter

    Returns:
        (response_text, resolved_model_name)
    """
    client = _get_client()
    resolved_model = _resolve_model_name(model_name or _DEFAULT_MODEL)
    system_instruction, contents = _convert_messages_to_gemini_format(messages)

    if not contents:
        raise ValueError("At least one user message is required")

    # Build generation config
    config_kwargs: dict = {}
    if system_instruction:
        config_kwargs["system_instruction"] = system_instruction
    if temperature is not None:
        config_kwargs["temperature"] = temperature
    if max_tokens is not None:
        config_kwargs["max_output_tokens"] = max_tokens
    if top_p is not None:
        config_kwargs["top_p"] = top_p

    generate_config = (
        types.GenerateContentConfig(**config_kwargs) if config_kwargs else None
    )

    # Call the Gemini API via the new Client interface
    response = client.models.generate_content(
        model=resolved_model,
        contents=contents,
        config=generate_config,
    )

    response_text = response.text or ""
    logger.info(
        "Gemini response received: model=%s, length=%d chars",
        resolved_model,
        len(response_text),
    )
    return response_text, resolved_model
