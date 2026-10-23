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
  GardenFountainIllustration,
} from '../ui/BotanicalOrnaments';
import CurtainStageFrame from '../ui/CurtainStageFrame';

export default function HeroSection() {
  const { wedding } = useWedding();
  const [currentDateFormatted, setCurrentDateFormatted] = useState('');

  // 3D Parallax with Scroll
  const { scrollY } = useScroll();
  const yParallaxCard = useTransform(scrollY, [0, 600], [0, 60]);
  const yParallaxFloralLeft = useTransform(scrollY, [0, 600], [0, -45]);
  const yParallaxFloralRight = useTransform(scrollY, [0, 600], [0, -70]);
  const opacityFade = useTransform(scrollY, [0, 500], [1, 0.9]);

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

  const formattedWeddingDate = '12 & 13 December 2026';
  const weddingCity = wedding.wedding_city || 'Lahore, Pakistan';

  const handleSaveTheDate = () => {
    const dateStr = wedding.wedding_date || '2026-12-12T19:00:00+05:00';
    const startDate = new Date(dateStr).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endDate = new Date(new Date(dateStr).getTime() + 4 * 3600 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, '');

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `Wedding of ${wedding.couple_title || 'Laraib Ajmal & Mirza Talal Baig'}`
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      wedding.invitation_message || 'Wedding celebrations in Lahore, Pakistan'
    )}&location=${encodeURIComponent(weddingCity)}`;

    window.open(googleCalendarUrl, '_blank');
  };

  const scrollToTimeline = () => {
    const el = document.getElementById('events') || document.getElementById('timeline') || document.getElementById('countdown-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const brideName = wedding.bride_name || 'Laraib Ajmal';
  const brideParents = wedding.bride_parents || 'Muhammad Ajmal';
  const groomName = wedding.groom_name || 'Mirza Talal Baig';
  const groomParents = wedding.groom_parents || 'Mirza Shahzad Baig';

  return (
    <section
      id="invitation"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAF8F5] pt-20 sm:pt-28 pb-16 px-4 sm:px-6 stage-3d"
    >
      {/* Background Soft Champagne Gradients & Botanical Watermark */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5EFE6]/70 via-[#FAF8F5] to-[#F5EFE6]/70 pointer-events-none" />
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
      {/* REFERENCE 1: LUXURY INVITATION CARD WITH DRAPED VALANCE BORDER  */}
      {/* ============================================================== */}
      <motion.div
        style={{ y: yParallaxCard, opacity: opacityFade }}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-xl mx-auto"
      >
        <CurtainStageFrame>
          <div className="w-[62%] sm:w-[58%] h-full pt-[18%] sm:pt-[17%] pb-[35%] sm:pb-[26%] flex flex-col justify-between items-center text-center select-text">
            {/* TOP: Bismillah & "We're getting married" */}
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-0.5 sm:mt-2"
              >
                <p
                  dir="rtl"
                  lang="ar"
                  className="font-serif text-[15px] sm:text-base md:text-lg lg:text-xl text-[#1B382B] leading-tight"
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex justify-center my-0.5 sm:my-1"
              >
                <span className="text-[#1B382B] text-xs select-none" aria-hidden="true">
                  🖤
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="font-bodoni text-[11.5px] sm:text-xs md:text-xs tracking-[0.16em] uppercase text-[#1B382B] font-semibold leading-tight whitespace-nowrap">
                  We're getting married
                </h2>
              </motion.div>

              <div className="flex items-center justify-center gap-1.5 my-1 sm:my-1.5 max-w-[120px] mx-auto">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A059]/50 to-[#C5A059]" />
                <span className="text-[#B89047] text-[7px] sm:text-[8px]">⬥</span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C5A059]/50 to-[#C5A059]" />
              </div>
            </div>

            {/* CENTER: Couple's Calligraphic Names */}
            <div className="w-full my-auto py-0.5 sm:py-1">
              {/* Bride: Laraib Ajmal */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
              >
                <h3 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#1B382B] leading-[0.95] select-none">
                  {brideName}
                </h3>
                <p className="font-cormorant italic text-[12px] sm:text-xs md:text-sm text-[#5D5347] mt-0.5 font-medium">
                  Daughter of {brideParents}
                </p>
              </motion.div>

              {/* Ampersand in Cursive / Bodoni */}
              <div className="my-0.5 sm:my-1">
                <span className="font-script text-2xl sm:text-3xl text-[#B89047] select-none leading-none inline-block">
                  &
                </span>
              </div>

              {/* Groom: Mirza Talal Baig */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#1B382B] leading-[0.95] select-none">
                  {groomName}
                </h3>
                <p className="font-cormorant italic text-[12px] sm:text-xs md:text-sm text-[#5D5347] mt-0.5 font-medium">
                  Son of {groomParents}
                </p>
              </motion.div>
            </div>

            {/* BOTTOM: Wedding Date & Venue Line */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="w-full pt-1 sm:pt-1.5 border-t border-[#C5A059]/30 relative z-10 shrink-0 mb-0.5 sm:mb-0"
            >
              <p className="font-bodoni text-[11.5px] sm:text-xs md:text-xs text-[#1B382B] font-bold tracking-[0.14em] uppercase whitespace-nowrap">
                {formattedWeddingDate}
              </p>
              <div className="flex items-center justify-center gap-1 text-[10.5px] sm:text-xs text-[#5D5347] font-cormorant italic mt-0.5 font-medium px-1">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B89047] shrink-0" />
                <span className="truncate">{weddingCity}</span>
              </div>
            </motion.div>
          </div>
        </CurtainStageFrame>
      </motion.div>

      {/* Action CTAs: Save The Date & View Timeline (Positioned neatly underneath main image) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-20 mt-10 sm:mt-14 mb-4 sm:mb-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      >
        <button
          onClick={handleSaveTheDate}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1B382B] hover:bg-[#264E3D] text-[#FAF8F5] text-sm font-cinzel font-semibold tracking-wider uppercase shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <Calendar className="w-4 h-4 text-[#EAD7A5]" />
          <span>Save The Date</span>
        </button>

        <button
          onClick={scrollToTimeline}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFFDF9] hover:bg-[#F5EFE6] text-[#1B382B] border border-[#C5A059]/60 text-sm font-cinzel font-semibold tracking-wider uppercase transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
        >
          <span>View Program Timeline</span>
          <ChevronDown className="w-4 h-4 text-[#B89047]" />
        </button>
      </motion.div>
    </section>
  );
}
