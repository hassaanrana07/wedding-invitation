import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, Sparkles, MapPin, Clock } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import ImageWithFallback from '../ui/ImageWithFallback';
import RoyalMonogramSeal from '../ui/RoyalMonogramSeal';

export default function HeroSection() {
  const { wedding } = useWedding();
  const [currentDateFormatted, setCurrentDateFormatted] = useState('');

  // Dynamically calculate visitor's current date in local timezone
  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setCurrentDateFormatted(formatted);
  }, []);

  // Verified Wedding Date & City from configuration
  const formattedWeddingDate = wedding.wedding_date
    ? new Date(wedding.wedding_date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Saturday, March 27, 2027';

  const weddingCity = wedding.wedding_city || 'Lahore, Pakistan';

  const scrollToNext = () => {
    const el = document.getElementById('countdown-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[95vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0C0F14]">
      {/* Background Image with Slow Ambient Zoom & Backdrop Vignette */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <ImageWithFallback
          src={wedding.hero_image_url || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85'}
          alt="Wedding Backdrop"
          className="h-full w-full object-cover object-center brightness-[0.32]"
          containerClassName="w-full h-full"
          loading="eager"
        />
        {/* Soft Multi-Layer Royal Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F14] via-[#0C0F14]/70 to-[#0C0F14]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0C0F14] pointer-events-none" />
      </motion.div>

      {/* Ambient Radial Golden Glows */}
      <div className="ambient-glow w-[550px] h-[550px] bg-gold-500/15 top-1/3 left-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="ambient-glow w-72 h-72 bg-emerald-deep/30 bottom-10 left-10 pointer-events-none" />

      {/* Subtle Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
          className="absolute top-1/4 left-8 text-gold-400/25 text-2xl hidden md:block"
        >
          ✦
        </motion.div>
        <motion.div
          animate={{ y: [12, -12, 12], rotate: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 8.5, ease: 'easeInOut' }}
          className="absolute bottom-1/3 right-10 text-gold-400/25 text-xl hidden md:block"
        >
          ✦
        </motion.div>
      </div>

      {/* Hero Central Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 py-20 sm:py-24 text-center flex flex-col items-center">
        {/* Requirement 6: Dynamic Current Date Pill */}
        {currentDateFormatted && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-gold-500/30 text-gold-300 text-[11px] sm:text-xs font-mono tracking-wider backdrop-blur-md shadow-lg"
          >
            <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>Today: {currentDateFormatted}</span>
          </motion.div>
        )}

        {/* Bismillah Opening Calligraphy */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-lg sm:text-2xl tracking-[0.2em] text-gold-200/90 mb-2 drop-shadow"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </motion.p>

        {/* Authentic Quranic Verse at the Beginning of the Wedding Invitation */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="my-3 max-w-2xl px-5 py-4 rounded-2xl border border-gold-400/35 bg-black/60 backdrop-blur-md shadow-xl text-center"
        >
          <p
            dir="rtl"
            lang="ar"
            className="font-serif text-lg sm:text-2xl text-gold-200 leading-relaxed tracking-wide drop-shadow mb-2 font-medium"
          >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <p className="font-serif text-xs sm:text-sm text-cream-200/95 italic max-w-lg mx-auto leading-relaxed">
            "And among His signs is that He created for you from yourselves spouses so that you may find tranquility in them; and He placed between you affection and mercy."
          </p>
          <p className="text-[11px] font-cinzel tracking-widest text-gold-400/90 mt-2 uppercase font-semibold">
            Surah Ar-Rum — Surah 30, Ayah 21
          </p>
        </motion.div>

        {/* Monogram Seal Badge with RoyalMonogramSeal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="my-2"
        >
          <RoyalMonogramSeal size={48} glow={true} />
        </motion.div>

        {/* Royal RIHA Logo Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mb-1"
        >
          <span className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.25em] gold-text-gradient block drop-shadow-2xl">
            {wedding.app_title || 'RIHA'}
          </span>
        </motion.div>

        {/* Decorative Arabesque Filigree Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="flex items-center justify-center gap-3 my-3 w-48 sm:w-72"
        >
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-400/60 to-gold-400" />
          <span className="text-gold-400 text-xs">❖</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-400/60 to-gold-400" />
        </motion.div>

        {/* Couple Names */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-gold-light tracking-wide drop-shadow-lg"
        >
          {wedding.couple_title || 'Rida & Harish'}
        </motion.h2>

        {/* Warm Formal Invitation Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="my-5 max-w-2xl px-2"
        >
          <p className="font-serif text-base sm:text-xl text-cream-200/95 italic mb-2.5 font-light">
            "{wedding.hero_headline || 'Together with their families'}"
          </p>
          <p className="text-xs sm:text-sm md:text-base text-cream-300/80 font-light leading-relaxed">
            {wedding.invitation_message ||
              'Warmly invite you to celebrate the joyous union of our wedding ceremonies and grace us with your prayers and presence.'}
          </p>
        </motion.div>

        {/* Requirement 7: Explicit Wedding Date & Location Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-2 w-full max-w-lg"
        >
          {/* Wedding Date Card */}
          <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl border border-gold-400/40 bg-gold-950/50 backdrop-blur-md text-gold-200 text-xs sm:text-sm tracking-wide shadow-lg shadow-gold-900/30">
            <Calendar className="w-4 h-4 text-gold-400 shrink-0" />
            <span>
              <strong className="font-semibold text-gold-300">Wedding Date:</strong> {formattedWeddingDate}
            </span>
          </div>

          {/* Location / City Card */}
          <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl border border-gold-400/40 bg-black/60 backdrop-blur-md text-gold-300 text-xs sm:text-sm tracking-wide shadow-lg shadow-gold-900/20">
            <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
            <span>
              <strong className="font-semibold text-gold-200">Location:</strong> {weddingCity}
            </span>
          </div>
        </motion.div>

        {/* Smooth Scroll Indicator Button */}
        <motion.button
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 sm:mt-16 flex flex-col items-center gap-1.5 text-xs text-gold-400/80 hover:text-gold-200 transition-colors cursor-pointer group"
          aria-label="Scroll down to wedding countdown and ceremonies"
        >
          <span className="tracking-[0.25em] uppercase font-cinzel text-[10px] text-gold-400/70 group-hover:text-gold-300">
            Countdown & Ceremonies
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-gold-400" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
