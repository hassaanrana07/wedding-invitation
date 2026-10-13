import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, Music, ChevronRight, Hand } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useWedding } from '../../context/WeddingContext';
import RoyalMonogramSeal from '../ui/RoyalMonogramSeal';
import { HangingWeddingBulb, BloomingFlowerOrnament } from '../ui/BotanicalOrnaments';

export default function OpeningSplashScreen({ onComplete }) {
  const { wedding, unlockAndPlayAudio } = useWedding();
  const prefersReducedMotion = useReducedMotion();

  // Initial State: Curtains unconditionally appear on every website entry and refresh
  const getInitialPhase = () => {
    return 'curtains_closed';
  };

  const getInitialCurtainsOpened = () => {
    return false;
  };

  // Experience Phases:
  // 1: 'curtains_closed'   -> Stage curtains closed with high-contrast centered R & H seal
  // 2: 'curtains_opening'  -> 3D Curtains swing & rotate outward with fabric folds (1.45s)
  // 3: 'scratch_card'      -> Circular HTML5 canvas scratch card appears AFTER curtains finish opening
  // 4: 'invitation_reveal' -> Scratched >= 65% -> Flower bloom animation & Bismillah wedding card revealed
  // 5: 'done'              -> Main website revealed
  const [phase, setPhase] = useState(getInitialPhase);
  const [curtainsOpened, setCurtainsOpened] = useState(getInitialCurtainsOpened);
  const [isOpening, setIsOpening] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [hasInteractedScratch, setHasInteractedScratch] = useState(false);
  const [showFlowerBloom, setShowFlowerBloom] = useState(false);

  // Canvas & Flower Refs
  const canvasRef = useRef(null);
  const isPointerDownRef = useRef(false);
  const lastPointRef = useRef(null);
  const throttleCheckRef = useRef(0);
  const confettiFiredRef = useRef(false);
  const flowerBloomedRef = useRef(false);

  // Initialize Canvas Circular Scratch Layer
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const radius = Math.min(width, height) / 2;
    const cx = width / 2;
    const cy = height / 2;

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 1, 0, Math.PI * 2);
    ctx.clip();

    // 1. Base Champagne / Gold Radial Gradient
    const grad = ctx.createRadialGradient(cx, cy, radius * 0.15, cx, cy, radius);
    grad.addColorStop(0, '#FFF5DD');
    grad.addColorStop(0.25, '#E5C77A');
    grad.addColorStop(0.55, '#C5A059');
    grad.addColorStop(0.85, '#D4B872');
    grad.addColorStop(1, '#8C692B');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Luxury Arabesque Glitter Particles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 90; i++) {
      const angle = (i * 137.5) * (Math.PI / 180);
      const r = Math.sqrt(i / 90) * (radius - 18);
      const rx = cx + r * Math.cos(angle);
      const ry = cy + r * Math.sin(angle);
      const rSize = (i % 3) + 1;
      ctx.beginPath();
      ctx.arc(rx, ry, rSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Ornate Concentric Circular Rings on the scratch surface
    ctx.strokeStyle = 'rgba(140, 105, 43, 0.65)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 8, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 245, 220, 0.75)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 14, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. Center Scratch Prompt Typography
    ctx.fillStyle = '#261706';
    ctx.font = '700 11px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '2.5px';
    ctx.fillText('✦ ROYAL WEDDING ✦', cx, cy - 30);

    ctx.fillStyle = '#1A0E03';
    ctx.font = 'bold 20px Cinzel, serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('SCRATCH TO REVEAL', cx, cy);

    ctx.fillStyle = '#3E280C';
    ctx.font = 'italic 12px Cormorant Garamond, serif';
    ctx.letterSpacing = '0.5px';
    ctx.fillText('Touch or drag to reveal R & H', cx, cy + 26);

    ctx.restore();
  }, []);

  // When phase becomes 'scratch_card', initialize the canvas
  useEffect(() => {
    if (phase === 'scratch_card') {
      const timer = setTimeout(() => {
        initCanvas();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [phase, initCanvas]);

  // Handle Resize for Canvas
  useEffect(() => {
    const handleResize = () => {
      if (phase === 'scratch_card' && !cardRevealed) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [phase, cardRevealed, initCanvas]);

  // Trigger Complete Reveal of the Invitation Card
  const triggerCompleteReveal = useCallback(() => {
    if (cardRevealed) return;
    setCardRevealed(true);
    setScratchPercent(100);

    unlockAndPlayAudio();

    // Trigger flower bloom animation once
    if (!flowerBloomedRef.current) {
      flowerBloomedRef.current = true;
      setShowFlowerBloom(true);
    }

    // Fire celebration golden fireworks & decorative sparkles
    if (!confettiFiredRef.current) {
      confettiFiredRef.current = true;
      try {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 80,
          origin: { x: 0.15, y: 0.65 },
          colors: ['#C5A059', '#EAD7A5', '#FFF4D2', '#D4AF37', '#FAF7F2', '#E28495', '#F5A9B8'],
          ticks: 240,
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 80,
          origin: { x: 0.85, y: 0.65 },
          colors: ['#C5A059', '#EAD7A5', '#FFF4D2', '#D4AF37', '#FAF7F2', '#E28495', '#F5A9B8'],
          ticks: 240,
        });
        setTimeout(() => {
          confetti({
            particleCount: 95,
            spread: 105,
            origin: { x: 0.5, y: 0.55 },
            colors: ['#C5A059', '#EAD7A5', '#FFF4D2', '#D4AF37', '#FAF7F2'],
            ticks: 250,
          });
        }, 300);
      } catch (e) {}
    }

    setTimeout(() => {
      setPhase('invitation_reveal');
    }, 450);

    // After celebratory unveiling, smoothly transition to reveal the homepage
    setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 2400);
  }, [cardRevealed, unlockAndPlayAudio, onComplete]);

  // Calculate Scratched Area Percentage for Circular Geometry
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || cardRevealed) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = Math.floor(canvas.offsetWidth * dpr);
    const height = Math.floor(canvas.offsetHeight * dpr);
    const cx = width / 2;
    const cy = height / 2;
    const rSquared = Math.pow((Math.min(width, height) / 2) - 6 * dpr, 2);

    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      let clearPixels = 0;
      let totalInCircle = 0;
      const step = 8; // High-precision 60fps sampling

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const dx = x - cx;
          const dy = y - cy;
          if (dx * dx + dy * dy <= rSquared) {
            totalInCircle++;
            const idx = (y * width + x) * 4 + 3;
            if (data[idx] < 35) {
              clearPixels++;
            }
          }
        }
      }

      if (totalInCircle > 0) {
        const percentage = Math.round((clearPixels / totalInCircle) * 100);
        setScratchPercent(percentage);

        // Auto reveal strictly at 87% completion as required by prompt
        if (percentage >= 87) {
          triggerCompleteReveal();
        }
      }
    } catch (e) {}
  }, [cardRevealed, triggerCompleteReveal]);

  // Pointer Scratch Handlers
  const handlePointerDown = (e) => {
    if (cardRevealed) return;
    isPointerDownRef.current = true;
    setIsScratching(true);
    setHasInteractedScratch(true);
    const rect = canvasRef.current.getBoundingClientRect();
    lastPointRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    scratchAt(lastPointRef.current.x, lastPointRef.current.y);
  };

  const handlePointerMove = (e) => {
    if (!isPointerDownRef.current || cardRevealed) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const currentPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    scratchLine(lastPointRef.current, currentPoint);
    lastPointRef.current = currentPoint;

    throttleCheckRef.current++;
    if (throttleCheckRef.current % 6 === 0) {
      checkScratchPercentage();
    }
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
    setIsScratching(false);
    checkScratchPercentage();
  };

  const scratchAt = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const scratchLine = (p1, p2) => {
    const canvas = canvasRef.current;
    if (!canvas || !p1 || !p2) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 55;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.restore();
  };

  // Scene 2: Interactive Curtain Opening Trigger (1.75s cinematic diagonal reveal)
  const handleOpenCurtains = () => {
    if (phase !== 'curtains_closed' || isOpening) return;
    setIsOpening(true);
    setCurtainsOpened(true);
    setPhase('curtains_opening');
    unlockAndPlayAudio();

    // Curtains move diagonally outward to upper-left and upper-right for 1.75s
    // Scratch card appears strictly AFTER the curtains have fully cleared the area
    setTimeout(() => {
      setPhase('scratch_card');
      setIsOpening(false);
    }, 1750);
  };

  // Scene 4: Enter Website & Play Wedding Music
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

    setPhase('done');
    if (onComplete) onComplete();
  };

  const handleSkipIntro = (e) => {
    e.stopPropagation();
    unlockAndPlayAudio();
    setPhase('done');
    if (onComplete) onComplete();
  };

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="riha-cinematic-stage"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF8F5] text-[#1B382B] select-none overflow-hidden"
        style={{ perspective: '1600px' }}
        role="dialog"
        aria-modal="true"
        aria-label="RIHA Wedding Invitation Opening Experience"
      >
        {/* Persistent Skip Button (Top Right) */}
        <button
          onClick={handleSkipIntro}
          className="absolute top-5 right-5 z-50 px-4 py-2 rounded-full bg-[#FFFDF9]/90 hover:bg-[#1B382B] text-[#1B382B] hover:text-[#FAF8F5] text-[11px] font-cinzel tracking-widest uppercase border border-[#C5A059]/50 backdrop-blur-md transition-all shadow-md cursor-pointer"
          aria-label="Skip to website"
        >
          Skip Intro
        </button>

        {/* Ambient Radial Stage Glows Behind Curtains */}
        <div className="ambient-glow w-[600px] h-[600px] bg-[#C5A059]/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[130px] pointer-events-none" />
        <div className="ambient-glow w-96 h-96 bg-[#2E5A45]/10 bottom-10 right-10 blur-[100px] pointer-events-none" />

        {/* ============================================================== */}
        {/* SCENE 3 & 4: INNER STAGE (Circular Scratch Card & Reveal)       */}
        {/* ============================================================== */}
        <div className="relative z-10 w-full max-w-xl mx-auto px-4 flex flex-col items-center justify-center text-center">
          {/* Phase 3: Interactive CIRCULAR Scratch Card */}
          {phase === 'scratch_card' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex flex-col items-center w-full"
            >
              {/* Scratch Hint Prompt */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFFDF9] border border-[#C5A059]/60 text-[#1B382B] text-xs font-cinzel tracking-wider uppercase shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B89047] animate-pulse" />
                <span>Scratch Card to Reveal The Invitation</span>
                <Sparkles className="w-3.5 h-3.5 text-[#B89047] animate-pulse" />
              </motion.div>

              {/* Perfectly Circular, Larger Scratch Card */}
              <div className="relative w-[320px] h-[320px] sm:w-[390px] sm:h-[390px] md:w-[420px] md:h-[420px] max-w-[85vw] max-h-[85vw] aspect-square rounded-full border-4 border-[#C5A059] p-2 bg-[#FAF8F5] shadow-[0_15px_50px_rgba(27,56,43,0.12)] overflow-hidden">
                {/* UNDERNEATH LAYER (The Hidden R & H Monogram Seal) */}
                <div className="absolute inset-2 rounded-full bg-[#FFFDF9] flex flex-col items-center justify-center p-6 text-center border-2 border-[#C5A059]/40 overflow-hidden">
                  <div className="absolute inset-0 botanical-dots opacity-30 pointer-events-none" />

                  <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#756A5E] block mb-2">
                    Together With Their Families
                  </span>

                  {/* Centered Vector Royal Monogram */}
                  <RoyalMonogramSeal size={135} variant="ivory" showSubtext={true} subtext="RIHA" glow={true} />

                  <h3 className="font-script text-3xl sm:text-4xl text-[#1B382B] mt-2">
                    Rida & Harish
                  </h3>
                  <p className="font-cinzel text-[10px] sm:text-xs text-[#756A5E] tracking-widest uppercase mt-1">
                    27 March 2027 • Lahore, Pakistan
                  </p>
                </div>

                {/* TOP LAYER (HTML5 Canvas Circular Scratch Surface) */}
                {!cardRevealed && (
                  <canvas
                    ref={canvasRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    className="absolute inset-2 rounded-full w-[calc(100%-16px)] h-[calc(100%-16px)] z-10 cursor-pointer touch-none"
                    style={{ touchAction: 'none' }}
                  />
                )}

                {/* Animated Circular Guiding Hand Prompt */}
                {!hasInteractedScratch && !cardRevealed && (
                  <motion.div
                    animate={{
                      x: [-28, 28, -28],
                      y: [-12, 12, -12],
                    }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center"
                  >
                    <div className="p-3.5 rounded-full bg-gold-400 text-black shadow-2xl shadow-gold-500/60">
                      <Hand className="w-6 h-6 animate-pulse" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Scratch Progress & Instant Reveal Fallback */}
              <div className="mt-5 flex items-center justify-between gap-4 w-full max-w-[390px] px-3">
                <span className="text-xs font-mono text-[#756A5E]">
                  {scratchPercent > 0 ? `${scratchPercent}% Scratched (87% required)` : 'Scratch card with finger or mouse'}
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
          {phase === 'invitation_reveal' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center max-w-lg w-full p-8 sm:p-10 rounded-[36px] bg-[#FFFDF9] border-2 border-[#C5A059] shadow-[0_20px_60px_rgba(27,56,43,0.12)] text-center relative overflow-visible"
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
              <div className="mb-4">
                <RoyalMonogramSeal size={90} variant="ivory" showSubtext={true} subtext="RIHA" glow={true} />
              </div>

              {/* Bismillah Screen in Sacred Calligraphy */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-3"
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

              {/* Wedding of Rida & Harish */}
              <div className="mb-5">
                <span className="font-cinzel text-xs tracking-[0.35em] uppercase text-[#756A5E] block mb-1">
                  The Wedding of
                </span>
                <h1 className="font-script text-5xl sm:text-6xl text-[#1B382B] leading-none my-1">
                  Rida & Harish
                </h1>
                <p className="font-serif italic text-sm text-[#5D5347] mt-2 max-w-md mx-auto leading-relaxed">
                  "Together with their families warmly invite you to celebrate our union of love, prayers, and togetherness."
                </p>
                <p className="font-cinzel text-xs text-[#B89047] tracking-widest uppercase mt-2 font-semibold">
                  Saturday, 27 March 2027 • Lahore, Pakistan
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
                <span>Plays traditional wedding Shehnai melody automatically</span>
              </p>
            </motion.div>
          )}
        </div>

        {/* ============================================================== */}
        {/* SCENE 1 & 2: MODERN ANIMATED WEDDING CURTAINS & HANGING BULB   */}
        {/* ============================================================== */}
        
        {/* Hanging Decorative Wedding Bulb (Swings from top center ceiling) */}
        {!curtainsOpened && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: [-4.5, 4.5, -4.5],
            }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.6 } }}
            transition={{
              rotate: {
                repeat: Infinity,
                duration: 4.8,
                ease: 'easeInOut',
              },
              opacity: { duration: 0.8 },
              y: { duration: 0.8 },
            }}
            style={{ transformOrigin: 'top center' }}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
          >
            <HangingWeddingBulb />
          </motion.div>
        )}

        {/* Prominent, Interactive RH — RIHA Central Button */}
        {!curtainsOpened && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15, transition: { duration: 0.55 } }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.8 }}
            onClick={handleOpenCurtains}
            disabled={isOpening}
            className="absolute z-50 flex flex-col items-center justify-center cursor-pointer group focus:outline-none"
            aria-label="Open wedding curtains to reveal invitation"
          >
            {/* Illuminated Medallion Plate in Ivory & Gold */}
            <div
              className="relative p-4 sm:p-5 rounded-full border-2 sm:border-[3px] border-[#C5A059] bg-[#FFFDF9] shadow-[0_0_60px_rgba(197,160,89,0.5),0_15px_35px_rgba(27,56,43,0.18)] group-hover:shadow-[0_0_80px_rgba(197,160,89,0.7)] group-hover:border-[#E5C77A] transition-all duration-500 overflow-hidden"
              style={{ borderRadius: '50%' }}
            >
              <RoyalMonogramSeal size={150} variant="ivory" showSubtext={true} subtext="RIHA" glow={true} />
              
              {/* Concentric Golden Pulse Rings */}
              <div
                className="absolute -inset-2 rounded-full border-2 border-[#C5A059]/40 animate-ping pointer-events-none opacity-50"
                style={{ borderRadius: '50%', animationDuration: '3s' }}
              />
              <div
                className="absolute -inset-1 rounded-full border border-[#E5C77A]/70 pointer-events-none"
                style={{ borderRadius: '50%' }}
              />
            </div>

            {/* Click / Tap Prompt Pill */}
            <div className="mt-6 px-7 py-3 rounded-full bg-[#FFFDF9] border border-[#C5A059] shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-cinzel tracking-widest uppercase text-[#1B382B] group-hover:bg-[#1B382B] group-hover:text-[#FAF8F5] group-hover:border-[#1B382B] transition-all duration-300">
              <Sparkles className="w-4 h-4 text-[#B89047] group-hover:text-[#EAD7A5] animate-spin-slow" />
              <span className="font-bold">Tap to Open Curtains</span>
              <Sparkles className="w-4 h-4 text-[#B89047] group-hover:text-[#EAD7A5] animate-spin-slow" />
            </div>
          </motion.button>
        )}

        {/* LEFT CURTAIN: CINEMATIC DIAGONAL UPPER-LEFT OPENING */}
        <motion.div
          onClick={handleOpenCurtains}
          initial={{ rotateY: 0, x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
          animate={
            curtainsOpened
              ? {
                  x: '-130%',
                  y: '-42%',
                  rotate: -14,
                  rotateY: -48,
                  scale: 0.85,
                  opacity: [1, 1, 0.85, 0],
                }
              : {
                  x: [0, -2, 0, 2, 0],
                  y: [0, -4, 0, 3, 0],
                  rotateY: [0, -2, 0, 1.5, 0],
                  rotate: 0,
                  scale: 1,
                  opacity: 1,
                }
          }
          transition={
            curtainsOpened
              ? {
                  duration: prefersReducedMotion ? 0.01 : 1.75,
                  ease: [0.22, 1, 0.36, 1],
                }
              : {
                  repeat: Infinity,
                  duration: 7,
                  ease: 'easeInOut',
                }
          }
          className={`absolute top-0 left-0 w-1/2 h-full z-30 shadow-[35px_0_70px_rgba(0,0,0,0.95)] ${
            !curtainsOpened ? 'cursor-pointer' : 'pointer-events-none'
          }`}
          style={{
            transformOrigin: 'top left',
            transformStyle: 'preserve-3d',
            background: `
              linear-gradient(to right,
                #c8bea8 0%,
                #eee6d5 14%,
                #dfd4be 28%,
                #fcf9f2 44%,
                #dcd1be 58%,
                #f2ebdb 76%,
                #c2b59f 100%
              )
            `,
          }}
        >
          {/* Vertical Fabric Folds & Lighting */}
          <div
            className="absolute inset-0 opacity-55 pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  to right,
                  rgba(90, 78, 62, 0.38) 0px,
                  rgba(130, 118, 98, 0.16) 18px,
                  rgba(255, 255, 255, 0.6) 36px,
                  rgba(80, 68, 52, 0.4) 54px
                )
              `,
            }}
          />

          {/* Golden Velvet Trim */}
          <div className="absolute top-0 right-0 bottom-0 w-4 bg-gradient-to-r from-[#B89047] via-[#F4E3B5] to-[#8C692B] shadow-xl" />
          <div className="absolute top-0 right-4 bottom-0 w-1.5 bg-[#EAD7A5]/60" />
        </motion.div>

        {/* RIGHT CURTAIN: CINEMATIC DIAGONAL UPPER-RIGHT OPENING */}
        <motion.div
          onClick={handleOpenCurtains}
          initial={{ rotateY: 0, x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
          animate={
            curtainsOpened
              ? {
                  x: '130%',
                  y: '-42%',
                  rotate: 14,
                  rotateY: 48,
                  scale: 0.85,
                  opacity: [1, 1, 0.85, 0],
                }
              : {
                  x: [0, 2, 0, -2, 0],
                  y: [0, 4, 0, -3, 0],
                  rotateY: [0, 2, 0, -1.5, 0],
                  rotate: 0,
                  scale: 1,
                  opacity: 1,
                }
          }
          transition={
            curtainsOpened
              ? {
                  duration: prefersReducedMotion ? 0.01 : 1.75,
                  ease: [0.22, 1, 0.36, 1],
                }
              : {
                  repeat: Infinity,
                  duration: 7.5,
                  ease: 'easeInOut',
                }
          }
          className={`absolute top-0 right-0 w-1/2 h-full z-30 shadow-[-35px_0_70px_rgba(0,0,0,0.95)] ${
            !curtainsOpened ? 'cursor-pointer' : 'pointer-events-none'
          }`}
          style={{
            transformOrigin: 'top right',
            transformStyle: 'preserve-3d',
            background: `
              linear-gradient(to left,
                #c8bea8 0%,
                #eee6d5 14%,
                #dfd4be 28%,
                #fcf9f2 44%,
                #dcd1be 58%,
                #f2ebdb 76%,
                #c2b59f 100%
              )
            `,
          }}
        >
          {/* Vertical Fabric Folds & Lighting */}
          <div
            className="absolute inset-0 opacity-55 pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  to left,
                  rgba(90, 78, 62, 0.38) 0px,
                  rgba(130, 118, 98, 0.16) 18px,
                  rgba(255, 255, 255, 0.6) 36px,
                  rgba(80, 68, 52, 0.4) 54px
                )
              `,
            }}
          />

          {/* Golden Velvet Trim */}
          <div className="absolute top-0 left-0 bottom-0 w-4 bg-gradient-to-l from-[#B89047] via-[#F4E3B5] to-[#8C692B] shadow-xl" />
          <div className="absolute top-0 left-4 bottom-0 w-1.5 bg-[#EAD7A5]/60" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
