import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Users, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

export default function PersonalizedInviteHero({ invitation }) {
  if (!invitation) return null;

  const scrollToEvents = () => {
    const el = document.getElementById('events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative py-12 px-6 bg-gradient-to-b from-[#141922] via-[#0C0F14] to-[#0C0F14] border-b border-gold-500/20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="p-8 sm:p-10 rounded-3xl border border-gold-400/40 bg-gradient-to-br from-gold-950/40 via-black/60 to-black/80 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          {/* Top VIP / Personal Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {invitation.is_vip ? (
              <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-gold-500/20 border border-gold-400 text-gold-300 text-xs font-semibold uppercase tracking-wider font-cinzel">
                <Crown className="w-3.5 h-3.5 text-gold-400" />
                Honored VIP Guest
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-cream-500/10 border border-cream-400/30 text-cream-200 text-xs font-medium">
              <Users className="w-3.5 h-3.5 text-gold-400" />
              Reserved for up to {invitation.allowed_guests || 2} Guests
            </span>
          </div>

          {/* Personal Greeting */}
          <p className="font-cinzel text-xs tracking-[0.25em] text-gold-400 uppercase mb-2">
            Personal Invitation
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-light mb-3">
            {invitation.greeting_title || `Dear ${invitation.guest_name},`}
          </h1>

          <p className="text-sm sm:text-base text-cream-200/90 font-light max-w-xl mx-auto leading-relaxed">
            You are warmly and cordially invited to celebrate the joyous Pakistani wedding of{' '}
            <strong className="text-gold-300 font-serif font-semibold">Rida & Harish</strong>.
          </p>

          {/* Invited Functions Checklist */}
          {invitation.assigned_events && invitation.assigned_events.length > 0 && (
            <div className="my-6 p-4 rounded-2xl bg-black/40 border border-gold-500/15 max-w-lg mx-auto">
              <span className="text-xs uppercase tracking-wider font-cinzel text-gold-400/80 block mb-2">
                Functions Included in Your Invitation:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {invitation.assigned_events.map((ev) => (
                  <span
                    key={ev.id || ev.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gold-950/60 border border-gold-500/30 text-gold-200 text-xs font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                    {ev.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-6">
            <button
              onClick={scrollToEvents}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold text-sm hover:from-gold-400 hover:to-gold-500 transition-all shadow-xl shadow-gold-500/20 group cursor-pointer"
            >
              <span>View Ceremonies & Locations</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/50 border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 hover:text-gold-100 transition-all text-xs font-semibold cursor-pointer"
              title="Print or Save Invitation Pass as PDF"
            >
              <FileText className="w-4 h-4 text-gold-400" />
              <span>Print / Save PDF Pass</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
