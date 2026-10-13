import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Sparkles, Music, ChevronRight, Hand } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useWedding } from '../../context/WeddingContext';
import RoyalMonogramSeal from '../ui/RoyalMonogramSeal';
import { HangingWeddingBulb, BloomingFlowerOrnament } from '../ui/BotanicalOrnaments';

// Controlled State Sequence Phases:
// 1. 'CLOSED_CURTAINS'    -> Regal velvet curtains with 3D depth, pleats & centered H&A logo medallion
// 2. 'CURTAIN_OPENING'    -> Curtains glide outward with 3D perspective fold for 1.4s (1400ms); music starts
// 3. 'SCRATCH_INVITATION' -> Circular canvas scratch card appears dead-center; feathered wide brush scratching
// 4. 'INVITATION_REVEALED'-> Scratched >= 38% (or instant reveal) -> Celebratory fireworks, blooming flower & Pakistani card
// 5. 'HOMEPAGE'           -> Unmounts opening screen, smoothly landing at the top Hero section

export default function OpeningSplashScreen({ onComplete }) {
  const { unlockAndPlayAudio } = useWedding();

  const [phase, setPhase] = useState('CLOSED_CURTAINS');
  const [curtainsOpened, setCurtainsOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [hasInteractedScratch, setHasInteractedScratch] = useState(false);
  const [showFlowerBloom, setShowFlowerBloom] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  // Guarantee that initial page entry or refresh stays at top (Hero section)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Canvas & Pointer Refs
  const canvasRef = useRef(null);
  const isPointerDownRef = useRef(false);
  const lastPointRef = useRef(null);
  const throttleCheckRef = useRef(0);
  const confettiFiredRef = useRef(false);
  const flowerBloomedRef = useRef(false);

  // Initialize Canvas Circular Scratch Layer with high-DPI crispness
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2;
    const cx = width / 2;
    const cy = height / 2;

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 2, 0, Math.PI * 2);
    ctx.clip();

    // 1. Rich Champagne & Antique Gold Radial Gradient
    const grad = ctx.createRadialGradient(cx, cy, radius * 0.15, cx, cy, radius);
    grad.addColorStop(0, '#FFF6E0');
    grad.addColorStop(0.25, '#E5C77A');
    grad.addColorStop(0.55, '#C5A059');
    grad.addColorStop(0.85, '#D4B872');
    grad.addColorStop(1, '#8C692B');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Luxury Golden Stardust Particles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let i = 0; i < 90; i++) {
      const angle = (i * 137.5) * (Math.PI / 180);
      const r = Math.sqrt(i / 90) * (radius - 18 * dpr);
      const rx = cx + r * Math.cos(angle);
      const ry = cy + r * Math.sin(angle);
      const rSize = ((i % 3) + 1) * dpr * 0.8;
      ctx.beginPath();
      ctx.arc(rx, ry, rSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Ornate Concentric Gold Filigree Rings
    ctx.strokeStyle = 'rgba(140, 105, 43, 0.7)';
    ctx.lineWidth = 2.5 * dpr;
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 8 * dpr, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 245, 220, 0.8)';
    ctx.lineWidth = 1.2 * dpr;
    ctx.setLineDash([4 * dpr, 4 * dpr]);
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 14 * dpr, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. Center Scratch Prompt Typography
    ctx.fillStyle = '#261706';
    ctx.font = `700 ${11 * dpr}px Cinzel, serif`;
    ctx.textAlign = 'center';
    ctx.fillText('✦ ROYAL WEDDING ✦', cx, cy - 30 * dpr);

    ctx.fillStyle = '#1A0E03';
    ctx.font = `bold ${20 * dpr}px Cinzel, serif`;
    ctx.fillText('SCRATCH TO REVEAL', cx, cy);

    ctx.fillStyle = '#3E280C';
    ctx.font = `italic ${12 * dpr}px Cormorant Garamond, serif`;
    ctx.fillText('Touch or drag to reveal A & H', cx, cy + 26 * dpr);

    ctx.restore();
  }, []);

  // When phase becomes 'SCRATCH_INVITATION', initialize canvas
  useEffect(() => {
    if (phase === 'SCRATCH_INVITATION') {
      const timer = setTimeout(() => {
        initCanvas();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [phase, initCanvas]);

  // Handle Resize for Canvas
  useEffect(() => {
    const handleResize = () => {
      if (phase === 'SCRATCH_INVITATION' && !cardRevealed) {
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

    // Trigger flower bloom animation
    if (!flowerBloomedRef.current) {
      flowerBloomedRef.current = true;
      setShowFlowerBloom(true);
    }

    // Fire celebration golden fireworks & decorative sparkles
    if (!confettiFiredRef.current) {
      confettiFiredRef.current = true;
      try {
        confetti({
          particleCount: 85,
          angle: 60,
          spread: 80,
          origin: { x: 0.15, y: 0.65 },
          colors: ['#C5A059', '#EAD7A5', '#FFF4D2', '#D4AF37', '#FAF7F2', '#E28495', '#F5A9B8'],
          ticks: 240,
        });
        confetti({
          particleCount: 85,
          angle: 120,
          spread: 80,
          origin: { x: 0.85, y: 0.65 },
          colors: ['#C5A059', '#EAD7A5', '#FFF4D2', '#D4AF37', '#FAF7F2', '#E28495', '#F5A9B8'],
          ticks: 240,
        });
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 110,
            origin: { x: 0.5, y: 0.55 },
            colors: ['#C5A059', '#EAD7A5', '#FFF4D2', '#D4AF37', '#FAF7F2'],
            ticks: 250,
          });
        }, 300);
      } catch (e) {}
    }

    // Transition smoothly to revealed card state
    setTimeout(() => {
      setPhase('INVITATION_REVEALED');
    }, 400);
  }, [cardRevealed, unlockAndPlayAudio]);

  // Calculate Scratched Area Percentage with high-performance sampling
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || cardRevealed) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) / 2 - 4;
    const rSquared = radius * radius;

    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      let clearPixels = 0;
      let totalInCircle = 0;
      const step = Math.max(6, Math.floor(width / 45)); // Sample ~45x45 grid for instant check

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const dx = x - cx;
          const dy = y - cy;
          if (dx * dx + dy * dy <= rSquared) {
            totalInCircle++;
            const idx = (y * width + x) * 4 + 3;
            if (data[idx] < 60) {
              clearPixels++;
            }
          }
        }
      }

      if (totalInCircle > 0) {
        const percentage = Math.round((clearPixels / totalInCircle) * 100);
        setScratchPercent(percentage);

        // Auto reveal at comfortable 38% threshold (a few natural finger/mouse swipes)
        if (percentage >= 38) {
          triggerCompleteReveal();
        }
      }
    } catch (e) {}
  }, [cardRevealed, triggerCompleteReveal]);

  // Soft, Feathered Radial Brush Scratching Function
  const scratchPoint = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Generous, comfortable brush radius: ~42px to 48px depending on canvas DPR
    const brushRadius = Math.max(36, Math.round(canvas.width * 0.098));

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';

    // Soft feathered radial gradient mask
    const grad = ctx.createRadialGradient(x, y, brushRadius * 0.25, x, y, brushRadius);
    grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
    grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.95)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Continuous Interpolation so fast dragging never leaves broken stroke gaps
  const scratchInterpolated = (p1, p2) => {
    if (!p1 || !p2) return;
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.hypot(dx, dy);
    const step = 8; // Step size in canvas pixels
    const steps = Math.max(1, Math.ceil(dist / step));

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = p1.x + dx * t;
      const y = p1.y + dy * t;
      scratchPoint(x, y);
    }
  };

  // Spawn visual sparkle feedback while scratching
  const spawnSparkle = (clientX, clientY) => {
    const id = Date.now() + Math.random();
    setSparkles((prev) => [
      ...prev.slice(-8), // Keep only recent particles for lightweight performance
      { id, x: clientX, y: clientY },
    ]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 600);
  };

  // Pointer Scratch Handlers (Works uniformly for finger touch, mouse, trackpad)
  const handlePointerDown = (e) => {
    if (cardRevealed) return;
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}

    isPointerDownRef.current = true;
    setIsScratching(true);
    setHasInteractedScratch(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const pt = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
    lastPointRef.current = pt;
    scratchPoint(pt.x, pt.y);
    spawnSparkle(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    if (!isPointerDownRef.current || cardRevealed) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const currentPt = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };

    scratchInterpolated(lastPointRef.current, currentPt);
    lastPointRef.current = currentPt;

    if (Math.random() > 0.4) {
      spawnSparkle(e.clientX, e.clientY);
    }

    throttleCheckRef.current++;
    if (throttleCheckRef.current % 5 === 0) {
      checkScratchPercentage();
    }
  };

  const handlePointerUp = (e) => {
    if (e?.currentTarget) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
    isPointerDownRef.current = false;
    setIsScratching(false);
    checkScratchPercentage();
  };

  // Phase 1 -> 2: Curtain Opening Trigger (Cinematic 1.4s 3D opening)
  const handleOpenCurtains = () => {
    if (phase !== 'CLOSED_CURTAINS' || isOpening) return;
    setIsOpening(true);
    setCurtainsOpened(true);
    setPhase('CURTAIN_OPENING');
    unlockAndPlayAudio();

    // Curtains glide smoothly away with 3D depth for exactly 1.4s (1400ms)
    setTimeout(() => {
      setPhase('SCRATCH_INVITATION');
      setIsOpening(false);
    }, 1400);
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
          aria-label="Ahmed and Ayesha Wedding Invitation Opening Experience"
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

          {/* Floating Gold Sparkle Feedback while Scratching */}
          {sparkles.map((sp) => (
            <div
              key={sp.id}
              className="fixed pointer-events-none z-50 w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#FFF2D6] to-[#C5A059] shadow-[0_0_12px_#E5C77A] animate-ping"
              style={{
                left: sp.x - 5,
                top: sp.y - 5,
                animationDuration: '600ms',
              }}
            />
          ))}

          {/* ============================================================== */}
          {/* SCENE 3 & 4: INNER STAGE (Dead-Center Viewport Card Container) */}
          {/* ============================================================== */}
          {(phase === 'SCRATCH_INVITATION' || phase === 'INVITATION_REVEALED') && (
            <div className="fixed inset-0 z-20 flex items-center justify-center p-4 pointer-events-auto overflow-y-auto overscroll-none select-none">
              {/* Phase 3: Interactive Circular Scratch Card */}
              {phase === 'SCRATCH_INVITATION' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="flex flex-col items-center justify-center w-full max-w-md mx-auto my-auto text-center"
                >
                  {/* Scratch Hint Prompt */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 sm:mb-5 flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFFDF9] border border-[#C5A059]/60 text-[#1B382B] text-xs font-cinzel tracking-wider uppercase shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#B89047] animate-pulse" />
                    <span>Swipe or drag finger to reveal</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#B89047] animate-pulse" />
                  </motion.div>

                  {/* Circular Scratch Card */}
                  <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[410px] md:h-[410px] max-w-[85vw] max-h-[85vw] aspect-square rounded-full border-4 border-[#C5A059] p-2 bg-[#FAF8F5] shadow-[0_15px_50px_rgba(27,56,43,0.14)] overflow-hidden touch-none select-none">
                    {/* UNDERNEATH LAYER (The Hidden Ahmed & Ayesha Card) */}
                    <div className="absolute inset-2 rounded-full bg-[#FFFDF9] flex flex-col items-center justify-center p-6 text-center border-2 border-[#C5A059]/40 overflow-hidden pointer-events-none select-none">
                      <div className="absolute inset-0 botanical-dots opacity-30 pointer-events-none" />

                      <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#756A5E] block mb-1">
                        Together With Their Families
                      </span>

                      {/* Centered Vector Royal Monogram (A & H / AH) */}
                      <RoyalMonogramSeal size={110} variant="ivory" showSubtext={true} subtext="AH" glow={true} />

                      <h3 className="font-script text-3xl sm:text-4xl text-[#1B382B] mt-2">
                        Ahmed & Ayesha
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
                        className="absolute inset-2 rounded-full w-[calc(100%-16px)] h-[calc(100%-16px)] z-10 cursor-pointer touch-none select-none"
                        style={{ touchAction: 'none', WebkitTouchCallout: 'none' }}
                      />
                    )}

                    {/* Animated Circular Guiding Hand Prompt */}
                    {!hasInteractedScratch && !cardRevealed && (
                      <motion.div
                        animate={{
                          x: [-24, 24, -24],
                          y: [-10, 10, -10],
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
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="flex flex-col items-center max-w-lg w-full p-7 sm:p-9 rounded-[36px] bg-[#FFFDF9] border-2 border-[#C5A059] shadow-[0_20px_60px_rgba(27,56,43,0.14)] text-center relative overflow-visible my-auto"
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
                    <RoyalMonogramSeal size={80} variant="ivory" showSubtext={true} subtext="AH" glow={true} />
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

                  {/* The Wedding of Ahmed & Ayesha */}
                  <div className="mb-4">
                    <span className="font-cinzel text-xs tracking-[0.35em] uppercase text-[#756A5E] block mb-1">
                      The Wedding of
                    </span>
                    <h1 className="font-script text-5xl sm:text-6xl text-[#1B382B] leading-none my-1">
                      Ahmed & Ayesha
                    </h1>

                    <div className="my-3 text-xs sm:text-sm text-[#5D5347] font-serif leading-relaxed max-w-sm mx-auto">
                      <p><strong className="text-[#1B382B] font-semibold">Bride:</strong> Ayesha Fatima <span className="text-[#756A5E]">(D/o Muhammad Imran & Shazia Imran)</span></p>
                      <p className="mt-1"><strong className="text-[#1B382B] font-semibold">Groom:</strong> Ahmed Hassan <span className="text-[#756A5E]">(S/o Muhammad Asif & Naila Asif)</span></p>
                    </div>

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
          )}

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
                rotate: [-4, 4, -4],
              }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
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

          {/* ============================================================== */}
          {/* CENTERED H&A LOGO & MEDALLION BUTTON (STRICT VIEWPORT CENTER)  */}
          {/* ============================================================== */}
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
                <RoyalMonogramSeal size={122} variant="ivory" showSubtext={true} subtext="AH" glow={true} />
                
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

          {/* ============================================================== */}
          {/* 3D THEATRICAL VELVET CURTAINS WITH REALISTIC FOLDS & DEPTH     */}
          {/* ============================================================== */}

          {/* LEFT CURTAIN PANEL */}
          <div
            onClick={handleOpenCurtains}
            className={`absolute top-0 left-0 w-1/2 h-full z-30 shadow-[35px_0_75px_rgba(0,0,0,0.85)] ${
              !curtainsOpened ? 'cursor-pointer' : 'pointer-events-none'
            }`}
            style={{
              transformOrigin: 'top left',
              transform: curtainsOpened
                ? 'translate3d(-108%, -15%, -100px) rotateY(-20deg) rotate(-3.5deg)'
                : 'translate3d(0, 0, 0) rotateY(0deg) rotate(0deg)',
              opacity: curtainsOpened ? 0 : 1,
              transition: 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform, opacity',
              boxShadow: 'inset 0 -40px 90px rgba(0,0,0,0.22), inset 0 50px 80px rgba(0,0,0,0.25), 35px 0 75px rgba(0,0,0,0.85)',
              background: `
                linear-gradient(to right,
                  #c2b79f 0%,
                  #eae1cd 14%,
                  #dbcfb7 28%,
                  #faf6ec 44%,
                  #d8cca7 58%,
                  #eee5d3 76%,
                  #bfae92 100%
                )
              `,
            }}
          >
            {/* Multi-layered Velvet Folds with Cylindrical Shading */}
            <div
              className="absolute inset-0 opacity-65 pointer-events-none"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    to right,
                    rgba(35, 26, 15, 0.45) 0px,
                    rgba(75, 62, 42, 0.22) 13px,
                    rgba(255, 255, 255, 0.65) 26px,
                    rgba(246, 236, 218, 0.9) 34px,
                    rgba(105, 90, 65, 0.28) 46px,
                    rgba(35, 26, 15, 0.45) 58px
                  )
                `,
              }}
            />

            {/* Stage Valance Top Shadow & Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none" />

            {/* Ornate Gold Velvet Trim & Inner Border */}
            <div className="absolute top-0 right-0 bottom-0 w-4 bg-gradient-to-r from-[#B89047] via-[#FCE9B8] via-[#D4AF37] to-[#8C692B] shadow-2xl" />
            <div className="absolute top-0 right-4 bottom-0 w-1.5 bg-[#EAD7A5]/70" />
            <div className="absolute top-0 right-6 bottom-0 w-0.5 bg-black/20" />
          </div>

          {/* RIGHT CURTAIN PANEL */}
          <div
            onClick={handleOpenCurtains}
            className={`absolute top-0 right-0 w-1/2 h-full z-30 shadow-[-35px_0_75px_rgba(0,0,0,0.85)] ${
              !curtainsOpened ? 'cursor-pointer' : 'pointer-events-none'
            }`}
            style={{
              transformOrigin: 'top right',
              transform: curtainsOpened
                ? 'translate3d(108%, -15%, -100px) rotateY(20deg) rotate(3.5deg)'
                : 'translate3d(0, 0, 0) rotateY(0deg) rotate(0deg)',
              opacity: curtainsOpened ? 0 : 1,
              transition: 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform, opacity',
              boxShadow: 'inset 0 -40px 90px rgba(0,0,0,0.22), inset 0 50px 80px rgba(0,0,0,0.25), -35px 0 75px rgba(0,0,0,0.85)',
              background: `
                linear-gradient(to left,
                  #c2b79f 0%,
                  #eae1cd 14%,
                  #dbcfb7 28%,
                  #faf6ec 44%,
                  #d8cca7 58%,
                  #eee5d3 76%,
                  #bfae92 100%
                )
              `,
            }}
          >
            {/* Multi-layered Velvet Folds with Cylindrical Shading */}
            <div
              className="absolute inset-0 opacity-65 pointer-events-none"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    to left,
                    rgba(35, 26, 15, 0.45) 0px,
                    rgba(75, 62, 42, 0.22) 13px,
                    rgba(255, 255, 255, 0.65) 26px,
                    rgba(246, 236, 218, 0.9) 34px,
                    rgba(105, 90, 65, 0.28) 46px,
                    rgba(35, 26, 15, 0.45) 58px
                  )
                `,
              }}
            />

            {/* Stage Valance Top Shadow & Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none" />

            {/* Ornate Gold Velvet Trim & Inner Border */}
            <div className="absolute top-0 left-0 bottom-0 w-4 bg-gradient-to-l from-[#B89047] via-[#FCE9B8] via-[#D4AF37] to-[#8C692B] shadow-2xl" />
            <div className="absolute top-0 left-4 bottom-0 w-1.5 bg-[#EAD7A5]/70" />
            <div className="absolute top-0 left-6 bottom-0 w-0.5 bg-black/20" />
          </div>
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
