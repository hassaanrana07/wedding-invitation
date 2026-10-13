import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Shirt,
  Navigation,
  CalendarPlus,
  ArrowLeft,
  X,
  Music,
  ListOrdered,
  Info,
  ExternalLink,
} from 'lucide-react';
import EventCard from './EventCard';
import ImageWithFallback from '../ui/ImageWithFallback';
import { useWedding } from '../../context/WeddingContext';
import {
  FloralDivider,
  DelicateHeart,
  BotanicalHeaderArch,
  BotanicalFloralSprig,
} from '../ui/BotanicalOrnaments';

export default function EventsSection({ events = [], isPersonalized = false }) {
  const { playCustomTrack } = useWedding();
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Handle browser back button (popstate) gracefully so page doesn't refresh
  const handleCloseModal = useCallback(() => {
    setSelectedEvent(null);
    if (window.location.hash.startsWith('#event-')) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
    window.history.pushState({ modal: 'event', slug: event.slug }, '', `#event-${event.slug}`);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (selectedEvent) {
        setSelectedEvent(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedEvent]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedEvent]);

  if (!events || events.length === 0) return null;

  return (
    <section id="timeline" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden bg-[#FAF8F5]">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 botanical-dots opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* ============================================================== */}
        {/* REFERENCE B: BEAUTIFUL SCRIPT-STYLE HEADING FOR PROGRAM TIMELINE*/}
        {/* ============================================================== */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-1.5"
          >
            <DelicateHeart size={14} className="text-[#B89047]" />
            <p className="font-cinzel text-xs tracking-[0.35em] uppercase text-[#B89047] font-semibold">
              {isPersonalized ? 'Your Personal Itinerary' : 'Schedule of Celebrations'}
            </p>
            <DelicateHeart size={14} className="text-[#B89047]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-script text-5xl sm:text-6xl lg:text-7xl text-[#1B382B] leading-none my-2 drop-shadow-sm select-none"
          >
            Program Timeline
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#5D5347] max-w-xl mx-auto mt-2 font-serif italic"
          >
            {isPersonalized
              ? 'You are warmly invited to honor us with your gracious presence at the following functions.'
              : 'Join us across our memorable multi-day Pakistani wedding festivities in Lahore.'}
          </motion.p>

          <FloralDivider variant="gold" className="mt-4" />
        </div>

        {/* ============================================================== */}
        {/* REFERENCE B: VERTICAL TIMELINE WITH CONNECTING LINES & MARKERS */}
        {/* ============================================================== */}
        <div className="relative">
          {/* Continuous Vertical Timeline Line (Center on desktop, Left on mobile) */}
          <div className="absolute top-8 bottom-8 left-4 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#C5A059]/20 via-[#C5A059]/75 to-[#C5A059]/20 pointer-events-none" />

          <div className="space-y-12 md:space-y-16">
            {events.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={event.id || event.slug}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Marker (Center ring with heart) */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFFDF9] border-2 border-[#C5A059] shadow-md flex items-center justify-center text-[#B89047]"
                    >
                      <DelicateHeart size={14} className="text-[#B89047]" />
                    </motion.div>
                  </div>

                  {/* Left / Right Card Container */}
                  <div className="w-full pl-12 md:pl-0 md:w-1/2 md:px-8">
                    <EventCard
                      event={event}
                      index={index}
                      onSelectEvent={handleSelectEvent}
                      isTimelineItem={true}
                    />
                  </div>

                  {/* Empty counterpart spacer for desktop alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* IN-PLACE EVENT DETAILS VIEW / MODAL WITH ZERO RELOAD           */}
      {/* ============================================================== */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 bg-[#1B382B]/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedEvent.name} Details`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 25 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl my-auto rounded-[32px] border-2 border-[#C5A059]/60 bg-[#FAF8F5] text-[#1B382B] shadow-[0_25px_60px_rgba(27,56,43,0.18)] overflow-hidden max-h-[92vh] flex flex-col"
            >
              {/* Sticky Top Navigation Bar with Back Button */}
              <div className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-7 py-4 bg-[#FAF8F5]/98 backdrop-blur-md border-b border-[#E3D8C4]">
                <button
                  onClick={handleCloseModal}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B382B] hover:bg-[#264E3D] text-[#FAF8F5] text-xs font-cinzel font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Program Timeline</span>
                </button>

                <button
                  onClick={handleCloseModal}
                  aria-label="Close details"
                  className="p-2 rounded-full bg-[#FFFDF9] hover:bg-[#F5EFE6] text-[#1B382B] border border-[#E3D8C4] transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-6">
                {/* Hero Cover Banner */}
                <div className="relative h-56 sm:h-72 w-full rounded-2xl overflow-hidden bg-[#F5EFE6] border border-[#C5A059]/30">
                  <ImageWithFallback
                    src={
                      selectedEvent.cover_image_url ||
                      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80'
                    }
                    alt={selectedEvent.name}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B382B]/85 via-transparent to-transparent pointer-events-none" />

                  {/* Title Overlay in Banner */}
                  <div className="absolute bottom-4 left-5 right-5 z-10">
                    <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#EAD7A5] block mb-1">
                      Ceremony Itinerary
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                      {selectedEvent.name}
                    </h2>
                    {selectedEvent.tagline && (
                      <p className="font-serif text-sm sm:text-base text-[#F5EFE6] italic mt-1 font-light">
                        {selectedEvent.tagline}
                      </p>
                    )}
                  </div>

                  {/* Audio Track Play Button */}
                  {selectedEvent.music_url && (
                    <button
                      onClick={() => playCustomTrack(selectedEvent.music_url, selectedEvent.name)}
                      className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B382B] text-[#FAF8F5] text-xs font-semibold shadow-lg hover:bg-[#B89047] transition-all cursor-pointer"
                      title="Play ceremony track"
                    >
                      <Music className="w-3.5 h-3.5" />
                      <span>Play Track</span>
                    </button>
                  )}
                </div>

                {/* Key Facts Summary Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#FFFDF9] border border-[#E3D8C4] shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/30 text-[#B89047] shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-cinzel text-[10px] uppercase tracking-wider text-[#756A5E] block">
                        Date
                      </span>
                      <p className="font-serif text-sm sm:text-base font-bold text-[#1B382B] mt-0.5">
                        {selectedEvent.formatted_date || selectedEvent.event_date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/30 text-[#B89047] shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-cinzel text-[10px] uppercase tracking-wider text-[#756A5E] block">
                        Timings
                      </span>
                      <p className="font-serif text-sm sm:text-base font-bold text-[#1B382B] mt-0.5">
                        {selectedEvent.start_time} {selectedEvent.end_time ? `— ${selectedEvent.end_time}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:col-span-2 lg:col-span-1">
                    <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/30 text-[#B89047] shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-cinzel text-[10px] uppercase tracking-wider text-[#756A5E] block">
                        Venue
                      </span>
                      <p className="font-serif text-sm sm:text-base font-bold text-[#1B382B] mt-0.5">
                        {selectedEvent.venue_name}
                      </p>
                      <p className="text-[11px] text-[#756A5E] mt-0.5">
                        {selectedEvent.venue_address || selectedEvent.city}
                      </p>
                    </div>
                  </div>
                </div>

                {/* About & Description */}
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1B382B] mb-2">
                    About This Celebration
                  </h3>
                  <p className="text-[#5D5347] text-sm sm:text-base leading-relaxed font-light whitespace-pre-line">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Program Timeline & Schedule */}
                {selectedEvent.program_highlights && (
                  <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E3D8C4]">
                    <div className="flex items-center gap-2 mb-2 text-[#1B382B]">
                      <ListOrdered className="w-4 h-4 text-[#B89047]" />
                      <h4 className="font-cinzel text-xs uppercase tracking-wider font-bold">
                        Program Schedule & Highlights
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#5D5347] leading-relaxed">
                      {selectedEvent.program_highlights}
                    </p>
                  </div>
                )}

                {/* Dress Code & Hospitality Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedEvent.dress_code && (
                    <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E3D8C4] flex items-start gap-3">
                      <Shirt className="w-4 h-4 text-[#B89047] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-cinzel text-[10px] uppercase text-[#756A5E] tracking-wider block">
                          Dress Code
                        </span>
                        <p className="text-xs sm:text-sm text-[#1B382B] mt-0.5 font-medium">
                          {selectedEvent.dress_code}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedEvent.additional_notes && (
                    <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E3D8C4] flex items-start gap-3">
                      <Info className="w-4 h-4 text-[#B89047] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-cinzel text-[10px] uppercase text-[#756A5E] tracking-wider block">
                          Hospitality Note
                        </span>
                        <p className="text-xs sm:text-sm text-[#756A5E] italic mt-0.5">
                          {selectedEvent.additional_notes}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action CTAs: Driving Directions & Calendar */}
                <div className="pt-4 border-t border-[#E3D8C4] flex flex-wrap items-center justify-between gap-3">
                  {selectedEvent.google_maps_url && (
                    <a
                      href={selectedEvent.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B382B] hover:bg-[#264E3D] text-[#FAF8F5] text-xs font-semibold tracking-wider font-cinzel shadow-sm transition-all"
                    >
                      <Navigation className="w-4 h-4 text-[#EAD7A5]" />
                      <span>Get Driving Directions</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  )}

                  <button
                    onClick={() => {
                      const dateStr = selectedEvent.event_date;
                      const startIso = new Date(`${dateStr}T19:00:00+05:00`).toISOString().replace(/-|:|\.\d\d\d/g, '');
                      const endIso = new Date(`${dateStr}T23:30:00+05:00`).toISOString().replace(/-|:|\.\d\d\d/g, '');
                      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                        `Ahmed & Ayesha: ${selectedEvent.name}`
                      )}&dates=${startIso}/${endIso}&details=${encodeURIComponent(
                        `${selectedEvent.description || ''}\n\nDress Code: ${selectedEvent.dress_code || 'Formal'}`
                      )}&location=${encodeURIComponent(`${selectedEvent.venue_name}, ${selectedEvent.venue_address || selectedEvent.city}`)}`;
                      window.open(url, '_blank');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#E3D8C4] text-[#1B382B] hover:bg-[#F5EFE6] text-xs font-medium transition-all shadow-sm"
                  >
                    <CalendarPlus className="w-4 h-4 text-[#B89047]" />
                    <span>Add to Google Calendar</span>
                  </button>
                </div>

                {/* Bottom Back Button */}
                <div className="pt-6 border-t border-[#E3D8C4] flex justify-center">
                  <button
                    onClick={handleCloseModal}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1B382B] hover:bg-[#264E3D] text-[#FAF8F5] text-xs font-cinzel font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Program Timeline</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
