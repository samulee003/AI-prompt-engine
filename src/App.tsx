import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { PromptInputForm } from './components/PromptInputForm';
import { PromptResultDisplay } from './components/PromptResultDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { TipsSection } from './components/TipsSection';
import { ErrorDisplay } from './components/ErrorDisplay';
import { ApiKeyWarning } from './components/ApiKeyWarning';
import { refineUserPrompt } from './services/geminiService';
import { translations, Language, TranslationSet } from './constants/translations';
import { baseTipsRaw, Tip } from './constants/tips';

const App = (): JSX.Element => {
  const [promptInputValue, setPromptInputValue] = useState<string>('');
  const [refinedPrompt, setRefinedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [showApiKeyWarning, setShowApiKeyWarning] = useState<boolean>(false);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Client-side check for API_KEY for UI warning.
    // The actual enforcement/check happens in geminiService.ts before an API call.
    // This `process.env.API_KEY` will be undefined unless explicitly exposed to the client
    // (e.g. by a build tool or a script like in index.html for this demo).
    const apiKeyExists = typeof process !== 'undefined' && process.env && process.env.API_KEY;
    if (!apiKeyExists && !localStorage.getItem('apiKeyWarningDismissed')) {
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
    promptInputRef.current?.focus(); // Focus the textarea
    // Scroll to top to see the input field if it's not fully visible
    // For finer control, you might check if the input is already in view.
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          inputRef={promptInputRef}
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
