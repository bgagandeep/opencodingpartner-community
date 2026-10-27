# OpenCodingPartner — Autonomous AI Engineering Swarm & 100 Showcase Templates

Run **OpenCodingPartner** **100% Free Local & Offline** with your own Ollama / WSL2 GPU (`gemma4:latest`), or scale to **10+ Parallel Cloud Sandboxes** with our **Sovereign Indian Cloud Tier**.

---

## ⚡ 1-Line Quickstart

### Option A — Instant `npx` Launch (Cross-Platform)
```bash
npx github:bgagandeep/opencodingpartner-community app --port 4317
```

### Option B — Windows PowerShell 1-Liner (`.cmd` Binary)
```powershell
irm https://raw.githubusercontent.com/bgagandeep/opencodingpartner-community/main/install.ps1 | iex
ocp app --port 4317
```

### Option C — macOS / Linux / WSL2 1-Liner
```bash
curl -fsSL https://raw.githubusercontent.com/bgagandeep/opencodingpartner-community/main/install.sh | sh
~/.ocp/bin/ocp app --port 4317
```

### Option D — Run Directly from Cloned Release
```bash
git clone --depth 1 https://github.com/bgagandeep/opencodingpartner-community.git
cd opencodingpartner-community
./dist-binary/ocp app --port 4317   # or .\dist-binary\ocp.cmd app --port 4317 on Windows
```

Once running, open **http://127.0.0.1:4317** in your browser.

---

## 🏗️ What's Inside This Repository

| Path | License | Description |
| :--- | :--- | :--- |
| `./packages/community-templates` | **MIT License** | Open-source **100 Showcase Apps** & Bharat SMB Micro-SaaS templates (WhatsApp + UPI Storefront, GST Billing & Khata, Clinic Queue, ONDC Catalog, Playable HTML5 Games, and DevTools). |
| `./dist-binary/` | **Proprietary Free-to-Run Binary** | Self-contained, SHA-256 verified in-memory VFS binary (`core-engine.Snap.bin` + `ocp-protected.mjs`) running completely in RAM with zero `%TEMP%` source extraction. |
| `./install.sh` / `./install.ps1` | **MIT License** | 1-line automated installers for macOS, Linux, WSL2, and Windows. |

---

## 🇮🇳 Local Free vs. Sovereign Indian Cloud Tier

| Capability | `LOCAL_FREE` (Default) | `CLOUD_PRO` (₹999/mo or ₹499 Credits) |
| :--- | :--- | :--- |
| **Cost** | **₹0 Forever** (Bring Your Own Hardware / Ollama) | **₹999/mo** via UPI / Razorpay |
| **Active Sandboxes** | 1 Local Sandbox + 1 Virtual PC | **10+ Parallel Cloud Sandboxes** |
| **Models** | Local Ollama (`gemma4:latest`) or BYOK | Hosted Indian GPU Cluster + Sovereign Routing |
| **Deployment** | Localhost (`127.0.0.1:4317`) | **1-Click Live `.ocp.in` Share URL** |

See [LICENSE.md](./LICENSE.md) for Hybrid Open-Core, Elastic License 2.0, and MIT terms.
