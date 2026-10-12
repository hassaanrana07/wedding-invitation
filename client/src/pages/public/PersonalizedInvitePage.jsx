import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, AlertCircle, Home } from 'lucide-react';
import { fetchInvitation } from '../../services/api';
import EnvelopeModal from '../../components/public/EnvelopeModal';
import MusicPlayer from '../../components/public/MusicPlayer';
import PersonalizedInviteHero from '../../components/public/PersonalizedInviteHero';
import HeroSection from '../../components/public/HeroSection';
import CoupleSection from '../../components/public/CoupleSection';
import QuranicVersePairs from '../../components/public/QuranicVersePairs';
import SpecialGuestsSection from '../../components/public/SpecialGuestsSection';
import CountdownSection from '../../components/public/CountdownSection';
import EventsSection from '../../components/public/EventsSection';
import OurStoryTimeline from '../../components/public/OurStoryTimeline';
import QuranicVerseBottom from '../../components/public/QuranicVerseBottom';
import WhatsAppShareButton from '../../components/public/WhatsAppShareButton';
import Footer from '../../components/public/Footer';

export default function PersonalizedInvitePage() {
  const { token } = useParams();
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadInvite = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchInvitation(token);
      if (data) {
        setInvitation(data);
      } else {
        setError('Sorry, this invitation is no longer available.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Sorry, this invitation is no longer available.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadInvite();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C0F14] flex flex-col items-center justify-center text-center p-6">
        <Sparkles className="w-10 h-10 text-gold-400 animate-spin-slow mb-4" />
        <h2 className="font-serif text-2xl text-gold-light">Opening Your Royal Invitation...</h2>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen bg-[#0C0F14] flex flex-col items-center justify-center text-center p-6 text-[#EFE2C8]">
        <div className="max-w-md p-8 rounded-3xl border border-gold-500/20 bg-[#121622] shadow-2xl">
          <AlertCircle className="w-12 h-12 text-gold-400 mx-auto mb-4" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-light mb-2">
            Invitation Notice
          </h2>
          <p className="text-sm text-cream-300/80 mb-6 leading-relaxed">
            {error || 'Sorry, this invitation link is invalid, expired, or has been revoked.'}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-500 text-black font-semibold text-xs hover:bg-gold-400 transition-colors shadow-lg"
          >
            <Home className="w-4 h-4" />
            <span>Visit Wedding Homepage</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0F14] text-[#EFE2C8] selection:bg-gold-500 selection:text-black">
      {/* Personalized Envelope Modal */}
      <EnvelopeModal guestName={invitation.greeting_title || invitation.guest_name} />

      {/* Floating Audio Controller */}
      <MusicPlayer />

      {/* Personalized VIP Greeting Banner */}
      <PersonalizedInviteHero invitation={invitation} />

      {/* Full Cinematic Wedding Hero (with Top Quranic Verse: Surah Ar-Rum 30:21) */}
      <HeroSection />

      {/* Live Animated Wedding Countdown */}
      <CountdownSection />

      {/* Couple Introduction & Parental Lineage */}
      <CoupleSection />

      {/* Center Quranic Blessing: Surah An-Naba 78:8 */}
      <QuranicVersePairs />

      {/* Special Honored Family Dignitaries */}
      <SpecialGuestsSection />

      {/* Assigned Functions Only for this Guest (with integrated venues and Google Maps directions) */}
      <EventsSection events={invitation.assigned_events || []} isPersonalized={true} />

      {/* Our Story & Milestones (Preserved) */}
      <OurStoryTimeline />

      {/* Bottom Quranic Du'a: Surah Al-Furqan 25:74 Directly Above Footer */}
      <QuranicVerseBottom />

      {/* Floating WhatsApp Share Strip */}
      <div className="py-8 bg-black/60 border-t border-gold-500/15 text-center px-4">
        <p className="font-serif text-sm text-gold-300 mb-3">
          Share your personalized invitation card or invite family members:
        </p>
        <WhatsAppShareButton
          invitationToken={invitation.token}
          guestName={invitation.guest_name}
        />
      </div>

      {/* Lightweight Footer */}
      <Footer />
    </div>
  );
}
