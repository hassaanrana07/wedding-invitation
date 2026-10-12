import React from 'react';
import { motion } from 'framer-motion';

/**
 * QuranicVersePairs Component (Center Quranic Verse)
 * Placed around the Couple / Our Story section.
 * Surah An-Naba (78:8) - "And We created you in pairs"
 */
export default function QuranicVersePairs() {
  return (
    <section className="relative py-14 px-5 sm:px-6 overflow-hidden bg-gradient-to-b from-[#0C0F14] via-[#0E131B] to-[#0C0F14]">
      {/* Soft Ambient Radiance */}
      <div className="ambient-glow w-80 h-80 bg-gold-600/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-6 sm:p-9 rounded-3xl border border-gold-400/30 bg-gradient-to-b from-gold-950/25 via-[#111622]/85 to-black/60 backdrop-blur-md shadow-2xl relative"
        >
          {/* Top Filigree Accent */}
          <div className="text-gold-400 text-sm mb-3 opacity-80 tracking-widest">❖ ❖ ❖</div>

          {/* Authentic Arabic Calligraphy */}
          <p
            dir="rtl"
            lang="ar"
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-gold-100 leading-relaxed tracking-wider mb-3 font-medium drop-shadow"
          >
            وَخَلَقْنَاكُمْ أَزْوَاجًا
          </p>

          {/* English Translation */}
          <p className="font-serif text-base sm:text-lg text-cream-200/95 italic max-w-md mx-auto leading-relaxed">
            "And We created you in pairs."
          </p>

          {/* Canonical Reference */}
          <p className="text-[11px] sm:text-xs font-cinzel tracking-widest text-gold-400 mt-3 uppercase font-semibold">
            Surah An-Naba — Surah 78, Ayah 8
          </p>
        </motion.div>
      </div>
    </section>
  );
}
