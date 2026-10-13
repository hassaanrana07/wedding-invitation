import React, { useEffect, useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { fetchEvents } from '../../services/api';
import OpeningSplashScreen from '../../components/public/OpeningSplashScreen';
import MusicPlayer from '../../components/public/MusicPlayer';
import Navbar from '../../components/public/Navbar';
import HeroSection from '../../components/public/HeroSection';
import CoupleSection from '../../components/public/CoupleSection';
import CountdownSection from '../../components/public/CountdownSection';
import QuranicVersePairs from '../../components/public/QuranicVersePairs';
import EventsSection from '../../components/public/EventsSection';
import SpecialGuestsSection from '../../components/public/SpecialGuestsSection';
import QuranicVerseBottom from '../../components/public/QuranicVerseBottom';
import Footer from '../../components/public/Footer';

export default function HomePage() {
  const { wedding } = useWedding();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Guarantee page always starts at top (Hero section) on initial mount or refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    fetchEvents()
      .then((data) => setEvents(data || []))
      .catch((err) => console.error(err));

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1B382B] selection:bg-[#C5A059] selection:text-white">
      {/* 1. Theatrical Opening Experience: Ivory Curtains, Instant Scratch-to-Reveal & Bismillah */}
      <OpeningSplashScreen />

      {/* 2. Floating Wedding Shehnai & Melody Controller */}
      <MusicPlayer />

      {/* 3. Sticky Auto-hiding Ivory & Gold Navigation Bar */}
      <Navbar />

      {/* 4. Reference A: Royal Wedding Invitation with Calligraphy Names & Botanical Arch Framing */}
      <HeroSection />

      {/* 5. Reference C: Wedding Welcome Message, Couple & Parental Lineage */}
      <CoupleSection />

      {/* 6. Reference B: Auspicious Wedding Countdown with Minimal Sophisticated Cards */}
      <CountdownSection />

      {/* 7. Center Quranic Blessing: Surah An-Naba (78:8) - "And We created you in pairs" */}
      <QuranicVersePairs />

      {/* 8. Reference B: Vertical Program Timeline with Connecting Line, Markers & Event Details */}
      <EventsSection events={events} />

      {/* 9. Owner's Family & Honored Dignitaries 3-Person 3D Rotating Carousel */}
      <SpecialGuestsSection />

      {/* 10. Bottom Quranic Du'a: Surah Al-Furqan (25:74) */}
      <QuranicVerseBottom />

      {/* 11. Wedding Footer with Exactly Two Family Contacts, Replay Button & Royal Monogram */}
      <Footer />
    </div>
  );
}
