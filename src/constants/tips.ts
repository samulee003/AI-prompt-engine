export interface Tip {
  title: string;
  content: string;
  icon?: string; // Heroicon name (optional)
  template?: string; // Optional template string for the tip
}

// Raw data for tips, keys are used for constructing translation keys
export const baseTipsRaw = [
  { key: 'Persona', icon: 'UserCircleIcon' },
  { key: 'Task', icon: 'ClipboardDocumentListIcon' },
  { key: 'Context', icon: 'InformationCircleIcon' },
  { key: 'Format', icon: 'Bars3BottomLeftIcon' },
  { key: 'Specific', icon: 'AdjustmentsHorizontalIcon' },
  { key: 'NaturalLanguage', icon: 'ChatBubbleLeftRightIcon' },
];
