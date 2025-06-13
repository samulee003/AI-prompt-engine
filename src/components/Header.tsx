import React from 'react';
import { Language, TranslationSet } from '../constants/translations';
import { SparkIcon } from './icons/SparkIcon';

interface HeaderProps {
  title: string;
  subtitle: string;
  currentLanguage: Language;
  onToggleLanguage: () => void;
  translations: TranslationSet;
}

export const Header = ({
  title,
  subtitle,
  currentLanguage,
  onToggleLanguage,
  translations,
}: HeaderProps): JSX.Element => {
  return (
    <header className='text-center w-full max-w-4xl mx-auto relative'>
      <button
        onClick={onToggleLanguage}
        className='absolute top-0 right-0 mt-2 mr-2 md:mt-0 md:mr-0 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-medium rounded-md text-sky-100 bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 transition-colors'
        aria-label={
          currentLanguage === 'en' ? translations.switchToChinese : translations.switchToEnglish
        }
      >
        {currentLanguage === 'en'
          ? translations.buttonSwitchToChineseLabel
          : translations.buttonSwitchToEnglishLabel}
      </button>
      <div className='inline-block p-2 rounded-lg bg-sky-500 mb-4 mt-8 md:mt-4'>
        <SparkIcon className='w-10 h-10 text-white' />
      </div>
      <h1 className='text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-400'>
        {title}
      </h1>
      <p className='mt-3 text-lg text-slate-300'>{subtitle}</p>
    </header>
  );
};
