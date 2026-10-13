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

/**
 * Hanging Decorative Wedding Bulb
 * Suspended by an elegant wire, gently swings from the top pivot with a warm golden glow.
 */
export function HangingWeddingBulb({ className = '', style = {} }) {
  return (
    <div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        transformOrigin: 'top center',
        ...style,
      }}
    >
      <div className="flex flex-col items-center">
        {/* Hanging wire from top ceiling */}
        <div className="w-[1.5px] h-24 sm:h-28 bg-gradient-to-b from-[#8C692B] via-[#C5A059] to-[#8C692B]" />

        {/* Brass / Antique Gold Lamp Socket */}
        <div className="relative -mt-0.5 flex flex-col items-center">
          {/* Socket Cap */}
          <div className="w-4 h-2 rounded-t-sm bg-gradient-to-r from-[#8C692B] via-[#EAD7A5] to-[#8C692B] border border-[#B89047]" />
          {/* Threaded Ring */}
          <div className="w-5 h-2.5 bg-gradient-to-r from-[#A07A30] via-[#F4E3B5] to-[#8C692B] border-t border-b border-[#73541E]" />

          {/* Teardrop Glass Bulb with Filament & Golden Glow */}
          <div className="relative mt-0.5 flex items-center justify-center">
            {/* Ambient Radial Golden Aura */}
            <div
              className="absolute -inset-4 rounded-full pointer-events-none animate-pulse"
              style={{
                background:
                  'radial-gradient(circle, rgba(255, 220, 130, 0.45) 0%, rgba(212, 175, 55, 0.18) 45%, transparent 75%)',
                filter: 'blur(6px)',
              }}
            />

            {/* Vintage Glass Teardrop SVG */}
            <svg width="34" height="46" viewBox="0 0 34 46" fill="none" className="relative z-10 drop-shadow-md">
              {/* Bulb Glass Body */}
              <path
                d="M10 2C8 2 7 6 7 10C7 16 2 20 2 28C2 37 8 44 17 44C26 44 32 37 32 28C32 20 27 16 27 10C27 6 26 2 24 2H10Z"
                fill="url(#glassGrad)"
                stroke="#C5A059"
                strokeWidth="1.2"
              />
              {/* Warm Incandescent Filament */}
              <path
                d="M13 14L15 26L17 22L19 26L21 14"
                stroke="#FFB347"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="17" cy="24" r="2.5" fill="#FFE8A3" />

              {/* Glass Reflection Highlight */}
              <path
                d="M6 24C6 20 9 16 10 13"
                stroke="rgba(255, 255, 255, 0.75)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />

              <defs>
                <radialGradient id="glassGrad" cx="0.5" cy="0.6" r="0.5" fx="0.5" fy="0.5">
                  <stop offset="0%" stopColor="#FFFDF2" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#FDEFCB" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#E5C77A" stopOpacity="0.25" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Blooming Botanical Flower Ornament
 * Elegantly unfurls its stem, leaves, and progressive rose/lotus petals
 * after the scratch interaction completes.
 */
export function BloomingFlowerOrnament({ onAnimationEnd, className = '' }) {
  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      {/* Drifting Petals in Background */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        {[
          { x: -25, y: 35, rot: 45, delay: 0.8 },
          { x: 30, y: 50, rot: -30, delay: 1.1 },
          { x: -15, y: 75, rot: 25, delay: 1.4 },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-3.5 h-2.5 rounded-full bg-gradient-to-br from-[#F5D8DB] to-[#EAD7A5] border border-[#C5A059]/40 opacity-70 animate-bounce"
            style={{
              transform: `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`,
              animationDuration: '3.5s',
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Handcrafted Botanical Rose SVG with Staggered Petal Expansion */}
      <svg width="130" height="130" viewBox="0 0 130 130" fill="none" className="overflow-visible">
        {/* Curved Vine & Olive Leaves */}
        <g className="origin-bottom">
          <path
            d="M65 110C65 85 58 65 65 45"
            stroke="#2D523E"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="transition-all duration-700"
          />
          {/* Leaves */}
          <path
            d="M63 80C52 75 48 85 52 92C58 98 64 90 63 80Z"
            fill="#3E634F"
            fillOpacity="0.35"
            stroke="#2D523E"
            strokeWidth="1"
          />
          <path
            d="M66 68C76 62 82 70 78 78C72 85 66 76 66 68Z"
            fill="#3E634F"
            fillOpacity="0.35"
            stroke="#2D523E"
            strokeWidth="1"
          />
        </g>

        {/* 1. OUTER PETALS (Smooth Bloom Opening) */}
        <g className="origin-center animate-[spin_30s_linear_infinite]">
          {[0, 72, 144, 216, 288].map((angle, idx) => (
            <path
              key={`outer-${idx}`}
              d="M65 45C55 25 40 22 45 10C55 -2 75 -2 85 10C90 22 75 25 65 45Z"
              fill="#FFFDF9"
              fillOpacity="0.9"
              stroke="#B89047"
              strokeWidth="1"
              transform={`rotate(${angle} 65 45)`}
              className="drop-shadow-sm transition-transform duration-1000"
              style={{
                transformOrigin: '65px 45px',
              }}
            />
          ))}
        </g>

        {/* 2. INNER PETALS (Blush & Champagne) */}
        <g>
          {[36, 108, 180, 252, 324].map((angle, idx) => (
            <path
              key={`inner-${idx}`}
              d="M65 45C58 32 48 30 52 22C58 14 72 14 78 22C82 30 72 32 65 45Z"
              fill="#FAF2E8"
              fillOpacity="0.95"
              stroke="#C5A059"
              strokeWidth="0.9"
              transform={`rotate(${angle} 65 45)`}
              style={{
                transformOrigin: '65px 45px',
              }}
            />
          ))}
        </g>

        {/* 3. FLOWER HEART & GOLDEN STAMEN */}
        <circle cx="65" cy="45" r="9" fill="#F5E4C4" stroke="#B89047" strokeWidth="1" />
        <circle cx="65" cy="45" r="4.5" fill="#C5A059" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <circle
            key={i}
            cx={65 + 6.5 * Math.cos((deg * Math.PI) / 180)}
            cy={45 + 6.5 * Math.sin((deg * Math.PI) / 180)}
            r="1.2"
            fill="#8C692B"
          />
        ))}
      </svg>
    </div>
  );
}

