# File: api/endpoints/proxy.py
"""
Proxy Endpoint - The Bridge

Handles incoming OpenAI-format requests, delegates to the Gemini service,
and wraps the result back into OpenAI-compatible JSON.
Supports both streaming (SSE) and non-streaming responses.
"""

import json
import logging
import time
import uuid

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from schemas.openai import (
    ChatCompletionRequest,
    ChatCompletionResponse,
    Choice,
    ChoiceMessage,
    UsageInfo,
)
from services.gemini import generate_response

logger = logging.getLogger(__name__)
router = APIRouter()


def _build_sse_chunk(
    chunk_id: str,
    model: str,
    content: str = "",
    finish_reason: str | None = None,
) -> str:
    """Build a single SSE data line in OpenAI's streaming format."""
    delta = {}
    if content:
        delta["content"] = content
        delta["role"] = "assistant"
    chunk = {
        "id": chunk_id,
        "object": "chat.completion.chunk",
        "created": int(time.time()),
        "model": model,
        "choices": [
            {
                "index": 0,
                "delta": delta,
                "finish_reason": finish_reason,
            }
        ],
    }
    return f"data: {json.dumps(chunk)}\n\n"


async def _stream_response(request: ChatCompletionRequest):
    """
    Get the full response from Gemini, then emit it as SSE chunks.

    Strategy: Fetch the complete response first, then simulate streaming
    by emitting the text in word-level chunks. This is the most reliable
    approach since the Gemini SDK's native streaming can be flaky.
    """
    chunk_id = f"chatcmpl-{uuid.uuid4().hex[:12]}"

    try:
        start_time = time.monotonic()

        response_text, resolved_model = await generate_response(
            messages=request.messages,
            model_name=request.model,
            temperature=request.temperature,
            max_tokens=request.max_tokens or request.max_completion_tokens,
            top_p=request.top_p,
        )

        elapsed = time.monotonic() - start_time
        logger.info("Gemini responded in %.2f seconds (streaming mode)", elapsed)

        # Emit the full response as a single chunk for reliability
        # NOTE: Word-level chunking can be added later for UX improvement
        yield _build_sse_chunk(chunk_id, resolved_model, content=response_text)

        # Send the final chunk with finish_reason
        yield _build_sse_chunk(chunk_id, resolved_model, finish_reason="stop")

        # SSE termination signal
        yield "data: [DONE]\n\n"

    except Exception as e:
        logger.error("Gemini API error during streaming: %s", e, exc_info=True)
        error_chunk = {
            "error": {
                "message": f"Gemini backend error: {type(e).__name__}: {e}",
                "type": "server_error",
            }
        }
        yield f"data: {json.dumps(error_chunk)}\n\n"
        yield "data: [DONE]\n\n"


@router.post(
    "/v1/chat/completions",
    summary="OpenAI-Compatible Chat Completion (Gemini Backend)",
)
async def chat_completions(request: ChatCompletionRequest):
    """
    Receive an OpenAI ChatCompletion request, forward it to Google Gemini,
    and return the response in OpenAI's expected JSON format.

    Supports both streaming (SSE) and non-streaming modes.
    """
    logger.info(
        "Incoming request: model=%s, messages=%d, stream=%s",
        request.model,
        len(request.messages),
        request.stream,
    )

    # --- Streaming mode ---
    if request.stream:
        return StreamingResponse(
            _stream_response(request),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            },
        )

    # --- Non-streaming mode ---
    try:
        start_time = time.monotonic()

        response_text, resolved_model = await generate_response(
            messages=request.messages,
            model_name=request.model,
            temperature=request.temperature,
            max_tokens=request.max_tokens or request.max_completion_tokens,
            top_p=request.top_p,
        )

        elapsed = time.monotonic() - start_time
        logger.info("Gemini responded in %.2f seconds", elapsed)

        estimated_prompt_tokens = sum(
            len(str(m.content or "")) // 4 for m in request.messages
        )
        estimated_completion_tokens = len(response_text) // 4

        return ChatCompletionResponse(
            model=resolved_model,
            choices=[
                Choice(
                    index=0,
                    message=ChoiceMessage(
                        role="assistant",
                        content=response_text,
                    ),
                    finish_reason="stop",
                )
            ],
            usage=UsageInfo(
                prompt_tokens=estimated_prompt_tokens,
                completion_tokens=estimated_completion_tokens,
                total_tokens=estimated_prompt_tokens + estimated_completion_tokens,
            ),
        )

    except ValueError as e:
        logger.error("Validation error: %s", e)
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error("Gemini API error: %s", e, exc_info=True)
        raise HTTPException(
            status_code=502,
            detail=f"Gemini backend error: {type(e).__name__}: {e}",
        )


@router.get("/v1/models", summary="List available models")
async def list_models():
    """
    Return a list of available models in OpenAI's format.
    This helps OpenClaw know what models are available.
    """
    models = [
        {"id": "gemini-3-flash-preview", "object": "model", "owned_by": "google"},
        {"id": "gemini-3.1-pro-preview", "object": "model", "owned_by": "google"},
        {"id": "gemini-2.0-flash", "object": "model", "owned_by": "google"},
        {"id": "gemini-2.0-pro", "object": "model", "owned_by": "google"},
        {"id": "gemini-1.5-pro", "object": "model", "owned_by": "google"},
        {"id": "gemini-1.5-flash", "object": "model", "owned_by": "google"},
    ]
    return {"object": "list", "data": models}
