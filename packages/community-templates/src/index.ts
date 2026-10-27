/**
 * @opencodingpartner/community-templates
 * PUBLIC - MIT LICENSE
 *
 * Open-source 100 Showcase Apps, Bharat/SMB micro-SaaS templates (GST, UPI, POS,
 * bilingual templates), and custom tool/skill definitions.
 * Safe to sync to a public GitHub repository for community contributions and stars.
 */

export {
  APP_BLUEPRINTS,
  applyQuickPreviewEdit,
  buildGuidedPrompt,
  explainForEveryone,
  findAppBlueprint,
  listAppBlueprints,
  publishShareableApp,
  resolveSharedAppHtml,
  scaffoldAppBlueprint,
  type AppBlueprint,
  type AppTemplateCategory,
  type GuidedAppWizardInput,
  type QuickPreviewEditInput,
} from "./app-templates.js";

export {
  PORTFOLIO_100_APPS,
  findShowcaseApp,
  matchShowcaseAppFromPrompt,
  renderShowcaseAppHtml,
  renderShowcaseGalleryPage,
  toAppBlueprint,
  type ShowcaseAppSpec,
  type ShowcaseCategory,
} from "./portfolio-showcase.js";
