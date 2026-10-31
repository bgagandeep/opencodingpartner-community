import type { ShowcaseAppSpec } from "./portfolio-showcase.js";
/**
 * Renders the genuine interactive workspace (HTML + CSS + JS) for each of the 100 apps.
 * - Games (#1-10) get bespoke playable HTML5 Canvas / 3D-perspective / interactive board games.
 * - Productivity, Business, FinTech, DevTools, Operations, Education, Health, Creator & Utilities
 *   get genuine working applications with real state, canvas charts, QR generators, live parsers, and interactive boards.
 */
export declare function renderGenuineAppWorkspace(spec: ShowcaseAppSpec): {
    html: string;
    script: string;
};
