import React, { useState, useEffect } from 'react';

// Elegant embedded SVG fallback placeholder for luxury wedding theme
const DEFAULT_FALLBACK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none"><rect width="600" height="400" fill="%230F251E"/><path d="M300 120 L330 170 L390 180 L345 220 L355 280 L300 250 L245 280 L255 220 L210 180 L270 170 Z" stroke="%23D4AF37" stroke-width="1.5" fill="none" opacity="0.4"/><circle cx="300" cy="200" r="110" stroke="%23D4AF37" stroke-dasharray="4 4" stroke-width="1" opacity="0.5"/><text x="300" y="208" text-anchor="middle" fill="%23D4AF37" font-family="serif" font-size="22" letter-spacing="4" font-style="italic">RIHA</text><text x="300" y="234" text-anchor="middle" fill="%23E6D5B8" font-family="sans-serif" font-size="10" letter-spacing="3" opacity="0.75">RIDA &amp; HARISH</text></svg>`;

export default function ImageWithFallback({
  src,
  alt = 'Wedding celebration',
  className = '',
  fallbackSrc = null,
  aspectRatio,
  containerClassName = '',
  loading = 'lazy',
  onClick,
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc || DEFAULT_FALLBACK_SVG);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (src) {
      setImgSrc(src);
      setHasError(false);
      setIsLoading(true);
    } else if (fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(false);
      setIsLoading(false);
    } else {
      setImgSrc(DEFAULT_FALLBACK_SVG);
      setHasError(true);
      setIsLoading(false);
    }
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      if (fallbackSrc && imgSrc !== fallbackSrc) {
        setImgSrc(fallbackSrc);
      } else {
        setImgSrc(DEFAULT_FALLBACK_SVG);
      }
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
      onClick={onClick}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-emerald-950/40 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        {...props}
      />
    </div>
  );
}
