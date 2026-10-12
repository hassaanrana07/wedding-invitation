import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, Music, ChevronRight, Hand } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useWedding } from '../../context/WeddingContext';
import RoyalMonogramSeal from '../ui/RoyalMonogramSeal';

export default function OpeningSplashScreen({ onComplete }) {
  const { wedding, unlockAndPlayAudio } = useWedding();
  const prefersReducedMotion = useReducedMotion();

  // Persistent Invitation State Check
  const getInitialPhase = () => {
    if (prefersReducedMotion) return 'done';
    try {
      if (typeof window !== 'undefined') {
        const scratchDone = localStorage.getItem('riha_scratch_completed') === 'true';
        if (scratchDone) return 'done';
        const curtainDone = localStorage.getItem('riha_curtain_opened') === 'true';
        if (curtainDone) return 'scratch_card';
      }
    } catch (e) {}
    return 'curtains_closed';
  };

  const getInitialCurtainsOpened = () => {
    try {
      if (typeof window !== 'undefined') {
        return (
          localStorage.getItem('riha_curtain_opened') === 'true' ||
          localStorage.getItem('riha_scratch_completed') === 'true'
        );
      }
    } catch (e) {}
    return false;
  };

  // Experience Phases:
  // 1: 'curtains_closed'   -> Stage curtains closed with high-contrast centered R & H seal
  // 2: 'curtains_opening'  -> 3D Curtains swing & rotate outward with fabric folds (1.35s)
  // 3: 'scratch_card'      -> Circular HTML5 canvas scratch card appears
  // 4: 'invitation_reveal' -> Scratched >= 65% -> Bismillah & Rida & Harish wedding card revealed
  // 5: 'done'              -> Main website revealed
  const [phase, setPhase] = useState(getInitialPhase);
  const [curtainsOpened, setCurtainsOpened] = useState(getInitialCurtainsOpened);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [hasInteractedScratch, setHasInteractedScratch] = useState(false);

  // Canvas Refs
  const canvasRef = useRef(null);
  const isPointerDownRef = useRef(false);
  const lastPointRef = useRef(null);
  const throttleCheckRef = useRef(0);
  const confettiFiredRef = useRef(false);

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

    try {
      localStorage.setItem('riha_scratch_completed', 'true');
    } catch (e) {}
    unlockAndPlayAudio();

    // Fire celebration fireworks, rose petals, and golden sparkles ONLY ONCE
    if (!confettiFiredRef.current) {
      confettiFiredRef.current = true;
      try {
        // Multi-color fireworks and rose petal bursts from left & right cannons
        confetti({
          particleCount: 85,
          angle: 60,
          spread: 80,
          origin: { x: 0.15, y: 0.65 },
          colors: ['#C5A059', '#EAD7A5', '#FFF4D2', '#D4AF37', '#FAF7F2', '#E28495', '#F5A9B8', '#FF69B4', '#FFD700'],
          ticks: 240,
        });
        confetti({
          particleCount: 85,
          angle: 120,
          spread: 80,
          origin: { x: 0.85, y: 0.65 },
          colors: ['#C5A059', '#EAD7A5', '#FFF4D2', '#D4AF37', '#FAF7F2', '#E28495', '#F5A9B8', '#FF69B4', '#FFD700'],
          ticks: 240,
        });
        confetti({
          particleCount: 120,
          spread: 120,
          origin: { x: 0.5, y: 0.45 },
          colors: ['#EAD7A5', '#D4AF37', '#E28495', '#F5A9B8', '#F5D061', '#FFFFFF', '#FF69B4', '#C5A059'],
          gravity: 0.75,
          scalar: 1.15,
          ticks: 280,
        });
      } catch (e) {}
    }

    setTimeout(() => {
      setPhase('invitation_reveal');
    }, 450);
  }, [cardRevealed, unlockAndPlayAudio]);

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

        // Auto reveal at 60-70% cleared area (65%)
        if (percentage >= 65) {
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

  // Scene 2: Interactive Curtain Opening Trigger (1.35s cinematic reveal)
  const handleOpenCurtains = () => {
    if (phase !== 'curtains_closed') return;
    setCurtainsOpened(true);
    setPhase('curtains_opening');
    try {
      localStorage.setItem('riha_curtain_opened', 'true');
    } catch (e) {}
    unlockAndPlayAudio();

    // Allow the curtains to naturally part for 1.35s before revealing the scratch card
    setTimeout(() => {
      setPhase('scratch_card');
    }, 1350);
  };

  // Scene 4: Enter Website & Play Wedding Music
  const handleEnterWebsite = () => {
    unlockAndPlayAudio();
    try {
      localStorage.setItem('riha_scratch_completed', 'true');
      localStorage.setItem('riha_curtain_opened', 'true');
    } catch (e) {}

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
    try {
      localStorage.setItem('riha_scratch_completed', 'true');
      localStorage.setItem('riha_curtain_opened', 'true');
    } catch (e) {}
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#07090D] text-[#EFE2C8] select-none overflow-hidden"
        style={{ perspective: '1600px' }}
        role="dialog"
        aria-modal="true"
        aria-label="RIHA Wedding Invitation Opening Experience"
      >
        {/* Persistent Skip Button (Top Right) */}
        <button
          onClick={handleSkipIntro}
          className="absolute top-5 right-5 z-50 px-4 py-2 rounded-full bg-black/80 hover:bg-gold-500/20 text-gold-200 hover:text-white text-[11px] font-cinzel tracking-widest uppercase border border-gold-400/50 backdrop-blur-md transition-all shadow-2xl cursor-pointer"
          aria-label="Skip to website"
        >
          Skip Intro
        </button>

        {/* Ambient Radial Stage Glows Behind Curtains */}
        <div className="ambient-glow w-[600px] h-[600px] bg-gold-500/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[130px] pointer-events-none" />
        <div className="ambient-glow w-96 h-96 bg-emerald-deep/40 bottom-10 right-10 blur-[100px] pointer-events-none" />

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
                className="mb-5 flex items-center gap-2 px-5 py-2 rounded-full bg-gold-950/70 border border-gold-400/50 text-gold-200 text-xs font-cinzel tracking-wider uppercase shadow-xl"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
                <span>Scratch Card to Reveal The Invitation</span>
                <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
              </motion.div>

              {/* Perfectly Circular, Larger Scratch Card */}
              <div className="relative w-[320px] h-[320px] sm:w-[390px] sm:h-[390px] md:w-[420px] md:h-[420px] max-w-[85vw] max-h-[85vw] aspect-square rounded-full border-4 border-gold-400/80 p-2 bg-gradient-to-br from-gold-950 via-[#141822] to-black shadow-[0_0_60px_rgba(197,160,89,0.35)] overflow-hidden">
                {/* UNDERNEATH LAYER (The Hidden R & H Monogram Seal) */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#0C1510] via-[#0C1017] to-[#1E0F16] flex flex-col items-center justify-center p-6 text-center border-2 border-gold-400/40 overflow-hidden">
                  <div className="absolute inset-0 pattern-bg opacity-30 pointer-events-none" />

                  <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gold-400 block mb-2">
                    Together With Their Families
                  </span>

                  {/* Centered Vector Royal Monogram */}
                  <RoyalMonogramSeal size={135} showSubtext={true} subtext="RIHA" glow={true} />

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gold-light mt-3">
                    Rida & Harish
                  </h3>
                  <p className="font-cinzel text-[10px] sm:text-xs text-cream-300/80 tracking-widest uppercase mt-1">
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
                <span className="text-xs font-mono text-gold-300">
                  {scratchPercent > 0 ? `${scratchPercent}% Scratched` : 'Scratch card with finger or mouse'}
                </span>

                <button
                  onClick={triggerCompleteReveal}
                  className="text-xs text-gold-300 hover:text-white underline cursor-pointer font-cinzel tracking-wider uppercase font-semibold"
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
              className="flex flex-col items-center max-w-lg w-full"
            >
              {/* Royal Monogram Badge */}
              <div className="mb-5">
                <RoyalMonogramSeal size={100} showSubtext={true} subtext="RIHA" glow={true} />
              </div>

              {/* Bismillah Screen in Sacred Calligraphy */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-4"
              >
                <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-200 tracking-wider font-medium leading-relaxed drop-shadow">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="font-serif text-sm sm:text-base text-gold-300/90 tracking-widest italic mt-1 font-light">
                  "Bismillah-ir-Rahman-ir-Raheem"
                </p>
              </motion.div>

              {/* Decorative Filigree Divider */}
              <div className="flex items-center justify-center gap-3 my-3 w-48 sm:w-64">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-400/60 to-gold-400" />
                <span className="text-gold-400 text-xs">❖</span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-400/60 to-gold-400" />
              </div>

              {/* Wedding of Rida & Harish */}
              <div className="mb-6">
                <span className="font-cinzel text-xs tracking-[0.4em] uppercase text-gold-400 block mb-1">
                  The Wedding of
                </span>
                <h1 className="font-serif text-4xl sm:text-6xl font-bold gold-text-gradient">
                  Rida & Harish
                </h1>
                <p className="font-serif text-sm sm:text-base text-cream-200/95 italic mt-3 max-w-md mx-auto font-light leading-relaxed">
                  "Together with their families warmly invite you to celebrate our union of love, prayers, and togetherness."
                </p>
                <p className="font-cinzel text-xs text-gold-300 tracking-widest uppercase mt-2">
                  Saturday, 27 March 2027 • Lahore, Pakistan
                </p>
              </div>

              {/* Enter Button */}
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(197, 160, 89, 0.55)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEnterWebsite}
                className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-black font-cinzel font-bold text-sm sm:text-base tracking-wider uppercase shadow-2xl shadow-gold-500/30 cursor-pointer overflow-hidden"
              >
                <Sparkles className="w-4 h-4 text-black group-hover:rotate-45 transition-transform" />
                <span>Enter Wedding Celebration</span>
                <ChevronRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <p className="text-xs text-gold-300/80 font-sans tracking-wide flex items-center gap-1.5 mt-3">
                <Music className="w-3.5 h-3.5 text-gold-400" />
                <span>Plays traditional wedding Shehnai melody automatically</span>
              </p>
            </motion.div>
          )}
        </div>

        {/* ============================================================== */}
        {/* SCENE 1 & 2: 3D THEATRICAL WEDDING STAGE CURTAINS               */}
        {/* ============================================================== */}
        {/* High-Contrast Central Seal (Visible during Scene 1 and smoothly transitions) */}
        {!curtainsOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15, transition: { duration: 0.6 } }}
            transition={{ duration: 0.8 }}
            onClick={handleOpenCurtains}
            className="absolute z-50 flex flex-col items-center justify-center cursor-pointer group"
          >
            {/* Illuminated Medallion Plate - High Contrast & Clearly Visible */}
            <div
              className="relative p-3.5 rounded-full border-2 border-gold-300 bg-gradient-to-br from-[#251D14] via-[#100D09] to-[#1F170F] shadow-[0_0_60px_rgba(245,225,175,0.7),0_0_120px_rgba(197,160,89,0.3)] group-hover:scale-105 transition-transform duration-500 overflow-hidden"
              style={{ borderRadius: '50%' }}
            >
              <RoyalMonogramSeal size={135} showSubtext={true} subtext="RIHA" glow={true} />
              <div
                className="absolute -inset-1.5 rounded-full border border-gold-400/40 animate-pulse pointer-events-none"
                style={{ borderRadius: '50%' }}
              />
            </div>

            {/* Click / Tap Prompt Pill */}
            <div className="mt-5 px-6 py-2.5 rounded-full bg-black/90 border border-gold-300/80 backdrop-blur-md shadow-[0_0_25px_rgba(197,160,89,0.4)] flex items-center gap-2 text-xs font-cinzel tracking-widest uppercase text-gold-200 group-hover:bg-gold-500 group-hover:text-black transition-all">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 group-hover:text-black animate-spin-slow" />
              <span className="font-bold">Tap to Open Curtains</span>
            </div>
          </motion.div>
        )}

        {/* LEFT CURTAIN WITH 3D ROTATION, FABRIC WAVE & REALISTIC GATHERING */}
        <motion.div
          onClick={handleOpenCurtains}
          initial={{ rotateY: 0, scaleX: 1, x: 0 }}
          animate={
            curtainsOpened
              ? {
                  rotateY: -78,
                  scaleX: 0.08,
                  x: '-100%',
                  y: [-4, 12, -18],
                }
              : {
                  rotateY: [0, -2, 0, 1.5, 0],
                  y: [0, -7, 0, 6, 0],
                  x: [0, -3, 0, 2, 0],
                  scaleX: 1,
                }
          }
          transition={
            curtainsOpened
              ? {
                  duration: prefersReducedMotion ? 0.01 : 1.45,
                  ease: [0.22, 1, 0.36, 1],
                }
              : {
                  repeat: Infinity,
                  duration: 7,
                  ease: 'easeInOut',
                }
          }
          className={`absolute top-0 left-0 w-1/2 h-full z-30 shadow-[35px_0_70px_rgba(0,0,0,0.98)] ${
            !curtainsOpened ? 'cursor-pointer' : 'pointer-events-none'
          }`}
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            background: `
              linear-gradient(to right,
                #c5baa4 0%,
                #ede5d4 15%,
                #ded4c0 30%,
                #f9f5ec 48%,
                #d9cfba 65%,
                #eee7d8 82%,
                #bfb39d 100%
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
                  rgba(90, 78, 62, 0.42) 0px,
                  rgba(130, 118, 98, 0.18) 18px,
                  rgba(255, 255, 255, 0.65) 36px,
                  rgba(80, 68, 52, 0.45) 54px
                )
              `,
            }}
          />

          {/* Golden Velvet Trim */}
          <div className="absolute top-0 right-0 bottom-0 w-4 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-700 shadow-xl" />
          <div className="absolute top-0 right-4 bottom-0 w-1.5 bg-gold-200/50" />
        </motion.div>

        {/* RIGHT CURTAIN WITH 3D ROTATION, FABRIC WAVE & REALISTIC GATHERING */}
        <motion.div
          onClick={handleOpenCurtains}
          initial={{ rotateY: 0, scaleX: 1, x: 0 }}
          animate={
            curtainsOpened
              ? {
                  rotateY: 78,
                  scaleX: 0.08,
                  x: '100%',
                  y: [4, -12, 18],
                }
              : {
                  rotateY: [0, 2, 0, -1.5, 0],
                  y: [0, 7, 0, -6, 0],
                  x: [0, 3, 0, -2, 0],
                  scaleX: 1,
                }
          }
          transition={
            curtainsOpened
              ? {
                  duration: prefersReducedMotion ? 0.01 : 1.45,
                  ease: [0.22, 1, 0.36, 1],
                }
              : {
                  repeat: Infinity,
                  duration: 7.5,
                  ease: 'easeInOut',
                }
          }
          className={`absolute top-0 right-0 w-1/2 h-full z-30 shadow-[-35px_0_70px_rgba(0,0,0,0.98)] ${
            !curtainsOpened ? 'cursor-pointer' : 'pointer-events-none'
          }`}
          style={{
            transformOrigin: 'right center',
            transformStyle: 'preserve-3d',
            background: `
              linear-gradient(to left,
                #c5baa4 0%,
                #ede5d4 15%,
                #ded4c0 30%,
                #f9f5ec 48%,
                #d9cfba 65%,
                #eee7d8 82%,
                #bfb39d 100%
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
                  rgba(90, 78, 62, 0.42) 0px,
                  rgba(130, 118, 98, 0.18) 18px,
                  rgba(255, 255, 255, 0.65) 36px,
                  rgba(80, 68, 52, 0.45) 54px
                )
              `,
            }}
          />

          {/* Golden Velvet Trim */}
          <div className="absolute top-0 left-0 bottom-0 w-4 bg-gradient-to-l from-gold-600 via-gold-300 to-gold-700 shadow-xl" />
          <div className="absolute top-0 left-4 bottom-0 w-1.5 bg-gold-200/50" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
