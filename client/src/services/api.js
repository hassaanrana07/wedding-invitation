/**
 * Wedding Local Data Service
 * Provides instant local data access and client-side localStorage persistence.
 */

import { weddingData } from '../data/weddingData';

// Public Data Methods
export async function fetchWeddingData() {
  return {
    settings: weddingData.settings,
    theme: weddingData.theme,
    music: weddingData.music,
    specialGuests: weddingData.specialGuests,
  };
}

export async function fetchEvents() {
  return [...weddingData.events].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
}

export async function fetchEventDetails(slug) {
  const event = weddingData.events.find((e) => e.slug === slug || e.id === slug);
  return event || null;
}

export async function fetchSpecialGuests() {
  return [...weddingData.specialGuests].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
}

export async function fetchInvitation(token) {
  if (!token) return null;

  // Check if predefined in sample invitations
  let invite = weddingData.sampleInvitations[token];

  // If not predefined, create a friendly fallback invitation for any custom token
  if (!invite) {
    invite = {
      id: `inv-${token}`,
      token: token,
      guest_name: 'Respected Guest & Family',
      greeting_title: 'Dear Honored Guest & Family,',
      relationship: 'Family & Friends',
      allowed_guests: 4,
      is_vip: 0,
      status: 'pending',
      assigned_events: weddingData.events
    };
  }

  // Check localStorage for any existing RSVP submission
  try {
    const savedRsvp = localStorage.getItem(`riha_rsvp_${token}`);
    if (savedRsvp) {
      const parsed = JSON.parse(savedRsvp);
      invite = {
        ...invite,
        status: parsed.attending === 'declined' ? 'declined' : 'confirmed',
        rsvp: parsed
      };
    }
  } catch (e) {
    // Ignore storage errors
  }

  return invite;
}

export function getInvitationPdfUrl(token) {
  // Client-side print-friendly trigger
  return '#';
}

export async function postRsvp(token, data) {
  try {
    localStorage.setItem(`riha_rsvp_${token}`, JSON.stringify({
      ...data,
      submitted_at: new Date().toISOString()
    }));
  } catch (e) {
    console.warn('Could not store RSVP in localStorage:', e);
  }

  return {
    success: true,
    message: 'Your RSVP has been gratefully received. Thank you for celebrating with us!'
  };
}

export async function fetchGallery(collection = '') {
  let list = [...weddingData.gallery];
  if (collection && collection !== 'All' && collection !== 'all') {
    const term = collection.toLowerCase();
    list = list.filter((item) =>
      item.collection_type?.toLowerCase() === term ||
      item.category?.toLowerCase() === term
    );
  }
  return list.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
}

export async function fetchStory() {
  return [...weddingData.story].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
}

export async function fetchActiveMusic() {
  return weddingData.music;
}

export default {
  fetchWeddingData,
  fetchEvents,
  fetchEventDetails,
  fetchSpecialGuests,
  fetchInvitation,
  postRsvp,
  fetchGallery,
  fetchStory,
  fetchActiveMusic,
};
