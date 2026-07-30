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
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
    xl: 'w-16 h-16 p-3.5',
  };

  const titleSizes = {
    sm: 'text-base font-extrabold tracking-tight',
    md: 'text-lg font-black tracking-tight',
    lg: 'text-2xl font-black tracking-tight',
    xl: 'text-3xl font-black tracking-tight',
  };

  const taglineSizes = {
    sm: 'text-[9px] tracking-wider',
    md: 'text-[10px] tracking-widest',
    lg: 'text-xs tracking-widest',
    xl: 'text-sm tracking-widest',
  };

  const textColor = variant === 'white' ? 'text-white' : 'text-slate-900 dark:text-white';
  const taglineColor = variant === 'white' ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400';

  return (
    <div className={`flex ${inline ? 'flex-row items-center gap-2.5' : 'flex-col items-center'} ${className}`}>
      {/* SAM EPSON Technical Emblem Badge */}
      <div className={`relative shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white shadow-md ring-2 ring-blue-500/30 ${iconSizes[size]}`}>
        {/* Glow backdrop */}
        <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xs"></div>
        
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white relative z-10"
        >
          {/* Mainboard & Printhead Die Frame */}
          <rect x="3" y="4" width="22" height="20" rx="3" fill="#0F172A" stroke="white" strokeWidth="1.5" />
          {/* Circuit Trace Contacts */}
          <path d="M7 2v2M14 2v2M21 2v2" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7 24v2M14 24v2M21 24v2" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
          {/* MicroPiezo Nozzle Array Lines */}
          <line x1="7" y1="9" x2="21" y2="9" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="2 1.5" />
          <line x1="7" y1="13" x2="21" y2="13" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="2 1.5" />
          <line x1="7" y1="17" x2="16" y2="17" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="2 1.5" />
          {/* Golden/Cyan Chip Core */}
          <rect x="18" y="15" width="5" height="5" rx="1" fill="#38BDF8" stroke="#0F172A" strokeWidth="0.8" />
        </svg>

        {/* Certified Dot */}
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-xs"></span>
      </div>

      {/* Brand Name Typography */}
      <div className={`${inline ? 'text-left' : 'text-center'}`}>
        <div className={`font-mono uppercase ${titleSizes[size]} ${textColor} leading-none flex items-center gap-1.5`}>
          <span className="font-extrabold tracking-tight">SAM</span>
          <span className="text-blue-600 dark:text-blue-400 font-black tracking-tighter bg-clip-text">EPSON</span>
        </div>

        {showTagline && (
          <div className={`font-sans uppercase font-bold ${taglineSizes[size]} ${taglineColor} mt-1 flex items-center gap-1`}>
            <span>PRINTER TECHNICAL SPARES</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const SamEpsonLogo = NovenLogo;

