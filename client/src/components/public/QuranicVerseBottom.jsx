import React from 'react';
import { motion } from 'framer-motion';
import { DelicateHeart, FloralDivider } from '../ui/BotanicalOrnaments';

/**
 * QuranicVerseBottom Component (Bottom Quranic Verse)
 * Placed directly above the Footer.
 * Surah Al-Furqan (25:74) - "Rabbana Hab Lana min azwajina..."
 * Styled in warm ivory, champagne, and deep forest green calligraphy.
 */
export default function QuranicVerseBottom() {
  return (
    <section className="relative py-20 px-5 sm:px-6 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F5EFE6]/60 to-[#FAF8F5] border-t border-[#E3D8C4]">
      {/* Background Subtle Watermark */}
      <div className="absolute inset-0 botanical-dots opacity-25 pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-8 sm:p-12 rounded-[36px] border border-[#C5A059]/40 bg-[#FFFDF9] shadow-[0_15px_45px_rgba(27,56,43,0.06)] relative"
        >
          {/* Top Heart & Filigree Accent */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-12 h-[1px] bg-[#C5A059]/40" />
            <DelicateHeart size={14} className="text-[#B89047]" />
            <div className="w-12 h-[1px] bg-[#C5A059]/40" />
          </div>

          <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#B89047] block mb-3 font-semibold">
            Sacred Du'a for Spouses & Family
          </span>

          {/* Authentic Arabic Quranic Text (RTL) */}
          <p
            dir="rtl"
            lang="ar"
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1B382B] leading-relaxed tracking-wide mb-4 font-normal"
          >
            رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا
          </p>

          {/* English Translation */}
          <p className="font-serif italic text-sm sm:text-base md:text-lg text-[#5D5347] max-w-2xl mx-auto leading-relaxed">
            "Our Lord, grant us from among our spouses and offspring comfort to our eyes, and make us an example for the righteous."
          </p>

          {/* Canonical Reference */}
          <p className="text-xs font-cinzel tracking-widest text-[#B89047] mt-4 uppercase font-semibold">
            Surah Al-Furqan — 25:74
          </p>
        </motion.div>
      </div>
    </section>
  );
}
