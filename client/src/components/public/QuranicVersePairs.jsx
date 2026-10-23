import React from 'react';
import { motion } from 'framer-motion';
import { DelicateHeart, FloralDivider } from '../ui/BotanicalOrnaments';

/**
 * QuranicVersePairs Component (Center Quranic Verse)
 * Surah An-Naba (78:8) - "And We created you in pairs"
 * Styled in warm ivory, champagne, and deep forest green calligraphy.
 */
export default function QuranicVersePairs() {
  return (
    <section className="relative py-16 px-5 sm:px-6 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EDE0]/60 to-[#FAF8F5]">
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-7 sm:p-10 rounded-[32px] border border-[#C5A059]/35 bg-[#FFFDF9] shadow-[0_12px_35px_rgba(27,56,43,0.05)] relative"
        >
          {/* Top Heart & Filigree */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-10 h-[1px] bg-[#C5A059]/40" />
            <DelicateHeart size={14} className="text-[#B89047]" />
            <div className="w-10 h-[1px] bg-[#C5A059]/40" />
          </div>

          {/* Authentic Arabic Calligraphy */}
          <p
            dir="rtl"
            lang="ar"
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1B382B] leading-relaxed tracking-wider mb-2 font-normal"
          >
            وَخَلَقْنَاكُمْ أَزْوَاجًا
          </p>

          {/* English Translation */}
          <p className="font-serif italic text-base sm:text-lg text-[#5D5347] max-w-md mx-auto leading-relaxed">
            "And We created you in pairs."
          </p>

          {/* Canonical Reference */}
          <p className="text-[13px] sm:text-sm font-cinzel tracking-[0.25em] text-[#B89047] mt-3 uppercase font-semibold">
            Surah An-Naba — 78:8
          </p>
        </motion.div>
      </div>
    </section>
  );
}
