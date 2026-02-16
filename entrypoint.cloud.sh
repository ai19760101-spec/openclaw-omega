#!/bin/bash
# 🦞 OMEGA Cloud Nexus v4.0 - Dual-Process Entrypoint
# Manages: Node.js (OpenClaw Gateway) + Python (Gemini Proxy)
set -e

echo "☁️ [Cloud Nexus v4.0] Initializing..."

# ─── 1. Start Gemini Adapter Proxy (Python) ──────────────
# NOTE: Binds to 127.0.0.1 (container-internal only, not public)
echo "🛰️  Starting Gemini Adapter Proxy on :8001 (internal)..."
/app/gemini-proxy/.venv/bin/python -m uvicorn \
  main:app --host 127.0.0.1 --port 8001 \
  --app-dir /app/gemini-proxy &
PROXY_PID=$!

# ─── 2. Start OpenClaw Gateway (Node.js) ─────────────────
echo "🦞  Starting OpenClaw Gateway on 0.0.0.0:3000..."
node openclaw.mjs gateway \
  --allow-unconfigured --port 3000 --bind lan &
GATEWAY_PID=$!

# ─── 3. Graceful Shutdown (Rule 0.5: Self-Preservation) ──
cleanup() {
  echo "🛑 [Cloud Nexus] Shutdown signal received."
  kill $PROXY_PID $GATEWAY_PID 2>/dev/null || true
  wait $PROXY_PID $GATEWAY_PID 2>/dev/null || true
  echo "✅ [Cloud Nexus] Clean shutdown complete."
  exit 0
}
trap cleanup SIGTERM SIGINT

echo "✅ [Cloud Nexus v4.0] All systems online."
echo "   Gateway PID=$GATEWAY_PID | Proxy PID=$PROXY_PID"

# ─── 4. Wait for process exit ────────────────────────────
wait -n $PROXY_PID $GATEWAY_PID
EXIT_CODE=$?
echo "❌ [Cloud Nexus] Process exited with code $EXIT_CODE. Shutting down."
cleanup
