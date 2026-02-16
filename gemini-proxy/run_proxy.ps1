# File: run_proxy.ps1
# Gemini Adapter Proxy - Startup Script
# Usage: .\run_proxy.ps1

$ErrorActionPreference = "Stop"
$proxyDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Gemini Adapter Proxy - Startup" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan

# Step 1: Check for .env
$envFile = Join-Path $proxyDir ".env"
if (-not (Test-Path $envFile)) {
    Write-Host "[!] .env file not found. Copying from .env.example..." -ForegroundColor Yellow
    $exampleFile = Join-Path $proxyDir ".env.example"
    if (Test-Path $exampleFile) {
        Copy-Item $exampleFile $envFile
        Write-Host "[!] Please edit .env and set your GOOGLE_API_KEY!" -ForegroundColor Red
        exit 1
    } else {
        Write-Host "[ERROR] .env.example not found either!" -ForegroundColor Red
        exit 1
    }
}

# Step 2: Check/Create venv
$venvDir = Join-Path $proxyDir ".venv"
if (-not (Test-Path $venvDir)) {
    Write-Host "[*] Creating Python virtual environment..." -ForegroundColor Yellow
    python -m venv $venvDir
}

# Step 3: Activate venv and install dependencies
$activateScript = Join-Path $venvDir "Scripts\Activate.ps1"
. $activateScript

Write-Host "[*] Installing/updating dependencies..." -ForegroundColor Yellow
pip install -r (Join-Path $proxyDir "requirements.txt") --quiet

# Step 4: Start the proxy
Write-Host ""
Write-Host "[OK] Starting Gemini Adapter Proxy..." -ForegroundColor Green
Write-Host ""
python (Join-Path $proxyDir "main.py")
