import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { PromptInputForm } from './components/PromptInputForm';
import { PromptResultDisplay } from './components/PromptResultDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { TipsSection } from './components/TipsSection';
import { ErrorDisplay } from './components/ErrorDisplay';
import { ApiKeyWarning } from './components/ApiKeyWarning';
import { refineUserPrompt } from './services/geminiService';
import { Tip, Language, Translations, TranslationSet } from './types';

const translations: Translations = {
  en: {
    headerTitle: 'AI Prompt Enhancer',
    headerSubtitle:
      'Transform your ideas into powerful, effective AI prompts. Inspired by "Prompting Guide 101".',
    inputLabel: 'Your Initial Prompt Idea:',
    inputPlaceholder: "e.g., 'write a story about a dragon'",
    inputHelpText: 'Enter a basic idea, or click a tip below to get started!',
    submitButton: 'Enhance My Prompt',
    enhancingButton: 'Enhancing...',
    refinedPromptTitle: 'Refined Power Prompt:',
    copyButton: 'Copy Prompt',
    copiedButton: 'Copied!',
    refinedPromptHelpText:
      'This enhanced prompt is designed to give you better results from AI models.',
    loadingText: 'Enhancing your prompt with AI magic...',
    errorTitle: 'Oops! Something went wrong.',
    tipsTitle: 'Tips for Crafting Power Prompts (Click to use template)',
    footerCopyright: `© ${new Date().getFullYear()} AI Prompt Enhancer. All rights reserved.`,
    footerPoweredBy: 'Powered by Gemini API',
    switchToChinese: '切換到繁體中文',
    switchToEnglish: 'Switch to English',
    enterPromptError: 'Please enter an initial prompt idea.',
    tipPersonaTitle: 'Define a Persona',
    tipPersonaContent: 'Clearly specify the role the AI should adopt.',
    tipPersonaTemplate:
      'As a [PROFESSION/ROLE] specializing in [AREA OF EXPERTISE], draft a [TASK TYPE] about [TOPIC].',
    tipTaskTitle: 'Specify the Task',
    tipTaskContent: 'Tell the AI exactly what it needs to do.',
    tipTaskTemplate:
      'Generate 5 creative taglines for a new [PRODUCT/SERVICE] aimed at [TARGET AUDIENCE].',
    tipContextTitle: 'Provide Context',
    tipContextContent: 'Include all necessary background information, constraints, or examples.',
    tipContextTemplate:
      'Based on the following document: @[DOCUMENT_NAME], summarize the key findings regarding [SPECIFIC_ASPECT] and highlight any implications for [DEPARTMENT/PROJECT].',
    tipFormatTitle: 'Suggest a Format',
    tipFormatContent: 'Indicate the desired output format.',
    tipFormatTemplate:
      "Write a short blog post about [TOPIC]. The output should be in JSON format with 'title' and 'content' keys. Limit the content to approximately 150 words.",
    tipSpecificTitle: 'Be Specific & Iterate',
    tipSpecificContent:
      "Provide as much detail as possible. If the first result isn't perfect, refine your prompt and try again.",
    tipSpecificTemplate:
      'Create a detailed three-day itinerary for a family of four (2 adults, 2 children aged 8 and 10) visiting [CITY/REGION]. Include a mix of cultural sites, fun activities, and kid-friendly restaurants. Budget is moderate. Avoid [SPECIFIC_AVOIDANCE].',
    tipNaturalLanguageTitle: 'Use Natural Language',
    tipNaturalLanguageContent:
      "Write as if you're speaking to another person. Express complete thoughts.",
    tipNaturalLanguageTemplate:
      'Explain the concept of [COMPLEX_TOPIC] to a 10-year-old in simple terms. Use an analogy to help illustrate the idea.',
    apiKeyWarningTitle: 'API Key Configuration Needed',
    apiKeyWarningText:
      'The Gemini API Key (process.env.API_KEY) is not defined. This application requires a valid API key to function. Please set it up in your environment.',
    apiKeyWarningDismiss: 'Dismiss',
  },
  'zh-TW': {
    headerTitle: 'AI 提示詞強化器',
    headerSubtitle: '將您的想法轉化為強大、有效的 AI 提示詞。靈感來自「提示詞指南 101」。',
    inputLabel: '您最初的提示詞想法：',
    inputPlaceholder: '例如：「寫一個關於龍的故事」',
    inputHelpText: '輸入一個基本想法，或點擊下方技巧開始！',
    submitButton: '強化我的提示詞',
    enhancingButton: '強化中...',
    refinedPromptTitle: '優化後的強效提示詞：',
    copyButton: '複製提示詞',
    copiedButton: '已複製！',
    refinedPromptHelpText: '這個強化後的提示詞旨在讓您從 AI 模型中獲得更好的結果。',
    loadingText: '正在用 AI 魔法強化您的提示詞...',
    errorTitle: '哎呀！出現了一些問題。',
    tipsTitle: '打造強效提示詞的技巧（點擊以使用範本）',
    footerCopyright: `© ${new Date().getFullYear()} AI 提示詞強化器。版權所有。`,
    footerPoweredBy: '由 Gemini API 驅動',
    switchToChinese: '切換到繁體中文',
    switchToEnglish: 'Switch to English',
    enterPromptError: '請輸入您初步的提示想法。',
    tipPersonaTitle: '定義角色 (Persona)',
    tipPersonaContent: '清楚說明 AI 應扮演的角色。',
    tipPersonaTemplate:
      '作為一名專精於 [專業領域] 的 [職業/角色]，起草一份關於 [主題] 的 [任務類型]。',
    tipTaskTitle: '明確任務 (Task)',
    tipTaskContent: '確切告知 AI 需要做什麼。',
    tipTaskTemplate: '為一個針對 [目標受眾] 的新 [產品/服務] 產生 5 個創意標語。',
    tipContextTitle: '提供情境 (Context)',
    tipContextContent: '包含 AI 所需的所有必要背景資訊、限制或範例。',
    tipContextTemplate:
      '根據以下文件：@[文件名稱]，總結關於 [特定方面] 的主要發現，並強調其對 [部門/專案] 的任何影響。',
    tipFormatTitle: '建議格式 (Format)',
    tipFormatContent: '指明期望的輸出格式。',
    tipFormatTemplate:
      "撰寫一篇關於 [主題] 的簡短部落格文章。輸出應為 JSON 格式，包含 'title' 和 'content' 鍵。內容限制在約 150 字。",
    tipSpecificTitle: '具體並迭代 (Be Specific & Iterate)',
    tipSpecificContent: '提供盡可能多的細節。如果第一次結果不完美，請調整您的提示詞再試一次。',
    tipSpecificTemplate:
      '為一個四口之家（2 位成人，2 位 8 歲和 10 歲的兒童）規劃一份詳細的 [城市/地區] 三日遊行程。行程應包含文化景點、趣味活動和適合兒童的餐廳。預算為中等。避免 [特定不想做的事]。',
    tipNaturalLanguageTitle: '使用自然語言 (Use Natural Language)',
    tipNaturalLanguageContent: '像與人交談一樣寫作。表達完整的想法。',
    tipNaturalLanguageTemplate:
      '用簡單的詞語向一位 10 歲的孩子解釋 [複雜主題] 的概念。使用一個比喻來幫助說明這個想法。',
    apiKeyWarningTitle: '需要設定 API 金鑰',
    apiKeyWarningText:
      'Gemini API 金鑰 (process.env.API_KEY) 未定義。此應用程式需要有效的 API 金鑰才能運作。請在您的環境中設定它。',
    apiKeyWarningDismiss: '關閉',
  },
};

const baseTipsRaw = [
  { key: 'Persona', icon: 'UserCircleIcon' },
  { key: 'Task', icon: 'ClipboardDocumentListIcon' },
  { key: 'Context', icon: 'InformationCircleIcon' },
  { key: 'Format', icon: 'Bars3BottomLeftIcon' },
  { key: 'Specific', icon: 'AdjustmentsHorizontalIcon' },
  { key: 'NaturalLanguage', icon: 'ChatBubbleLeftRightIcon' },
];

const App: React.FC = () => {
  const [promptInputValue, setPromptInputValue] = useState<string>('');
  const [refinedPrompt, setRefinedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [showApiKeyWarning, setShowApiKeyWarning] = useState<boolean>(false);

  useEffect(() => {
    // Check for API_KEY presence (this is a client-side check and won't see build-time env vars directly unless exposed)
    // For a real app, this check might be more sophisticated or handled server-side/build-time.
    // Here, we simulate it. If you have a way to inject `process.env.API_KEY` client-side, use that.
    // Otherwise, this warning might always show or never show depending on how `process.env.API_KEY` is handled in your setup.
    // A more robust way in a Vite/Create React App setup would be to use import.meta.env.VITE_API_KEY or process.env.REACT_APP_API_KEY
    if (typeof process === 'undefined' || !process.env || !process.env.API_KEY) {
      // A simple client-side check, this won't actually see Node's process.env.
      // This warning is more for local dev if the key isn't set in a way the frontend can see.
      // In a real deployed app, the backend/function calling Gemini would have the key.
      // For a client-side only call as per instructions, this check is tricky.
      // Assume for this context, if API_KEY is not *explicitly* made available to the client build, show warning.
      // This check below is a placeholder for how you might detect it.
      const isApiKeySet = (window as any).GEMINI_API_KEY_IS_SET; // You'd need to set this global var during build or runtime if key exists.
      if (!isApiKeySet && !localStorage.getItem('apiKeyWarningDismissed')) {
        // Fallback: If no API key is detected by the service later, an error will occur anyway.
        // This is a preemptive UI warning.
      }
    }
    // Actual check for API key in geminiService.ts is more critical.
    // This UI warning is for user awareness if it's likely not configured.
    const geminiApiKey = process.env.API_KEY; // This will be undefined in browser unless specifically exposed.
    if (!geminiApiKey && !localStorage.getItem('apiKeyWarningDismissed')) {
      setShowApiKeyWarning(true);
    }
  }, []);

  const currentTranslations = useMemo(() => translations[language], [language]);

  const handleRefinePrompt = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setInputError(null);
    setRefinedPrompt('');

    if (!promptInputValue.trim()) {
      setInputError(currentTranslations.enterPromptError);
      setIsLoading(false);
      return;
    }

    try {
      const result = await refineUserPrompt(promptInputValue, language);
      setRefinedPrompt(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [promptInputValue, language, currentTranslations.enterPromptError]);

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'zh-TW' : 'en'));
  };

  const handleTipClick = (template: string) => {
    setPromptInputValue(template);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top to see the input field
  };

  const localizedTips: Tip[] = useMemo(() => {
    return baseTipsRaw.map(tip => ({
      title: currentTranslations[`tip${tip.key}Title` as keyof TranslationSet] || tip.key,
      content: currentTranslations[`tip${tip.key}Content` as keyof TranslationSet] || tip.key,
      icon: tip.icon,
      template: currentTranslations[`tip${tip.key}Template` as keyof TranslationSet] || '',
    }));
  }, [currentTranslations]);

  const dismissApiKeyWarning = () => {
    setShowApiKeyWarning(false);
    localStorage.setItem('apiKeyWarningDismissed', 'true');
  };

  return (
    <div className='min-h-screen flex flex-col items-center p-4 md:p-8 selection:bg-sky-400 selection:text-sky-900'>
      {showApiKeyWarning && (
        <ApiKeyWarning
          title={currentTranslations.apiKeyWarningTitle}
          message={currentTranslations.apiKeyWarningText}
          dismissText={currentTranslations.apiKeyWarningDismiss}
          onDismiss={dismissApiKeyWarning}
        />
      )}
      <Header
        title={currentTranslations.headerTitle}
        subtitle={currentTranslations.headerSubtitle}
        currentLanguage={language}
        onToggleLanguage={toggleLanguage}
        translations={currentTranslations}
      />
      <main className='w-full max-w-3xl space-y-8 mt-8'>
        <PromptInputForm
          inputValue={promptInputValue}
          onInputChange={setPromptInputValue}
          onSubmit={handleRefinePrompt}
          isLoading={isLoading}
          translations={currentTranslations}
          inputError={inputError}
        />
        {isLoading && <LoadingSpinner text={currentTranslations.loadingText} />}
        {error && !inputError && (
          <ErrorDisplay message={error} errorTitle={currentTranslations.errorTitle} />
        )}
        {refinedPrompt && !isLoading && !error && !inputError && (
          <PromptResultDisplay prompt={refinedPrompt} translations={currentTranslations} />
        )}
        {!isLoading && (
          <TipsSection
            tips={localizedTips}
            title={currentTranslations.tipsTitle}
            onTipClick={handleTipClick}
          />
        )}
      </main>
      <footer className='mt-12 text-center text-sm text-slate-400 space-y-2'>
        <p>{currentTranslations.footerCopyright}</p>
        <p>{currentTranslations.footerPoweredBy}</p>
      </footer>
    </div>
  );
};

export default App;
