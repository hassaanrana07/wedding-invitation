import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { weddingData } from '../data/weddingData';

const WeddingContext = createContext(null);

export function WeddingProvider({ children }) {
  const [wedding, setWedding] = useState(weddingData.settings);
  const [theme, setTheme] = useState(weddingData.theme);
  const [specialGuests, setSpecialGuests] = useState(weddingData.specialGuests);
  const [musicTrack, setMusicTrack] = useState(weddingData.music);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem('riha_music_muted') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [volume, setVolumeState] = useState(0.65);
  const [hasEnteredInvitation, setHasEnteredInvitation] = useState(() => {
    try {
      return localStorage.getItem('riha_scratch_completed') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [loading, setLoading] = useState(false);

  const audioRef = useRef(null);
  const currentUrlRef = useRef('');

  // Audio lifecycle - initialize single audio instance
  useEffect(() => {
    if (musicTrack?.file_url) {
      if (!audioRef.current) {
        const audio = new Audio(musicTrack.file_url);
        audio.loop = true;
        audio.volume = isMuted ? 0 : volume;
        audio.muted = isMuted;
        audio.onplay = () => setIsPlaying(true);
        audio.onpause = () => setIsPlaying(false);
        audio.onended = () => setIsPlaying(false);
        audioRef.current = audio;
        currentUrlRef.current = musicTrack.file_url;
      } else if (currentUrlRef.current !== musicTrack.file_url) {
        currentUrlRef.current = musicTrack.file_url;
        audioRef.current.src = musicTrack.file_url;
      }
    }
  }, [musicTrack?.file_url]);

  const setVolume = (val) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
      if (clamped === 0) {
        audioRef.current.muted = true;
        setIsMuted(true);
        try { localStorage.setItem('riha_music_muted', 'true'); } catch (e) {}
      } else if (isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
        try { localStorage.setItem('riha_music_muted', 'false'); } catch (e) {}
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current && musicTrack?.file_url) {
      const audio = new Audio(musicTrack.file_url);
      audio.loop = true;
      audio.volume = isMuted ? 0 : volume;
      audio.muted = isMuted;
      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      audioRef.current = audio;
      currentUrlRef.current = musicTrack.file_url;
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.muted = false;
      setIsMuted(false);
      try { localStorage.setItem('riha_music_muted', 'false'); } catch (e) {}
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((e) => console.log('Audio play interrupted or waiting for gesture:', e));
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    try { localStorage.setItem('riha_music_muted', String(nextMuted)); } catch (e) {}
    audioRef.current.muted = nextMuted;
    if (!nextMuted && audioRef.current.paused && hasEnteredInvitation) {
      audioRef.current.play().catch(() => {});
    }
  };

  // Called directly on user invitation clicks (open curtains, scratch, enter celebration)
  const unlockAndPlayAudio = () => {
    setHasEnteredInvitation(true);
    if (!audioRef.current && musicTrack?.file_url) {
      const audio = new Audio(musicTrack.file_url);
      audio.loop = true;
      audio.volume = isMuted ? 0 : volume;
      audio.muted = isMuted;
      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      audioRef.current = audio;
      currentUrlRef.current = musicTrack.file_url;
    }

    if (audioRef.current && musicTrack?.is_active && !isMuted) {
      if (audioRef.current.paused) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch((e) => {
              console.log('Audio autoplay policy note: will resume on next user gesture', e);
            });
        }
      }
    }
  };

  const playCustomTrack = (url, title = 'Event Theme') => {
    if (!url) return;
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const customAudio = new Audio(url);
    customAudio.loop = true;
    customAudio.volume = volume;
    audioRef.current = customAudio;
    customAudio.onplay = () => setIsPlaying(true);
    customAudio.onpause = () => setIsPlaying(false);
    customAudio.play().catch((e) => console.log('Custom audio error:', e));
  };

  const resetToGlobalMusic = () => {
    if (musicTrack?.file_url) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(musicTrack.file_url);
      audio.loop = true;
      audio.volume = volume;
      audioRef.current = audio;
      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      if (hasEnteredInvitation && musicTrack.is_active) {
        audio.play().catch((e) => console.log('Reset audio error:', e));
      }
    }
  };

  return (
    <WeddingContext.Provider
      value={{
        wedding,
        theme,
        specialGuests,
        musicTrack,
        isPlaying,
        isMuted,
        volume,
        setVolume,
        hasEnteredInvitation,
        loading,
        togglePlay,
        toggleMute,
        unlockAndPlayAudio,
        playCustomTrack,
        resetToGlobalMusic,
      }}
    >
      {children}
    </WeddingContext.Provider>
  );
}

export function useWedding() {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
}
