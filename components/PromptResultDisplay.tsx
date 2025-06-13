import React, { useState } from 'react';
import { TranslationSet } from '../types';

interface PromptResultDisplayProps {
  prompt: string;
  translations: TranslationSet;
}

export const PromptResultDisplay: React.FC<PromptResultDisplayProps> = ({
  prompt,
  translations,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className='p-6 bg-slate-800 rounded-xl shadow-2xl space-y-3'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold text-sky-300'>{translations.refinedPromptTitle}</h2>
        <button
          onClick={handleCopy}
          className='px-3 py-1.5 text-sm font-medium rounded-md text-sky-100 bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 transition-colors'
        >
          {copied ? translations.copiedButton : translations.copyButton}
        </button>
      </div>
      <pre
        className='p-4 bg-slate-700 rounded-lg text-slate-100 whitespace-pre-wrap break-words overflow-x-auto text-sm leading-relaxed'
        aria-live='polite'
      >
        {prompt}
      </pre>
      <p className='text-xs text-slate-400'>{translations.refinedPromptHelpText}</p>
    </div>
  );
};
