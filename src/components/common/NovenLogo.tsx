import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light' | 'white';
  showTagline?: boolean;
  inline?: boolean;
}

export const NovenLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  showTagline = true,
  inline = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const titleSizes = {
    sm: 'text-sm tracking-tight',
    md: 'text-base font-bold tracking-tight',
    lg: 'text-xl font-extrabold tracking-tight',
    xl: 'text-2xl font-black tracking-tight',
  };

  const taglineSizes = {
    sm: 'text-[9px] tracking-wider',
    md: 'text-[10px] tracking-widest',
    lg: 'text-xs tracking-widest',
    xl: 'text-sm tracking-widest',
  };

  const primaryColor = variant === 'white' ? '#FFFFFF' : '#0F172A'; // Slate 900
  const accentColor = '#2563EB'; // Vibrant tech blue
  const textColor = variant === 'white' ? 'text-white' : 'text-slate-900 dark:text-white';
  const taglineColor = variant === 'white' ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400';

  return (
    <div className={`flex ${inline ? 'flex-row items-center gap-2.5' : 'flex-col items-center'} ${className}`}>
      {/* Precision Micro-Printhead & Circuit Badge Emblem */}
      <div className={`relative shrink-0 flex items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-800 p-2 text-white shadow-sm ring-1 ring-slate-800 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full text-blue-500"
        >
          {/* Outer Board Frame */}
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
          {/* Printhead Nozzles Grid */}
          <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1 1.5" />
          {/* Microchip Core */}
          <rect x="15" y="14" width="4" height="4" fill="#2563EB" stroke="none" rx="0.5" />
          {/* Micro Contact Pin */}
          <path d="M12 4V2M8 4V2M16 4V2" stroke="#2563EB" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Modern Editorial Typography */}
      <div className={`${inline ? 'text-left' : 'text-center'}`}>
        <div className={`font-mono uppercase ${titleSizes[size]} ${textColor} leading-none flex items-center gap-1.5`}>
          <span>SAM</span>
          <span className="text-blue-600 dark:text-blue-400 font-extrabold">EPSON</span>
        </div>

        {showTagline && (
          <div className={`font-sans uppercase font-medium ${taglineSizes[size]} ${taglineColor} mt-1`}>
            PRINTER PARTS & ELECTRONICS
          </div>
        )}
      </div>
    </div>
  );
};

export const SamEpsonLogo = NovenLogo;
