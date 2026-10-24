import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Navigation,
  CalendarPlus,
  ArrowLeft,
  ExternalLink,
  Music,
} from 'lucide-react';
import { fetchEventDetails } from '../../services/api';
import MusicPlayer from '../../components/public/MusicPlayer';
import Footer from '../../components/public/Footer';
import ImageWithFallback from '../../components/ui/ImageWithFallback';
import { useWedding } from '../../context/WeddingContext';
import { DelicateHeart, FloralDivider } from '../../components/ui/BotanicalOrnaments';

export default function EventDetailPage() {
  const { slug } = useParams();
  const { playCustomTrack } = useWedding();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEventDetails(slug)
      .then((data) => {
        if (data) setEvent(data);
        else setError('Event not found');
      })
      .catch((err) => setError('Event not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCalendar = () => {
    if (!event) return;
    const dateStr = event.event_date;
    const startIso = new Date(`${dateStr}T19:00:00+05:00`).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endIso = new Date(`${dateStr}T23:30:00+05:00`).toISOString().replace(/-|:|\.\d\d\d/g, '');

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.name
    )}&dates=${startIso}/${endIso}&details=${encodeURIComponent(
      event.description || ''
    )}&location=${encodeURIComponent(`${event.venue_name}, ${event.venue_address || event.city}`)}`;

    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#1B382B] flex flex-col items-center justify-center">
        <Sparkles className="w-8 h-8 text-[#B89047] animate-spin-slow mb-3" />
        <p className="font-serif text-xl text-[#1B382B]">Loading Function Details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#1B382B] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl text-[#1B382B] mb-4">Wedding Function Not Found</h2>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1B382B] text-[#FAF8F5] font-semibold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    );
  }

  const formattedDate = event.event_date
    ? new Date(event.event_date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : event.event_date;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1B382B]">
      <MusicPlayer />

      {/* Hero Header with Background Image */}
      <div className="relative h-[55vh] min-h-[400px] w-full flex items-end justify-center overflow-hidden bg-[#F5EFE6]">
        <ImageWithFallback
          src={
            event.cover_image_url ||
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80'
          }
          alt={event.name}
          className="absolute inset-0 h-full w-full object-cover"
          containerClassName="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#1B382B]/60 to-black/40 pointer-events-none" />

        {/* Back Link */}
        <Link
          to="/"
          className="absolute top-8 left-6 sm:left-12 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFDF9]/90 backdrop-blur-md border border-[#C5A059]/40 text-[#1B382B] hover:bg-[#1B382B] hover:text-[#FAF8F5] text-sm font-cinzel font-semibold transition-all z-20 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Functions</span>
        </Link>

        {/* Hero Title Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12 text-center text-white">
          <span className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.25em] text-[#EAD7A5] block mb-2 font-semibold">
            Ceremony Details
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white mb-2 drop-shadow-md">
            {event.name}
          </h1>
          {event.tagline && (
            <p className="font-serif text-lg sm:text-xl text-[#FFFDF9] italic">{event.tagline}</p>
          )}
        </div>
      </div>

      {/* Main Details Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="p-8 sm:p-12 rounded-[36px] border border-[#C5A059]/40 bg-[#FFFDF9] shadow-[0_20px_50px_rgba(27,56,43,0.06)] space-y-8">
          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 border-b border-[#E3D8C4]">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/30 text-[#B89047]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="font-cinzel text-xs sm:text-[13px] uppercase tracking-wider text-[#756A5E] block font-semibold">
                  Date
                </span>
                <p className="font-serif text-lg font-bold text-[#1B382B]">{formattedDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/30 text-[#B89047]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="font-cinzel text-xs sm:text-[13px] uppercase tracking-wider text-[#756A5E] block font-semibold">
                  Timings
                </span>
                <p className="font-serif text-lg font-bold text-[#1B382B]">
                  {event.start_time} {event.end_time ? `— ${event.end_time}` : ''}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 sm:col-span-2 lg:col-span-1">
              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/30 text-[#B89047]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-cinzel text-xs sm:text-[13px] uppercase tracking-wider text-[#756A5E] block font-semibold">
                  Venue & City
                </span>
                <p className="font-serif text-lg font-bold text-[#1B382B]">{event.venue_name}</p>
                <p className="text-sm text-[#756A5E]">{event.venue_address || event.city}</p>
              </div>
            </div>
          </div>

          {/* Description & Details */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#1B382B]">About This Ceremony</h3>
            <p className="text-[#5D5347] text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
              {event.description ||
                'Join us in welcoming our dearest family and friends for an unforgettable evening filled with blessings, laughter, and cherished celebration.'}
            </p>
          </div>

          {/* Special Notes & Theme Music */}
          {(event.additional_notes || event.music_url) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E3D8C4]">
              {event.music_url && (
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E3D8C4] flex items-start gap-3.5">
                  <Music className="w-5 h-5 text-[#B89047] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-cinzel text-[11px] uppercase text-[#756A5E] tracking-wider block font-semibold">
                      Ceremony Theme Music
                    </span>
                    <button
                      onClick={() => playCustomTrack(event.music_url, event.name)}
                      className="mt-1 text-xs text-[#1B382B] hover:text-[#B89047] underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      ▶ Play Audio Track
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action CTAs: Google Maps & Calendar */}
          <div className="pt-6 border-t border-[#E3D8C4] flex flex-wrap items-center justify-between gap-4">
            {event.google_maps_url ? (
              <a
                href={event.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B382B] text-[#FAF8F5] font-semibold text-xs hover:bg-[#264E3D] transition-all shadow-md"
              >
                <Navigation className="w-4 h-4 text-[#EAD7A5]" />
                <span>Get Driving Directions</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            ) : (
              <div />
            )}

            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFFDF9] border border-[#C5A059]/50 text-[#1B382B] hover:bg-[#F5EFE6] text-xs font-semibold transition-all shadow-sm cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4 text-[#B89047]" />
              <span>Add to Google Calendar</span>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
