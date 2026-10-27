"use strict";
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const BUILD_ID = "b80e6bdcea43f22b";
process.env.OCP_BINARY_BUILD = BUILD_ID;
process.env.OCP_TIER = process.env.OCP_TIER || "LOCAL_FREE";
process.env.OCP_OLLAMA_MODEL = process.env.OCP_OLLAMA_MODEL || "gemma4:latest";
const loaderEntry = path.join(__dirname, "ocp-protected.mjs");
const args = process.argv.slice(2);
const res = spawnSync(process.execPath, [loaderEntry, ...(args.length ? args : ["app"])], { stdio: "inherit", env: process.env });
process.exit(res.status ?? 0);
