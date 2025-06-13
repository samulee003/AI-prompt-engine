import React from 'react';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  iconName?: string; // Name of the Heroicon (e.g., "AcademicCapIcon")
  onClick?: () => void;
}

// A helper function to render Heroicons dynamically.
const HeroIcon: React.FC<{ name?: string; className?: string }> = ({
  name,
  className = 'w-6 h-6',
}) => {
  const iconMap: Record<string, React.ReactNode> = {
    UserCircleIcon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={className}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
        />
      </svg>
    ),
    ClipboardDocumentListIcon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={className}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z'
        />
      </svg>
    ),
    InformationCircleIcon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={className}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z'
        />
      </svg>
    ),
    Bars3BottomLeftIcon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={className}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12'
        />
      </svg>
    ),
    AdjustmentsHorizontalIcon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={className}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75'
        />
      </svg>
    ),
    ChatBubbleLeftRightIcon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={className}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.68-3.68c-.92.36-1.84.532-2.74.532H6.75c-1.105 0-2-.895-2-2V7.755c0-1.105.895-2 2-2h7.5c.996 0 1.909.323 2.624.872l4.126-2.122ZM16.5 9.75h-7.5'
        />
      </svg>
    ),
    AcademicCapIcon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={className}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5'
        />
      </svg>
    ),
  };
  return name && iconMap[name] ? (
    iconMap[name]
  ) : (
    <HeroIcon name='AcademicCapIcon' className={className} />
  );
};

export const InfoCard: React.FC<InfoCardProps> = ({ title, children, iconName, onClick }) => {
  const cardClasses = `bg-slate-800 p-5 rounded-lg shadow-xl border border-slate-700 hover:shadow-sky-500/20 transition-shadow duration-300 ${onClick ? 'cursor-pointer hover:border-sky-600' : ''}`;

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? e => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
    >
      <div className='flex items-center mb-2'>
        <span className='text-sky-400 mr-2'>
          <HeroIcon name={iconName} className='w-6 h-6' />
        </span>
        <h3 className='text-lg font-semibold text-sky-300'>{title}</h3>
      </div>
      <p className='text-sm text-slate-300 leading-relaxed'>{children}</p>
    </div>
  );
};
