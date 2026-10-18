import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Sparkles, Music, ChevronRight, Hand } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useWedding } from '../../context/WeddingContext';
import RoyalMonogramSeal from '../ui/RoyalMonogramSeal';
import { BloomingFlowerOrnament } from '../ui/BotanicalOrnaments';
import ScratchCard from '../ui/ScratchCard';
import CelebrationEffects from '../ui/CelebrationEffects';

// Controlled State Sequence Phases:
// 1. 'CLOSED_CURTAINS'    -> Regal velvet curtains with 3D depth, pleats & centered H&A logo medallion
// 2. 'CURTAIN_OPENING'    -> Curtains glide outward with 3D perspective fold for 1.4s (1400ms); music starts
// 3. 'SCRATCH_INVITATION' -> Circular canvas scratch card appears dead-center; feathered wide brush scratching
// 4. 'INVITATION_REVEALED'-> Scratched >= 68% (or instant reveal) -> Celebratory fireworks, rose petals, bubbles & card
// 5. 'HOMEPAGE'           -> Unmounts opening screen, smoothly landing at the top Hero section

export default function OpeningSplashScreen({ onComplete }) {
  const { unlockAndPlayAudio } = useWedding();

  const [phase, setPhase] = useState('CLOSED_CURTAINS');
  const [curtainsOpened, setCurtainsOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [hasInteractedScratch, setHasInteractedScratch] = useState(false);
  const [showFlowerBloom, setShowFlowerBloom] = useState(false);

  const cardRevealedRef = useRef(false);

  // Guarantee that initial page entry or refresh stays at top (Hero section)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Trigger Complete Reveal of the Invitation Card
  const triggerCompleteReveal = useCallback(() => {
    if (cardRevealedRef.current) return;
    cardRevealedRef.current = true;
    setScratchPercent(100);

    unlockAndPlayAudio();
    setShowFlowerBloom(true);

    // Transition smoothly to revealed card state
    setTimeout(() => {
      setPhase('INVITATION_REVEALED');
    }, 350);
  }, [unlockAndPlayAudio]);

  // Phase 1 -> 2: Curtain Opening Trigger (Cinematic 1.5s 3D theatrical opening)
  const handleOpenCurtains = () => {
    if (phase !== 'CLOSED_CURTAINS' || isOpening) return;
    setIsOpening(true);
    setCurtainsOpened(true);
    setPhase('CURTAIN_OPENING');
    unlockAndPlayAudio();

    // Curtains glide smoothly away with 3D depth for exactly 1.5s (1500ms)
    setTimeout(() => {
      setPhase('SCRATCH_INVITATION');
      setIsOpening(false);
    }, 1500);
  };

  // Phase 4 -> 5: Enter Website & Play Wedding Music
  const handleEnterWebsite = () => {
    unlockAndPlayAudio();

    try {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#EAD7A5', '#FFF4D2', '#D4AF37', '#E28495'],
      });
    } catch (e) {}

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setPhase('HOMEPAGE');
    if (onComplete) onComplete();
  };

  const handleSkipIntro = (e) => {
    e.stopPropagation();
    unlockAndPlayAudio();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setPhase('HOMEPAGE');
    if (onComplete) onComplete();
  };

  if (phase === 'HOMEPAGE') return null;

  return (
    <MotionConfig reducedMotion="never">
      <AnimatePresence>
        <motion.div
          key="wedding-cinematic-stage"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 bg-[#FAF8F5] text-[#1B382B] select-none overflow-hidden"
          style={{ perspective: '1400px' }}
          role="dialog"
          aria-modal="true"
          aria-label="Mirza Talal Baig and Laraib Ajmal Wedding Invitation Opening Experience"
        >
          {/* Persistent Skip Button (Top Right) */}
          <button
            onClick={handleSkipIntro}
            className="absolute top-5 right-5 z-50 px-4 py-2 rounded-full bg-[#FFFDF9]/95 hover:bg-[#1B382B] text-[#1B382B] hover:text-[#FAF8F5] text-[11px] font-cinzel tracking-widest uppercase border border-[#C5A059]/50 backdrop-blur-md transition-all shadow-md cursor-pointer"
            aria-label="Skip to website"
          >
            Skip Intro
          </button>

          {/* Ambient Radial Stage Glows (Strictly absolute positioned to prevent flex shift) */}
          <div className="absolute w-[600px] h-[600px] bg-[#C5A059]/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[130px] pointer-events-none" />
          <div className="absolute w-96 h-96 bg-[#2E5A45]/10 bottom-10 right-10 blur-[100px] pointer-events-none" />

          {/* ============================================================== */}
          {/* SCENE 3 & 4: INNER STAGE (Dead-Center Viewport Card Container) */}
          {/* ============================================================== */}
          {(phase === 'SCRATCH_INVITATION' || phase === 'INVITATION_REVEALED') && (
            <div className="fixed inset-0 z-40 flex items-center justify-center p-4 pointer-events-auto overflow-y-auto overscroll-none select-none">
              {/* Phase 3: Interactive Circular Scratch Card */}
              {phase === 'SCRATCH_INVITATION' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="flex flex-col items-center justify-center w-full max-w-md mx-auto my-auto text-center"
                >
                  {/* Elegant Script Heading & Divider Matching Reference */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 sm:mb-5 flex flex-col items-center select-none"
                  >
                    <span className="font-bodoni text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#74836F] font-semibold block mb-1">
                      Royal Invitation
                    </span>
                    <h2 className="font-script text-4xl sm:text-5xl text-[#1B382B] leading-none mb-1.5">
                      Scratch to Reveal
                    </h2>
                    <div className="flex items-center justify-center gap-3 w-40 sm:w-48 my-1">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A059]/40 to-[#C5A059]" />
                      <span className="text-[#1B382B] text-xs">🖤</span>
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C5A059]/40 to-[#C5A059]" />
                    </div>
                  </motion.div>

                  {/* Circular Persistent Scratch Card */}
                  <div className="relative">
                    <ScratchCard
                      onComplete={triggerCompleteReveal}
                      onProgress={(percent) => setScratchPercent(percent)}
                      onFirstInteraction={() => {
                        setHasInteractedScratch(true);
                        unlockAndPlayAudio();
                      }}
                      threshold={76}
                      underneathContent={
                        <div className="flex flex-col items-center justify-center text-center mt-3 sm:mt-4">
                          <div className="absolute inset-0 botanical-dots opacity-30 pointer-events-none" />

                          <span className="font-bodoni text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#74836F] font-semibold block mb-1">
                            Together With Their Families
                          </span>

                          {/* Centered Vector Royal Monogram (L & T / LT) */}
                          <RoyalMonogramSeal size={74} variant="ivory" showSubtext={true} subtext="LT" glow={true} />

                          <h3 className="font-script text-2xl sm:text-3xl text-[#1B382B] mt-1.5 leading-none">
                            Laraib & Talal
                          </h3>
                          <p className="font-bodoni text-[9px] sm:text-[10px] text-[#B89047] tracking-widest uppercase mt-1 font-semibold">
                            12 & 13 December 2026 • Lahore
                          </p>
                        </div>
                      }
                    />

                    {/* Animated Circular Guiding Hand Prompt */}
                    {!hasInteractedScratch && (
                      <motion.div
                        animate={{
                          x: [-24, 24, -24],
                          y: [-10, 10, -10],
                        }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center"
                      >
                        <div className="p-3.5 rounded-full bg-gold-400 text-black shadow-2xl shadow-gold-500/60 pointer-events-none">
                          <Hand className="w-6 h-6 animate-pulse pointer-events-none" />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Scratch Progress & Instant Reveal Fallback */}
                  <div className="mt-5 flex items-center justify-between gap-4 w-full max-w-[380px] px-3">
                    <span className="text-xs font-mono text-[#756A5E]">
                      {scratchPercent > 0 ? `${scratchPercent}% revealed` : 'Swipe finger or drag mouse'}
                    </span>

                    <button
                      onClick={triggerCompleteReveal}
                      className="text-xs text-[#B89047] hover:text-[#1B382B] underline cursor-pointer font-cinzel tracking-wider uppercase font-semibold transition-colors"
                    >
                      Instant Reveal ✦
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Phase 4: Sacred Bismillah & Full Invitation Entrance Reveal */}
              {phase === 'INVITATION_REVEALED' && (
                <>
                  <CelebrationEffects />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex flex-col items-center max-w-lg w-full p-7 sm:p-9 rounded-[36px] bg-[#FFFDF9] border-2 border-[#C5A059] shadow-[0_20px_60px_rgba(27,56,43,0.14)] text-center relative overflow-visible my-auto z-50"
                  >
                    {/* Decorative Flower Blooming Animation (Side-Mounted Frame) */}
                    {showFlowerBloom && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0, rotate: -25 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute -top-10 -right-6 sm:-top-12 sm:-right-8 z-20 pointer-events-none"
                      >
                        <BloomingFlowerOrnament />
                      </motion.div>
                    )}

                    {/* Royal Monogram Badge */}
                    <div className="mb-3">
                      <RoyalMonogramSeal size={80} variant="ivory" showSubtext={true} subtext="LT" glow={true} />
                    </div>

                    {/* Bismillah Screen in Sacred Calligraphy */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="mb-2"
                    >
                      <p
                        dir="rtl"
                        lang="ar"
                        className="font-serif text-2xl sm:text-3xl text-[#1B382B] tracking-wide font-normal leading-relaxed"
                      >
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                      </p>
                      <p className="font-serif italic text-xs sm:text-sm text-[#756A5E] mt-0.5">
                        "Bismillah-ir-Rahman-ir-Raheem"
                      </p>
                    </motion.div>

                    {/* Decorative Filigree Divider */}
                    <div className="flex items-center justify-center gap-3 my-2 w-48 sm:w-64">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A059]/60 to-[#C5A059]" />
                      <span className="text-[#B89047] text-xs">❖</span>
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C5A059]/60 to-[#C5A059]" />
                    </div>

                    {/* The Wedding of Laraib Ajmal & Mirza Talal Baig */}
                    <div className="mb-4">
                      <span className="font-cinzel text-xs tracking-[0.35em] uppercase text-[#756A5E] block mb-1">
                        The Wedding of
                      </span>
                      <h1 className="font-script text-5xl sm:text-6xl text-[#1B382B] leading-none my-1">
                        Laraib & Talal
                      </h1>

                      <div className="my-3 text-xs sm:text-sm text-[#5D5347] font-serif leading-relaxed max-w-sm mx-auto">
                        <p><strong className="text-[#1B382B] font-semibold">Bride:</strong> Laraib Ajmal <span className="text-[#756A5E]">(D/o Muhammad Ajmal)</span></p>
                        <p className="mt-1"><strong className="text-[#1B382B] font-semibold">Groom:</strong> Mirza Talal Baig <span className="text-[#756A5E]">(S/o Mirza Shahzad Baig)</span></p>
                      </div>

                      <p className="font-bodoni text-xs text-[#B89047] tracking-widest uppercase mt-2 font-semibold">
                        12 & 13 December 2026 • Topaz Marquee, Model Town, Lahore
                      </p>
                    </div>

                    {/* Enter Button */}
                    <motion.button
                      whileHover={{ scale: 1.04, boxShadow: '0 10px 30px rgba(27, 56, 43, 0.2)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleEnterWebsite}
                      className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 rounded-full bg-[#1B382B] hover:bg-[#264E3D] text-[#FAF8F5] font-cinzel font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg cursor-pointer overflow-hidden"
                    >
                      <Sparkles className="w-4 h-4 text-[#EAD7A5] group-hover:rotate-45 transition-transform" />
                      <span>Enter Wedding Celebration</span>
                      <ChevronRight className="w-4 h-4 text-[#EAD7A5] group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    <p className="text-xs text-[#756A5E] font-serif italic flex items-center gap-1.5 mt-3">
                      <Music className="w-3.5 h-3.5 text-[#B89047]" />
                      <span>Plays romantic wedding harp & piano melody</span>
                    </p>
                  </motion.div>
                </>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* SCENE 1 & 2: MODERN ANIMATED WEDDING CURTAINS & MONOGRAM MEDALLION */}
          {/* ============================================================== */}

          {/* ============================================================== */}
          {/* CENTERED H&A LOGO & MEDALLION BUTTON (STRICT VIEWPORT CENTER)  */}
          {/* ============================================================== */}
          {!curtainsOpened && (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none p-4">
              <motion.button
                type="button"
                onClick={handleOpenCurtains}
                disabled={isOpening || curtainsOpened}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: curtainsOpened ? 0 : 1,
                  scale: curtainsOpened ? 1.05 : 1,
                }}
                transition={{
                  duration: curtainsOpened ? 1.2 : 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`pointer-events-auto flex flex-col items-center justify-center cursor-pointer group focus:outline-none select-none ${
                  curtainsOpened ? 'pointer-events-none' : ''
                }`}
                aria-label="Open wedding curtains to reveal invitation"
              >
                {/* Illuminated Medallion Plate in Ivory & Gold with 122px Monogram */}
                <div
                  className="relative p-3.5 sm:p-4 rounded-full border-2 sm:border-[3px] border-[#C5A059] bg-[#FFFDF9] shadow-[0_0_60px_rgba(197,160,89,0.5),0_15px_35px_rgba(27,56,43,0.18)] group-hover:shadow-[0_0_80px_rgba(197,160,89,0.7)] group-hover:border-[#E5C77A] transition-all duration-500 overflow-hidden"
                  style={{ borderRadius: '50%' }}
                >
                  <RoyalMonogramSeal size={122} variant="ivory" showSubtext={true} subtext="LT" glow={true} />
                  
                  {/* Concentric Golden Pulse Rings */}
                  {!curtainsOpened && (
                    <>
                      <div
                        className="absolute -inset-2 rounded-full border-2 border-[#C5A059]/40 animate-ping pointer-events-none opacity-50"
                        style={{ borderRadius: '50%', animationDuration: '3s' }}
                      />
                      <div
                        className="absolute -inset-1 rounded-full border border-[#E5C77A]/70 pointer-events-none"
                        style={{ borderRadius: '50%' }}
                      />
                    </>
                  )}
                </div>

                {/* Click / Tap Prompt Pill */}
                <motion.div
                  animate={{
                    opacity: curtainsOpened ? 0 : 1,
                    y: curtainsOpened ? 8 : 0,
                  }}
                  transition={{ duration: 0.35 }}
                  className="mt-5 px-7 py-3 rounded-full bg-[#FFFDF9] border border-[#C5A059] shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-cinzel tracking-widest uppercase text-[#1B382B] group-hover:bg-[#1B382B] group-hover:text-[#FAF8F5] group-hover:border-[#1B382B] transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4 text-[#B89047] group-hover:text-[#EAD7A5] animate-spin-slow" />
                  <span className="font-bold">Tap to Open Curtains</span>
                  <Sparkles className="w-4 h-4 text-[#B89047] group-hover:text-[#EAD7A5] animate-spin-slow" />
                </motion.div>
              </motion.button>
            </div>
          )}

          {/* ============================================================== */}
          {/* THEATRICAL CURTAIN STAGE ENTRANCE (LEFT & RIGHT SYMMETRICAL DOORS) */}
          {/* ============================================================== */}
          {(phase === 'CLOSED_CURTAINS' || phase === 'CURTAIN_OPENING') && (
            <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden flex">
              {/* LEFT CURTAIN DOOR */}
              <div
                onClick={handleOpenCurtains}
                className={`relative w-1/2 h-full overflow-hidden shadow-[20px_0_50px_rgba(0,0,0,0.6)] ${
                  curtainsOpened ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'
                }`}
                style={{
                  transformOrigin: 'left center',
                  transform: curtainsOpened
                    ? 'translate3d(-105%, 0, 0)'
                    : 'translate3d(0, 0, 0)',
                  opacity: curtainsOpened ? 0 : 1,
                  transition: 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.4s ease-out',
                  willChange: 'transform, opacity',
                }}
              >
                <img
                  src="/curtains/stage_door_left.jpg"
                  alt="Left theatrical wedding curtain"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
                {/* Center Seam Gold Glow & Shadow */}
                <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-r from-transparent via-[#E5C77A] to-[#8C692B]" />
              </div>

              {/* RIGHT CURTAIN DOOR */}
              <div
                onClick={handleOpenCurtains}
                className={`relative w-1/2 h-full overflow-hidden shadow-[-20px_0_50px_rgba(0,0,0,0.6)] ${
                  curtainsOpened ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'
                }`}
                style={{
                  transformOrigin: 'right center',
                  transform: curtainsOpened
                    ? 'translate3d(105%, 0, 0)'
                    : 'translate3d(0, 0, 0)',
                  opacity: curtainsOpened ? 0 : 1,
                  transition: 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.4s ease-out',
                  willChange: 'transform, opacity',
                }}
              >
                <img
                  src="/curtains/stage_door_right.jpg"
                  alt="Right theatrical wedding curtain"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
                {/* Center Seam Gold Glow & Shadow */}
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-l from-transparent via-[#E5C77A] to-[#8C692B]" />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
