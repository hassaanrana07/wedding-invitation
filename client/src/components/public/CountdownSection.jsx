import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Sparkles } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { DelicateHeart, FloralDivider, BotanicalHeaderArch } from '../ui/BotanicalOrnaments';

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

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown-section"
      className="relative py-20 sm:py-28 px-5 sm:px-6 overflow-hidden bg-[#FAF8F5]"
    >
      {/* Background Subtle Watermark */}
      <div className="absolute inset-0 botanical-dots opacity-25 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Header Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <DelicateHeart size={14} className="text-[#B89047]" />
            <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#B89047] font-semibold">
              The Auspicious Countdown
            </span>
            <DelicateHeart size={14} className="text-[#B89047]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#1B382B] font-normal leading-snug">
            Counting Down Every Moment
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-[#756A5E] mt-2 max-w-lg mx-auto">
            Until we gather under divine blessings to celebrate the wedding union of {wedding.couple_title || 'Ahmed & Ayesha'}.
          </p>
        </motion.div>

        {/* ============================================================== */}
        {/* REFERENCE B: MINIMAL, SOPHISTICATED COUNTDOWN CARDS            */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto mt-10 mb-8"
        >
          {timeUnits.map((item, idx) => (
            <div
              key={item.label}
              className="relative p-5 sm:p-6 rounded-3xl bg-[#FFFDF9] border border-[#E2D6C3] shadow-[0_8px_25px_rgba(27,56,43,0.04)] text-center group hover:border-[#C5A059]/60 hover:shadow-[0_12px_30px_rgba(197,160,89,0.12)] transition-all"
            >
              <div className="absolute top-2.5 right-2.5">
                <DelicateHeart size={11} className="text-[#C5A059]/40 group-hover:text-[#C5A059] transition-colors" />
              </div>

              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#1B382B] block tabular-nums leading-none">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#756A5E] font-semibold mt-2.5 block">
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
