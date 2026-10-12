import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, Compass } from 'lucide-react';

export default function VenueMapSection({ events = [] }) {
  if (!events || events.length === 0) return null;

  return (
    <section id="venues" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-cinzel text-xs tracking-[0.3em] uppercase text-gold-400 mb-2"
          >
            Destinations & Directions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient"
          >
            Venues & Locations
          </motion.h2>
          <p className="text-sm sm:text-base text-cream-300/80 max-w-xl mx-auto mt-3 font-light">
            Conveniently located venues across Lahore. Click below to get instant driving directions via Google Maps.
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4" />
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, idx) => (
            <motion.div
              key={event.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-7 rounded-3xl border border-gold-500/20 bg-[#131720]/80 backdrop-blur-md flex flex-col justify-between glass-card-hover"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-cinzel text-xs uppercase tracking-wider text-gold-400 font-semibold">
                    {event.name}
                  </span>
                  <span className="text-xs text-cream-400/80 font-mono">{event.formatted_date || event.event_date}</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-gold-light mb-2">
                  {event.venue_name}
                </h3>

                <p className="text-xs sm:text-sm text-cream-300/80 mb-6 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>{event.venue_address}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-gold-500/15 flex items-center justify-between">
                <span className="text-xs text-gold-400/90 font-medium">City: {event.city || 'Lahore'}</span>
                {event.google_maps_url ? (
                  <a
                    href={event.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold text-xs hover:from-gold-400 hover:to-gold-500 transition-all shadow-md"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-xs text-cream-500">Location map available soon</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
