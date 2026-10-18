import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, ChevronLeft, ChevronRight, Phone, Sparkles } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import ImageWithFallback from '../ui/ImageWithFallback';
import { DelicateHeart, FloralDivider } from '../ui/BotanicalOrnaments';

export default function SpecialGuestsSection() {
  const { specialGuests } = useWedding();
  const activeGuests = (specialGuests || []).filter((g) => g.is_visible !== 0);

  const [[page, direction], setPage] = useState([0, 0]);
  const total = activeGuests.length;
  const lastActionTimeRef = useRef(0);

  const currentIndex = ((page % total) + total) % total;

  // Debounced navigation guards against rapid clicking
  const paginate = useCallback(
    (newDirection) => {
      const now = Date.now();
      if (now - lastActionTimeRef.current < 450) return;
      lastActionTimeRef.current = now;
      setPage([page + newDirection, newDirection]);
    },
    [page]
  );

  const handlePrev = useCallback(() => paginate(-1), [paginate]);
  const handleNext = useCallback(() => paginate(1), [paginate]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  if (total === 0) return null;

  const currentGuest = activeGuests[currentIndex];

  const cardVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 320 : -320,
      rotateY: dir > 0 ? 25 : -25,
      scale: 0.84,
      opacity: 0,
    }),
    center: {
      zIndex: 30,
      x: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      transition: {
        x: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        rotateY: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.45 },
        scale: { duration: 0.5 },
      },
    },
    exit: (dir) => ({
      zIndex: 10,
      x: dir > 0 ? -320 : 320,
      rotateY: dir > 0 ? -25 : 25,
      scale: 0.84,
      opacity: 0,
      transition: {
        x: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        rotateY: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.35 },
        scale: { duration: 0.45 },
      },
    }),
  };

  return (
    <section
      id="honored-family"
      className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F6F0E6]/50 to-[#FAF8F5]"
    >
      {/* Background Subtle Watermark */}
      <div className="absolute inset-0 botanical-dots opacity-25 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <DelicateHeart size={14} className="text-[#B89047]" />
            <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#B89047] font-semibold">
              With Love & Deepest Respect
            </p>
            <DelicateHeart size={14} className="text-[#B89047]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-2xl sm:text-4xl text-[#1B382B] font-normal leading-tight"
          >
            Owner's Family & Honored Dignitaries
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-[#5D5347] max-w-xl mx-auto mt-2.5 font-serif italic"
          >
            Our beloved elders, guardians, and dignitaries whose prayers and guidance illuminate our celebrations.
          </motion.p>

          <FloralDivider variant="gold" className="mt-4" />
        </div>

        {/* 3D Rotating Carousel Stage */}
        <div className="relative max-w-4xl mx-auto min-h-[460px] sm:min-h-[500px] flex items-center justify-center">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Family Member"
            className="absolute left-2 sm:left-6 z-40 p-3.5 rounded-full bg-[#FFFDF9] hover:bg-[#1B382B] text-[#1B382B] hover:text-[#FAF8F5] border border-[#C5A059]/50 shadow-md transition-all cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next Family Member"
            className="absolute right-2 sm:right-6 z-40 p-3.5 rounded-full bg-[#FFFDF9] hover:bg-[#1B382B] text-[#1B382B] hover:text-[#FAF8F5] border border-[#C5A059]/50 shadow-md transition-all cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Animated 3D Carousel Stage with Directional Slide & Rotation */}
          <div
            className="relative w-full h-[460px] sm:h-[500px] flex items-center justify-center select-none overflow-hidden"
            style={{ perspective: 1400 }}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={page}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(_, { offset, velocity }) => {
                  if (offset.x > 40 || velocity.x > 0.3) {
                    paginate(-1);
                  } else if (offset.x < -40 || velocity.x < -0.3) {
                    paginate(1);
                  }
                }}
                className="relative w-[300px] sm:w-[370px] rounded-[32px] border-2 border-[#C5A059] bg-[#FFFDF9] backdrop-blur-xl p-6 sm:p-7 text-center shadow-[0_22px_55px_rgba(27,56,43,0.09),0_6px_20px_rgba(197,160,89,0.18)] flex flex-col items-center justify-between cursor-grab active:cursor-grabbing"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Corner Golden Accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#C5A059] pointer-events-none" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#C5A059] pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C5A059] pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#C5A059] pointer-events-none" />

                <FamilyCardContent guest={currentGuest} isCenter={true} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Indicators / Pagination Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {activeGuests.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const now = Date.now();
                if (now - lastActionTimeRef.current < 450) return;
                lastActionTimeRef.current = now;
                const dir = idx > currentIndex ? 1 : -1;
                setPage([page + (idx - currentIndex), dir]);
              }}
              aria-label={`Go to family member ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 h-2.5 bg-[#1B382B] shadow-sm'
                  : 'w-2.5 h-2.5 bg-[#C5A059]/40 hover:bg-[#C5A059]'
              }`}
            />
          ))}
        </div>

        {/* Counter Pill */}
        <div className="text-center mt-3">
          <span className="font-mono text-xs text-[#756A5E] tracking-wider">
            {currentIndex + 1} / {total}
          </span>
        </div>
      </div>
    </section>
  );
}

// Reusable Inner Content Component for Family Card
function FamilyCardContent({ guest, isCenter }) {
  return (
    <div className="w-full flex flex-col items-center justify-between h-full">
      {/* Top Side Badge */}
      <div className="mb-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-cinzel font-bold uppercase tracking-wider ${
            isCenter
              ? 'bg-[#1B382B] text-[#FAF8F5] shadow-sm'
              : 'bg-[#FAF8F5] border border-[#C5A059]/40 text-[#1B382B]'
          }`}
        >
          {guest.family_side === 'bride'
            ? "Bride's Side"
            : guest.family_side === 'groom'
            ? "Groom's Side"
            : 'Honored Elder'}
        </span>
      </div>

      {/* Regal Family Crest Emblem (NO IMAGES) */}
      <div className="relative mb-4">
        <div
          className={`rounded-full flex items-center justify-center border-2 bg-gradient-to-br from-[#FFFDF9] via-[#FAF6EC] to-[#F3EAD8] shadow-md transition-all ${
            isCenter
              ? 'w-24 h-24 sm:w-28 sm:h-28 border-[#C5A059] ring-4 ring-[#C5A059]/20'
              : 'w-20 h-20 sm:w-22 sm:h-22 border-[#C5A059]/50'
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <Crown className={`${isCenter ? 'w-9 h-9 sm:w-10 sm:h-10' : 'w-7 h-7'} text-[#C5A059] drop-shadow-sm`} />
            <span className="font-cinzel text-[10px] tracking-widest text-[#B89047] uppercase font-bold mt-1">
              AJMAL
            </span>
          </div>
        </div>
        {isCenter && (
          <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#1B382B] text-[#FAF8F5] shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#EAD7A5]" />
          </div>
        )}
      </div>

      {/* Dignitary Name & Title */}
      <div className="w-full mb-3">
        <h3
          className={`font-serif font-bold transition-colors line-clamp-1 ${
            isCenter ? 'text-xl sm:text-2xl text-[#1B382B]' : 'text-lg text-[#1B382B]/85'
          }`}
        >
          {guest.name}
        </h3>

        <p className="text-xs font-cinzel text-[#B89047] uppercase tracking-widest mt-1">
          {guest.relationship}
        </p>

        {guest.secondary_contact && (
          <p className="text-[10px] text-[#756A5E] font-mono mt-0.5">
            {guest.secondary_contact}
          </p>
        )}
      </div>

      {/* Notes / Warm Quote */}
      {guest.notes && (
        <div className="w-full my-2 px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E3D8C4]">
          <p className="text-xs text-[#5D5347] italic font-serif line-clamp-2">
            "{guest.notes}"
          </p>
        </div>
      )}

      {/* Clickable tel: Phone Link */}
      {guest.contact_phone && (
        <div className="mt-3">
          <a
            href={`tel:${guest.contact_phone}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B382B] hover:bg-[#264E3D] text-[#FAF8F5] text-xs font-mono tracking-wider transition-all shadow-sm hover:scale-105 active:scale-95"
            aria-label={`Call ${guest.name} at ${guest.contact_phone}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#EAD7A5]" />
            <span>{guest.contact_phone}</span>
          </a>
        </div>
      )}
    </div>
  );
}
