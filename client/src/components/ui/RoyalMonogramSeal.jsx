import React from 'react';

/**
 * RoyalMonogramSeal Component
 * Perfectly centered, non-clipping vector wedding seal for R & H.
 * Supports luxury 'ivory' (default), 'gold', and 'dark' variants.
 */
export default function RoyalMonogramSeal({
  size = 40,
  className = '',
  monogram = 'L & T',
  showSubtext = false,
  subtext = 'LT',
  glow = false,
  variant = 'ivory', // 'ivory' | 'dark' | 'gold'
}) {
  const isIvory = variant === 'ivory';
  const isGold = variant === 'gold';

  // Parse monogram letters (e.g. "L & T" -> "L" and "T")
  const parts = monogram.split('&').map((s) => s.trim());
  const letter1 = parts[0] || 'L';
  const letter2 = parts[1] || 'T';
  const displaySubtext = subtext || `${letter1}${letter2}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full bg-transparent ${
        glow
          ? isIvory
            ? 'shadow-[0_0_20px_rgba(197,160,89,0.35)]'
            : 'shadow-[0_0_24px_rgba(234,215,165,0.45)]'
          : ''
      } ${className}`}
      style={{ width: size, height: size, borderRadius: '50%' }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full select-none rounded-full overflow-hidden"
        style={{ borderRadius: '50%' }}
        aria-label={`${monogram} Royal Wedding Monogram`}
      >
        <defs>
          <linearGradient id="monogramGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="25%" stopColor="#E2C17D" />
            <stop offset="50%" stopColor="#F5E4B7" />
            <stop offset="75%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#9C7935" />
          </linearGradient>

          <linearGradient id="monogramAntiqueGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9E7833" />
            <stop offset="35%" stopColor="#C5A059" />
            <stop offset="70%" stopColor="#8C692B" />
            <stop offset="100%" stopColor="#70521C" />
          </linearGradient>

          <linearGradient id="monogramIvoryBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFEFC" />
            <stop offset="60%" stopColor="#F9F5EC" />
            <stop offset="100%" stopColor="#EFE6D5" />
          </linearGradient>

          <linearGradient id="monogramSealDarkBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E1710" />
            <stop offset="50%" stopColor="#0D0E13" />
            <stop offset="100%" stopColor="#17120B" />
          </linearGradient>

          <filter id="monogramSubtleShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#1B382B" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Circular Medallion Background Base */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill={isIvory ? 'url(#monogramIvoryBg)' : isGold ? 'url(#monogramGoldGrad)' : 'url(#monogramSealDarkBg)'}
        />

        {/* Outer Heavy Gold Filigree Rim */}
        <circle
          cx="50"
          cy="50"
          r="46.5"
          fill="none"
          stroke="url(#monogramAntiqueGold)"
          strokeWidth="1.8"
        />

        {/* Inner Delicate Concentric Dotted Accent Ring */}
        <circle
          cx="50"
          cy="50"
          r="41"
          fill="none"
          stroke="url(#monogramAntiqueGold)"
          strokeWidth="0.8"
          strokeDasharray="1.8, 1.8"
          opacity={isIvory ? "0.9" : "0.8"}
        />

        {/* Inner Solid Fine Ring */}
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="url(#monogramAntiqueGold)"
          strokeWidth="0.6"
          opacity={isIvory ? "0.6" : "0.4"}
        />

        {/* Monogram Typography - Perfectly Centered & Measured */}
        {showSubtext ? (
          <>
            <text
              x="50"
              y="30"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Cinzel, serif"
              fontSize="8"
              letterSpacing="2.2"
              fill={isIvory ? "#1B382B" : "url(#monogramGoldGrad)"}
              fontWeight="700"
              opacity="0.95"
            >
              {displaySubtext}
            </text>

            <text
              x="50"
              y="55"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Cinzel, serif"
              fontWeight="800"
              fill={isIvory ? "url(#monogramAntiqueGold)" : "url(#monogramGoldGrad)"}
              filter="url(#monogramSubtleShadow)"
              letterSpacing="0.8"
            >
              <tspan fontSize="23">{letter1}</tspan>
              <tspan fontSize="14" fontStyle="italic" dy="-2"> &amp; </tspan>
              <tspan fontSize="23" dy="2">{letter2}</tspan>
            </text>
          </>
        ) : (
          <text
            x="50"
            y="52"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="Cinzel, serif"
            fontWeight="800"
            fill={isIvory ? "url(#monogramAntiqueGold)" : "url(#monogramGoldGrad)"}
            filter="url(#monogramSubtleShadow)"
            letterSpacing="0.6"
          >
            <tspan fontSize="25">{letter1}</tspan>
            <tspan fontSize="15" fontStyle="italic" dy="-2"> &amp; </tspan>
            <tspan fontSize="25" dy="2">{letter2}</tspan>
          </text>
        )}
      </svg>
    </div>
  );
}
