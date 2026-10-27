import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { findShowcaseApp, matchShowcaseAppFromPrompt, renderShowcaseAppHtml, toAppBlueprint, } from "./portfolio-showcase.js";
export const APP_BLUEPRINTS = [
    {
        id: "upi-storefront",
        name: "WhatsApp & UPI Storefront",
        hindiTitle: "दुकान और UPI ऑर्डर ऐप",
        category: "business",
        icon: "🛍️",
        tagline: "Instant product catalog with UPI QR checkout & WhatsApp order alerts for shops and D2C brands.",
        nonTechnicalSummary: "Customers browse your products, add items to cart, pay via any UPI app, and send the order straight to your WhatsApp.",
        defaultPrompt: "Add a 10% festive discount code 'DIWALI10' to the UPI Storefront checkout and show a live savings badge.",
        files: {
            "README.md": `# WhatsApp & UPI Storefront\n\nCreated with OpenCodingPartner No-Code Blueprints.\nOpen \`index.html\` in Live Preview to test your store.\n`,
            "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Bharat QuickStore — UPI & WhatsApp Catalog</title>
  <style>
    :root { --bg: #0f172a; --card: #1e293b; --accent: #f97316; --emerald: #10b981; --text: #f8fafc; --muted: #94a3b8; }
    * { box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; }
    body { margin: 0; background: var(--bg); color: var(--text); padding: 24px; }
    .wrap { max-width: 780px; margin: 0 auto; }
    .hero { background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px solid #334155; border-radius: 16px; padding: 20px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
    .badge { background: rgba(249, 115, 22, 0.15); color: var(--accent); padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
    .card { background: var(--card); border: 1px solid #334155; border-radius: 14px; padding: 16px; display: flex; flex-direction: column; gap: 8px; }
    .price { font-size: 20px; font-weight: 800; color: var(--emerald); }
    button { background: var(--accent); color: #fff; border: none; border-radius: 10px; padding: 10px 14px; font-weight: 700; cursor: pointer; }
    .cart { margin-top: 24px; background: var(--card); border: 1px solid var(--emerald); border-radius: 14px; padding: 16px; display: flex; justify-content: space-between; align-items: center; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="hero">
      <div>
        <span class="badge">LIVE STORE · ZERO CODING</span>
        <h1 style="margin:8px 0 4px;">Bharat QuickStore</h1>
        <p style="margin:0;color:var(--muted);">Instant UPI Checkout &amp; WhatsApp Order Receipts</p>
      </div>
      <div id="cartCount" style="font-weight:800;font-size:18px;color:var(--emerald);">Cart: ₹0</div>
    </div>
    <div class="grid" id="catalog"></div>
    <div class="cart">
      <div>
        <strong>Ready to accept UPI (GPay / PhonePe / Paytm)</strong>
        <div id="cartSummary" style="color:var(--muted);font-size:13px;">Tap any item above to test instant billing</div>
      </div>
      <button id="payUpiBtn" type="button">Pay via UPI QR</button>
    </div>
  </div>
  <script>
    const items = [
      { id: 1, name: "Organic Assam Chai (500g)", price: 249 },
      { id: 2, name: "Filter Coffee Decoction Pack", price: 199 },
      { id: 3, name: "Artisanal Dry Fruit Box", price: 699 }
    ];
    let total = 0;
    let count = 0;
    const catalog = document.getElementById("catalog");
    items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = "<strong>" + item.name + "</strong><div class='price'>₹" + item.price + "</div>";
      const btn = document.createElement("button");
      btn.textContent = "+ Add to Order";
      btn.onclick = () => {
        total += item.price;
        count += 1;
        document.getElementById("cartCount").textContent = "Cart: ₹" + total;
        document.getElementById("cartSummary").textContent = count + " item(s) · Total ₹" + total + " (incl. GST)";
      };
      card.appendChild(btn);
      catalog.appendChild(card);
    });
    document.getElementById("payUpiBtn").onclick = () => {
      alert("UPI Intent Ready: upi://pay?pa=store@jio&am=" + (total || 249) + "&cu=INR");
    };
  </script>
</body>
</html>
`,
        },
    },
    {
        id: "gst-khata-billing",
        name: "GST Invoice & Smart Khata",
        hindiTitle: "GST बिलिंग और डिजिटल खाता",
        category: "fintech",
        icon: "🧾",
        tagline: "Generate GST-compliant invoices (CGST/SGST), track customer dues, and send payment links in 1 click.",
        nonTechnicalSummary: "Type item names and amounts; the app calculates 18% GST automatically and prepares a printable invoice.",
        defaultPrompt: "Add a customer GSTIN validation check and a 1-click 'Download PDF / Print Receipt' button to the invoice app.",
        files: {
            "README.md": `# GST Invoice & Smart Khata\n\nZero-setup GST calculator & customer ledger.\n`,
            "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Smart Khata & GST Billing</title>
  <style>
    body { margin: 0; background: #090d16; color: #f8fafc; font-family: system-ui, sans-serif; padding: 24px; }
    .box { max-width: 680px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 16px; padding: 20px; }
    input { background: #1f2937; border: 1px solid #374151; color: #fff; padding: 10px; border-radius: 8px; width: 100%; margin-bottom: 10px; }
    .row { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px; }
    .totals { margin-top: 16px; padding: 14px; background: #0f172a; border-radius: 12px; border: 1px solid #10b981; }
    button { background: #10b981; color: #042f2e; font-weight: 800; border: none; padding: 10px 16px; border-radius: 8px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="box">
    <h2 style="margin-top:0;">🧾 Instant GST Invoice Maker (CGST + SGST)</h2>
    <div class="row">
      <input id="itemName" value="Consulting / Software Service" placeholder="Item or Service" />
      <input id="baseAmount" type="number" value="5000" placeholder="Amount (₹)" />
      <input id="gstRate" type="number" value="18" placeholder="GST %" />
    </div>
    <button id="calcBtn" type="button">Calculate GST Breakdown</button>
    <div class="totals" id="resultBox">
      Base: ₹5,000 · CGST (9%): ₹450 · SGST (9%): ₹450 · <strong>Total Payable: ₹5,900</strong>
    </div>
  </div>
  <script>
    document.getElementById("calcBtn").onclick = () => {
      const amt = Number(document.getElementById("baseAmount").value || 0);
      const rate = Number(document.getElementById("gstRate").value || 18);
      const gst = +(amt * (rate / 100)).toFixed(2);
      const half = +(gst / 2).toFixed(2);
      const total = +(amt + gst).toFixed(2);
      document.getElementById("resultBox").innerHTML =
        "Base: ₹" + amt + " · CGST (" + (rate / 2) + "%): ₹" + half + " · SGST (" + (rate / 2) + "%): ₹" + half +
        " · <strong>Total Payable: ₹" + total + "</strong>";
    };
  </script>
</body>
</html>
`,
        },
    },
    {
        id: "clinic-queue-booking",
        name: "Clinic & Salon Token Queue",
        hindiTitle: "क्लिनिक और सैलून अपॉइंटमेंट टोकन",
        category: "operations",
        icon: "🏥",
        tagline: "Live token queue and appointment booking page so patients or customers don't wait in line.",
        nonTechnicalSummary: "Visitors book a token number on their phone and see the live 'Now Serving' counter in real time.",
        defaultPrompt: "Add an emergency priority token button and estimated wait time in minutes (10 mins per token).",
        files: {
            "README.md": `# Clinic & Salon Live Token Queue\n\nReal-time queue tracker built with OpenCodingPartner.\n`,
            "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Live Token Queue</title>
  <style>
    body { margin: 0; background: #090d16; color: #fff; font-family: system-ui, sans-serif; padding: 24px; text-align: center; }
    .card { max-width: 480px; margin: 0 auto; background: #111827; border: 1px solid #374151; border-radius: 18px; padding: 24px; }
    .token { font-size: 56px; font-weight: 900; color: #f97316; margin: 12px 0; }
    button { background: #f97316; color: #fff; border: none; padding: 12px 20px; border-radius: 10px; font-weight: 700; cursor: pointer; margin: 6px; }
  </style>
</head>
<body>
  <div class="card">
    <div style="color:#10b981;font-weight:700;font-size:12px;">LIVE QUEUE TRACKER</div>
    <h2>City Care Clinic — Now Serving</h2>
    <div class="token" id="tokenNum">A-14</div>
    <p id="waitText" style="color:#9ca3af;">Estimated Wait: ~15 mins</p>
    <button id="nextBtn" type="button">Call Next Patient (+1)</button>
    <button id="bookBtn" type="button" style="background:#10b981;">Book New Token</button>
  </div>
  <script>
    let current = 14;
    let booked = 17;
    document.getElementById("nextBtn").onclick = () => {
      current += 1;
      document.getElementById("tokenNum").textContent = "A-" + current;
    };
    document.getElementById("bookBtn").onclick = () => {
      booked += 1;
      const wait = Math.max(5, (booked - current) * 10);
      document.getElementById("waitText").textContent = "Your Token: A-" + booked + " · Est. Wait: ~" + wait + " mins";
    };
  </script>
</body>
</html>
`,
        },
    },
    {
        id: "student-portfolio-resume",
        name: "Interactive Portfolio & Resume",
        hindiTitle: "पोर्टफोलियो और रेज़्यूमे वेबसाइट",
        category: "creator",
        icon: "🎓",
        tagline: "Clean, shareable personal website with projects, skills, and a 1-click contact form.",
        nonTechnicalSummary: "Perfect for students, freelancers, and creators to showcase their work with zero HTML knowledge.",
        defaultPrompt: "Add a dark/light theme toggle and a project filter bar for AI, Mobile, and Web projects.",
        files: {
            "README.md": `# Interactive Portfolio & Resume\n\nBuilt with OpenCodingPartner No-Code Blueprints.\n`,
            "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Creator Portfolio</title>
  <style>
    body { margin: 0; background: #0b0f19; color: #f8fafc; font-family: system-ui, sans-serif; padding: 32px; }
    .wrap { max-width: 720px; margin: 0 auto; }
    .pill { display: inline-block; background: #1e293b; border: 1px solid #334155; padding: 6px 12px; border-radius: 999px; margin: 4px; font-size: 13px; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Hi, I'm a Builder from India 👋</h1>
    <p style="color:#94a3b8;font-size:18px;">Building practical apps with AI teammates — no complex setup required.</p>
    <div>
      <span class="pill">Product Design</span>
      <span class="pill">AI Workflows</span>
      <span class="pill">Mobile &amp; Web</span>
    </div>
  </div>
</body>
</html>
`,
        },
    },
];
export function listAppBlueprints(category) {
    if (!category)
        return APP_BLUEPRINTS;
    return APP_BLUEPRINTS.filter((bp) => bp.category === category);
}
export function findAppBlueprint(id) {
    const direct = APP_BLUEPRINTS.find((bp) => bp.id === id);
    if (direct)
        return direct;
    const showcase = findShowcaseApp(id);
    if (showcase)
        return toAppBlueprint(showcase);
    return undefined;
}
export async function scaffoldAppBlueprint(workspaceDir, blueprintId, wizard) {
    let blueprint = findAppBlueprint(blueprintId);
    if (!blueprint && wizard) {
        const matched = matchShowcaseAppFromPrompt(`${wizard.appName} ${wizard.goal}`);
        blueprint = toAppBlueprint(matched);
    }
    if (!blueprint) {
        throw new Error(`Unknown app blueprint: ${blueprintId}`);
    }
    await mkdir(workspaceDir, { recursive: true });
    const writtenFiles = [];
    for (const [relativePath, rawContent] of Object.entries(blueprint.files)) {
        const resolved = path.resolve(workspaceDir, relativePath);
        if (!resolved.startsWith(path.resolve(workspaceDir))) {
            throw new Error("Invalid blueprint file path.");
        }
        let content = rawContent;
        if (relativePath === "index.html" && wizard) {
            const customTitle = wizard.appName?.trim();
            const customGoal = wizard.goal?.trim();
            if (customTitle) {
                content = content.replace(/<title>[^<]*<\/title>/i, `<title>${customTitle}</title>`);
                if (/<h1([^>]*)>[^<]*<\/h1>/i.test(content)) {
                    content = content.replace(/<h1([^>]*)>[^<]*<\/h1>/i, `<h1$1>${customTitle}</h1>`);
                }
                else if (/<h2([^>]*)>[^<]*<\/h2>/i.test(content)) {
                    content = content.replace(/<h2([^>]*)>[^<]*<\/h2>/i, `<h2$1>${customTitle}</h2>`);
                }
            }
            if (customGoal) {
                content = content.replace(/<p class="tagline">[^<]*<\/p>/i, `<p class="tagline">${customGoal}</p>`);
            }
        }
        await mkdir(path.dirname(resolved), { recursive: true });
        await writeFile(resolved, content, "utf8");
        writtenFiles.push(relativePath);
    }
    return {
        blueprint,
        writtenFiles,
        previewPath: "index.html",
    };
}
export function buildGuidedPrompt(input) {
    const appName = input.appName.trim() || "My Custom App";
    const audience = input.audience?.trim() || "everyday mobile and web users in India";
    const goal = input.goal.trim() || "let users view items, submit requests, and track status easily";
    const style = input.style ?? "modern-dark";
    const lang = input.language ?? "en";
    const langNote = lang === "hi"
        ? "Include bilingual Hindi + English labels so non-technical users can navigate effortlessly."
        : lang === "hinglish"
            ? "Use friendly Indian English / Hinglish microcopy and INR (₹) formatting."
            : "Use clear, jargon-free English and INR (₹) formatting.";
    return [
        `Build or update "${appName}" for ${audience}.`,
        `Primary Goal: ${goal}`,
        `Visual Style: ${style} (responsive mobile-first layout, large 48px touch buttons, zero clutter).`,
        `Language & Localization: ${langNote}`,
        `Deliver a self-contained, immediately runnable web interface in index.html so the user can test it in Live Preview without running terminal commands.`,
    ].join("\n");
}
const JARGON_REPLACEMENTS = [
    [/\bgit worktree\b/gi, "safe draft copy (your live files stay untouched until you approve)"],
    [/\bworktree\b/gi, "safe draft copy"],
    [/\bcode_blast_radius\b/gi, "impact check (verifying which features are affected)"],
    [/\bMCP tool\b/gi, "verified helper action"],
    [/\bexit code 0\b/gi, "completed successfully"],
    [/\bexit code [1-9]\d*\b/gi, "stopped because a step needed attention"],
    [/\bHMAC-SHA256\b/gi, "bank-grade security signature"],
    [/\bSQLite CPG\b/gi, "project map"],
];
export function explainForEveryone(technicalText) {
    let result = technicalText;
    for (const [pattern, plain] of JARGON_REPLACEMENTS) {
        result = result.replace(pattern, plain);
    }
    return result;
}
const THEME_PRESET_COLORS = {
    saffron: "#f97316",
    "jio-blue": "#0f3cc9",
    emerald: "#10b981",
    royal: "#8b5cf6",
};
export async function applyQuickPreviewEdit(workspaceDir, edit) {
    const indexPath = path.resolve(workspaceDir, "index.html");
    if (!indexPath.startsWith(path.resolve(workspaceDir))) {
        throw new Error("Invalid workspace file path.");
    }
    let html = await readFile(indexPath, "utf8").catch(() => "");
    if (!html) {
        await scaffoldAppBlueprint(workspaceDir, "upi-storefront");
        html = await readFile(indexPath, "utf8");
    }
    let changesCount = 0;
    const findText = edit.findText?.trim();
    const replaceText = edit.replaceText?.trim();
    if (findText && replaceText !== undefined) {
        const before = html;
        html = html.split(findText).join(replaceText);
        const escapedFind = findText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        if (escapedFind !== findText) {
            html = html.split(escapedFind).join(replaceText);
        }
        if (html !== before)
            changesCount += 1;
    }
    const brandTitle = edit.brandTitle?.trim();
    if (brandTitle) {
        const before = html;
        html = html.replace(/<title>[^<]*<\/title>/i, `<title>${brandTitle}</title>`);
        if (/<h1([^>]*)>[^<]*<\/h1>/i.test(html)) {
            html = html.replace(/<h1([^>]*)>[^<]*<\/h1>/i, `<h1$1>${brandTitle}</h1>`);
        }
        else if (/<h2([^>]*)>[^<]*<\/h2>/i.test(html)) {
            html = html.replace(/<h2([^>]*)>[^<]*<\/h2>/i, `<h2$1>${brandTitle}</h2>`);
        }
        if (html === before) {
            html += `\n<!-- Brand: ${brandTitle} -->`;
        }
        changesCount += 1;
    }
    const whatsappNumber = edit.whatsappNumber?.trim();
    if (whatsappNumber) {
        const digits = whatsappNumber.replace(/[^0-9]/g, "");
        if (digits) {
            html = html.replace(/wa\.me\/[0-9]+/g, `wa.me/${digits}`);
            changesCount += 1;
        }
    }
    const resolvedAccent = edit.accentColor?.trim() ||
        (edit.themePreset ? THEME_PRESET_COLORS[edit.themePreset.trim().toLowerCase()] : undefined);
    if (resolvedAccent && /^#[0-9A-Fa-f]{6}$/.test(resolvedAccent)) {
        const before = html;
        html = html.replace(/--accent:\s*#[0-9A-Fa-f]{3,8}/g, `--accent:${resolvedAccent}`);
        if (html === before && html.includes("</style>")) {
            html = html.replace("</style>", `:root{--accent:${resolvedAccent} !important;}\n</style>`);
        }
        changesCount += 1;
    }
    if (edit.upiId && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(edit.upiId.trim())) {
        const upi = edit.upiId.trim();
        html = html.replace(/pa=[a-zA-Z0-9._-]+@[a-zA-Z0-9]+/g, `pa=${upi}`);
        changesCount += 1;
    }
    await writeFile(indexPath, html, "utf8");
    return {
        ok: true,
        updatedFile: "index.html",
        changesCount,
        plainExplanation: changesCount > 0
            ? `Updated ${changesCount} visual setting${changesCount > 1 ? "s" : ""} in your live app draft instantly.`
            : "Saved your live app draft (no matching text needed replacement).",
        overrides: {
            ...(brandTitle ? { brandTitle } : {}),
            ...(whatsappNumber ? { whatsappNumber } : {}),
            ...(edit.upiId ? { upiId: edit.upiId.trim() } : {}),
            ...(edit.themePreset ? { themePreset: edit.themePreset.trim() } : {}),
        },
    };
}
export async function publishShareableApp(dataRoot, workspaceDir, rawSlug) {
    const slug = rawSlug
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 48) || "my-bharat-app";
    const indexPath = path.resolve(workspaceDir, "index.html");
    let html = await readFile(indexPath, "utf8").catch(() => "");
    if (!html) {
        await scaffoldAppBlueprint(workspaceDir, "upi-storefront");
        html = await readFile(indexPath, "utf8");
    }
    const shareDir = path.join(dataRoot, "shared-apps");
    await mkdir(shareDir, { recursive: true });
    await writeFile(path.join(shareDir, `${slug}.html`), html, "utf8");
    const sharePath = `/share/${slug}`;
    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out our live app built with OpenCodingPartner: ${sharePath}`)}`;
    return { slug, sharePath, shareUrl: sharePath, whatsappShareUrl };
}
export async function resolveSharedAppHtml(dataRoot, rawSlug) {
    const slug = rawSlug
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 48);
    if (!slug)
        return undefined;
    const target = path.join(dataRoot, "shared-apps", `${slug}.html`);
    const diskHtml = await readFile(target, "utf8").catch(() => undefined);
    if (diskHtml)
        return diskHtml;
    const showcaseMatch = findShowcaseApp(slug);
    if (showcaseMatch)
        return renderShowcaseAppHtml(showcaseMatch);
    return undefined;
}
//# sourceMappingURL=app-templates.js.map