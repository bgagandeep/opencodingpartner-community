# Zivel — Autonomous AI Engineering Swarm & 100 Showcase Templates

Run **Zivel** **100% Free Local & Offline** with your own Ollama / WSL2 GPU (`gemma4:latest`), or use **Zivel Cloud** (hosted on Railway in Singapore).

---

## ⚡ 1-Line Quickstart

### Option A — Instant `npx` Launch (Cross-Platform)
```bash
npx github:bgagandeep/zivel-community app --port 4317
```

### Option B — Windows PowerShell 1-Liner (`.cmd` Binary)
```powershell
irm https://raw.githubusercontent.com/bgagandeep/zivel-community/main/install.ps1 | iex
zivel app --port 4317
```

### Option C — macOS / Linux / WSL2 1-Liner
```bash
curl -fsSL https://raw.githubusercontent.com/bgagandeep/zivel-community/main/install.sh | sh
~/.zivel/bin/zivel app --port 4317
```

### Option D — Run Directly from Cloned Release
```bash
git clone --depth 1 https://github.com/bgagandeep/zivel-community.git
cd zivel-community
./dist-binary/zivel app --port 4317   # or .\dist-binary\zivel.cmd app --port 4317 on Windows
```

### Option E — Desktop app, Homebrew, winget, Python, or your editor
Each [release](https://github.com/bgagandeep/zivel-community/releases) carries the desktop app (macOS universal `.dmg`, Windows `-setup.exe` / `.msi`, Linux `.AppImage` / `.deb`, with Node.js bundled), the `zivel-<version>.tar.gz` command build, the VS Code extension (`.vsix`), and `SHA256SUMS`.
```bash
brew install bgagandeep/zivel/zivel          # the zivel command; add --cask for the desktop app
winget install Zivel.Zivel                   # the desktop app on Windows
uvx zivel app --port 4317                    # or: pip install zivel
```

Once running, open **http://127.0.0.1:4317** in your browser.

---

## 🏗️ What's Inside This Repository

| Path | License | Description |
| :--- | :--- | :--- |
| `./packages/community-templates` | **MIT License** | Open-source **100 Showcase Apps** & Bharat SMB Micro-SaaS templates (WhatsApp + UPI Storefront, GST Billing & Khata, Clinic Queue, ONDC Catalog, Playable HTML5 Games, and DevTools). |
| `./dist-binary/` | **Proprietary Free-to-Run Binary** | Self-contained, SHA-256 verified in-memory VFS binary (`core-engine.Snap.bin` + `zivel-protected.mjs`) running completely in RAM with zero `%TEMP%` source extraction. |
| `./install.sh` / `./install.ps1` | **MIT License** | 1-line automated installers for macOS, Linux, WSL2, and Windows. |

---

## Local Free vs. Zivel Cloud

| Capability | `LOCAL_FREE` (Default) | `CLOUD_PRO` (₹999/mo or ₹499 Credits) |
| :--- | :--- | :--- |
| **Cost** | **₹0 Forever** (Bring Your Own Hardware / Ollama) | **₹999/mo** via UPI / Razorpay |
| **Active Sandboxes** | 1 Local Sandbox + 1 Virtual PC | More sandboxes at once |
| **Models** | Local Ollama (`gemma4:latest`) or BYOK | Your chosen provider (the cloud has no GPUs of its own) |
| **Deployment** | Localhost (`127.0.0.1:4317`) | 1-click /share/ link |

See [LICENSE.md](./LICENSE.md) for Hybrid Open-Core, Elastic License 2.0, and MIT terms.
