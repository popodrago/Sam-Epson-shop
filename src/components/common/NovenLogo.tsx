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
    sm: 'w-8 h-8 p-1',
    md: 'w-10 h-10 p-1.5',
    lg: 'w-12 h-12 p-2',
    xl: 'w-16 h-16 p-2.5',
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
  const taglineColor = variant === 'white' ? 'text-amber-400/90' : 'text-amber-600 dark:text-amber-400 font-medium';

  return (
    <div className={`flex ${inline ? 'flex-row items-center gap-2.5' : 'flex-col items-center'} ${className}`}>
      {/* SAM EPSON Golden Printer Graphic Badge */}
      <div className={`relative shrink-0 flex items-center justify-center rounded-xl bg-slate-950 border border-amber-500/30 shadow-lg shadow-amber-500/10 ${iconSizes[size]}`}>
        {/* Glow backdrop */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-700/20 blur-xs"></div>

        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
        >
          <defs>
            <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE58F" />
              <stop offset="30%" stopColor="#D4AF37" />
              <stop offset="60%" stopColor="#FFF8D6" />
              <stop offset="85%" stopColor="#AA7C11" />
              <stop offset="100%" stopColor="#E6C200" />
            </linearGradient>
            <linearGradient id="goldDark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9A7B1C" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#6B530B" />
            </linearGradient>
            <linearGradient id="goldLight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF6CC" />
              <stop offset="50%" stopColor="#E5C158" />
              <stop offset="100%" stopColor="#B88A14" />
            </linearGradient>
          </defs>

          {/* Paper Feeder (Top) */}
          <rect x="34" y="6" width="32" height="28" rx="1.5" fill="url(#goldMetallic)" />
          <path d="M22 18 h56 v16 H22 z" fill="url(#goldDark)" opacity="0.85" />
          <rect x="31" y="10" width="38" height="22" rx="1.5" fill="url(#goldMetallic)" />

          {/* Main Body Upper Section */}
          <rect x="8" y="30" width="84" height="22" rx="9" fill="url(#goldMetallic)" />

          {/* Control Buttons & Screen */}
          <rect x="16" y="37" width="6.5" height="6.5" rx="1" fill="#0A0A0E" />
          <circle cx="30" cy="40.25" r="3.25" fill="#0A0A0E" />
          <circle cx="41" cy="40.25" r="3.25" fill="#0A0A0E" />
          <rect x="60" y="37" width="16" height="6.5" rx="1.5" fill="#0A0A0E" />

          {/* Black Banner Bar Across Center */}
          <rect x="8" y="49" width="84" height="16" fill="#0A0A0E" />

          {/* SAM EPSON Brand Typography inside icon */}
          <text x="50" y="60.5" textAnchor="middle" fill="url(#goldMetallic)" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="8.8" letterSpacing="0.8">
            SAM EPSON
          </text>

          {/* Main Body Lower Section */}
          <path d="M8 65 h84 v6 c0 6 -4.5 10 -10 10 H18 c-5.5 0 -10 -4 -10 -10 v-6 z" fill="url(#goldMetallic)" />

          {/* Printed Paper Output Tray (Trapezoid) */}
          <path d="M26 65 h48 l8 25 H18 z" fill="url(#goldLight)" />

          {/* Tagline */}
          <text x="50" y="97" textAnchor="middle" fill="url(#goldMetallic)" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="4.2" letterSpacing="0.3">
            Engineered to endure
          </text>
        </svg>

        {/* Certified Genuine Dot */}
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-slate-950 shadow-xs ring-1 ring-amber-300/50"></span>
      </div>

      {/* Brand Name Typography */}
      <div className={`${inline ? 'text-left' : 'text-center'}`}>
        <div className={`font-mono uppercase ${titleSizes[size]} ${textColor} leading-none flex items-center gap-1.5`}>
          <span className="font-extrabold tracking-tight text-amber-500 dark:text-amber-400">SAM</span>
          <span className="text-slate-900 dark:text-white font-black tracking-tighter">EPSON</span>
        </div>

        {showTagline && (
          <div className={`font-serif italic ${taglineSizes[size]} ${taglineColor} mt-1 flex items-center gap-1`}>
            <span>Engineered to endure</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const SamEpsonLogo = NovenLogo;
