import React from 'react';

interface ApiKeyWarningProps {
  title: string;
  message: string;
  dismissText: string;
  onDismiss: () => void;
}

export const ApiKeyWarning: React.FC<ApiKeyWarningProps> = ({
  title,
  message,
  dismissText,
  onDismiss,
}) => {
  return (
    <div
      className='fixed top-0 left-0 right-0 z-50 p-4 bg-yellow-500 border-b-2 border-yellow-600 text-yellow-900 shadow-lg'
      role='alertdialog'
      aria-labelledby='apiKeyWarningTitle'
      aria-describedby='apiKeyWarningMessage'
    >
      <div className='container mx-auto flex items-center justify-between'>
        <div>
          <h2 id='apiKeyWarningTitle' className='font-bold text-lg'>
            {title}
          </h2>
          <p id='apiKeyWarningMessage' className='text-sm'>
            {message}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className='ml-4 px-3 py-1.5 text-sm font-medium rounded-md text-yellow-900 bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-500 focus:ring-yellow-700 transition-colors'
          aria-label={dismissText}
        >
          {dismissText}
        </button>
      </div>
    </div>
  );
};
