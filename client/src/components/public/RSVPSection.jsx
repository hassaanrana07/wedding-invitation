import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Check,
  X,
  Users,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Heart,
  Utensils,
  Clock,
  Phone,
  Mail
} from 'lucide-react';
import { weddingData } from '../../data/weddingData';
import { postRsvp } from '../../services/api';

export default function RSVPSection({ invitation, onRsvpUpdated }) {
  // Use passed invitation or fallback to a general family guest invitation
  const effectiveInvitation = invitation || {
    id: 'general-guest',
    token: 'general-family-guest',
    guest_name: '',
    greeting_title: 'Dear Honored Guest & Family,',
    relationship: 'Family & Friends',
    allowed_guests: 5,
    is_vip: 0,
    status: 'pending',
    assigned_events: weddingData.events,
  };

  const [attending, setAttending] = useState('attending');
  const [guestName, setGuestName] = useState(effectiveInvitation.guest_name || '');
  const [phone, setPhone] = useState(effectiveInvitation.phone || '');
  const [email, setEmail] = useState(effectiveInvitation.email || '');
  const [guestCount, setGuestCount] = useState(1);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [mealPreference, setMealPreference] = useState('Standard Pakistani Royal Buffet');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const allowedGuests = effectiveInvitation.allowed_guests || 5;
  const assignedEvents = effectiveInvitation.assigned_events || effectiveInvitation.events || weddingData.events || [];

  useEffect(() => {
    if (invitation) {
      setGuestName(invitation.guest_name || '');
      setPhone(invitation.phone || '');
      setEmail(invitation.email || '');

      // If already has RSVP recorded
      if (invitation.rsvp) {
        setAttending(invitation.rsvp.attending || 'attending');
        setGuestCount(invitation.rsvp.guest_count || 1);
        setMealPreference(invitation.rsvp.meal_preference || 'Standard Pakistani Royal Buffet');
        setMessage(invitation.rsvp.message || '');
        try {
          const evs = typeof invitation.rsvp.attending_events === 'string'
            ? JSON.parse(invitation.rsvp.attending_events || '[]')
            : invitation.rsvp.attending_events || [];
          setSelectedEvents(evs);
        } catch (e) {
          setSelectedEvents(assignedEvents.map((e) => e.id));
        }
      } else {
        setSelectedEvents(assignedEvents.map((e) => e.id));
        setGuestCount(Math.min(2, allowedGuests));
      }
    } else {
      // Default for general guest on homepage: all events selected
      setSelectedEvents(weddingData.events.map((e) => e.id));
      setGuestCount(2);

      // Check if general guest already submitted
      try {
        const saved = localStorage.getItem('riha_rsvp_general-family-guest');
        if (saved) {
          const parsed = JSON.parse(saved);
          setGuestName(parsed.guest_name || '');
          setPhone(parsed.phone || '');
          setEmail(parsed.email || '');
          setAttending(parsed.attending || 'attending');
          setGuestCount(parsed.guest_count || 2);
          setMealPreference(parsed.meal_preference || 'Standard Pakistani Royal Buffet');
          setMessage(parsed.message || '');
          if (parsed.attending_events) {
            setSelectedEvents(parsed.attending_events);
          }
        }
      } catch (e) {
        // Ignore
      }
    }
  }, [invitation]);

  const handleGuestCountChange = (count) => {
    const parsed = Math.max(1, Math.min(allowedGuests, count));
    setGuestCount(parsed);
  };

  const toggleEventSelection = (eventId) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter((id) => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!guestName.trim()) {
      setErrorMessage('Please enter your full name or family name.');
      return;
    }

    if (attending === 'attending' && guestCount > allowedGuests) {
      setErrorMessage(`You can RSVP for a maximum of ${allowedGuests} guests.`);
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      await postRsvp(effectiveInvitation.token, {
        guest_name: guestName,
        phone,
        email,
        attending,
        guest_count: attending === 'declined' ? 0 : guestCount,
        attending_events: selectedEvents,
        meal_preference: mealPreference,
        message,
      });

      setSubmitted(true);

      if (attending === 'attending') {
        try {
          if (typeof window !== 'undefined') {
            confetti({
              particleCount: 70,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#C5A059', '#EAD7A5', '#FFF', '#0F2E23'],
              disableForReducedMotion: true,
            });
          }
        } catch (_) {}
      }

      if (onRsvpUpdated) {
        onRsvpUpdated();
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message || 'Failed to submit RSVP.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp-section" className="py-14 sm:py-16 px-4 relative overflow-hidden bg-gradient-to-b from-[#0C0F14] via-[#11161F] to-[#0C0F14]">
      {/* Background Ambient Glow */}
      <div className="ambient-glow w-80 h-80 bg-gold-500/10 bottom-10 right-10 pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10">
        {/* Clean, Compact RSVP Header */}
        <div className="text-center mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold gold-text-gradient">
            Wedding RSVP
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-2" />
        </div>

        {/* Compact RSVP Card Form */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-gold-400/30 bg-[#141822]/90 backdrop-blur-xl p-5 sm:p-7 shadow-2xl shadow-gold-950/40"
        >
          {submitted ? (
            <div className="text-center py-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-3"
              >
                <Check className="w-7 h-7 text-emerald-400" />
              </motion.div>
              <h3 className="font-serif text-2xl font-bold text-gold-light mb-2">
                {attending === 'attending'
                  ? 'Shukriya! RSVP Confirmed'
                  : attending === 'tentative'
                  ? 'Tentative Response Noted'
                  : 'Response Received'}
              </h3>
              <p className="text-xs sm:text-sm text-cream-200/90 max-w-md mx-auto leading-relaxed">
                {attending === 'attending'
                  ? `We are delighted to celebrate with you and your ${guestCount} guest(s). Your presence will make our moments magical!`
                  : attending === 'tentative'
                  ? 'We have recorded your tentative plan. Please feel free to update your RSVP whenever your schedule is finalized.'
                  : 'We will dearly miss you at the celebrations. Thank you for your heartfelt prayers and warm wishes.'}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-5 px-5 py-2 rounded-full border border-gold-400/40 text-gold-300 text-xs hover:bg-gold-500/10 transition-colors"
              >
                Change or Update Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rosewood-950/50 border border-rosewood-500/40 flex items-center gap-2.5 text-rosewood-200 text-xs">
                  <AlertCircle className="w-4 h-4 text-rosewood-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Attending Status Choice (3 Options: Attending, Tentative, Declined) */}
              <div>
                <label className="block font-cinzel text-xs uppercase tracking-wider text-gold-400 mb-3">
                  Will you be celebrating with us?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Option 1: Attending */}
                  <button
                    type="button"
                    onClick={() => setAttending('attending')}
                    className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border transition-all ${
                      attending === 'attending'
                        ? 'border-gold-400 bg-gold-500/15 text-gold-200 shadow-lg shadow-gold-500/10 font-semibold'
                        : 'border-gold-500/20 bg-black/40 text-cream-400 hover:border-gold-500/40'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${attending === 'attending' ? 'text-gold-400' : 'text-cream-500'}`} />
                    <span className="text-xs">Joyfully Accept</span>
                  </button>

                  {/* Option 2: Tentative / Maybe */}
                  <button
                    type="button"
                    onClick={() => setAttending('tentative')}
                    className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border transition-all ${
                      attending === 'tentative'
                        ? 'border-amber-400 bg-amber-500/15 text-amber-200 shadow-lg font-semibold'
                        : 'border-gold-500/20 bg-black/40 text-cream-400 hover:border-gold-500/40'
                    }`}
                  >
                    <Clock className={`w-4 h-4 ${attending === 'tentative' ? 'text-amber-400' : 'text-cream-500'}`} />
                    <span className="text-xs">Maybe / Tentative</span>
                  </button>

                  {/* Option 3: Declined */}
                  <button
                    type="button"
                    onClick={() => setAttending('declined')}
                    className={`flex items-center justify-center gap-2.5 p-3.5 rounded-2xl border transition-all ${
                      attending === 'declined'
                        ? 'border-rosewood-400 bg-rosewood-500/15 text-rosewood-200 shadow-lg font-semibold'
                        : 'border-gold-500/20 bg-black/40 text-cream-400 hover:border-gold-500/40'
                    }`}
                  >
                    <X className={`w-4 h-4 ${attending === 'declined' ? 'text-rosewood-400' : 'text-cream-500'}`} />
                    <span className="text-xs">Regretfully Decline</span>
                  </button>
                </div>
              </div>

              {/* Guest Name & Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-cinzel text-xs uppercase tracking-wider text-gold-400 mb-1.5">
                    Guest / Family Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Honored Guest & Family"
                    className="w-full rounded-xl border border-gold-500/30 bg-black/50 px-4 py-2.5 text-cream-100 placeholder:text-cream-600/50 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-cinzel text-xs uppercase tracking-wider text-gold-400 mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full rounded-xl border border-gold-500/30 bg-black/50 px-4 py-2.5 text-cream-100 placeholder:text-cream-600/50 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-cinzel text-xs uppercase tracking-wider text-gold-400 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="guest@example.com"
                    className="w-full rounded-xl border border-gold-500/30 bg-black/50 px-4 py-2.5 text-cream-100 placeholder:text-cream-600/50 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-sm"
                  />
                </div>
              </div>

              {(attending === 'attending' || attending === 'tentative') && (
                <>
                  {/* Number of Attending Guests */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-cinzel text-xs uppercase tracking-wider text-gold-400">
                        Total Number of Guests Attending
                      </label>
                      <span className="text-xs text-gold-300 font-medium">
                        Allowed Maximum: {allowedGuests} {allowedGuests === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-xl border border-gold-500/30 bg-black/50 p-1">
                        <button
                          type="button"
                          onClick={() => handleGuestCountChange(guestCount - 1)}
                          disabled={guestCount <= 1}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-gold-500/10 text-gold-300 hover:bg-gold-500/20 disabled:opacity-40 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-14 text-center font-cinzel text-lg font-bold text-gold-200">
                          {guestCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleGuestCountChange(guestCount + 1)}
                          disabled={guestCount >= allowedGuests}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-gold-500/10 text-gold-300 hover:bg-gold-500/20 disabled:opacity-40 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs text-cream-400">
                        {guestCount === allowedGuests
                          ? `(Maximum reserved seats: ${allowedGuests})`
                          : `(You can select up to ${allowedGuests} seats)`}
                      </span>
                    </div>
                  </div>

                  {/* Which Functions Attending with Allowances Badges */}
                  {assignedEvents.length > 0 && (
                    <div>
                      <label className="block font-cinzel text-xs uppercase tracking-wider text-gold-400 mb-2">
                        Which ceremonies will you attend?
                      </label>
                      <div className="space-y-2">
                        {assignedEvents.map((ev) => (
                          <label
                            key={ev.id}
                            className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                              selectedEvents.includes(ev.id)
                                ? 'border-gold-400/60 bg-gold-950/30 text-gold-100'
                                : 'border-gold-500/15 bg-black/30 text-cream-400 hover:border-gold-500/30'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={selectedEvents.includes(ev.id)}
                                onChange={() => toggleEventSelection(ev.id)}
                                className="w-4 h-4 rounded border-gold-500/40 text-gold-500 focus:ring-gold-400 accent-gold-500"
                              />
                              <div>
                                <span className="text-sm font-semibold text-gold-200 block">{ev.name}</span>
                                <span className="text-xs text-cream-400/80">
                                  {ev.event_date} • {ev.venue_name}
                                </span>
                              </div>
                            </div>

                            {(ev.family_count || ev.additional_count) && (
                              <span className="text-[10px] font-mono bg-black/50 border border-gold-500/20 px-2.5 py-1 rounded-lg text-gold-300">
                                Quota: {ev.family_count || 1} Fam {ev.additional_count ? `+ ${ev.additional_count} Add` : ''}
                              </span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Meal Preferences */}
                  <div>
                    <label className="block font-cinzel text-xs uppercase tracking-wider text-gold-400 mb-2 flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5" />
                      Meal Preference / Dietary Notes
                    </label>
                    <select
                      value={mealPreference}
                      onChange={(e) => setMealPreference(e.target.value)}
                      className="w-full rounded-xl border border-gold-500/30 bg-black/50 px-4 py-3 text-cream-100 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-sm"
                    >
                      <option value="Standard Pakistani Royal Buffet">Standard Pakistani Royal Buffet (Halal Desi Feasts)</option>
                      <option value="Vegetarian Special">Vegetarian Special (Desi & Continental Veg)</option>
                      <option value="Kids Friendly Non-Spicy">Kids Friendly (Non-Spicy)</option>
                      <option value="Diabetic / Mild Spice">Diabetic Friendly / Mild Spice</option>
                      <option value="Other Dietary Note">Other (Mentioned in Message)</option>
                    </select>
                  </div>
                </>
              )}

              {/* Blessings Message */}
              <div>
                <label className="block font-cinzel text-xs uppercase tracking-wider text-gold-400 mb-2 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rosewood-400" />
                  Heartfelt Prayers & Wishes for the Couple
                </label>
                <textarea
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your prayers, Dua, or congratulatory message for the couple..."
                  className="w-full rounded-xl border border-gold-500/30 bg-black/50 px-4 py-3 text-cream-100 placeholder:text-cream-600/50 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-black font-semibold text-base shadow-xl shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Recording Your RSVP...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Wedding RSVP</span>
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
