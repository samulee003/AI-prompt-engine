import React from 'react';
import { Tip } from '../types';
import { InfoCard } from './InfoCard';

interface TipsSectionProps {
  tips: Tip[];
  title: string;
  onTipClick: (template: string) => void;
}

export const TipsSection: React.FC<TipsSectionProps> = ({ tips, title, onTipClick }) => {
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-semibold text-center text-sky-300'>{title}</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {tips.map(tip => (
          <InfoCard
            key={tip.title}
            title={tip.title}
            iconName={tip.icon}
            onClick={tip.template ? () => onTipClick(tip.template!) : undefined}
          >
            {tip.content}
          </InfoCard>
        ))}
      </div>
    </div>
  );
};
