import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, Sparkles } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { DelicateHeart, FloralDivider, BotanicalHeaderArch } from '../ui/BotanicalOrnaments';
import ImageWithFallback from '../ui/ImageWithFallback';

export default function CountdownSection() {
  const { wedding } = useWedding();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
    isToday: false,
    isConfigured: true,
  });

  useEffect(() => {
    if (!wedding.wedding_date) {
      setTimeLeft((prev) => ({ ...prev, isConfigured: false }));
      return;
    }

    const targetDate = new Date(wedding.wedding_date).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        const isWithin24Hours = Math.abs(difference) < 24 * 60 * 60 * 1000;
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: !isWithin24Hours,
          isToday: isWithin24Hours,
          isConfigured: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isPassed: false,
        isToday: false,
        isConfigured: true,
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [wedding.wedding_date]);

  const handleSaveTheDate = () => {
    const dateStr = wedding.wedding_date || '2026-12-12T19:00:00+05:00';
    const startDate = new Date(dateStr).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endDate = new Date(new Date(dateStr).getTime() + 4 * 3600 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, '');

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `Wedding of ${wedding.couple_title || 'Laraib Ajmal & Mirza Talal Baig'}`
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      wedding.invitation_message || 'Wedding celebrations in Lahore, Pakistan'
    )}&location=${encodeURIComponent('Topaz Marquee, Model Town, Lahore, Pakistan')}`;

    window.open(googleCalendarUrl, '_blank');
  };

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown-section"
      className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden bg-[#FAF8F5]"
    >
      {/* Background Subtle Watermark */}
      <div className="absolute inset-0 botanical-dots opacity-25 pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 text-center">

        {/* Header (Reference 2 & 5) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          {/* "Counting Down to Forever" in Great Vibes Calligraphy Script */}
          <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#1B382B] leading-tight select-none">
            Counting Down to Forever
          </h2>

          {/* Centered Thin Divider with Heart — 🖤 — */}
          <div className="flex items-center justify-center gap-3 my-3 max-w-[220px] mx-auto">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A059]/40 to-[#C5A059]" />
            <span className="text-[#1B382B] text-xs select-none">🖤</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C5A059]/40 to-[#C5A059]" />
          </div>

          <p className="font-cormorant italic text-sm sm:text-base text-[#5D5347] max-w-md mx-auto">
            Until we gather under divine blessings to celebrate the wedding union of {wedding.couple_title || 'Laraib Ajmal & Mirza Talal Baig'}.
          </p>
        </motion.div>

        {/* ============================================================== */}
        {/* REFERENCE 2 & 5: ELEGANT SOFT CHAMPAGNE NUMBER BLOCKS           */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-xl mx-auto mb-8"
        >
          {timeUnits.map((item, idx) => (
            <div
              key={item.label}
              className="relative p-3.5 sm:p-5 rounded-2xl bg-[#EFE8DC]/85 border border-[#DFD3C0] shadow-[0_4px_16px_rgba(27,56,43,0.03)] text-center group hover:bg-[#EAE2D4] hover:border-[#C5A059]/50 transition-all duration-300"
            >
              <span className="font-bodoni text-2xl sm:text-4xl md:text-5xl font-bold text-[#1B382B] block tabular-nums leading-none tracking-tight">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-bodoni text-[9px] sm:text-[11px] uppercase tracking-[0.22em] text-[#74836F] font-semibold mt-2 block">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Add to Google Calendar Action */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <button
            onClick={handleSaveTheDate}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1B382B] hover:bg-[#254A39] text-[#FAF8F5] text-xs font-cinzel font-semibold tracking-wider uppercase transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5 text-[#EAD7A5]" />
            <span>Add Ceremony To Calendar</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
