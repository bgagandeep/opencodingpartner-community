# OpenCodingPartner — 1-Line Windows Installer
# Usage: irm https://raw.githubusercontent.com/bgagandeep/opencodingpartner-community/main/install.ps1 | iex
$ErrorActionPreference = "Stop"
$RepoRaw = "https://raw.githubusercontent.com/bgagandeep/opencodingpartner-community/main"
$InstallDir = Join-Path $env:LOCALAPPDATA "OpenCodingPartner\bin"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  OpenCodingPartner — Windows Standalone Binary Installer" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Error "Node.js (>=22) is required. Install from https://nodejs.org and re-run."
  exit 1
}

New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
Write-Host "[1/3] Downloading compiled RAM snapshot (core-engine.Snap.bin)..." -ForegroundColor Yellow
Invoke-WebRequest -UseBasicParsing -Uri "$RepoRaw/dist-binary/core-engine.Snap.bin" -OutFile (Join-Path $InstallDir "core-engine.Snap.bin")
Invoke-WebRequest -UseBasicParsing -Uri "$RepoRaw/dist-binary/ocp-protected.mjs" -OutFile (Join-Path $InstallDir "ocp-protected.mjs")
Invoke-WebRequest -UseBasicParsing -Uri "$RepoRaw/dist-binary/ocp.cmd" -OutFile (Join-Path $InstallDir "ocp.cmd")

$UserPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($UserPath -notlike "*$InstallDir*") {
  [Environment]::SetEnvironmentVariable("Path", "$UserPath;$InstallDir", "User")
  $env:Path = "$env:Path;$InstallDir"
}

Write-Host "[2/3] Verifying binary integrity..." -ForegroundColor Yellow
& (Join-Path $InstallDir "ocp.cmd") --help | Out-Null

Write-Host "[3/3] Installed to $InstallDir (added to User PATH)!" -ForegroundColor Green
Write-Host ""
Write-Host "  Start OpenCodingPartner Studio at http://127.0.0.1:4317:" -ForegroundColor White
Write-Host "    ocp app --port 4317" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
