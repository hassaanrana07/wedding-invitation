import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Music, MailOpen } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import RoyalMonogramSeal from '../ui/RoyalMonogramSeal';
import { BotanicalCornerFlourish, FloralDivider } from '../ui/BotanicalOrnaments';

export default function EnvelopeModal({ guestName }) {
  const { wedding, hasEnteredInvitation, unlockAndPlayAudio } = useWedding();
  const [isOpen, setIsOpen] = useState(false);

  if (hasEnteredInvitation) return null;

  const handleOpen = () => {
    setIsOpen(true);
    
    // Trigger celebratory antique gold and champagne confetti
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#EAD7A5', '#FFFDF9', '#1B382B', '#2D523E'],
    });

    setTimeout(() => {
      unlockAndPlayAudio();
    }, 600);
  };

  return (
    <AnimatePresence>
      {!hasEnteredInvitation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B382B]/60 backdrop-blur-md p-4 sm:p-6"
        >
          {/* Ambient Lighting */}
          <div className="absolute w-96 h-96 rounded-full bg-[#C5A059]/15 blur-3xl top-1/4 left-1/4 -translate-x-1/2 pointer-events-none" />
          <div className="absolute w-96 h-96 rounded-full bg-[#FAF8F5]/30 blur-3xl bottom-1/4 right-1/4 translate-x-1/2 pointer-events-none" />

          {/* Invitation Envelope Card */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#C5A059]/40 bg-[#FFFDF9] p-8 sm:p-12 text-center shadow-2xl shadow-[#1B382B]/20"
          >
            {/* Corner Botanical Flourishes */}
            <BotanicalCornerFlourish position="top-left" className="scale-75 origin-top-left" />
            <BotanicalCornerFlourish position="top-right" className="scale-75 origin-top-right" />
            <BotanicalCornerFlourish position="bottom-left" className="scale-75 origin-bottom-left" />
            <BotanicalCornerFlourish position="bottom-right" className="scale-75 origin-bottom-right" />

            {/* Inner Border Frame */}
            <div className="absolute inset-3 border border-[#C5A059]/20 rounded-2xl pointer-events-none" />

            {/* Monogram Seal */}
            <div className="relative mx-auto mb-5 flex items-center justify-center">
              <RoyalMonogramSeal size={74} glow={true} variant="ivory" />
            </div>

            {/* Bismillah / Greeting */}
            <p className="font-serif text-sm tracking-widest text-[#B89047] mb-1">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <h3 className="font-cinzel text-xs tracking-[0.25em] text-[#1B382B]/75 uppercase mb-3 font-semibold">
              Wedding Invitation
            </h3>

            {/* Personalized greeting or General */}
            {guestName ? (
              <div className="mb-3">
                <p className="text-[#5D5347] text-xs uppercase tracking-widest font-sans font-medium">Warmly Welcoming</p>
                <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1B382B] mt-1">
                  {guestName}
                </h4>
              </div>
            ) : (
              <p className="text-[#5D5347] text-xs uppercase tracking-widest font-sans font-medium mb-1">
                Together with their families
              </p>
            )}

            <FloralDivider className="!my-2 scale-90" />

            {/* Couple Names */}
            <h1 className="font-script text-4xl sm:text-5xl lg:text-6xl text-[#1B382B] my-2 leading-tight">
              {wedding.couple_title || 'Ahmed & Ayesha'}
            </h1>

            <p className="text-xs sm:text-sm font-light text-[#5D5347] max-w-sm mx-auto my-4 leading-relaxed font-sans">
              Cordially request the honor of your gracious presence and heartfelt prayers to celebrate their wedding ceremonies.
            </p>

            {/* Open Invitation CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(184, 144, 71, 0.35)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpen}
              className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#1B382B] via-[#244A39] to-[#1B382B] text-[#FFFDF9] font-medium text-sm tracking-wide shadow-lg shadow-[#1B382B]/20 border border-[#C5A059]/40 transition-all overflow-hidden"
            >
              <MailOpen className="w-4 h-4 text-[#C5A059] transition-transform group-hover:rotate-12" />
              <span className="font-serif tracking-wider uppercase text-xs">Open Invitation</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin-slow" />
            </motion.button>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#5D5347]/80">
              <Music className="w-3.5 h-3.5 text-[#B89047]" />
              <span className="font-sans text-[11px]">Includes traditional wedding audio</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
