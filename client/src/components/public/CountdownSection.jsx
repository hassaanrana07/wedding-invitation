import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, Bell, Sparkles } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';

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
        // Within 24h of wedding date or in the past
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
      `Wedding of ${wedding.couple_title || 'Rida & Harish'}`
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      wedding.invitation_message || 'Wedding celebrations'
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
      className="relative py-20 sm:py-24 px-5 sm:px-6 overflow-hidden bg-gradient-to-b from-[#0C0F14] via-[#111620] to-[#0C0F14]"
    >
      {/* Subtle Pattern & Radial Glow */}
      <div className="absolute inset-0 pattern-bg opacity-35 pointer-events-none" />
      <div className="ambient-glow w-[500px] h-[500px] bg-gold-600/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Main Container with Requirement 9 Popup-style Scale-in Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ type: 'spring', damping: 22, stiffness: 110 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        {/* Header / Subtitle */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-950/60 border border-gold-400/40 text-gold-300 text-[11px] font-cinzel tracking-[0.25em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Counting The Auspicious Moments</span>
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient">
            {timeLeft.isToday
              ? 'Today is the Auspicious Day ❤️'
              : timeLeft.isPassed
              ? 'Our Celebration Has Begun!'
              : 'Until We Say "Qubool Hai"'}
          </h2>

          <p className="text-xs sm:text-sm text-cream-300/80 max-w-lg mx-auto mt-2.5 font-light">
            Counting down to Saturday, 27 March 2027 (Asia/Karachi) — the union of Rida & Harish.
          </p>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4" />
        </div>

        {/* Four Separate Live Countdown Units */}
        {!timeLeft.isPassed && !timeLeft.isToday && timeLeft.isConfigured ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-6 my-8 max-w-2xl mx-auto">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="relative rounded-3xl border-2 border-gold-500/30 bg-[#141923]/90 backdrop-blur-xl p-5 sm:p-6 shadow-2xl shadow-gold-950/50 text-center group hover:border-gold-400/60 transition-all hover:-translate-y-1"
              >
                {/* Vintage Corner Brackets */}
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-gold-400/50 rounded-tl-sm pointer-events-none" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-gold-400/50 rounded-tr-sm pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-gold-400/50 rounded-bl-sm pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-gold-400/50 rounded-br-sm pointer-events-none" />

                {/* Animated Number with Smooth Value Transition */}
                <span className="font-cinzel text-3xl sm:text-5xl font-black gold-text-gradient block drop-shadow-md">
                  {String(unit.value).padStart(2, '0')}
                </span>

                <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.25em] uppercase text-gold-300/80 mt-2 block font-semibold">
                  {unit.label}
                </span>

                {/* Subtle Pulse Jewel */}
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-gold-400/60 group-hover:bg-gold-400 animate-pulse" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="my-8 p-6 rounded-3xl border border-gold-400/40 bg-gold-950/40 max-w-md mx-auto shadow-xl">
            <p className="font-serif text-xl sm:text-2xl text-gold-200">
              {timeLeft.isToday
                ? 'The celebrations have officially begun! We are ecstatic to welcome you.'
                : 'Forever Starts Here. Thank you for blessing our journey!'}
            </p>
          </div>
        )}

        {/* 1-Click Save to Calendar Button */}
        <motion.button
          onClick={handleSaveTheDate}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold-400/50 bg-gold-500/15 hover:bg-gold-500/25 text-gold-300 font-medium text-xs sm:text-sm tracking-wide transition-all shadow-lg cursor-pointer"
          aria-label="Add wedding to Google Calendar"
        >
          <Bell className="w-4 h-4 text-gold-400" />
          <span>Save Date to Google Calendar</span>
        </motion.button>
      </motion.div>
    </section>
  );
}
