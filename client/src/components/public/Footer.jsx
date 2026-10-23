import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Sparkles, Heart } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { weddingData } from '../../data/weddingData';
import RoyalMonogramSeal from '../ui/RoyalMonogramSeal';
import { DelicateHeart, FloralDivider } from '../ui/BotanicalOrnaments';

export default function Footer() {
  const { wedding } = useWedding();
  // Family contacts as curated
  const contacts = (weddingData.contacts || []).slice(0, 3);

  return (
    <footer className="relative py-20 px-5 sm:px-8 border-t border-[#E3D8C4] bg-gradient-to-b from-[#FAF8F5] via-[#F5EFE6] to-[#EFE8DC] text-center overflow-hidden">
      {/* Background Subtle Watermark */}
      <div className="absolute inset-0 botanical-dots opacity-25 pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        {/* Monogram Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto flex items-center justify-center"
        >
          <RoyalMonogramSeal size={88} variant="ivory" showSubtext={true} subtext="LT" glow={true} />
        </motion.div>

        {/* Wedding Identity */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className="font-cinzel text-sm tracking-[0.35em] uppercase text-[#B89047] block mb-1 font-semibold">
            {wedding.app_title || 'LARAIB & TALAL'}
          </span>
          <h2 className="font-script text-5xl sm:text-7xl text-[#1B382B] leading-none">
            {wedding.couple_title || 'Laraib Ajmal & Mirza Talal Baig'}
          </h2>
          {wedding.hashtag && (
            <p className="font-sans text-sm tracking-widest uppercase text-[#B89047] font-semibold mt-2.5">
              {wedding.hashtag}
            </p>
          )}

          <p className="font-serif italic text-base sm:text-lg text-[#5D5347] max-w-lg mx-auto font-light leading-relaxed mt-4">
            "{wedding.footer_text || 'Thank you for being an indispensable part of our story and celebrations. We warmly await your gracious presence and prayers.'}"
          </p>
        </motion.div>

        {/* Replay Opening Invitation Action */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => {
              try {
                localStorage.removeItem('riha_scratch_completed');
                localStorage.removeItem('riha_curtain_opened');
              } catch (e) {}
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(() => {
                window.location.reload();
              }, 250);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C5A059]/60 bg-[#FFFDF9] hover:bg-[#1B382B] text-[#1B382B] hover:text-[#FAF8F5] text-sm font-cinzel font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:shadow-md"
          >
            <Sparkles className="w-4 h-4 text-[#B89047]" />
            <span>Replay Opening Invitation</span>
          </button>
        </div>

        {/* Closing Quranic Du'a & Copyright */}
        <div className="pt-8 border-t border-[#E3D8C4] text-center space-y-2">
          <p className="font-serif italic text-base text-[#1B382B]">
            "Bārak-Allāhu lakumā wa bāraka 'alaykumā wa jama'a baynakumā fī khayr"
          </p>
          <p className="text-[13px] sm:text-xs text-[#756A5E] font-mono tracking-wider">
            © 2026 Wedding of Laraib Ajmal & Mirza Talal Baig. All rights reserved.
          </p>
          <p className="text-xs sm:text-[13px] text-[#6B6054] font-serif tracking-wider pt-1">
            Developed by Hassaan Ali Rana
          </p>
        </div>
      </div>
    </footer>
  );
}
