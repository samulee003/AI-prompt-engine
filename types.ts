export interface Tip {
  title: string;
  content: string;
  icon?: string; // Heroicon name (optional)
  template?: string; // Optional template string for the tip
}

export type Language = 'en' | 'zh-TW';

export type TranslationSet = {
  headerTitle: string;
  headerSubtitle: string;
  inputLabel: string;
  inputPlaceholder: string;
  inputHelpText: string;
  submitButton: string;
  enhancingButton: string;
  refinedPromptTitle: string;
  copyButton: string;
  copiedButton: string;
  refinedPromptHelpText: string;
  loadingText: string;
  errorTitle: string;
  tipsTitle: string;
  footerCopyright: string;
  footerPoweredBy: string;
  switchToChinese: string;
  switchToEnglish: string;
  enterPromptError: string;
  tipPersonaTitle: string;
  tipPersonaContent: string;
  tipPersonaTemplate: string;
  tipTaskTitle: string;
  tipTaskContent: string;
  tipTaskTemplate: string;
  tipContextTitle: string;
  tipContextContent: string;
  tipContextTemplate: string;
  tipFormatTitle: string;
  tipFormatContent: string;
  tipFormatTemplate: string;
  tipSpecificTitle: string;
  tipSpecificContent: string;
  tipSpecificTemplate: string;
  tipNaturalLanguageTitle: string;
  tipNaturalLanguageContent: string;
  tipNaturalLanguageTemplate: string;
  apiKeyWarningTitle: string;
  apiKeyWarningText: string;
  apiKeyWarningDismiss: string;
};

export type Translations = {
  [key in Language]: TranslationSet;
};
