import React from 'react';
import { Language, TranslationSet } from '../types';

interface HeaderProps {
  title: string;
  subtitle: string;
  currentLanguage: Language;
  onToggleLanguage: () => void;
  translations: TranslationSet;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  currentLanguage,
  onToggleLanguage,
  translations,
}) => {
  return (
    <header className='text-center w-full max-w-4xl mx-auto relative'>
      <button
        onClick={onToggleLanguage}
        className='absolute top-0 right-0 mt-2 mr-2 md:mt-0 md:mr-0 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-medium rounded-md text-sky-100 bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 transition-colors'
        aria-label={
          currentLanguage === 'en' ? translations.switchToChinese : translations.switchToEnglish
        }
      >
        {currentLanguage === 'en' ? '繁體中文' : 'English'}
      </button>
      <div className='inline-block p-2 rounded-lg bg-sky-500 mb-4 mt-8 md:mt-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-10 h-10 text-white'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L24 5.25l-.813 2.846a4.5 4.5 0 0 0-3.09 3.09L18.25 12ZM18.25 12l2.846.813a4.5 4.5 0 0 1 3.09 3.09L24 18.75l-.813-2.846a4.5 4.5 0 0 1-3.09-3.09L18.25 12Z'
          />
        </svg>
      </div>
      <h1 className='text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-400'>
        {title}
      </h1>
      <p className='mt-3 text-lg text-slate-300'>{subtitle}</p>
    </header>
  );
};
