import React from 'react';
import { TranslationSet } from '../constants/translations';

interface PromptInputFormProps {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  translations: TranslationSet;
  inputError?: string | null;
}

export const PromptInputForm = ({
  inputRef,
  inputValue,
  onInputChange,
  onSubmit,
  isLoading,
  translations,
  inputError,
}: PromptInputFormProps): JSX.Element => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 p-6 bg-slate-800 rounded-xl shadow-2xl'>
      <div>
        <label htmlFor='prompt-input' className='block text-sm font-medium text-sky-300 mb-1'>
          {translations.inputLabel}
        </label>
        <textarea
          id='prompt-input'
          ref={inputRef}
          value={inputValue}
          onChange={e => onInputChange(e.target.value)}
          rows={6}
          className={`w-full p-3 bg-slate-700 border rounded-lg shadow-sm focus:ring-2 focus:border-sky-500 placeholder-slate-400 text-slate-100 resize-none ${inputError ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-sky-500'}`}
          placeholder={translations.inputPlaceholder}
          disabled={isLoading}
          aria-describedby={inputError ? 'prompt-input-error' : 'prompt-input-help'}
          aria-invalid={!!inputError}
        />
        {inputError ? (
          <p id='prompt-input-error' className='mt-1 text-xs text-red-400'>
            {inputError}
          </p>
        ) : (
          <p id='prompt-input-help' className='mt-1 text-xs text-slate-400'>
            {translations.inputHelpText}
          </p>
        )}
      </div>
      <button
        type='submit'
        disabled={isLoading || !inputValue.trim()}
        className='w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors'
      >
        {isLoading ? (
          <>
            <svg
              className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
            {translations.enhancingButton}
          </>
        ) : (
          translations.submitButton
        )}
      </button>
    </form>
  );
};
