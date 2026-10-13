import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Users, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

export default function PersonalizedInviteHero({ invitation }) {
  if (!invitation) return null;

  const scrollToEvents = () => {
    const el = document.getElementById('timeline') || document.getElementById('events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative py-12 px-6 bg-gradient-to-b from-[#F5EFE6] via-[#FAF8F5] to-[#FAF8F5] border-b border-[#E3D8C4]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="p-8 sm:p-10 rounded-[32px] border border-[#C5A059]/40 bg-[#FFFDF9] shadow-[0_15px_40px_rgba(27,56,43,0.06)] relative overflow-hidden"
        >
          {/* Top VIP / Personal Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {invitation.is_vip ? (
              <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-[#1B382B] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider font-cinzel">
                <Crown className="w-3.5 h-3.5 text-[#EAD7A5]" />
                Honored VIP Guest
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E3D8C4] text-[#1B382B] text-xs font-medium">
              <Users className="w-3.5 h-3.5 text-[#B89047]" />
              Reserved for up to {invitation.allowed_guests || 2} Guests
            </span>
          </div>

          {/* Personal Greeting */}
          <p className="font-cinzel text-xs tracking-[0.25em] text-[#B89047] uppercase mb-2 font-semibold">
            Personal Invitation
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B382B] mb-3">
            {invitation.greeting_title || `Dear ${invitation.guest_name},`}
          </h1>

          <p className="text-sm sm:text-base text-[#5D5347] font-light max-w-xl mx-auto leading-relaxed">
            You are warmly and cordially invited to celebrate the joyous Pakistani wedding of{' '}
            <strong className="text-[#1B382B] font-serif font-semibold">Rida & Harish</strong>.
          </p>

          {/* Invited Functions Checklist */}
          {invitation.assigned_events && invitation.assigned_events.length > 0 && (
            <div className="my-6 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E3D8C4] max-w-lg mx-auto">
              <span className="text-xs uppercase tracking-wider font-cinzel text-[#756A5E] block mb-2 font-semibold">
                Functions Included in Your Invitation:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {invitation.assigned_events.map((ev) => (
                  <span
                    key={ev.id || ev.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFFDF9] border border-[#C5A059]/40 text-[#1B382B] text-xs font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B89047]" />
                    <span>{ev.name}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button
              onClick={scrollToEvents}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1B382B] hover:bg-[#254A39] text-[#FAF8F5] font-cinzel font-semibold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              <span>View Your Assigned Itinerary</span>
              <ChevronRight className="w-4 h-4 text-[#EAD7A5]" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
