import React from 'react';

/**
 * Luxury Theatrical Curtain Stage Frame (Reference 1 Recreation)
 *
 * Faithfully encases the central responsive invitation card inside the opulent
 * theatrical curtain stage matching the reference image down to the pixel:
 * - Top polished gold curtain rod with turned finials and central carved floral rosette
 * - Layered scalloped fabric valance with gold cord piping and hanging gold bead drops
 * - Symmetrical left and right champagne silk drapes with twisted gold rope tiebacks,
 *   double gold ball beads, and long bullion tassels at identical heights
 * - Classical European stone balustrade, urns with white roses, Italian cypress trees,
 *   and 3-tiered cascading fountain at the bottom
 * - Double gold border with baroque/rococo corner scrollwork flourishes
 * - Fully accessible, live, responsive HTML/DOM text in the center
 */

export function CurtainValanceTop({ className = '' }) {
  return (
    <div className={`w-full pointer-events-none select-none z-30 ${className}`}>
      <img
        src="/curtains/curtain_valance_top.png"
        alt="Theatrical curtain valance with gold rod"
        className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(27,56,43,0.18)]"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

export function CurtainSideLeft({ className = '' }) {
  return (
    <div className={`h-full pointer-events-none select-none z-20 ${className}`}>
      <img
        src="/curtains/curtain_left.png"
        alt="Left draped curtain with gold rope tieback and bullion tassel"
        className="w-full h-full object-cover object-left-top drop-shadow-[10px_0_24px_rgba(40,30,20,0.22)]"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

export function CurtainSideRight({ className = '' }) {
  return (
    <div className={`h-full pointer-events-none select-none z-20 ${className}`}>
      <img
        src="/curtains/curtain_right.png"
        alt="Right draped curtain with gold rope tieback and bullion tassel"
        className="w-full h-full object-cover object-right-top drop-shadow-[-10px_0_24px_rgba(40,30,20,0.22)]"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

export default function CurtainStageFrame({ children, className = '' }) {
  return (
    <div className={`relative w-full max-w-[520px] sm:max-w-[590px] md:max-w-[640px] mx-auto ${className}`}>
      {/* Complete High-Fidelity Theatrical Stage Container */}
      <div className="relative w-full rounded-[14px] sm:rounded-[22px] overflow-hidden shadow-[0_25px_70px_rgba(27,56,43,0.14),0_6px_22px_rgba(197,160,89,0.18)] select-none">
        {/* Photorealistic Stage Backdrop with Drapery, Valance, Rod & Fountain */}
        <img
          src="/curtains/theatrical_stage_background.jpg"
          alt="Theatrical wedding invitation drapery stage"
          className="w-full h-auto aspect-[985/1106] sm:aspect-auto block select-none pointer-events-none object-cover sm:object-contain"
          loading="eager"
          decoding="async"
        />

        {/* Live Interactive DOM Content Overlay (Mapped precisely to card center) */}
        <div className="absolute inset-0 z-20 flex flex-col items-center pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
