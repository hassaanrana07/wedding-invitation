import React from 'react';
import { motion } from 'framer-motion';

/**
 * QuranicVerseBottom Component (Bottom Quranic Verse)
 * Placed directly above the Footer.
 * Surah Al-Furqan (25:74) - "Rabbana Hab Lana min azwajina..."
 */
export default function QuranicVerseBottom() {
  return (
    <section className="relative py-16 px-5 sm:px-6 overflow-hidden bg-gradient-to-b from-[#0C0F14] via-[#10151E] to-[#090C10] border-t border-gold-500/15">
      {/* Soft Ambient Radiance */}
      <div className="ambient-glow w-96 h-96 bg-gold-600/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-8 sm:p-12 rounded-3xl border border-gold-400/35 bg-gradient-to-b from-gold-950/30 via-[#131722]/90 to-black/70 backdrop-blur-md shadow-2xl relative"
        >
          {/* Top Filigree Accent */}
          <div className="text-gold-400 text-sm mb-4 opacity-85 tracking-widest">❖ ❖ ❖</div>

          <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold-400 block mb-3 font-semibold">
            Sacred Du'a for Spouses & Family
          </span>

          {/* Authentic Arabic Quranic Text (RTL) */}
          <p
            dir="rtl"
            lang="ar"
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-100 leading-relaxed tracking-wide mb-5 font-medium drop-shadow"
          >
            رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا
          </p>

          {/* English Translation */}
          <p className="font-serif text-sm sm:text-base md:text-lg text-cream-200/95 italic max-w-2xl mx-auto leading-relaxed">
            "Our Lord, grant us from among our spouses and offspring comfort to our eyes, and make us an example for the righteous."
          </p>

          {/* Canonical Reference */}
          <p className="text-xs font-cinzel tracking-widest text-gold-400 mt-4 uppercase font-semibold">
            Surah Al-Furqan — Surah 25, Ayah 74
          </p>
        </motion.div>
      </div>
    </section>
  );
}
