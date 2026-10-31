#!/usr/bin/env sh
# Zivel — 1-Line Installer (macOS / Linux / WSL2)
# Usage: curl -fsSL https://raw.githubusercontent.com/bgagandeep/zivel-community/main/install.sh | sh
set -eu

REPO_RAW="https://raw.githubusercontent.com/bgagandeep/zivel-community/main"
INSTALL_DIR="${OCP_INSTALL_DIR:-$HOME/.zivel/bin}"

echo "============================================================"
echo "  Zivel — Standalone Local Binary Installer"
echo "============================================================"

if ! command -v node >/dev/null 2>&1; then
  echo "[!] Node.js (>=22) is required to run the in-memory VFS binary."
  echo "    Install Node.js from https://nodejs.org and re-run this script."
  exit 1
fi

mkdir -p "$INSTALL_DIR"
echo "[1/3] Downloading compiled RAM snapshot (core-engine.Snap.bin)..."
curl -fsSL "$REPO_RAW/dist-binary/core-engine.Snap.bin" -o "$INSTALL_DIR/core-engine.Snap.bin"
curl -fsSL "$REPO_RAW/dist-binary/zivel-protected.mjs" -o "$INSTALL_DIR/zivel-protected.mjs"
curl -fsSL "$REPO_RAW/dist-binary/zivel" -o "$INSTALL_DIR/zivel"
chmod +x "$INSTALL_DIR/zivel" "$INSTALL_DIR/zivel-protected.mjs"

echo "[2/3] Verifying binary integrity..."
"$INSTALL_DIR/zivel" --help >/dev/null

echo "[3/3] Installation complete!"
echo ""
echo "  Run Studio locally (100% Free Offline Mode):"
echo "    $INSTALL_DIR/zivel app --port 4317"
echo ""
echo "  Add to your PATH:"
echo "    export PATH=\"$INSTALL_DIR:\$PATH\""
echo "============================================================"
