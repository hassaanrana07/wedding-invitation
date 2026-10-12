import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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

export default function EventCard({ event, index, onSelectEvent }) {
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
      `RIHA: ${event.name}`
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col rounded-3xl border border-gold-500/30 bg-[#13171F] overflow-hidden glass-card-hover shadow-xl hover:shadow-2xl hover:border-gold-400/60 transition-all duration-300"
    >
      {/* Cover Image with Fallback */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-black/60">
        <ImageWithFallback
          src={event.cover_image_url || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'}
          alt={event.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13171F] via-[#13171F]/40 to-transparent pointer-events-none" />

        {/* Function Name Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-gold-400/50 text-gold-200 text-xs font-semibold tracking-wider uppercase font-cinzel shadow-lg">
            <Sparkles className="w-3 h-3 text-gold-400" />
            {event.name}
          </span>
          {eventDay && (
            <span className="px-3 py-1 rounded-full bg-gold-500 text-black text-[11px] font-bold font-mono uppercase tracking-wider shadow">
              {eventDay}
            </span>
          )}
        </div>

        {/* Function Custom Music Pill */}
        {event.music_url && (
          <button
            onClick={() => playCustomTrack(event.music_url, event.name)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-gold-500 text-black hover:scale-110 shadow-lg transition-transform cursor-pointer"
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
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gold-light group-hover:text-gold-300 transition-colors">
              {event.name}
            </h3>
            {event.tagline && (
              <p className="font-serif text-sm text-gold-400/90 italic mt-0.5">{event.tagline}</p>
            )}
          </div>

          {/* PRIMARY "VIEW EVENT DETAILS" BUTTON — Positioned ABOVE Event Information */}
          <div className="my-4">
            <button
              onClick={handleOpenDetails}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-gold-500/20 transition-all cursor-pointer group/btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-black group-hover/btn:rotate-45 transition-transform" />
              <span>View Event Details</span>
              <ChevronRight className="w-4 h-4 text-black group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Meaningful Event Description */}
          <p className="text-cream-300/85 text-xs sm:text-sm leading-relaxed mb-5 font-light">
            {event.description}
          </p>

          {/* Structured Details Matrix */}
          <div className="space-y-3 text-xs sm:text-sm text-cream-200/90 border-t border-gold-500/20 pt-4 bg-black/20 p-4 rounded-2xl border">
            {/* 1. Date & Day */}
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-gold-400 shrink-0" />
              <div>
                <span className="text-gold-300 font-semibold">{formattedDate}</span>
                {eventDay && <span className="text-cream-400/80 ml-1.5 font-mono">({eventDay})</span>}
              </div>
            </div>

            {/* 2. Timing */}
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-gold-400 shrink-0" />
              <span>
                <strong className="text-gold-300">Time:</strong> {event.start_time} {event.end_time ? `— ${event.end_time}` : ''}
              </span>
            </div>

            {/* 3. Venue & Address */}
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-bold text-gold-light">{event.venue_name}</span>
                <span className="text-xs text-cream-400/80 leading-relaxed mt-0.5">
                  {event.venue_address || event.city}
                </span>
              </div>
            </div>

            {/* 4. Program Highlights */}
            {event.program_highlights && (
              <div className="flex items-start gap-2.5 pt-1 border-t border-gold-500/10">
                <ListOrdered className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="text-xs text-cream-300/90 leading-relaxed">
                  <strong className="text-gold-300">Schedule:</strong> {event.program_highlights}
                </span>
              </div>
            )}

            {/* 5. Dress Code */}
            {event.dress_code && (
              <div className="flex items-start gap-2.5 pt-1 border-t border-gold-500/10">
                <Shirt className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="text-xs text-gold-300/95 font-medium leading-relaxed">
                  <strong>Dress Code:</strong> {event.dress_code}
                </span>
              </div>
            )}

            {/* 6. Additional Hospitality Note */}
            {event.additional_notes && (
              <div className="flex items-start gap-2.5 pt-1 border-t border-gold-500/10">
                <Info className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="text-xs text-cream-400/80 italic leading-relaxed">
                  {event.additional_notes}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-4 border-t border-gold-500/20 flex flex-wrap items-center justify-between gap-3">
          {event.google_maps_url ? (
            <a
              href={event.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-950/70 border border-gold-400/40 text-gold-300 hover:text-black hover:bg-gold-400 transition-all text-xs font-semibold shadow cursor-pointer group/nav"
            >
              <Navigation className="w-3.5 h-3.5 text-gold-400 group-hover/nav:text-black transition-colors" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-70 group-hover/nav:text-black" />
            </a>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCalendar}
              title="Add to Google Calendar"
              className="p-2.5 rounded-xl bg-gold-500/15 hover:bg-gold-500/25 text-gold-300 text-xs transition-colors border border-gold-500/30 flex items-center gap-1.5 cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4 text-gold-400" />
              <span className="hidden sm:inline text-[11px] font-mono">Add to Cal</span>
            </button>
            <button
              onClick={handleOpenDetails}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold-950/60 hover:bg-gold-500/20 border border-gold-400/40 text-gold-300 font-medium text-xs transition-all cursor-pointer"
            >
              <span>Full Details</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
