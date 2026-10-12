import React from 'react';

/**
 * RoyalMonogramSeal Component
 * Perfectly centered, non-clipping vector wedding seal for R & H.
 * Scales cleanly across all sizes (24px to 400px+) without spilling outside the circular boundary.
 */
export default function RoyalMonogramSeal({
  size = 40,
  className = '',
  monogram = 'R & H',
  showSubtext = false,
  subtext = 'RIHA',
  glow = false,
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full bg-transparent ${
        glow ? 'shadow-[0_0_24px_rgba(234,215,165,0.45)]' : ''
      } ${className}`}
      style={{ width: size, height: size, borderRadius: '50%' }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full select-none rounded-full overflow-hidden"
        style={{ borderRadius: '50%' }}
        aria-label="R & H Royal Wedding Monogram"
      >
        <defs>
          <linearGradient id="monogramGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="25%" stopColor="#E2C17D" />
            <stop offset="50%" stopColor="#F5E4B7" />
            <stop offset="75%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#9C7935" />
          </linearGradient>

          <linearGradient id="monogramSealBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E1710" />
            <stop offset="50%" stopColor="#0D0E13" />
            <stop offset="100%" stopColor="#17120B" />
          </linearGradient>

          <filter id="monogramGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Circular Medallion Background Base */}
        <circle cx="50" cy="50" r="48" fill="url(#monogramSealBg)" />

        {/* Outer Heavy Gold Filigree Rim */}
        <circle
          cx="50"
          cy="50"
          r="46.5"
          fill="none"
          stroke="url(#monogramGoldGrad)"
          strokeWidth="1.8"
        />

        {/* Inner Delicate Concentric Dotted Accent Ring */}
        <circle
          cx="50"
          cy="50"
          r="41"
          fill="none"
          stroke="url(#monogramGoldGrad)"
          strokeWidth="0.8"
          strokeDasharray="1.8, 1.8"
          opacity="0.8"
        />

        {/* Inner Solid Fine Ring */}
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="url(#monogramGoldGrad)"
          strokeWidth="0.5"
          opacity="0.4"
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
              fill="url(#monogramGoldGrad)"
              fontWeight="600"
              filter="url(#monogramGlowFilter)"
              opacity="0.95"
            >
              {subtext}
            </text>

            <text
              x="50"
              y="55"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Cinzel, serif"
              fontWeight="800"
              fill="url(#monogramGoldGrad)"
              filter="url(#monogramGlowFilter)"
              letterSpacing="0.8"
            >
              <tspan fontSize="23">R</tspan>
              <tspan fontSize="14" fontStyle="italic" dy="-2"> &amp; </tspan>
              <tspan fontSize="23" dy="2">H</tspan>
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
            fill="url(#monogramGoldGrad)"
            filter="url(#monogramGlowFilter)"
            letterSpacing="0.6"
          >
            <tspan fontSize="25">R</tspan>
            <tspan fontSize="15" fontStyle="italic" dy="-2"> &amp; </tspan>
            <tspan fontSize="25" dy="2">H</tspan>
          </text>
        )}
      </svg>
    </div>
  );
}
