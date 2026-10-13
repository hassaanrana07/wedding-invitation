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
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center text-center p-6 text-[#1B382B]">
        <Sparkles className="w-10 h-10 text-[#B89047] animate-spin-slow mb-4" />
        <h2 className="font-serif text-2xl text-[#1B382B]">Opening Your Royal Invitation...</h2>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center text-center p-6 text-[#1B382B]">
        <div className="max-w-md p-8 rounded-[32px] border border-[#C5A059]/40 bg-[#FFFDF9] shadow-xl">
          <AlertCircle className="w-12 h-12 text-[#B89047] mx-auto mb-4" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B382B] mb-2">
            Invitation Notice
          </h2>
          <p className="text-sm text-[#5D5347] mb-6 leading-relaxed">
            {error || 'Sorry, this invitation link is invalid, expired, or has been revoked.'}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B382B] text-[#FAF8F5] font-semibold text-xs hover:bg-[#254A39] transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Visit Wedding Homepage</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1B382B] selection:bg-[#C5A059] selection:text-white">
      {/* Personalized Envelope Modal */}
      <EnvelopeModal guestName={invitation.greeting_title || invitation.guest_name} />

      {/* Floating Audio Controller */}
      <MusicPlayer />

      {/* Personalized VIP Greeting Banner */}
      <PersonalizedInviteHero invitation={invitation} />

      {/* Full Cinematic Wedding Hero (Reference A: Invitation) */}
      <HeroSection />

      {/* Couple Introduction & Parental Lineage (Reference C: Welcome Message) */}
      <CoupleSection />

      {/* Live Animated Wedding Countdown (Reference B: Countdown Cards) */}
      <CountdownSection />

      {/* Center Quranic Blessing: Surah An-Naba 78:8 */}
      <QuranicVersePairs />

      {/* Assigned Functions Only for this Guest (Reference B: Vertical Program Timeline) */}
      <EventsSection events={invitation.assigned_events || []} isPersonalized={true} />

      {/* Special Honored Family Dignitaries (3-Person 3D Rotating Carousel) */}
      <SpecialGuestsSection />

      {/* Bottom Quranic Du'a: Surah Al-Furqan 25:74 Directly Above Footer */}
      <QuranicVerseBottom />

      {/* Floating WhatsApp Share Strip */}
      <div className="py-8 bg-[#F5EFE6] border-t border-[#E3D8C4] text-center px-4">
        <p className="font-serif italic text-sm text-[#1B382B] mb-3">
          Share your personalized invitation card or invite family members:
        </p>
        <WhatsAppShareButton
          invitationToken={invitation.token}
          guestName={invitation.guest_name}
        />
      </div>

      {/* Lightweight Footer with Exactly Two Family Contacts */}
      <Footer />
    </div>
  );
}
