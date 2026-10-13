import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ExternalLink,
  CalendarPlus,
  Navigation,
  ChevronRight,
  Info,
} from 'lucide-react';
import ImageWithFallback from '../ui/ImageWithFallback';
import { DelicateHeart } from '../ui/BotanicalOrnaments';

export default function EventCard({ event, index, onSelectEvent }) {
  const formattedDate = event.formatted_date || (event.event_date
    ? new Date(event.event_date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : event.event_date);

  const eventDay = event.event_day || (event.event_date
    ? new Date(event.event_date).toLocaleDateString('en-US', { weekday: 'long' })
    : '');

  const handleAddToCalendar = (e) => {
    e.stopPropagation();
    const dateStr = event.event_date;
    const startIso = new Date(`${dateStr}T19:00:00+05:00`).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endIso = new Date(`${dateStr}T23:30:00+05:00`).toISOString().replace(/-|:|\.\d\d\d/g, '');

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `Ahmed & Ayesha: ${event.name}`
    )}&dates=${startIso}/${endIso}&details=${encodeURIComponent(
      `${event.description || ''}\n\nVenue: ${event.venue_name}\nAddress: ${event.venue_address || event.city}`
    )}&location=${encodeURIComponent(`${event.venue_name}, ${event.venue_address || event.city}`)}`;

    window.open(url, '_blank');
  };

  const handleOpenDetails = (e) => {
    e?.preventDefault();
    if (onSelectEvent) {
      onSelectEvent(event);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="group relative flex flex-col rounded-[26px] border border-[#E3D8C4] bg-[#FFFDF9] overflow-hidden shadow-[0_8px_25px_rgba(27,56,43,0.04)] hover:shadow-[0_16px_40px_rgba(197,160,89,0.12)] hover:border-[#C5A059]/70 transition-all duration-300"
    >
      {/* Sleek Compact Cover Image Banner */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#F5EFE6]">
        <ImageWithFallback
          src={event.cover_image_url || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'}
          alt={event.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9] via-transparent to-black/30 pointer-events-none" />

        {/* Function Day & Category Badge */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          {eventDay && (
            <span className="px-3 py-1 rounded-full bg-[#1B382B]/90 backdrop-blur-md text-[#FAF8F5] text-[11px] font-bold font-cinzel uppercase tracking-wider shadow-sm">
              {eventDay}
            </span>
          )}
        </div>
      </div>

      {/* Compact Main Card Content */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Prominent Title: e.g. Shanti The Grand */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-[#1B382B] leading-tight group-hover:text-[#2E5A45] transition-colors">
                {event.name}
              </h3>
              {/* Prominent Subtitle: e.g. Wedding Celebration & Baraat */}
              {event.tagline && (
                <p className="font-serif italic text-sm text-[#B89047] font-medium mt-0.5">
                  {event.tagline}
                </p>
              )}
            </div>
            <DelicateHeart size={16} className="text-[#C5A059]/40 group-hover:text-[#C5A059] transition-colors shrink-0 mt-1" />
          </div>

          {/* Essential Information Chips in Warm Compact Box */}
          <div className="mt-3.5 space-y-2 text-xs text-[#1B382B] border border-[#EAE0D2] bg-[#FAF8F5] p-3 sm:p-3.5 rounded-xl">
            {/* 1. Function Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#B89047] shrink-0" />
              <span className="font-medium text-[#1B382B]">{formattedDate}</span>
            </div>

            {/* 2. Starting Time */}
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#B89047] shrink-0" />
              <span>
                <strong className="text-[#1B382B] font-semibold">Time:</strong> {event.start_time}
              </span>
            </div>

            {/* 3. Venue */}
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#B89047] shrink-0" />
              <span className="truncate font-medium text-[#1B382B]" title={event.venue_name}>
                {event.venue_name}
              </span>
            </div>
          </div>

          {/* Short, Elegant Description */}
          {event.description && (
            <p className="text-[#5D5347] text-xs leading-relaxed mt-3 font-light line-clamp-2">
              {event.description}
            </p>
          )}
        </div>

        {/* Card Actions: 1. Full Details | 2. Add to Calendar | 3. Get Directions */}
        <div className="mt-4 pt-3.5 border-t border-[#EAE0D2] flex flex-wrap items-center justify-between gap-2">
          {/* Action 1: Full Details */}
          <button
            onClick={handleOpenDetails}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1B382B] hover:bg-[#264E3D] text-[#FAF8F5] text-xs font-cinzel font-semibold uppercase tracking-wider shadow-sm transition-all cursor-pointer group/btn"
          >
            <Sparkles className="w-3 h-3 text-[#EAD7A5] group-hover/btn:rotate-45 transition-transform" />
            <span>Full Details</span>
            <ChevronRight className="w-3 h-3 text-[#EAD7A5] group-hover/btn:translate-x-0.5 transition-transform" />
          </button>

          <div className="flex items-center gap-2">
            {/* Action 2: Add to Calendar */}
            <button
              onClick={handleAddToCalendar}
              title="Add to Google Calendar"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F5EFE6] text-[#1B382B] text-xs font-cinzel font-medium transition-colors border border-[#E3D8C4] shadow-xs cursor-pointer"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-[#B89047]" />
              <span className="text-[11px]">Add to Cal</span>
            </button>

            {/* Action 3: Get Directions */}
            {event.google_maps_url && (
              <a
                href={event.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                title="Get Directions on Google Maps"
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#1B382B] hover:text-[#FAF8F5] text-[#1B382B] text-xs font-cinzel font-medium transition-all border border-[#C5A059]/40 shadow-xs cursor-pointer group/dir"
              >
                <Navigation className="w-3.5 h-3.5 text-[#B89047] group-hover/dir:text-[#EAD7A5] transition-colors" />
                <span className="text-[11px]">Directions</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60 ml-0.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
