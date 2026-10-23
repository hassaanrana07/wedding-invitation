import React, { useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';

/**
 * Premium 3D Celebration Effects Component
 * Triggered upon successful scratch reveal:
 * 1. Romantic falling & fluttering rose petals and floral particles (3D tumbling rotation).
 * 2. Iridescent floating bubbles rising smoothly with glass highlights.
 * 3. Soft glowing stardust fireworks and celebratory confetti around the borders.
 * 
 * Bulletproof FX:
 * - Dedicated canvas ref to prevent global window collisions.
 * - useWorker: false ensures compatibility on Android browsers and sandboxed WebViews.
 * - Complete teardown and memory cleanup on unmount.
 */
export default function CelebrationEffects() {
  const canvasRef = useRef(null);
  const confettiInstanceRef = useRef(null);

  // Fire high-end celebratory fireworks & confetti around the edges and background
  useEffect(() => {
    let timer1 = null;
    let timer2 = null;

    try {
      if (canvasRef.current) {
        // Create an isolated confetti instance bound strictly to this canvas
        confettiInstanceRef.current = confetti.create(canvasRef.current, {
          resize: true,
          useWorker: false, // Ensures zero worker crashes on Android/WebView
        });

        const fire = confettiInstanceRef.current;

        // Stage 1: Left & Right romantic fireworks bursts
        fire({
          particleCount: 55,
          angle: 60,
          spread: 70,
          origin: { x: 0.12, y: 0.65 },
          colors: ['#C5A059', '#EAD7A5', '#FFF4D2', '#D4AF37', '#FAF7F2', '#E28495', '#F5A9B8'],
          ticks: 200,
          zIndex: 45,
        });

        fire({
          particleCount: 55,
          angle: 120,
          spread: 70,
          origin: { x: 0.88, y: 0.65 },
          colors: ['#C5A059', '#EAD7A5', '#FFF4D2', '#D4AF37', '#FAF7F2', '#E28495', '#F5A9B8'],
          ticks: 200,
          zIndex: 45,
        });

        // Stage 2: Center golden stardust shower
        timer1 = setTimeout(() => {
          try {
            if (confettiInstanceRef.current) {
              confettiInstanceRef.current({
                particleCount: 70,
                spread: 90,
                origin: { x: 0.5, y: 0.45 },
                colors: ['#C5A059', '#EAD7A5', '#FFF4D2', '#D4AF37', '#FAF7F2'],
                ticks: 220,
                zIndex: 45,
              });
            }
          } catch (_) {}
        }, 350);

        // Stage 3: Gentle pastel petal burst
        timer2 = setTimeout(() => {
          try {
            if (confettiInstanceRef.current) {
              confettiInstanceRef.current({
                particleCount: 45,
                spread: 75,
                origin: { x: 0.5, y: 0.75 },
                colors: ['#F7D6D9', '#E8AEB7', '#FFF4D2', '#EAD7A5'],
                ticks: 200,
                zIndex: 45,
              });
            }
          } catch (_) {}
        }, 750);
      }
    } catch (e) {
      console.warn('CelebrationEffects notice:', e);
    }

    return () => {
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
      if (confettiInstanceRef.current) {
        try {
          confettiInstanceRef.current.reset();
        } catch (_) {}
      }
    };
  }, []);

  // Generate deterministic parameters for falling rose petals
  const petals = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: `petal-${i}`,
      left: `${(i * 5.6 + 3) % 94}%`,
      delay: `${(i * 0.42) % 4.5}s`,
      duration: `${5.5 + ((i * 1.3) % 4.5)}s`,
      size: 16 + ((i * 3) % 16),
      color: i % 3 === 0 ? '#C1897C' : i % 3 === 1 ? '#E28495' : '#D4AF37',
      opacity: 0.65 + ((i % 4) * 0.08),
      swayDuration: `${3 + ((i * 0.7) % 3)}s`,
    }));
  }, []);

  // Generate deterministic parameters for rising iridescent bubbles
  const bubbles = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: `bubble-${i}`,
      left: `${(i * 7.2 + 4) % 92}%`,
      delay: `${(i * 0.65) % 5}s`,
      duration: `${6 + ((i * 1.5) % 5)}s`,
      size: 18 + ((i * 4) % 24),
      wobbleDuration: `${2.2 + ((i * 0.5) % 2)}s`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none">
      {/* Dedicated isolated confetti canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-30" />

      {/* Ambient Radial Golden Celebration Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-[#C5A059]/15 via-[#FFF4D2]/20 to-transparent blur-[140px] pointer-events-none" />

      {/* Falling Romantic Rose Petals & Blossom Particles */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute -top-10"
          style={{
            left: p.left,
            animation: `fallingPetal ${p.duration} linear infinite`,
            animationDelay: p.delay,
            willChange: 'transform, opacity',
          }}
        >
          <div
            style={{
              animation: `swayPetal ${p.swayDuration} ease-in-out infinite alternate`,
              width: `${p.size}px`,
              height: `${p.size * 1.25}px`,
              opacity: p.opacity,
            }}
          >
            {/* Elegant SVG Curved Rose Petal */}
            <svg
              viewBox="0 0 30 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
            >
              <path
                d="M15 2C8 2 2 10 2 20C2 28 8 36 15 36C22 36 28 28 28 20C28 10 22 2 15 2Z"
                fill={p.color}
                fillOpacity="0.85"
              />
              <path
                d="M15 6C11 12 11 24 15 32"
                stroke="rgba(255, 255, 255, 0.45)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      ))}

      {/* Rising Iridescent Glass Bubbles with Soft Reflections */}
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute -bottom-12"
          style={{
            left: b.left,
            animation: `risingBubble ${b.duration} ease-in infinite`,
            animationDelay: b.delay,
            willChange: 'transform, opacity',
          }}
        >
          <div
            className="rounded-full relative border border-white/50 backdrop-blur-[0.5px]"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7) 0%, rgba(234,215,165,0.25) 45%, rgba(197,160,89,0.15) 80%, rgba(255,255,255,0.4) 100%)',
              boxShadow: '0 4px 15px rgba(197,160,89,0.2), inset 0 0 6px rgba(255,255,255,0.6)',
              animation: `wobbleBubble ${b.wobbleDuration} ease-in-out infinite alternate`,
            }}
          >
            {/* Soft Bubble Reflection Highlight */}
            <div className="absolute top-1.5 left-1.5 w-2 h-1 rounded-full bg-white/70 rotate-[-30deg]" />
          </div>
        </div>
      ))}

      {/* Inline Keyframes for 3D Petals & Bubbles */}
      <style>{`
        @keyframes fallingPetal {
          0% {
            transform: translate3d(0, -20px, 0) rotateZ(0deg) rotateY(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translate3d(0, 105vh, 0) rotateZ(360deg) rotateY(360deg);
            opacity: 0;
          }
        }

        @keyframes swayPetal {
          0% {
            transform: rotateX(0deg) rotateZ(-25deg) translateX(-18px);
          }
          100% {
            transform: rotateX(180deg) rotateZ(25deg) translateX(18px);
          }
        }

        @keyframes risingBubble {
          0% {
            transform: translate3d(0, 20px, 0) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 0.85;
          }
          85% {
            opacity: 0.75;
          }
          100% {
            transform: translate3d(0, -105vh, 0) scale(1.15);
            opacity: 0;
          }
        }

        @keyframes wobbleBubble {
          0% {
            transform: translateX(-12px) rotate(-6deg);
          }
          100% {
            transform: translateX(12px) rotate(6deg);
          }
        }
      `}</style>
    </div>
  );
}
