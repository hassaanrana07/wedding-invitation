import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Shirt, Sparkles, Navigation, CalendarPlus, ArrowLeft, ExternalLink, Music } from 'lucide-react';
import { fetchEventDetails } from '../../services/api';
import MusicPlayer from '../../components/public/MusicPlayer';
import Footer from '../../components/public/Footer';
import ImageWithFallback from '../../components/ui/ImageWithFallback';
import { useWedding } from '../../context/WeddingContext';

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
      <div className="min-h-screen bg-[#0C0F14] flex flex-col items-center justify-center">
        <Sparkles className="w-8 h-8 text-gold-400 animate-spin-slow mb-3" />
        <p className="font-serif text-xl text-gold-light">Loading Function Details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#0C0F14] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl text-gold-light mb-4">Wedding Function Not Found</h2>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold-500 text-black font-semibold text-xs"
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
    <div className="min-h-screen bg-[#0C0F14] text-[#EFE2C8]">
      <MusicPlayer />

      {/* Hero Header with Background Image */}
      <div className="relative h-[55vh] min-h-[400px] w-full flex items-end justify-center overflow-hidden bg-black">
        <ImageWithFallback
          src={event.cover_image_url || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80'}
          alt={event.name}
          className="absolute inset-0 h-full w-full object-cover brightness-[0.35]"
          containerClassName="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F14] via-[#0C0F14]/60 to-transparent pointer-events-none" />

        {/* Back Link */}
        <Link
          to="/"
          className="absolute top-8 left-6 sm:left-12 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-gold-500/30 text-gold-300 hover:bg-gold-500/20 text-xs font-medium transition-all z-20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Functions</span>
        </Link>

        {/* Hero Title Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12 text-center">
          <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-gold-400 block mb-2">
            Ceremony Details
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold gold-text-gradient mb-2">
            {event.name}
          </h1>
          {event.tagline && (
            <p className="font-serif text-lg sm:text-xl text-cream-200/90 italic">{event.tagline}</p>
          )}
        </div>
      </div>

      {/* Main Details Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="p-8 sm:p-12 rounded-3xl border border-gold-500/25 bg-[#131720]/90 backdrop-blur-xl shadow-2xl space-y-8">
          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 border-b border-gold-500/20">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-gold-500/10 border border-gold-500/20 text-gold-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="font-cinzel text-[11px] uppercase tracking-wider text-gold-400/80 block">
                  Date
                </span>
                <p className="font-serif text-lg font-bold text-gold-light">{formattedDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-gold-500/10 border border-gold-500/20 text-gold-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="font-cinzel text-[11px] uppercase tracking-wider text-gold-400/80 block">
                  Timings
                </span>
                <p className="font-serif text-lg font-bold text-gold-light">
                  {event.start_time} {event.end_time ? `— ${event.end_time}` : ''}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 sm:col-span-2 lg:col-span-1">
              <div className="p-3 rounded-2xl bg-gold-500/10 border border-gold-500/20 text-gold-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-cinzel text-[11px] uppercase tracking-wider text-gold-400/80 block">
                  Venue & City
                </span>
                <p className="font-serif text-lg font-bold text-gold-light">{event.venue_name}</p>
                <p className="text-xs text-cream-400">{event.venue_address || event.city}</p>
              </div>
            </div>
          </div>

          {/* Description & Details */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-gold-light">About This Ceremony</h3>
            <p className="text-cream-300/80 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
              {event.description ||
                'Join us in welcoming our dearest family and friends for an unforgettable evening filled with blessings, laughter, and cherished celebration.'}
            </p>
          </div>

          {/* Dress Code & Special Notes */}
          {(event.dress_code || event.additional_notes || event.music_url) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gold-500/15">
              {event.dress_code && (
                <div className="p-5 rounded-2xl bg-black/40 border border-gold-500/15 flex items-start gap-3.5">
                  <Shirt className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-cinzel text-[11px] uppercase text-gold-400 tracking-wider block">
                      Recommended Dress Code
                    </span>
                    <p className="text-sm text-cream-200 mt-0.5">{event.dress_code}</p>
                  </div>
                </div>
              )}

              {event.music_url && (
                <div className="p-5 rounded-2xl bg-black/40 border border-gold-500/15 flex items-start gap-3.5">
                  <Music className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-cinzel text-[11px] uppercase text-gold-400 tracking-wider block">
                      Ceremony Theme Music
                    </span>
                    <button
                      onClick={() => playCustomTrack(event.music_url, event.name)}
                      className="mt-1 text-xs text-gold-300 hover:text-gold-100 underline flex items-center gap-1 font-semibold"
                    >
                      ▶ Play Audio Track
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action CTAs: Google Maps & Calendar */}
          <div className="pt-6 border-t border-gold-500/20 flex flex-wrap items-center justify-between gap-4">
            {event.google_maps_url ? (
              <a
                href={event.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold text-xs hover:brightness-110 transition-all shadow-lg"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            ) : (
              <div />
            )}

            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/50 border border-gold-500/30 text-gold-300 hover:bg-gold-500/20 text-xs font-semibold transition-all"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Add to Google Calendar</span>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
