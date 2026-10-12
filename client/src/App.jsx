import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WeddingProvider } from './context/WeddingContext';

// Public Wedding Invitation Pages
import HomePage from './pages/public/HomePage';
import PersonalizedInvitePage from './pages/public/PersonalizedInvitePage';
import EventDetailPage from './pages/public/EventDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <WeddingProvider>
        <Routes>
          {/* Public Wedding Invitation Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/invite/:token" element={<PersonalizedInvitePage />} />
          <Route path="/event/:slug" element={<EventDetailPage />} />

          {/* Any other route redirects to the wedding homepage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </WeddingProvider>
    </BrowserRouter>
  );
}
