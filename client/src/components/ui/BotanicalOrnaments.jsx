import React from 'react';

/**
 * Botanical Floral and Filigree Ornaments
 * Handcrafted vector artwork inspired by Reference Screenshots A, B, and C:
 * - Delicate olive and eucalyptus leaves
 * - Soft botanical sprigs and antique gold stems
 * - Minimalist romantic hearts and dividers
 */

export function DelicateHeart({ size = 16, className = 'text-[#C5A059]' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block ${className}`}
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function FloralDivider({ className = '', variant = 'gold' }) {
  const isGreen = variant === 'green';
  const strokeColor = isGreen ? '#2D523E' : '#C5A059';

  return (
    <div className={`flex items-center justify-center gap-3 my-4 w-full max-w-xs mx-auto ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A059]/40 to-[#C5A059]" />
      <svg width="28" height="18" viewBox="0 0 28 18" fill="none" className="shrink-0">
        <path
          d="M14 9C14 9 10 3 6 4C2 5 2 9 6 10C10 11 14 9 14 9Z"
          stroke={strokeColor}
          strokeWidth="0.9"
          fill="rgba(197, 160, 89, 0.12)"
        />
        <path
          d="M14 9C14 9 18 3 22 4C26 5 26 9 22 10C18 11 14 9 14 9Z"
          stroke={strokeColor}
          strokeWidth="0.9"
          fill="rgba(197, 160, 89, 0.12)"
        />
        <circle cx="14" cy="9" r="2.2" fill={strokeColor} />
      </svg>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C5A059]/40 to-[#C5A059]" />
    </div>
  );
}

export function BotanicalCornerFlourish({ position = 'top-left', className = '' }) {
  const isRight = position.includes('right');
  const isBottom = position.includes('bottom');

  return (
    <div
      className={`absolute pointer-events-none select-none z-10 ${
        isRight ? 'right-0' : 'left-0'
      } ${isBottom ? 'bottom-0' : 'top-0'} ${className}`}
      style={{
        transform: `scale(${isRight ? -1 : 1}, ${isBottom ? -1 : 1})`,
      }}
    >
      <svg width="110" height="110" viewBox="0 0 110 110" fill="none" className="opacity-75">
        {/* Soft olive foliage */}
        <path
          d="M4 4C25 4 45 15 55 35C62 48 65 65 65 85"
          stroke="#B89047"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M4 4C14 24 24 45 42 55C58 64 78 66 98 66"
          stroke="#2D523E"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeDasharray="2 3"
        />
        {/* Leaves */}
        <path
          d="M20 12C26 8 34 10 36 17C38 24 31 28 24 26C19 24 16 18 20 12Z"
          fill="#3E634F"
          fillOpacity="0.25"
          stroke="#2D523E"
          strokeWidth="0.8"
        />
        <path
          d="M40 28C48 24 56 27 57 35C58 43 51 47 43 45C37 43 35 35 40 28Z"
          fill="#3E634F"
          fillOpacity="0.2"
          stroke="#2D523E"
          strokeWidth="0.8"
        />
        <path
          d="M14 35C18 42 16 50 10 54C4 58 0 52 2 45C4 39 10 34 14 35Z"
          fill="#C5A059"
          fillOpacity="0.22"
          stroke="#B89047"
          strokeWidth="0.8"
        />
        {/* Rosebud accent */}
        <circle cx="56" cy="36" r="3" fill="#E8C5C8" stroke="#B89047" strokeWidth="0.7" />
        <circle cx="8" cy="8" r="2.5" fill="#C5A059" />
      </svg>
    </div>
  );
}

export function BotanicalHeaderArch({ className = '' }) {
  return (
    <div className={`w-full max-w-md mx-auto pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 320 60" fill="none" className="w-full h-auto">
        {/* Curved stem */}
        <path
          d="M20 50C70 15 120 8 160 8C200 8 250 15 300 50"
          stroke="#C5A059"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Leaves left */}
        <path
          d="M60 38C68 30 76 33 76 41C76 48 68 50 62 46C58 44 57 39 60 38Z"
          fill="#2D523E"
          fillOpacity="0.22"
          stroke="#2D523E"
          strokeWidth="0.8"
        />
        <path
          d="M110 20C116 12 125 14 126 21C127 28 120 31 113 28C108 26 107 21 110 20Z"
          fill="#3E634F"
          fillOpacity="0.2"
          stroke="#2D523E"
          strokeWidth="0.8"
        />
        {/* Center floral bud / heart */}
        <path
          d="M160 5C163 1 168 2 169 6C170 10 165 14 160 17C155 14 150 10 151 6C152 2 157 1 160 5Z"
          fill="#B89047"
          stroke="#7A5B22"
          strokeWidth="0.7"
        />
        {/* Leaves right */}
        <path
          d="M210 20C204 12 195 14 194 21C193 28 200 31 207 28C212 26 213 21 210 20Z"
          fill="#3E634F"
          fillOpacity="0.2"
          stroke="#2D523E"
          strokeWidth="0.8"
        />
        <path
          d="M260 38C252 30 244 33 244 41C244 48 252 50 258 46C262 44 263 39 260 38Z"
          fill="#2D523E"
          fillOpacity="0.22"
          stroke="#2D523E"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}

export function BotanicalFloralSprig({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      className={`inline-block ${className}`}
    >
      <path
        d="M10 50C25 35 38 25 50 10"
        stroke="#B89047"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M25 35C24 28 29 23 35 25C40 27 38 34 32 36C27 37 25 36 25 35Z"
        fill="#2D523E"
        fillOpacity="0.28"
        stroke="#2D523E"
        strokeWidth="0.8"
      />
      <path
        d="M38 23C42 17 48 18 50 24C51 30 45 32 40 29C37 27 37 24 38 23Z"
        fill="#3E634F"
        fillOpacity="0.22"
        stroke="#2D523E"
        strokeWidth="0.8"
      />
      <circle cx="50" cy="10" r="3" fill="#E8C5C8" stroke="#B89047" strokeWidth="0.7" />
    </svg>
  );
}
