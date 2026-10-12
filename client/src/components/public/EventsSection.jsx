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
    <section id="events" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Decorative Ornaments */}
      <div className="ambient-glow w-96 h-96 bg-gold-600/10 top-1/4 left-5 blur-[120px] pointer-events-none" />
      <div className="ambient-glow w-80 h-80 bg-emerald-600/10 bottom-10 right-10 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-cinzel text-xs tracking-[0.3em] uppercase text-gold-400 mb-2"
          >
            {isPersonalized ? 'Your Cordial Itinerary' : 'Wedding Itinerary'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient"
          >
            Celebrations & Ceremonies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-cream-300/80 max-w-xl mx-auto mt-3 font-light"
          >
            {isPersonalized
              ? 'You are warmly invited to honor us with your gracious company at the following functions.'
              : 'Join us across our unforgettable multi-day Pakistani wedding festivities in Lahore.'}
          </motion.p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4" />
        </div>

        {/* Functions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
          {events.map((event, index) => (
            <EventCard
              key={event.id || event.slug}
              event={event}
              index={index}
              onSelectEvent={handleSelectEvent}
            />
          ))}
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
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
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
              className="relative w-full max-w-3xl my-auto rounded-3xl border-2 border-gold-400/60 bg-[#121622] text-[#EFE2C8] shadow-[0_0_60px_rgba(197,160,89,0.35)] overflow-hidden max-h-[92vh] flex flex-col"
            >
              {/* Sticky Top Navigation Bar with Back Button */}
              <div className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-7 py-4 bg-[#0C1018]/95 backdrop-blur-md border-b border-gold-500/25">
                <button
                  onClick={handleCloseModal}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-950/80 hover:bg-gold-500 hover:text-black border border-gold-400/50 text-gold-300 text-xs font-cinzel font-bold uppercase tracking-wider transition-all cursor-pointer shadow"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Ceremonies</span>
                </button>

                <button
                  onClick={handleCloseModal}
                  aria-label="Close details"
                  className="p-2 rounded-full bg-black/50 hover:bg-gold-500/20 text-cream-300 hover:text-gold-200 border border-gold-500/20 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-6">
                {/* Hero Cover Banner */}
                <div className="relative h-56 sm:h-72 w-full rounded-2xl overflow-hidden bg-black/70 border border-gold-500/30">
                  <ImageWithFallback
                    src={
                      selectedEvent.cover_image_url ||
                      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80'
                    }
                    alt={selectedEvent.name}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/50 to-transparent pointer-events-none" />

                  {/* Title Overlay in Banner */}
                  <div className="absolute bottom-4 left-5 right-5 z-10">
                    <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-gold-400 block mb-1">
                      Ceremony Overview
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold gold-text-gradient">
                      {selectedEvent.name}
                    </h2>
                    {selectedEvent.tagline && (
                      <p className="font-serif text-sm sm:text-base text-cream-200/90 italic mt-1 font-light">
                        {selectedEvent.tagline}
                      </p>
                    )}
                  </div>

                  {/* Audio Track Play Button */}
                  {selectedEvent.music_url && (
                    <button
                      onClick={() => playCustomTrack(selectedEvent.music_url, selectedEvent.name)}
                      className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-500 text-black text-xs font-semibold shadow-lg hover:scale-105 transition-transform cursor-pointer"
                      title="Play ceremony track"
                    >
                      <Music className="w-3.5 h-3.5" />
                      <span>Play Track</span>
                    </button>
                  )}
                </div>

                {/* Key Facts Summary Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 rounded-2xl bg-black/40 border border-gold-500/20">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-400 shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-cinzel text-[10px] uppercase tracking-wider text-gold-400/80 block">
                        Date
                      </span>
                      <p className="font-serif text-sm sm:text-base font-bold text-gold-light mt-0.5">
                        {selectedEvent.formatted_date || selectedEvent.event_date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-400 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-cinzel text-[10px] uppercase tracking-wider text-gold-400/80 block">
                        Timings
                      </span>
                      <p className="font-serif text-sm sm:text-base font-bold text-gold-light mt-0.5">
                        {selectedEvent.start_time} {selectedEvent.end_time ? `— ${selectedEvent.end_time}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:col-span-2 lg:col-span-1">
                    <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-400 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-cinzel text-[10px] uppercase tracking-wider text-gold-400/80 block">
                        Venue
                      </span>
                      <p className="font-serif text-sm sm:text-base font-bold text-gold-light mt-0.5">
                        {selectedEvent.venue_name}
                      </p>
                      <p className="text-[11px] text-cream-400/80 mt-0.5">
                        {selectedEvent.venue_address || selectedEvent.city}
                      </p>
                    </div>
                  </div>
                </div>

                {/* About & Description */}
                <div>
                  <h3 className="font-serif text-xl font-bold text-gold-light mb-2">
                    About This Celebration
                  </h3>
                  <p className="text-cream-300/90 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Program Timeline & Schedule */}
                {selectedEvent.program_highlights && (
                  <div className="p-5 rounded-2xl bg-black/40 border border-gold-500/20">
                    <div className="flex items-center gap-2 mb-2 text-gold-400">
                      <ListOrdered className="w-4 h-4" />
                      <h4 className="font-cinzel text-xs uppercase tracking-wider font-bold">
                        Program Schedule & Highlights
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-cream-200 leading-relaxed">
                      {selectedEvent.program_highlights}
                    </p>
                  </div>
                )}

                {/* Dress Code & Hospitality Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedEvent.dress_code && (
                    <div className="p-4 rounded-2xl bg-black/40 border border-gold-500/20 flex items-start gap-3">
                      <Shirt className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-cinzel text-[10px] uppercase text-gold-400 tracking-wider block">
                          Dress Code
                        </span>
                        <p className="text-xs sm:text-sm text-cream-200 mt-0.5">
                          {selectedEvent.dress_code}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedEvent.additional_notes && (
                    <div className="p-4 rounded-2xl bg-black/40 border border-gold-500/20 flex items-start gap-3">
                      <Info className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-cinzel text-[10px] uppercase text-gold-400 tracking-wider block">
                          Hospitality Note
                        </span>
                        <p className="text-xs sm:text-sm text-cream-300/80 italic mt-0.5">
                          {selectedEvent.additional_notes}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action CTAs: Driving Directions & Calendar */}
                <div className="pt-4 border-t border-gold-500/20 flex flex-wrap items-center justify-between gap-3">
                  {selectedEvent.google_maps_url && (
                    <a
                      href={selectedEvent.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-black text-xs font-bold uppercase tracking-wider font-cinzel hover:from-gold-400 hover:to-gold-500 shadow-md transition-all"
                    >
                      <Navigation className="w-4 h-4" />
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
                        `RIHA: ${selectedEvent.name}`
                      )}&dates=${startIso}/${endIso}&details=${encodeURIComponent(
                        `${selectedEvent.description || ''}\n\nDress Code: ${selectedEvent.dress_code || 'Formal'}`
                      )}&location=${encodeURIComponent(`${selectedEvent.venue_name}, ${selectedEvent.venue_address || selectedEvent.city}`)}`;
                      window.open(url, '_blank');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/60 border border-gold-500/30 text-gold-300 hover:bg-gold-500/20 text-xs font-medium transition-all"
                  >
                    <CalendarPlus className="w-4 h-4 text-gold-400" />
                    <span>Add to Google Calendar</span>
                  </button>
                </div>

                {/* Bottom Back Button */}
                <div className="pt-6 border-t border-gold-500/15 flex justify-center">
                  <button
                    onClick={handleCloseModal}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-950/90 hover:bg-gold-500 hover:text-black border border-gold-400/60 text-gold-300 text-xs font-cinzel font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to All Ceremonies</span>
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
