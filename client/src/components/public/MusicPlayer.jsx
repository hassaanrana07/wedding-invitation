import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Volume1, Play, Pause, Music, Sliders } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';

export default function MusicPlayer() {
  const { musicTrack, isPlaying, isMuted, volume, setVolume, togglePlay, toggleMute } = useWedding();
  const [showControls, setShowControls] = useState(false);

  if (!musicTrack || !musicTrack.is_active) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="flex flex-col rounded-2xl bg-black/90 backdrop-blur-md border border-gold-500/30 p-3 text-xs shadow-2xl space-y-2 min-w-[200px]"
          >
            <div className="flex items-center justify-between gap-2 border-b border-gold-500/15 pb-1.5">
              <span className="font-serif font-bold text-gold-200 flex items-center gap-1.5 truncate">
                <Music className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span className="truncate">{musicTrack.title || 'Wedding Melody'}</span>
              </span>
              {musicTrack.artist && (
                <span className="text-[10px] text-cream-400/80 truncate shrink-0">{musicTrack.artist}</span>
              )}
            </div>

            {/* Volume Slider Control */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={toggleMute}
                className="text-gold-400 hover:text-gold-200 transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 text-rosewood-400" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-gold-950/80 rounded-lg appearance-none cursor-pointer accent-gold-400"
              />

              <span className="text-[10px] font-mono text-cream-400 w-7 text-right">
                {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Controller Pill */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 rounded-full border border-gold-400/40 bg-black/85 backdrop-blur-md p-2 pl-3 shadow-2xl shadow-gold-500/20"
      >
        {/* Animated Sound Wave Bars */}
        <div
          className="flex items-center gap-1 h-5 px-1 cursor-pointer"
          onClick={togglePlay}
          title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
        >
          {[0.2, 0.4, 0.6, 0.3, 0.5].map((delay, idx) => (
            <span
              key={idx}
              className={`w-0.5 rounded-full bg-gold-400 transition-all ${
                isPlaying && !isMuted && volume > 0 ? 'sound-bar' : 'h-1 bg-gold-600/50'
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
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/20 text-gold-300 hover:bg-gold-500 hover:text-black transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {/* Toggle Volume Controls Flyout */}
        <button
          onClick={() => setShowControls(!showControls)}
          aria-label="Volume settings"
          className="flex h-8 w-8 items-center justify-center rounded-full text-gold-400/70 hover:text-gold-200 transition-colors"
          title="Adjust Volume"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4 text-rosewood-400" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </motion.div>
    </div>
  );
}
