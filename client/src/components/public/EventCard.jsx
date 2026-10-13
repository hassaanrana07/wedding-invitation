import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Shirt,
  ExternalLink,
  CalendarPlus,
  Music,
  Info,
  ListOrdered,
  Navigation,
  ChevronRight,
} from 'lucide-react';
import ImageWithFallback from '../ui/ImageWithFallback';
import { useWedding } from '../../context/WeddingContext';
import { DelicateHeart } from '../ui/BotanicalOrnaments';

export default function EventCard({ event, index, onSelectEvent, isTimelineItem = false }) {
  const { playCustomTrack } = useWedding();

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
      `${event.description || ''}\n\nDress Code: ${event.dress_code || 'Formal'}`
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
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col rounded-[32px] border border-[#E3D8C4] bg-[#FFFDF9] overflow-hidden shadow-[0_10px_30px_rgba(27,56,43,0.04)] hover:shadow-[0_18px_45px_rgba(197,160,89,0.14)] hover:border-[#C5A059]/70 transition-all duration-300"
    >
      {/* Cover Image Banner with Warm Champagne Tone Overlay */}
      <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-[#F5EFE6]">
        <ImageWithFallback
          src={event.cover_image_url || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'}
          alt={event.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9] via-transparent to-black/35 pointer-events-none" />

        {/* Function Day & Name Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md border border-[#C5A059]/40 text-[#1B382B] text-xs font-cinzel font-semibold tracking-wider uppercase shadow-sm">
            <DelicateHeart size={12} className="text-[#B89047]" />
            {event.name}
          </span>
          {eventDay && (
            <span className="px-3 py-1 rounded-full bg-[#1B382B] text-[#FAF8F5] text-[11px] font-bold font-mono uppercase tracking-wider shadow">
              {eventDay}
            </span>
          )}
        </div>

        {/* Function Custom Music Pill */}
        {event.music_url && (
          <button
            onClick={() => playCustomTrack(event.music_url, event.name)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-[#1B382B] text-[#FAF8F5] hover:bg-[#B89047] shadow-lg transition-colors cursor-pointer"
            title="Play Function Theme Track"
          >
            <Music className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Content Body */}
      <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
        <div>
          {/* Header Title & Tagline */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B382B] group-hover:text-[#2E5A45] transition-colors">
                {event.name}
              </h3>
              <DelicateHeart size={16} className="text-[#C5A059]/40 group-hover:text-[#C5A059] transition-colors shrink-0" />
            </div>
            {event.tagline && (
              <p className="font-serif italic text-sm text-[#B89047] mt-0.5">{event.tagline}</p>
            )}
          </div>

          {/* PRIMARY "VIEW EVENT DETAILS" BUTTON — Positioned ABOVE Event Information */}
          <div className="my-4">
            <button
              onClick={handleOpenDetails}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-[#1B382B] hover:bg-[#254A39] text-[#FAF8F5] font-cinzel font-semibold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer group/btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EAD7A5] group-hover/btn:rotate-45 transition-transform" />
              <span>View Event Details</span>
              <ChevronRight className="w-4 h-4 text-[#EAD7A5] group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Meaningful Event Description */}
          <p className="text-[#5D5347] text-xs sm:text-sm leading-relaxed mb-4 font-light">
            {event.description}
          </p>

          {/* Structured Details Matrix in Warm Cream Inset */}
          <div className="space-y-3 text-xs sm:text-sm text-[#1B382B] border border-[#EAE0D2] bg-[#FAF8F5] p-4 rounded-2xl">
            {/* 1. Date & Day */}
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#B89047] shrink-0" />
              <div>
                <span className="font-semibold text-[#1B382B]">{formattedDate}</span>
                {eventDay && <span className="text-[#756A5E] ml-1.5 font-mono">({eventDay})</span>}
              </div>
            </div>

            {/* 2. Timing */}
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#B89047] shrink-0" />
              <span>
                <strong className="text-[#1B382B]">Time:</strong> {event.start_time} {event.end_time ? `— ${event.end_time}` : ''}
              </span>
            </div>

            {/* 3. Venue & Address */}
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#B89047] shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-bold text-[#1B382B]">{event.venue_name}</span>
                <span className="text-xs text-[#756A5E] leading-relaxed mt-0.5">
                  {event.venue_address || event.city}
                </span>
              </div>
            </div>

            {/* 4. Dress Code */}
            {event.dress_code && (
              <div className="flex items-start gap-2.5 pt-1 border-t border-[#EAE0D2]">
                <Shirt className="w-4 h-4 text-[#B89047] shrink-0 mt-0.5" />
                <span className="text-xs text-[#5D5347] font-medium leading-relaxed">
                  <strong className="text-[#1B382B]">Dress Code:</strong> {event.dress_code}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons: Directions & Calendar */}
        <div className="mt-5 pt-4 border-t border-[#EAE0D2] flex flex-wrap items-center justify-between gap-3">
          {event.google_maps_url ? (
            <a
              href={event.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/50 text-[#1B382B] hover:bg-[#1B382B] hover:text-[#FAF8F5] transition-all text-xs font-semibold shadow-sm cursor-pointer group/nav"
            >
              <Navigation className="w-3.5 h-3.5 text-[#B89047] group-hover/nav:text-[#EAD7A5] transition-colors" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-60 group-hover/nav:text-[#FAF8F5]" />
            </a>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCalendar}
              title="Add to Google Calendar"
              className="p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F5EFE6] text-[#1B382B] text-xs transition-colors border border-[#E3D8C4] flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <CalendarPlus className="w-4 h-4 text-[#B89047]" />
              <span className="hidden sm:inline text-[11px] font-mono">Add to Cal</span>
            </button>
            <button
              onClick={handleOpenDetails}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F5EFE6] border border-[#C5A059]/40 text-[#1B382B] font-medium text-xs transition-all cursor-pointer shadow-sm"
            >
              <span>Full Details</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
