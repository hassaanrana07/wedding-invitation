import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Volume1, Play, Pause, Music, Sliders } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';

export default function MusicPlayer() {
  const { musicTrack, isPlaying, isMuted, volume, setVolume, togglePlay, toggleMute } = useWedding();
  const [showControls, setShowControls] = useState(false);

  if (!musicTrack || !musicTrack.is_active) return null;

  return (
    <>
      {/* Backdrop to dismiss controls flyout on outside tap */}
      {showControls && (
        <div
          className="fixed inset-0 z-30 pointer-events-auto"
          onClick={() => setShowControls(false)}
        />
      )}

      <div className="fixed bottom-3 left-3 sm:bottom-6 sm:left-6 z-40 flex items-center gap-2 select-none max-w-[calc(100vw-1.5rem)]">
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-14 left-0 flex flex-col rounded-2xl bg-[#FFFDF9]/98 backdrop-blur-md border border-[#C5A059]/40 p-3 text-xs shadow-2xl space-y-2.5 w-[240px] max-w-[calc(100vw-2rem)] z-50"
            >
              <div className="flex items-center justify-between gap-2 border-b border-[#EAE0D2] pb-1.5 min-w-0">
                <span className="font-serif font-bold text-[#1B382B] flex items-center gap-1.5 truncate min-w-0 text-sm">
                  <Music className="w-4 h-4 text-[#B89047] shrink-0" />
                  <span className="truncate">{musicTrack.title || 'Wedding Melody'}</span>
                </span>
                {musicTrack.artist && (
                  <span className="text-xs text-[#756A5E] truncate shrink-0 max-w-[110px]">{musicTrack.artist}</span>
                )}
              </div>

              {/* Volume Slider Control */}
              <div className="flex items-center gap-2 pt-0.5">
                <button
                  onClick={toggleMute}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-[#1B382B] hover:text-[#B89047] hover:bg-[#F5EFE6] transition-colors cursor-pointer shrink-0 touch-manipulation"
                  title={isMuted ? 'Unmute' : 'Mute'}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-[#A63A3A]" />
                  ) : volume < 0.5 ? (
                    <Volume1 className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#E8DEC9] rounded-lg appearance-none cursor-pointer accent-[#1B382B] touch-manipulation"
                  aria-label="Volume level"
                />

                <span className="text-xs font-mono text-[#756A5E] w-8 text-right shrink-0">
                  {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Controller Pill */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#C5A059]/50 bg-[#FFFDF9]/95 backdrop-blur-md p-1.5 pl-2.5 sm:pl-3 shadow-[0_8px_25px_rgba(27,56,43,0.1)] shrink-0"
        >
          {/* Animated Sound Wave Bars */}
          <div
            className="flex items-center gap-0.5 sm:gap-1 h-5 px-1 cursor-pointer shrink-0"
            onClick={togglePlay}
            title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
          >
            {[0.2, 0.4, 0.6, 0.3, 0.5].map((delay, idx) => (
              <span
                key={idx}
                className={`w-0.5 rounded-full transition-all ${
                  isPlaying && !isMuted && volume > 0 ? 'bg-[#1B382B] sound-bar' : 'h-1 bg-[#C5A059]/50'
                }`}
                style={{
                  animationDelay: `${delay}s`,
                  height: isPlaying && !isMuted && volume > 0 ? undefined : '4px',
                }}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1B382B] text-[#FAF8F5] hover:bg-[#254A39] transition-colors cursor-pointer shadow-sm shrink-0 touch-manipulation"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          {/* Toggle Volume Controls Flyout */}
          <button
            onClick={() => setShowControls(!showControls)}
            aria-label="Audio settings"
            className="h-8 w-8 flex items-center justify-center rounded-full text-[#5D5347] hover:text-[#1B382B] hover:bg-[#F5EFE6] transition-colors cursor-pointer shrink-0 touch-manipulation"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* Powered by Netlify Branding Badge on Left Side */}
        <a
          href="https://www.netlify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C5A059]/40 bg-[#FFFDF9]/95 backdrop-blur-md text-xs text-[#756A5E] hover:text-[#1B382B] transition-all shadow-[0_8px_25px_rgba(27,56,43,0.06)] shrink-0"
          title="Deployed with Netlify"
        >
          <span className="font-sans font-medium">Powered by</span>
          <span className="font-bold text-[#00AD9F]">Netlify</span>
        </a>
      </div>
    </>
  );
}
