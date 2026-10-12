import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Music, MailOpen } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import RoyalMonogramSeal from '../ui/RoyalMonogramSeal';

export default function EnvelopeModal({ guestName }) {
  const { wedding, hasEnteredInvitation, unlockAndPlayAudio } = useWedding();
  const [isOpen, setIsOpen] = useState(false);

  if (hasEnteredInvitation) return null;

  const handleOpen = () => {
    setIsOpen(true);
    
    // Trigger celebratory gold confetti
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#EAD7A5', '#FFF4D2', '#0F2E23', '#9E5B4F'],
    });

    setTimeout(() => {
      unlockAndPlayAudio();
    }, 600);
  };

  const monogram = wedding.couple_monogram || `${wedding.bride_name?.[0] || 'R'} & ${wedding.groom_name?.[0] || 'H'}`;

  return (
    <AnimatePresence>
      {!hasEnteredInvitation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6"
        >
          {/* Ambient Lighting */}
          <div className="ambient-glow w-96 h-96 bg-gold-500/20 top-1/4 left-1/4 -translate-x-1/2 pointer-events-none" />
          <div className="ambient-glow w-96 h-96 bg-emerald-deep/40 bottom-1/4 right-1/4 translate-x-1/2 pointer-events-none" />

          {/* Invitation Envelope Card */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-gold-500/30 bg-[#12161C] p-8 sm:p-12 text-center shadow-2xl shadow-gold-900/30"
          >
            {/* Traditional Gold Corner Accents */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-gold-400/60 rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-gold-400/60 rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-gold-400/60 rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-gold-400/60 rounded-br-lg" />

            {/* Monogram Seal */}
            <div className="mx-auto mb-6 flex items-center justify-center">
              <RoyalMonogramSeal size={74} glow={true} />
            </div>

            {/* Bismillah / Greeting */}
            <p className="font-serif text-sm tracking-widest text-gold-300/80 uppercase mb-2">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <h3 className="font-cinzel text-xs tracking-widest text-gold-400/90 uppercase mb-4">
              Wedding Invitation
            </h3>

            {/* Personalized greeting or General */}
            {guestName ? (
              <div className="mb-4">
                <p className="text-gold-200 text-sm font-sans tracking-wide">Warmly Welcoming</p>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-gold-light mt-1">
                  {guestName}
                </h4>
              </div>
            ) : (
              <p className="text-gold-200/80 text-sm font-sans tracking-wide mb-2">
                Together with their families
              </p>
            )}

            {/* Couple Names */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold gold-text-gradient my-2">
              {wedding.couple_title || 'Rida & Harish'}
            </h1>

            <p className="text-sm font-light text-cream-200/80 max-w-sm mx-auto my-5 leading-relaxed">
              Cordially request the honor of your gracious presence and heartfelt prayers to celebrate their wedding ceremonies.
            </p>

            {/* Open Invitation CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(197, 160, 89, 0.6)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpen}
              className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-black font-semibold text-base shadow-xl shadow-gold-500/25 transition-all overflow-hidden"
            >
              <MailOpen className="w-5 h-5 text-black transition-transform group-hover:rotate-12" />
              <span>Open Invitation</span>
              <Sparkles className="w-4 h-4 text-black animate-spin-slow" />
            </motion.button>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gold-400/70">
              <Music className="w-3.5 h-3.5" />
              <span>Includes traditional wedding music</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
