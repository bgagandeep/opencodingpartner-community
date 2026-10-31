#!/usr/bin/env node
/**
 * Zivel — Standalone Compiled Local Runtime Binary (Build 8561a41e0a0865a1)
 * Copyright (c) 2026 Novamind Tech LLP. Protected under Elastic License 2.0 & Proprietary Core Engine License.
 * Reverse engineering or managed cloud redistribution of @zivel/core-engine is strictly prohibited.
 *
 * Security Architecture:
 * - Decrypts and verifies SHA-256 integrity of core-engine.Snap.bin strictly in RAM.
 * - Uses Node.js synchronous module.registerHooks({ resolve, load }) virtual filesystem (__ocp_ram_vfs__)
 *   so zero plain .js files are ever extracted or written to %TEMP% or disk.
 */
import { createHash } from "node:crypto";
import { readFileSync, realpathSync, rmSync } from "node:fs";
import { registerHooks } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BUILD_ID = "8561a41e0a0865a1";
const VIRTUAL_ROOT_PATH = path.join(__dirname, "__ocp_ram_vfs__");
const VIRTUAL_ROOT_URL = pathToFileURL(VIRTUAL_ROOT_PATH).href.replace(/\/?$/, "/");

function loadRamRegistry() {
  const snapPath = path.join(__dirname, "core-engine.Snap.bin");
  const b64 = readFileSync(snapPath, "utf8");
  const buf = Buffer.from(b64, "base64");
  const out = Buffer.allocUnsafe(buf.length);
  for (let i = 0; i < buf.length; i += 1) {
    out[i] = buf[i] ^ ((0x5a + (i & 0x1f)) & 0xff);
  }
  const jsonText = out.toString("utf8");
  const actualHash = createHash("sha256").update(jsonText).digest("hex").slice(0, 16);
  if (actualHash !== BUILD_ID) {
    throw new Error("Zivel binary integrity check failed (core-engine.Snap.bin checksum mismatch).");
  }
  const rawRegistry = JSON.parse(jsonText);
  const ramMap = new Map();
  for (const [relKey, b64Content] of Object.entries(rawRegistry)) {
    ramMap.set(relKey.replace(/\\/g, "/"), Buffer.from(b64Content, "base64").toString("utf8"));
  }
  return ramMap;
}

const ramModules = loadRamRegistry();
globalThis.__OCP_EMBEDDED_FILES__ = { root: VIRTUAL_ROOT_URL, files: ramModules };

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@zivel/")) {
      const parts = specifier.slice("@zivel/".length).split("/");
      const pkg = parts[0];
      const subpath = parts.slice(1).join("/");
      const relKey = !subpath
        ? `node_modules/@zivel/${pkg}/dist/index.js`
        : `node_modules/@zivel/${pkg}/dist/${subpath.endsWith(".js") ? subpath : subpath + ".js"}`;
      if (ramModules.has(relKey)) {
        return { url: VIRTUAL_ROOT_URL + relKey, shortCircuit: true };
      }
    }
    if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL && context.parentURL.startsWith(VIRTUAL_ROOT_URL)) {
      const resolvedUrl = new URL(specifier, context.parentURL).href;
      if (resolvedUrl.startsWith(VIRTUAL_ROOT_URL)) {
        const relKey = resolvedUrl.slice(VIRTUAL_ROOT_URL.length);
        if (ramModules.has(relKey)) {
          return { url: resolvedUrl, shortCircuit: true };
        }
      }
    }
    if (specifier.startsWith(VIRTUAL_ROOT_URL)) {
      const relKey = specifier.slice(VIRTUAL_ROOT_URL.length);
      if (ramModules.has(relKey)) {
        return { url: specifier, shortCircuit: true };
      }
    }
    if (path.isAbsolute(specifier)) {
      const candidateUrl = pathToFileURL(specifier).href;
      if (candidateUrl.startsWith(VIRTUAL_ROOT_URL)) {
        const relKey = candidateUrl.slice(VIRTUAL_ROOT_URL.length);
        if (ramModules.has(relKey)) {
          return { url: candidateUrl, shortCircuit: true };
        }
      }
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.startsWith(VIRTUAL_ROOT_URL)) {
      const relKey = url.slice(VIRTUAL_ROOT_URL.length);
      const source = ramModules.get(relKey);
      if (source !== undefined) {
        return { format: "module", source, shortCircuit: true };
      }
    }
    return nextLoad(url, context);
  },
});

// Purge any legacy disk-extracted temp folder from older builds if present
try {
  rmSync(path.join(tmpdir(), "ocp-runtime-" + BUILD_ID), { recursive: true, force: true });
} catch {
  // Ignore cleanup errors
}

const selfUrl = pathToFileURL(__filename).href;
const importFlag = `--import=${selfUrl}`;
if (!(process.env.NODE_OPTIONS || "").includes(importFlag)) {
  process.env.NODE_OPTIONS = [process.env.NODE_OPTIONS, importFlag].filter(Boolean).join(" ");
}

process.env.OCP_BINARY_BUILD = BUILD_ID;
process.env.OCP_DEFAULT_TIER = process.env.OCP_TIER || "LOCAL_FREE";
process.env.OCP_OLLAMA_MODEL = process.env.OCP_OLLAMA_MODEL || "gemma4:latest";

// npx and global installs launch through a node_modules/.bin symlink, so compare real paths.
const realEntry = (file) => {
  try {
    return realpathSync(file);
  } catch {
    return path.resolve(file);
  }
};
const invokedEntry = process.argv[1] ? realEntry(process.argv[1]) : "";
if (invokedEntry === realEntry(__filename)) {
  const userArgs = process.argv.slice(2);
  const vfsMainPath = path.join(VIRTUAL_ROOT_PATH, "packages", "cli", "dist", "main.js");
  process.argv = [process.execPath, vfsMainPath, ...(userArgs.length > 0 ? userArgs : ["app"])];
  await import(VIRTUAL_ROOT_URL + "packages/cli/dist/main.js");
}
