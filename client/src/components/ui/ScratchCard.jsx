import React, { useEffect, useRef, useCallback } from 'react';

/**
 * Generates the Path2D heart shape scaled to width & height.
 * Proportions:
 * - Upper cleft / cusp at (0.5 * w, 0.24 * h)
 * - Top lobes peak at (0.25 * w, 0.08 * h) and (0.75 * w, 0.08 * h)
 * - Left & right outer lobes extend to 0.05 * w and 0.95 * w
 * - Bottom tip at (0.5 * w, 0.92 * h)
 */
export function getHeartPath(width, height) {
  const p = new Path2D();
  const w = width;
  const h = height;
  p.moveTo(0.5 * w, 0.24 * h);
  p.bezierCurveTo(0.46 * w, 0.14 * h, 0.36 * w, 0.08 * h, 0.25 * w, 0.08 * h);
  p.bezierCurveTo(0.12 * w, 0.08 * h, 0.05 * w, 0.18 * h, 0.05 * w, 0.32 * h);
  p.bezierCurveTo(0.05 * w, 0.51 * h, 0.24 * w, 0.70 * h, 0.5 * w, 0.92 * h);
  p.bezierCurveTo(0.76 * w, 0.70 * h, 0.95 * w, 0.51 * h, 0.95 * w, 0.32 * h);
  p.bezierCurveTo(0.95 * w, 0.18 * h, 0.88 * w, 0.08 * h, 0.75 * w, 0.08 * h);
  p.bezierCurveTo(0.64 * w, 0.08 * h, 0.54 * w, 0.14 * h, 0.5 * w, 0.24 * h);
  p.closePath();
  return p;
}

/**
 * Luxury Heart-Shaped ScratchCard Component
 *
 * Guarantees:
 * 1. Recognizable, centered HEART silhouette on desktop & mobile.
 * 2. Strict boundary: Canvas gold foil and scratches are clipped exclusively to the heart path.
 * 3. Scratching outside the heart boundary registers NO effect.
 * 4. Omni-directional: Scratches work starting from top lobes, bottom tip, center, or edges.
 * 5. Persistent scratch layer: Scratched areas NEVER revert or re-cover.
 * 6. High-DPI support: Crystal-clear rendering on Retina/mobile displays.
 * 7. Inscribed heart sampling: Clear percentage sampled ONLY inside the heart shape.
 */
export default function ScratchCard({
  underneathContent,
  onComplete,
  onProgress,
  onFirstInteraction,
  threshold = 76, // Configurable threshold (72% - 80% range)
  disabled = false,
  className = '',
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Interaction tracking state (kept strictly in refs to prevent React re-render stutter)
  const isDrawingRef = useRef(false);
  const activePointerIdRef = useRef(null);
  const lastPointRef = useRef(null);
  const lastSampleTimeRef = useRef(0);
  const isInitializedRef = useRef(false);
  const isCompletedRef = useRef(false);
  const lastDimensionsRef = useRef({ width: 0, height: 0 });

  // Draw luxurious gold foil cover onto canvas inside the heart silhouette
  const drawGoldCover = useCallback((canvas) => {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const dpr = canvas.width / (canvas.getBoundingClientRect().width || 1);
    const heartPath = getHeartPath(width, height);

    ctx.save();
    ctx.clearRect(0, 0, width, height);

    // Clip exclusively to the heart silhouette
    ctx.save();
    ctx.clip(heartPath);

    // 1. Luxurious Textured Sage-Green Heart Gradient
    const grad = ctx.createRadialGradient(cx, cy * 0.85, width * 0.05, cx, cy * 0.92, width * 0.58);
    grad.addColorStop(0, '#829A84');   // Soft warm sage highlight
    grad.addColorStop(0.28, '#637C66'); // Muted sage green
    grad.addColorStop(0.65, '#455C48'); // Deep velvety sage
    grad.addColorStop(0.92, '#314434'); // Rich forest-sage contour
    grad.addColorStop(1, '#233226');    // Shadow edge
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Velvet Fabric Weave Texture (subtle stipple pattern)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let x = 0; x < width; x += 4 * dpr) {
      for (let y = 0; y < height; y += 4 * dpr) {
        if ((x + y) % (8 * Math.round(dpr)) === 0 && ctx.isPointInPath(heartPath, x, y)) {
          ctx.fillRect(x, y, 1.5 * dpr, 1.5 * dpr);
        }
      }
    }

    // 3. Luxury Golden & Pearl Stardust Particles
    for (let i = 0; i < 90; i++) {
      const angle = (i * 137.5) * (Math.PI / 180);
      const r = Math.sqrt(i / 90) * (width * 0.42);
      const rx = cx + r * Math.cos(angle);
      const ry = cy + r * Math.sin(angle) * 0.92;
      if (ctx.isPointInPath(heartPath, rx, ry)) {
        const isGold = i % 2 === 0;
        ctx.fillStyle = isGold ? 'rgba(247, 230, 189, 0.65)' : 'rgba(255, 255, 255, 0.5)';
        const rSize = ((i % 3) + 0.8) * dpr * 0.8;
        ctx.beginPath();
        ctx.arc(rx, ry, rSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 4. Ornate Inner Gold Filigree Outline
    ctx.save();
    ctx.translate(cx, cy * 0.96);
    ctx.scale(0.93, 0.93);
    ctx.translate(-cx, -cy * 0.96);
    ctx.strokeStyle = 'rgba(229, 199, 122, 0.75)';
    ctx.lineWidth = 2.2 * dpr;
    ctx.stroke(heartPath);

    ctx.scale(0.965, 0.965);
    ctx.strokeStyle = 'rgba(255, 248, 230, 0.85)';
    ctx.lineWidth = 1.2 * dpr;
    ctx.setLineDash([4 * dpr, 4 * dpr]);
    ctx.stroke(heartPath);
    ctx.restore();

    // 5. Center Scratch Prompt Typography (Champagne Gold over Sage Green)
    ctx.fillStyle = '#E5C77A';
    ctx.font = `600 ${10.5 * dpr}px 'Bodoni Moda', 'Cinzel', serif`;
    ctx.textAlign = 'center';
    ctx.fillText('✦ ROYAL INVITATION ✦', cx, cy - 24 * dpr);

    // Calligraphic "Scratch to Reveal"
    ctx.fillStyle = '#FFFDF7';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 6 * dpr;
    ctx.font = `normal ${24 * dpr}px 'Great Vibes', cursive`;
    ctx.fillText('Scratch to Reveal', cx, cy + 8 * dpr);
    ctx.shadowBlur = 0; // reset shadow

    ctx.fillStyle = '#EAD7A5';
    ctx.font = `italic ${11.5 * dpr}px 'Cormorant Garamond', serif`;
    ctx.fillText('Swipe or drag across heart', cx, cy + 30 * dpr);

    ctx.restore(); // unclip heart
    ctx.restore();
  }, []);

  // Compute percentage of inscribed heart area cleared
  const sampleScratchProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isCompletedRef.current) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const heartPath = getHeartPath(width, height);

    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      let clearPixels = 0;
      let totalInHeart = 0;
      const step = Math.max(6, Math.floor(width / 45));

      const startY = Math.floor(height * 0.08);
      const endY = Math.floor(height * 0.93);
      const startX = Math.floor(width * 0.05);
      const endX = Math.floor(width * 0.95);

      for (let y = startY; y < endY; y += step) {
        for (let x = startX; x < endX; x += step) {
          if (ctx.isPointInPath(heartPath, x, y)) {
            totalInHeart++;
            const idx = (y * width + x) * 4 + 3; // alpha channel
            if (data[idx] <= 30) {
              clearPixels++;
            }
          }
        }
      }

      if (totalInHeart > 0) {
        const percent = Math.round((clearPixels / totalInHeart) * 100);
        if (onProgress) onProgress(percent);

        if (percent >= threshold && !isCompletedRef.current) {
          isCompletedRef.current = true;
          if (onComplete) onComplete();
        }
      }
    } catch (e) {
      console.warn('Scratch progress sample error:', e);
    }
  }, [threshold, onProgress, onComplete]);

  // Initial Canvas Setup (happens once on mount; never re-wipes existing scratches)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const pixelWidth = Math.round(rect.width * dpr);
    const pixelHeight = Math.round(rect.height * dpr);

    if (!isInitializedRef.current) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      drawGoldCover(canvas);
      isInitializedRef.current = true;
      lastDimensionsRef.current = { width: rect.width, height: rect.height };
    }
  }, [drawGoldCover]);

  // Handle Resize: Preserves previously cleared scratch mask
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas || !isInitializedRef.current || isCompletedRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const prev = lastDimensionsRef.current;

      // Ignore trivial mobile URL bar shifts (< 4px change)
      if (Math.abs(rect.width - prev.width) < 4 && Math.abs(rect.height - prev.height) < 4) {
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const newWidth = Math.round(rect.width * dpr);
      const newHeight = Math.round(rect.height * dpr);

      // Save existing scratched canvas onto temporary offscreen canvas
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.drawImage(canvas, 0, 0);

        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, newWidth, newHeight);
        }
      }

      lastDimensionsRef.current = { width: rect.width, height: rect.height };
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Native DOM pointer event listeners directly on canvas with { passive: false }
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getCanvasCoords = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const getDpr = () => canvas.width / (canvas.getBoundingClientRect().width || 1);

    const onPointerDown = (e) => {
      if (disabled || isCompletedRef.current) return;
      if (e.button !== undefined && e.button !== 0) return; // Only primary mouse button

      // Multi-touch guard: Ignore subsequent touch points while drawing
      if (activePointerIdRef.current !== null) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const pt = getCanvasCoords(e);
      const heartPath = getHeartPath(canvas.width, canvas.height);

      // Boundary Check: Scratching outside heart boundary has NO effect
      if (!ctx.isPointInPath(heartPath, pt.x, pt.y)) {
        return;
      }

      activePointerIdRef.current = e.pointerId;
      e.preventDefault();
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch (err) {}

      isDrawingRef.current = true;
      if (onFirstInteraction) onFirstInteraction();

      const dpr = getDpr();
      const rect = canvas.getBoundingClientRect();
      // Generous, natural finger brush size: ~48px in CSS pixels
      const brushWidth = Math.round(Math.max(46, rect.width * 0.13) * dpr);

      // Draw initial solid circle at touch point clipped strictly to heart
      ctx.save();
      ctx.clip(heartPath);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, brushWidth / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      lastPointRef.current = pt;
    };

    const onPointerMove = (e) => {
      if (!isDrawingRef.current || isCompletedRef.current) return;
      if (e.pointerId !== activePointerIdRef.current) return;

      e.preventDefault();
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = getDpr();
      const rect = canvas.getBoundingClientRect();
      const brushWidth = Math.round(Math.max(46, rect.width * 0.13) * dpr);
      const currentPt = getCanvasCoords(e);
      const heartPath = getHeartPath(canvas.width, canvas.height);

      ctx.save();
      ctx.clip(heartPath); // Strictly prevents clearing outside the heart boundary
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = brushWidth;
      ctx.strokeStyle = '#000000';

      ctx.beginPath();
      if (lastPointRef.current) {
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(currentPt.x, currentPt.y);
      } else {
        ctx.arc(currentPt.x, currentPt.y, brushWidth / 2, 0, Math.PI * 2);
      }
      ctx.stroke();
      ctx.restore();

      lastPointRef.current = currentPt;

      // Sample progress throttled to every 180ms
      const now = Date.now();
      if (now - lastSampleTimeRef.current > 180) {
        lastSampleTimeRef.current = now;
        sampleScratchProgress();
      }
    };

    const onPointerUp = (e) => {
      if (e.pointerId !== activePointerIdRef.current) return;

      if (canvas && e?.pointerId !== undefined) {
        try {
          if (canvas.hasPointerCapture(e.pointerId)) {
            canvas.releasePointerCapture(e.pointerId);
          }
        } catch (err) {}
      }

      isDrawingRef.current = false;
      lastPointRef.current = null;
      activePointerIdRef.current = null;

      if (!isCompletedRef.current) {
        sampleScratchProgress();
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown, { passive: false });
    canvas.addEventListener('pointermove', onPointerMove, { passive: false });
    canvas.addEventListener('pointerup', onPointerUp, { passive: false });
    canvas.addEventListener('pointercancel', onPointerUp, { passive: false });
    canvas.addEventListener('lostpointercapture', onPointerUp, { passive: false });

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('lostpointercapture', onPointerUp);
    };
  }, [disabled, sampleScratchProgress, onFirstInteraction]);

  return (
    <div
      ref={containerRef}
      className={`relative w-[340px] h-[340px] sm:w-[390px] sm:h-[390px] md:w-[420px] md:h-[420px] max-w-[88vw] max-h-[88vw] aspect-square flex items-center justify-center select-none touch-none filter drop-shadow-[0_15px_35px_rgba(27,56,43,0.18)] ${className}`}
      style={{ touchAction: 'none', WebkitTouchCallout: 'none', userSelect: 'none' }}
    >
      {/* SVG Defs for Heart Clip Path & Gold Gradients */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="wedding-heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5 0.24 C 0.46 0.14, 0.36 0.08, 0.25 0.08 C 0.12 0.08, 0.05 0.18, 0.05 0.32 C 0.05 0.51, 0.24 0.70, 0.5 0.92 C 0.76 0.70, 0.95 0.51, 0.95 0.32 C 0.95 0.18, 0.88 0.08, 0.75 0.08 C 0.64 0.08, 0.54 0.14, 0.5 0.24 Z" />
          </clipPath>
          <linearGradient id="heartGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D0" />
            <stop offset="25%" stopColor="#E5C77A" />
            <stop offset="50%" stopColor="#F7E6BD" />
            <stop offset="75%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#8C692B" />
          </linearGradient>
        </defs>
      </svg>

      {/* UNDERNEATH LAYER: Heart-shaped card revealed beneath the scratch surface */}
      <div
        className="absolute inset-0 bg-[#FFFDF9] flex flex-col items-center justify-center text-center p-6 sm:p-8 overflow-hidden pointer-events-none select-none z-10"
        style={{
          clipPath: 'url(#wedding-heart-clip)',
          WebkitClipPath: 'url(#wedding-heart-clip)',
        }}
      >
        {underneathContent}
      </div>

      {/* TOP LAYER: Canvas Scratch Surface with Heart Clip-Path */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-20 cursor-crosshair touch-none select-none"
        style={{
          clipPath: 'url(#wedding-heart-clip)',
          WebkitClipPath: 'url(#wedding-heart-clip)',
          touchAction: 'none',
          WebkitTouchCallout: 'none',
          userSelect: 'none',
        }}
      />

      {/* ORNATE GOLD HEART FRAME OVERLAY */}
      <svg
        viewBox="0 0 1000 1000"
        className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
      >
        {/* Outer Heavy Ornate Heart Stroke */}
        <path
          d="M 500 240 C 460 140, 360 80, 250 80 C 120 80, 50 180, 50 320 C 50 510, 240 700, 500 920 C 760 700, 950 510, 950 320 C 950 180, 880 80, 750 80 C 640 80, 540 140, 500 240 Z"
          fill="none"
          stroke="url(#heartGoldGrad)"
          strokeWidth="12"
        />
        {/* Inner Delicate Dashed Accent Rim */}
        <path
          d="M 500 240 C 460 140, 360 80, 250 80 C 120 80, 50 180, 50 320 C 50 510, 240 700, 500 920 C 760 700, 950 510, 950 320 C 950 180, 880 80, 750 80 C 640 80, 540 140, 500 240 Z"
          transform="scale(0.96) translate(20, 20)"
          fill="none"
          stroke="#FAF8F5"
          strokeWidth="2.5"
          strokeDasharray="8 8"
          opacity="0.85"
        />
        {/* Top Cusp Gold Star Emblem */}
        <circle cx="500" cy="240" r="5" fill="#8C692B" />
        <circle cx="500" cy="240" r="3" fill="#FFF4D0" />
        {/* Bottom Tip Gold Star Emblem */}
        <circle cx="500" cy="920" r="5" fill="#8C692B" />
        <circle cx="500" cy="920" r="3" fill="#FFF4D0" />
      </svg>
    </div>
  );
}
