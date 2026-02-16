# File: schemas/openai.py
"""
OpenAI ChatCompletion Protocol - Pydantic Models

NOTE: These models mirror the OpenAI API spec so that OpenClaw
(or any OpenAI-compatible client) can talk to this proxy without
knowing it's actually hitting Google Gemini under the hood.
"""

import time
import uuid
from typing import Any, Optional

from pydantic import BaseModel, ConfigDict, Field


# ─────────────────────────── Request Models ───────────────────────────


class Message(BaseModel):
    """A single message in the conversation."""

    model_config = ConfigDict(extra="allow")

    role: str = Field(
        ...,
        description="One of: system, user, assistant",
    )
    content: Any = Field(
        default="",
        description="The text content of the message (str, list, or null)",
    )


class ChatCompletionRequest(BaseModel):
    """
    Mirrors `POST /v1/chat/completions` request body.

    Only the fields that OpenClaw actually sends are modelled here;
    the rest are silently ignored by FastAPI.
    """

    model_config = ConfigDict(extra="allow")

    model: str = Field(
        default="gemini-2.0-flash",
        description="Model identifier. Maps to a Gemini model internally.",
    )
    messages: list[Message] = Field(
        ...,
        min_length=1,
        description="Conversation history",
    )
    temperature: Optional[float] = Field(
        default=None,
        ge=0.0,
        le=2.0,
        description="Sampling temperature (0-2)",
    )
    max_tokens: Optional[int] = Field(
        default=None,
        gt=0,
        description="Maximum number of tokens to generate",
    )
    max_completion_tokens: Optional[int] = Field(
        default=None,
        gt=0,
        description="Alternative max tokens field used by newer OpenAI clients",
    )
    top_p: Optional[float] = Field(
        default=None,
        ge=0.0,
        le=1.0,
        description="Nucleus sampling parameter",
    )
    stream: Optional[bool] = Field(
        default=False,
        description="Whether to stream responses (not yet supported)",
    )


# ─────────────────────────── Response Models ──────────────────────────


class UsageInfo(BaseModel):
    """Token usage statistics."""

    prompt_tokens: int = 0
    completion_tokens: int = 0
    total_tokens: int = 0


class ChoiceMessage(BaseModel):
    """The assistant's reply inside a Choice."""

    role: str = "assistant"
    content: str = ""


class Choice(BaseModel):
    """A single completion choice."""

    index: int = 0
    message: ChoiceMessage
    finish_reason: str = "stop"


class ChatCompletionResponse(BaseModel):
    """
    Mirrors the OpenAI `ChatCompletion` response object.

    This is what OpenClaw expects to receive back.
    """

    id: str = Field(default_factory=lambda: f"chatcmpl-{uuid.uuid4().hex[:12]}")
    object: str = "chat.completion"
    created: int = Field(default_factory=lambda: int(time.time()))
    model: str = ""
    choices: list[Choice] = []
    usage: UsageInfo = Field(default_factory=UsageInfo)
