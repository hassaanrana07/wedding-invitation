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
  UtensilsCrossed,
  Palette,
  FileText,
  CheckCircle2,
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

  return (
    <section
      id="events"
      className="relative py-20 sm:py-28 bg-[#FAF8F5] text-[#1B382B] overflow-hidden"
    >
      {/* Background Decorative Floral Accents */}
      <div className="absolute top-12 -left-16 opacity-30 pointer-events-none">
        <BotanicalFloralSprig className="scale-125" />
      </div>
      <div className="absolute bottom-16 -right-16 opacity-30 pointer-events-none transform -scale-x-125">
        <BotanicalFloralSprig />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <BotanicalHeaderArch className="scale-90" />
          </div>

          <span className="font-cinzel text-xs tracking-[0.35em] uppercase text-[#756A5E] block mb-2 font-medium">
            Wedding Itinerary
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B382B] tracking-tight">
            Schedule & Celebrations
          </h2>

          <FloralDivider className="my-3" />

          <p className="font-serif italic text-base sm:text-lg text-[#5D5347] max-w-lg mx-auto leading-relaxed">
            "Join our families in celebrating two blessed occasions of prayers, dinner, and togetherness."
          </p>
        </motion.div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          {/* Central Connecting Vertical Line (Desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-8 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-[#C5A059]/10 via-[#C5A059]/40 to-[#C5A059]/10 pointer-events-none" />

          {/* Timeline Event Cards */}
          <div className="space-y-12 sm:space-y-16">
            {events.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={event.id || index}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Central Node Marker on Desktop Connecting Line */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 items-center justify-center w-10 h-10 rounded-full bg-[#FFFDF9] border-2 border-[#C5A059] shadow-md">
                    <span className="font-cinzel text-xs font-bold text-[#1B382B]">
                      {index + 1}
                    </span>
                  </div>

                  {/* Card Column */}
                  <div className="w-full md:w-1/2 md:px-6">
                    <EventCard
                      event={event}
                      index={index}
                      onSelectEvent={handleSelectEvent}
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
      {/* IN-PLACE STRUCTURED FULL DETAILS MODAL                         */}
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
              {/* Sticky Top Navigation Bar */}
              <div className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-7 py-3.5 bg-[#FAF8F5]/98 backdrop-blur-md border-b border-[#E3D8C4]">
                <button
                  onClick={handleCloseModal}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B382B] hover:bg-[#264E3D] text-[#FAF8F5] text-xs font-cinzel font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Timeline</span>
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
                <div className="relative h-48 sm:h-64 w-full rounded-2xl overflow-hidden bg-[#F5EFE6] border border-[#C5A059]/30">
                  <ImageWithFallback
                    src={
                      selectedEvent.cover_image_url ||
                      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80'
                    }
                    alt={selectedEvent.name}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B382B]/90 via-[#1B382B]/30 to-transparent pointer-events-none" />

                  {/* Title Overlay in Banner */}
                  <div className="absolute bottom-4 left-5 right-5 z-10">
                    <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#EAD7A5] block mb-1">
                      Wedding Celebration Details
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                      {selectedEvent.name}
                    </h2>
                    {selectedEvent.tagline && (
                      <p className="font-serif text-sm sm:text-base text-[#F5EFE6] italic mt-0.5 font-light">
                        {selectedEvent.tagline}
                      </p>
                    )}
                  </div>
                </div>

                {/* ========================================================== */}
                {/* 1. EVENT INFORMATION                                       */}
                {/* ========================================================== */}
                <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E3D8C4] shadow-xs">
                  <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-[#EAE0D2]">
                    <Info className="w-4 h-4 text-[#B89047]" />
                    <h3 className="font-cinzel text-xs uppercase tracking-widest font-bold text-[#1B382B]">
                      1. Event Information
                    </h3>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE0D2]">
                      <span className="font-cinzel text-[10px] uppercase text-[#756A5E] block font-semibold">
                        Function Date
                      </span>
                      <p className="font-serif text-sm font-bold text-[#1B382B] mt-1">
                        {selectedEvent.formatted_date || selectedEvent.event_date}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE0D2]">
                      <span className="font-cinzel text-[10px] uppercase text-[#756A5E] block font-semibold">
                        Timings
                      </span>
                      <p className="font-serif text-sm font-bold text-[#1B382B] mt-1">
                        {selectedEvent.start_time} {selectedEvent.end_time ? `— ${selectedEvent.end_time}` : ''}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE0D2]">
                      <span className="font-cinzel text-[10px] uppercase text-[#756A5E] block font-semibold">
                        Venue
                      </span>
                      <p className="font-serif text-sm font-bold text-[#1B382B] mt-1 truncate" title={selectedEvent.venue_name}>
                        {selectedEvent.venue_name}
                      </p>
                      <p className="text-[11px] text-[#756A5E] mt-0.5 truncate">
                        {selectedEvent.venue_address || selectedEvent.city}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  {selectedEvent.description && (
                    <p className="text-[#5D5347] text-xs sm:text-sm leading-relaxed mb-3 font-light">
                      {selectedEvent.description}
                    </p>
                  )}

                  {/* Schedule & Highlights */}
                  {selectedEvent.program_highlights && (
                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE0D2] flex items-start gap-2.5">
                      <ListOrdered className="w-4 h-4 text-[#B89047] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-cinzel text-[10px] uppercase text-[#756A5E] font-bold block mb-0.5">
                          Schedule & Highlights
                        </span>
                        <p className="text-xs text-[#1B382B] leading-relaxed">
                          {selectedEvent.program_highlights}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* ========================================================== */}
                {/* 2. DRESS CODE & COLOR PALETTE                              */}
                {/* ========================================================== */}
                <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E3D8C4] shadow-xs">
                  <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-[#EAE0D2]">
                    <Shirt className="w-4 h-4 text-[#B89047]" />
                    <h3 className="font-cinzel text-xs uppercase tracking-widest font-bold text-[#1B382B]">
                      2. Dress Code & Color Palette
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE0D2]">
                      <span className="font-cinzel text-[10px] uppercase text-[#756A5E] font-bold block mb-1">
                        Dress Code
                      </span>
                      <p className="text-xs sm:text-sm text-[#1B382B] font-medium leading-relaxed">
                        {selectedEvent.dress_code || 'Royal Formal / Sherwani, Formal Suits & Heavily Embellished Formals'}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE0D2]">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Palette className="w-3.5 h-3.5 text-[#B89047]" />
                        <span className="font-cinzel text-[10px] uppercase text-[#756A5E] font-bold">
                          Recommended Color Palette
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#1B382B] font-medium leading-relaxed">
                        {selectedEvent.color_palette || 'Emerald Green, Antique Gold, Deep Crimson & Regal Ivory'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ========================================================== */}
                {/* 3. MENU & REFRESHMENTS                                     */}
                {/* ========================================================== */}
                <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E3D8C4] shadow-xs">
                  <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-[#EAE0D2]">
                    <UtensilsCrossed className="w-4 h-4 text-[#B89047]" />
                    <h3 className="font-cinzel text-xs uppercase tracking-widest font-bold text-[#1B382B]">
                      3. Menu & Dining Information
                    </h3>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE0D2]">
                    <p className="text-xs sm:text-sm text-[#1B382B] leading-relaxed">
                      {selectedEvent.menu_details || 'Royal Mughlai Banquet • Live Barbecue & Mutton Karahi, Roghani Naan, Traditional Kashmiri Chai & Lahori Desserts (Banquet service begins at 09:45 PM)'}
                    </p>
                  </div>
                </div>

                {/* ========================================================== */}
                {/* 4. HOSPITALITY NOTES                                       */}
                {/* ========================================================== */}
                <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E3D8C4] shadow-xs">
                  <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-[#EAE0D2]">
                    <CheckCircle2 className="w-4 h-4 text-[#B89047]" />
                    <h3 className="font-cinzel text-xs uppercase tracking-widest font-bold text-[#1B382B]">
                      4. Hospitality Notes
                    </h3>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE0D2]">
                    <p className="text-xs sm:text-sm text-[#5D5347] leading-relaxed">
                      {selectedEvent.hospitality_notes || selectedEvent.additional_notes || 'Dedicated valet parking available. Guests are warmly requested to arrive on time.'}
                    </p>
                  </div>
                </div>

                {/* ========================================================== */}
                {/* 5. ADDITIONAL INFORMATION                                  */}
                {/* ========================================================== */}
                <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E3D8C4] shadow-xs">
                  <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-[#EAE0D2]">
                    <FileText className="w-4 h-4 text-[#B89047]" />
                    <h3 className="font-cinzel text-xs uppercase tracking-widest font-bold text-[#1B382B]">
                      5. Additional Information
                    </h3>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE0D2]">
                    <p className="text-xs sm:text-sm text-[#5D5347] leading-relaxed">
                      {selectedEvent.additional_notes || 'Ahmed & Ayesha warmly invite you to join them in heartfelt prayers and joyous celebrations.'}
                    </p>
                  </div>
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
                        `${selectedEvent.description || ''}\n\nDress Code: ${selectedEvent.dress_code || 'Formal'}\nVenue: ${selectedEvent.venue_name}`
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
                <div className="pt-4 border-t border-[#E3D8C4] flex justify-center">
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
