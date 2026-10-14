import React, { useEffect, useRef, useCallback } from 'react';

/**
 * Luxury Circular ScratchCard Component
 * 
 * Technical guarantees:
 * 1. Persistent scratch layer: Scratched areas NEVER revert or get covered again.
 * 2. Omni-directional: Scratching works from top, bottom, center, left, right, and all corners.
 * 3. Continuous vector stroke: Uses destination-out with round lineCap/lineJoin (no bubbles or gaps).
 * 4. Multi-touch safe: Tracks single active pointerId with pointer capture.
 * 5. Mobile-proof: touchAction: 'none' and e.preventDefault() prevent mobile scroll cancellation.
 * 6. High-DPI support: Sharp rendering on Retina/mobile screens with canvas scaling.
 * 7. Inscribed circle sampling: Accurately checks cleared percentage against a 65%-75% threshold.
 */
export default function ScratchCard({
  underneathContent,
  onComplete,
  onProgress,
  onFirstInteraction,
  threshold = 68, // Configurable threshold (65% - 75% range)
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

  // Draw luxurious gold foil cover onto canvas
  const drawGoldCover = useCallback((canvas) => {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2;
    const cx = width / 2;
    const cy = height / 2;
    const dpr = canvas.width / (canvas.getBoundingClientRect().width || 1);

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

  // Compute percentage of inscribed circular area cleared
  const sampleScratchProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isCompletedRef.current) return;
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
            const idx = (y * width + x) * 4 + 3; // alpha channel
            if (data[idx] <= 30) {
              clearPixels++;
            }
          }
        }
      }

      if (totalInCircle > 0) {
        const percent = Math.round((clearPixels / totalInCircle) * 100);
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
      activePointerIdRef.current = e.pointerId;

      e.preventDefault();
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch (err) {}

      isDrawingRef.current = true;
      if (onFirstInteraction) onFirstInteraction();

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = getDpr();
      const rect = canvas.getBoundingClientRect();
      // Generous, natural finger brush size: ~48px in CSS pixels
      const brushWidth = Math.round(Math.max(44, rect.width * 0.125) * dpr);
      const pt = getCanvasCoords(e);

      // Draw initial solid circle at touch point
      ctx.save();
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
      const brushWidth = Math.round(Math.max(44, rect.width * 0.125) * dpr);
      const currentPt = getCanvasCoords(e);

      ctx.save();
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
      className={`relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[410px] md:h-[410px] max-w-[85vw] max-h-[85vw] aspect-square rounded-full border-4 border-[#C5A059] p-2 bg-[#FAF8F5] shadow-[0_15px_50px_rgba(27,56,43,0.14)] overflow-hidden select-none touch-none ${className}`}
      style={{ touchAction: 'none', WebkitTouchCallout: 'none', userSelect: 'none' }}
    >
      {/* UNDERNEATH LAYER: Always revealed beneath the scratch surface */}
      <div className="absolute inset-2 rounded-full bg-[#FFFDF9] flex flex-col items-center justify-center p-6 text-center border-2 border-[#C5A059]/40 overflow-hidden pointer-events-none select-none">
        {underneathContent}
      </div>

      {/* TOP LAYER: Canvas Scratch Surface */}
      <canvas
        ref={canvasRef}
        className="absolute inset-2 rounded-full w-[calc(100%-16px)] h-[calc(100%-16px)] z-20 cursor-crosshair touch-none select-none"
        style={{
          touchAction: 'none',
          WebkitTouchCallout: 'none',
          userSelect: 'none',
        }}
      />
    </div>
  );
}
