import React from 'react';

interface ErrorDisplayProps {
  message: string;
  errorTitle: string;
}

export const ErrorDisplay = ({ message, errorTitle }: ErrorDisplayProps): JSX.Element => {
  return (
    <div
      className='p-4 bg-red-700 border border-red-900 text-red-100 rounded-lg shadow-lg'
      role='alert'
      aria-live='assertive'
    >
      <div className='flex'>
        <div className='py-1'>
          <svg
            className='fill-current h-6 w-6 text-red-300 mr-4'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 5v6h2V5H9zm0 8v2h2v-2H9z' />
          </svg>
        </div>
        <div>
          <p className='font-bold'>{errorTitle}</p>
          <p className='text-sm'>{message}</p>
        </div>
      </div>
    </div>
  );
};
