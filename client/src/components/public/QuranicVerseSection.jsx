import React from 'react';
import { motion } from 'framer-motion';

export default function QuranicVerseSection() {
  return (
    <section className="relative py-16 px-6 overflow-hidden bg-gradient-to-b from-[#0C0F14] via-[#10141B] to-[#0C0F14]">
      {/* Ambient Glow */}
      <div className="ambient-glow w-96 h-96 bg-gold-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10 space-y-8">
        {/* Sacred Verse on Pairs: Surah An-Naba 78:8 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-6 sm:p-8 rounded-3xl border border-gold-500/25 bg-gradient-to-b from-gold-950/20 to-black/50 backdrop-blur-md relative shadow-xl"
        >
          <div className="text-gold-400 text-sm mb-3 opacity-80">❖ ❖ ❖</div>

          <p
            dir="rtl"
            lang="ar"
            className="font-serif text-3xl sm:text-4xl text-gold-200 leading-relaxed tracking-wider mb-3 font-medium"
          >
            وَخَلَقْنَاكُمْ أَزْوَاجًا
          </p>

          <p className="font-serif text-base sm:text-lg text-cream-200/90 italic max-w-lg mx-auto leading-relaxed">
            "And We created you in pairs."
          </p>

          <p className="text-xs font-cinzel tracking-widest text-gold-400/90 mt-3 uppercase font-semibold">
            Surah An-Naba — Surah 78, Ayah 8
          </p>
        </motion.div>

        {/* Authentic Quranic Verse on Spouses & Love: Surah Ar-Rum 30:21 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="p-8 sm:p-12 rounded-3xl border border-gold-400/30 bg-gradient-to-b from-gold-950/30 via-[#121620]/80 to-black/60 backdrop-blur-md relative shadow-2xl"
        >
          {/* Top Center Ornament */}
          <div className="text-gold-400 text-base mb-4 opacity-85">❖ ❖ ❖</div>

          {/* Authentic Arabic Quranic Text */}
          <p
            dir="rtl"
            lang="ar"
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-100 leading-relaxed tracking-wide mb-5 font-medium drop-shadow"
          >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>

          {/* English Translation */}
          <p className="font-serif text-base sm:text-lg text-cream-200/95 italic max-w-xl mx-auto leading-relaxed">
            "And among His signs is that He created for you from yourselves spouses so that you may find tranquility in them; and He placed between you affection and mercy."
          </p>

          {/* Reference */}
          <p className="text-xs font-cinzel tracking-widest text-gold-400 mt-4 uppercase font-semibold">
            Surah Ar-Rum — Surah 30, Ayah 21
          </p>
        </motion.div>
      </div>
    </section>
  );
}
