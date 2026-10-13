import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, ChevronDown, Sparkles, MapPin, Clock, Heart } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import ImageWithFallback from '../ui/ImageWithFallback';
import RoyalMonogramSeal from '../ui/RoyalMonogramSeal';
import {
  BotanicalCornerFlourish,
  BotanicalHeaderArch,
  FloralDivider,
  DelicateHeart,
  BotanicalFloralSprig,
} from '../ui/BotanicalOrnaments';

export default function HeroSection() {
  const { wedding } = useWedding();
  const [currentDateFormatted, setCurrentDateFormatted] = useState('');

  // 3D Parallax with Scroll
  const { scrollY } = useScroll();
  const yParallaxCard = useTransform(scrollY, [0, 600], [0, 75]);
  const yParallaxFloralLeft = useTransform(scrollY, [0, 600], [0, -45]);
  const yParallaxFloralRight = useTransform(scrollY, [0, 600], [0, -70]);
  const opacityFade = useTransform(scrollY, [0, 500], [1, 0.85]);

  // Visitor's local date
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

  const formattedWeddingDate = 'Saturday, 27 March 2027';
  const weddingCity = wedding.wedding_city || 'Lahore, Pakistan';

  const handleSaveTheDate = () => {
    const dateStr = wedding.wedding_date || '2027-03-27T19:00:00+05:00';
    const startDate = new Date(dateStr).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endDate = new Date(new Date(dateStr).getTime() + 4 * 3600 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, '');

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `Wedding of ${wedding.couple_title || 'Ahmed & Ayesha'}`
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      wedding.invitation_message || 'Wedding celebrations in Lahore, Pakistan'
    )}&location=${encodeURIComponent('The Nishat Grand Ballroom, Lahore, Pakistan')}`;

    window.open(googleCalendarUrl, '_blank');
  };

  const scrollToTimeline = () => {
    const el = document.getElementById('timeline') || document.getElementById('countdown-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="invitation"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#FAF8F5] pt-24 pb-16 px-4 sm:px-6 stage-3d"
    >
      {/* Background Soft Champagne Gradients & Botanical Watermark */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5EFE6]/60 via-[#FAF8F5] to-[#F5EFE6]/70 pointer-events-none" />
      <div className="absolute inset-0 botanical-dots opacity-40 pointer-events-none" />

      {/* Floating 3D Parallax Botanical Leaves on Left & Right */}
      <motion.div
        style={{ y: yParallaxFloralLeft }}
        className="absolute top-28 left-2 sm:left-10 pointer-events-none z-10 hidden md:block select-none"
      >
        <BotanicalFloralSprig size={84} className="opacity-80 rotate-12 animate-floral-sway" />
      </motion.div>

      <motion.div
        style={{ y: yParallaxFloralRight }}
        className="absolute bottom-28 right-2 sm:right-10 pointer-events-none z-10 hidden md:block select-none"
      >
        <BotanicalFloralSprig size={96} className="opacity-75 -rotate-45 animate-floral-sway" />
      </motion.div>

      {/* ============================================================== */}
      {/* REFERENCE A: THE WEDDING INVITATION CARD                         */}
      {/* ============================================================== */}
      <motion.div
        style={{ y: yParallaxCard, opacity: opacityFade }}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-2xl mx-auto rounded-[36px] bg-[#FFFDF9] border-2 border-[#C5A059]/40 shadow-[0_25px_70px_rgba(27,56,43,0.08),0_4px_16px_rgba(197,160,89,0.12)] p-7 sm:p-12 text-center overflow-hidden"
      >
        {/* Four Decorative Corner Botanical Flourishes */}
        <BotanicalCornerFlourish position="top-left" />
        <BotanicalCornerFlourish position="top-right" />
        <BotanicalCornerFlourish position="bottom-left" />
        <BotanicalCornerFlourish position="bottom-right" />

        {/* Inner Delicate Inset Gold Border */}
        <div className="absolute inset-3 sm:inset-4 rounded-[28px] border border-[#C5A059]/25 pointer-events-none" />

        {/* Top Header Arch Accent */}
        <BotanicalHeaderArch className="mb-2" />

        {/* Bismillah Opening Calligraphy in Deep Forest Green / Antique Gold */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <p
            dir="rtl"
            lang="ar"
            className="font-serif text-2xl sm:text-3xl text-[#1B382B] leading-relaxed tracking-wide font-normal"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="font-serif italic text-xs sm:text-sm text-[#756A5E] mt-0.5">
            "In the name of Allah, the Most Gracious, the Most Merciful"
          </p>
        </motion.div>

        {/* Royal Monogram Medallion */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="my-3 flex justify-center"
        >
          <RoyalMonogramSeal size={84} variant="ivory" glow={true} showSubtext={true} subtext="AH" />
        </motion.div>

        {/* "Together with their families" */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-3"
        >
          <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#756A5E] font-medium block">
            Together With Their Families
          </span>
          <span className="font-serif italic text-sm text-[#B89047] block mt-0.5">
            cordially invite you to celebrate the wedding of
          </span>
        </motion.div>

        {/* WEDDING NAMES IN CALLIGRAPHY TYPOGRAPHY (Reference A Focal Point) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="my-3 sm:my-5"
        >
          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-[#1B382B] leading-none tracking-normal drop-shadow-sm select-none">
            {wedding.couple_title || 'Ahmed & Ayesha'}
          </h1>
        </motion.div>

        {/* Delicate Heart & Botanical Filigree Divider */}
        <div className="flex items-center justify-center gap-2.5 my-3">
          <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-[#C5A059]" />
          <DelicateHeart size={16} className="text-[#C5A059]" />
          <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent via-[#C5A059]/40 to-[#C5A059]" />
        </div>

        {/* Wedding Date & Venue Line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-1.5 my-4"
        >
          <p className="font-cinzel text-xs sm:text-sm text-[#1B382B] font-semibold tracking-[0.2em] uppercase">
            {formattedWeddingDate}
          </p>
          <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-[#756A5E] font-serif italic">
            <MapPin className="w-3.5 h-3.5 text-[#B89047]" />
            <span>{weddingCity}</span>
          </div>
        </motion.div>

        {/* Action CTAs: Save The Date & Scroll Down */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 sm:mt-8 pt-4 border-t border-[#F0E6D8] flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={handleSaveTheDate}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1B382B] hover:bg-[#264E3D] text-[#FAF8F5] text-xs font-cinzel font-semibold tracking-wider uppercase shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5 text-[#EAD7A5]" />
            <span>Save The Date</span>
          </button>

          <button
            onClick={scrollToTimeline}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFFDF9] hover:bg-[#F5EFE6] text-[#1B382B] border border-[#C5A059]/60 text-xs font-cinzel font-semibold tracking-wider uppercase transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
          >
            <span>View Timeline</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#B89047]" />
          </button>
        </motion.div>

        {/* Top Quranic Verse Ar-Rum at Bottom of Invitation Card */}
        <div className="mt-6 pt-3 text-center border-t border-[#F5EFE6]">
          <p className="font-serif italic text-xs text-[#756A5E] max-w-lg mx-auto leading-relaxed">
            "And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts."
          </p>
          <span className="font-cinzel text-[10px] tracking-widest text-[#B89047] uppercase block mt-1">
            Surah Ar-Rum • 30:21
          </span>
        </div>
      </motion.div>
    </section>
  );
}
