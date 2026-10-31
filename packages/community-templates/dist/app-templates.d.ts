export type AppTemplateCategory = "business" | "fintech" | "creator" | "operations";
export type AppBlueprint = {
    id: string;
    name: string;
    hindiTitle: string;
    category: AppTemplateCategory;
    icon: string;
    tagline: string;
    nonTechnicalSummary: string;
    defaultPrompt: string;
    files: Record<string, string>;
};
export type GuidedAppWizardInput = {
    appName: string;
    audience?: string;
    goal: string;
    language?: "en" | "hi" | "hinglish";
    style?: "modern-dark" | "clean-light" | "vibrant-india";
};
export declare const APP_BLUEPRINTS: readonly AppBlueprint[];
export declare function listAppBlueprints(category?: AppTemplateCategory): readonly AppBlueprint[];
export declare function findAppBlueprint(id: string): AppBlueprint | undefined;
export declare function scaffoldAppBlueprint(workspaceDir: string, blueprintId: string, wizard?: GuidedAppWizardInput): Promise<{
    blueprint: AppBlueprint;
    writtenFiles: string[];
    previewPath: string;
}>;
export declare function buildGuidedPrompt(input: GuidedAppWizardInput): string;
export declare function explainForEveryone(technicalText: string): string;
export type QuickPreviewEditInput = {
    findText?: string;
    replaceText?: string;
    accentColor?: string;
    upiId?: string;
    brandTitle?: string;
    whatsappNumber?: string;
    themePreset?: string;
};
export declare function applyQuickPreviewEdit(workspaceDir: string, edit: QuickPreviewEditInput): Promise<{
    ok: boolean;
    updatedFile: string;
    changesCount: number;
    plainExplanation: string;
    overrides: {
        brandTitle?: string;
        whatsappNumber?: string;
        upiId?: string;
        themePreset?: string;
    };
}>;
export declare function publishShareableApp(dataRoot: string, workspaceDir: string, rawSlug: string): Promise<{
    slug: string;
    sharePath: string;
    shareUrl: string;
    whatsappShareUrl: string;
}>;
export declare function resolveSharedAppHtml(dataRoot: string, rawSlug: string): Promise<string | undefined>;
