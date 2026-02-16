# File: main.py
"""
Gemini Adapter Proxy - Entry Point

A lightweight FastAPI proxy that translates OpenAI ChatCompletion
protocol into Google Gemini API calls.

Usage:
    python main.py
    # or
    uvicorn main:app --host 0.0.0.0 --port 8001
"""

import logging
import os

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

from api.endpoints.proxy import router as proxy_router


class DebugRequestMiddleware(BaseHTTPMiddleware):
    """Log every incoming request for debugging OpenClaw integration."""

    async def dispatch(self, request: Request, call_next):
        body = b""
        try:
            body = await request.body()
        except Exception:
            pass
        logger = logging.getLogger("gemini-proxy.debug")
        logger.info(
            ">>> %s %s | body=%d bytes",
            request.method,
            request.url,
            len(body),
        )
        if body and len(body) < 2000:
            logger.info(">>> BODY: %s", body.decode("utf-8", errors="replace"))
        response = await call_next(request)
        logger.info(
            "<<< %s %s => %d",
            request.method,
            request.url.path,
            response.status_code,
        )
        return response

# ─── Environment ──────────────────────────────────────────────────────
load_dotenv()

PROXY_PORT = int(os.getenv("PROXY_PORT", "8001"))

# ─── Logging ──────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s │ %(levelname)-7s │ %(name)s │ %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger("gemini-proxy")

# ─── FastAPI App ──────────────────────────────────────────────────────
app = FastAPI(
    title="Gemini Adapter Proxy",
    description=(
        "Translates OpenAI ChatCompletion requests into Google Gemini API calls. "
        "Part of the Antigravity OMEGA ecosystem."
    ),
    version="1.0.0",
)

# CORS: Allow all origins since this is a local-only proxy
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Debug middleware: log every request for OpenClaw integration debugging
app.add_middleware(DebugRequestMiddleware)

# ─── Routes ───────────────────────────────────────────────────────────
app.include_router(proxy_router)


@app.get("/", summary="Health Check")
async def health_check():
    """Simple health check endpoint."""
    return {
        "status": "ok",
        "service": "Gemini Adapter Proxy",
        "version": "1.0.0",
        "port": PROXY_PORT,
    }


@app.get("/health", summary="Health Check (alias)")
async def health():
    """Alias for health check - compatible with OMEGA health monitoring."""
    return {"status": "ok"}


# ─── Main ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    logger.info("=" * 60)
    logger.info("  Gemini Adapter Proxy v1.0.0")
    logger.info("  Listening on http://0.0.0.0:%d", PROXY_PORT)
    logger.info("  Docs at http://localhost:%d/docs", PROXY_PORT)
    logger.info("=" * 60)
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=PROXY_PORT,
        reload=True,
        log_level="info",
    )
