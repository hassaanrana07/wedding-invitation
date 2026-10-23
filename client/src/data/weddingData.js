/**
 * Wedding of Laraib Ajmal & Mirza Talal Baig
 * Centralized Wedding Data & Configuration (100% Frontend-Only)
 * 
 * All wedding details, venues, timings, gallery images, story milestones,
 * family dignitaries, and contact numbers are curated here.
 */

export const weddingData = {
  settings: {
    app_title: 'LARAIB & TALAL',
    couple_title: 'Laraib Ajmal & Mirza Talal Baig',
    bride_name: 'Laraib Ajmal',
    bride_relation: 'Daughter of',
    bride_parents: 'Muhammad Ajmal',
    groom_name: 'Mirza Talal Baig',
    groom_relation: 'Son of',
    groom_parents: 'Mirza Shahzad Baig',
    couple_monogram: 'L & T',
    wedding_date: '2026-12-12T19:00:00+05:00',
    wedding_city: 'Lahore, Pakistan',
    timezone: 'Asia/Karachi',
    hero_headline: 'Together with their families',
    hero_subheadline: 'warmly invite you to celebrate the wedding union of Laraib Ajmal & Mirza Talal Baig',
    invitation_message: 'With immense gratitude to Allah Almighty and the blessings of our parents, we cordially invite you to celebrate the joyous union of Laraib Ajmal & Mirza Talal Baig. Your gracious presence and prayers will make our celebrations truly unforgettable.',
    intro_story: 'Two souls destined to meet, two hearts destined to beat as one. A celebration of true companionship, shared dreams, family blessings, and endless prayers.',
    hero_image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85',
    couple_image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    contact_email: 'rsvp@laraib-talal.pk',
    contact_phone: '03218464040',
    footer_text: 'Thank you for being an indispensable part of our story and celebrations. Warmly invited by Muhammad Ajmal and Mirza Shahzad Baig.',
    hashtag: '#LaraibWedsTalal',
    custom_slug: 'laraib-talal'
  },

  theme: {
    theme_preset: 'ivory_champagne_luxury',
    primary_color: '#1B382B', // Deep forest green
    secondary_color: '#C5A059', // Antique Royal Gold
    accent_color: '#B89047',
    background_color: '#FAF8F5', // Warm ivory
    surface_color: '#FFFDF9',
    font_display: 'Bodoni Moda',
    font_heading: 'Cormorant Garamond',
    font_script: 'Great Vibes',
    font_body: 'Lora',
    particle_effects: 1,
    border_radius: 'rounded-2xl',
    animation_intensity: 'smooth'
  },

  music: {
    id: 'track-1',
    title: 'Wedding Melody (Harp, Piano & Romantic Strings)',
    artist: 'Francisco Alvear',
    file_url: '/audio/wedding-melody.mp3',
    is_active: 1,
    autoplay_prompt: 1
  },

  // Exactly TWO Wedding Functions: Shehndi & Walima
  events: [
    {
      id: 'event-shehndi',
      slug: 'shehndi',
      name: 'Shehndi Celebrations',
      event_day: 'Saturday',
      event_date: '2026-12-12',
      formatted_date: '12 December 2026',
      start_time: '07:00 PM',
      end_time: '11:00 PM',
      tagline: 'Baraat Arrival, Dinner & Ruksati',
      description: 'The auspicious centerpiece of our celebrations. Under divine blessings, the sacred wedding rituals and celebrations will take place, followed by dinner and heartfelt prayers.',
      venue_name: 'Topaz Marquee',
      venue_address: 'Topaz Marquee, Model Town, Lahore, Pakistan',
      city: 'Lahore, Pakistan',
      google_maps_url: 'https://maps.google.com/?q=Topaz+Marquee+Model+Town+Lahore',
      cover_image_url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
      dress_code: 'Royal Formal / Traditional Embellished Formals & Sherwanis',
      color_palette: 'Emerald Green, Antique Gold, Deep Crimson & Regal Ivory',
      menu_details: 'Royal Mughlai Banquet • Live Barbecue & Traditional Delicacies (Banquet served at 09:00 PM)',
      hospitality_notes: 'Valet parking available at Topaz Marquee entrance. Guests are requested to arrive by 07:00 PM.',
      additional_notes: 'Laraib Ajmal & Mirza Talal Baig warmly invite you to share this sacred milestone with prayers.',
      program_highlights: '07:00 PM Baraat Arrival • 09:00 PM Dinner • 11:00 PM Ruksati',
      display_order: 1,
      is_active: 1
    },
    {
      id: 'event-walima',
      slug: 'walima',
      name: 'Walima Grand Reception',
      event_day: 'Sunday',
      event_date: '2026-12-13',
      formatted_date: '13 December 2026',
      start_time: '06:00 PM',
      end_time: '10:00 PM',
      tagline: 'The Blessed Walima Reception',
      description: 'Hosted with profound gratitude by the Groom’s family to celebrate our new beginning. An enchanting dinner evening filled with heartfelt blessings, culinary creations, and joyous family portraits.',
      venue_name: 'Grand Orchid Farm House (Proposed)',
      venue_address: '7 KM Main Raiwind Road, Near Dubai Town, Lahore (Proposed, Subject to Confirmation)',
      city: 'Lahore, Pakistan',
      google_maps_url: 'https://maps.google.com/?q=Grand+Orchid+Farm+House+Raiwind+Road+Lahore',
      cover_image_url: 'https://images.unsplash.com/photo-1519225424982-f79a957a0752?auto=format&fit=crop&w=1000&q=80',
      dress_code: 'Formal Black Tie / Tuxedos, Dark Suits, Pastel Chiffons & Raw Silks',
      color_palette: 'Soft Champagne, Slate Blue, Blush Pink & Rose Gold',
      menu_details: 'Continental & Oriental Fusion Buffet • Live Carving Stations, Artisanal Pastries',
      hospitality_notes: 'Valet parking available at venue entrance (Proposed venue, subject to confirmation).',
      additional_notes: 'Hosted with profound gratitude by the Groom’s family to celebrate our new beginning. Venue details subject to final confirmation.',
      program_highlights: 'Guest Reception at 06:00 PM • Couple Grand Entry at 07:30 PM • Gourmet Dinner at 08:30 PM',
      display_order: 2,
      is_active: 1
    }
  ],

  // Owner's Family & Honored Dignitaries
  specialGuests: [
    {
      id: 'sp-1',
      name: 'Muhammad Ajmal',
      relationship: 'Father',
      family_side: 'bride',
      contact_phone: '03218464040',
      secondary_contact: 'Lahore',
      display_order: 1,
      is_visible: 1,
      notes: 'Beloved father and guardian of the family'
    },
    {
      id: 'sp-2',
      name: 'Aayaan Ajmal',
      relationship: 'Brother',
      family_side: 'bride',
      contact_phone: '03164632798',
      secondary_contact: 'Lahore',
      display_order: 2,
      is_visible: 1,
      notes: 'Beloved brother extending warmest welcome'
    },
    {
      id: 'sp-3',
      name: 'Hassaan Ajmal',
      relationship: 'Brother',
      family_side: 'bride',
      contact_phone: '03098853177',
      secondary_contact: 'Lahore',
      display_order: 3,
      is_visible: 1,
      notes: 'Beloved brother ensuring gracious hospitality'
    }
  ],

  // 12 Premium Curated Wedding Photographs
  gallery: [
    {
      id: 'gal-1',
      title: 'Golden Hour Serenade',
      caption: 'Moments captured during our pre-wedding portraits in Old Lahore.',
      category: 'Couple',
      collection_type: 'Couple',
      image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
      display_order: 1,
      is_featured: 1
    },
    {
      id: 'gal-2',
      title: 'The Engagement Rings',
      caption: 'A promise of eternal loyalty, understanding, and warmth.',
      category: 'Engagement',
      collection_type: 'Engagement',
      image_url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85',
      display_order: 2,
      is_featured: 1
    },
    {
      id: 'gal-3',
      title: 'Henna & Marigolds',
      caption: 'Vibrant yellows, ubtan aromas, and traditional wedding folk songs.',
      category: 'Shandi',
      collection_type: 'Shandi',
      image_url: 'https://images.unsplash.com/photo-1545232979-fbf68fe9ec92?auto=format&fit=crop&w=1200&q=85',
      display_order: 3,
      is_featured: 0
    },
    {
      id: 'gal-4',
      title: 'Traditional Wedding Beats',
      caption: 'Joyous laughter and rhythmic dholak melodies filling the evening air.',
      category: 'Shandi',
      collection_type: 'Shandi',
      image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
      display_order: 4,
      is_featured: 1
    },
    {
      id: 'gal-5',
      title: 'Royal Baraat Grandeur',
      caption: 'Traditional Pakistani craftsmanship and regal bridal motifs.',
      category: 'Shandi',
      collection_type: 'Shandi',
      image_url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85',
      display_order: 5,
      is_featured: 1
    },
    {
      id: 'gal-6',
      title: 'Walima Elegance',
      caption: 'Under the starlit chandeliers at Topaz Marquee, Model Town, Lahore.',
      category: 'Walima',
      collection_type: 'Walima',
      image_url: 'https://images.unsplash.com/photo-1519225424982-f79a957a0752?auto=format&fit=crop&w=1200&q=85',
      display_order: 6,
      is_featured: 0
    },
    {
      id: 'gal-7',
      title: 'The Solemn Nikkah Pledge',
      caption: 'Sacred vows whispered in prayers, uniting two families with divine blessings.',
      category: 'Shandi',
      collection_type: 'Shandi',
      image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      display_order: 7,
      is_featured: 1
    },
    {
      id: 'gal-8',
      title: 'Bridal Henna & Glass Bangles',
      caption: 'Intricate Pakistani henna patterns and shimmering crimson glass churiyaan.',
      category: 'Shandi',
      collection_type: 'Shandi',
      image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      display_order: 8,
      is_featured: 0
    },
    {
      id: 'gal-9',
      title: 'Regal Sherwani & Velvet Stole',
      caption: 'Classical Lahore bespoke tailoring in gold raw silk and royal ivory.',
      category: 'Groom',
      collection_type: 'Groom',
      image_url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85',
      display_order: 9,
      is_featured: 0
    },
    {
      id: 'gal-10',
      title: 'Heirloom Kundan & Polki Jewelry',
      caption: 'Generational craftsmanship reflecting timeless Pakistani heritage.',
      category: 'Bride',
      collection_type: 'Bride',
      image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
      display_order: 10,
      is_featured: 1
    },
    {
      id: 'gal-11',
      title: 'Rose Petal Shower & Welcome',
      caption: 'Welcoming the wedding party with fragrant desi gulab and Shehnai harmonies.',
      category: 'Celebration',
      collection_type: 'Couple',
      image_url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
      display_order: 11,
      is_featured: 0
    },
    {
      id: 'gal-12',
      title: 'Starlit Evening Toasts',
      caption: 'Surrounded by family blessings, heartfelt speeches, and timeless warmth.',
      category: 'Walima',
      collection_type: 'Walima',
      image_url: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=85',
      display_order: 12,
      is_featured: 1
    }
  ],

  // Story Timeline
  story: [
    {
      id: 'story-1',
      year: '2020',
      title: 'When Our Paths Crossed',
      description: 'A serendipitous introduction at a rooftop literary cafe in Gulberg, Lahore. What began as a spirited discussion on classical Urdu poetry turned into hours of effortless laughter and instant companionship.',
      image_url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
      display_order: 1
    },
    {
      id: 'story-2',
      year: '2023',
      title: 'The Proposal in Hunza',
      description: 'Under the golden autumn peaks of Rakaposhi and a canopy of a million stars, Talal asked the question that made two hearts beat forever in unison, promising a lifetime of shared adventures.',
      image_url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
      display_order: 2
    },
    {
      id: 'story-3',
      year: '2026',
      title: 'The Beginning of Forever',
      description: 'Surrounded by our beloved parents, cherished families, and prayers of elders, we pledge our vows and embark on our lifelong voyage as husband and wife under Allah’s boundless mercy.',
      image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      display_order: 3
    }
  ],

  // Verified Venue & Location Directory (Shehndi & Walima)
  venues: [
    {
      name: 'Topaz Marquee, Model Town, Lahore',
      event: 'Shehndi',
      date: 'Saturday, 12 December 2026',
      time: '07:00 PM',
      address: 'Topaz Marquee, Model Town, Lahore, Pakistan',
      city: 'Lahore',
      google_maps_url: 'https://maps.google.com/?q=Topaz+Marquee+Model+Town+Lahore'
    },
    {
      name: 'Topaz Marquee, Model Town, Lahore',
      event: 'Walima',
      date: 'Sunday, 13 December 2026',
      time: '06:00 PM',
      address: 'Topaz Marquee, Model Town, Lahore, Pakistan',
      city: 'Lahore',
      google_maps_url: 'https://maps.google.com/?q=Topaz+Marquee+Model+Town+Lahore'
    }
  ],

  // Family Contacts (Father & Brothers)
  contacts: [
    {
      role: "Father of the Bride",
      relation: 'Father',
      name: 'Muhammad Ajmal',
      phone: '03218464040',
      formatted_phone: '03218464040',
      whatsapp: '923218464040'
    },
    {
      role: "Brother of the Bride",
      relation: 'Brother',
      name: 'Aayaan Ajmal',
      phone: '03164632798',
      formatted_phone: '03164632798',
      whatsapp: '923164632798'
    },
    {
      role: "Brother of the Bride",
      relation: 'Brother',
      name: 'Hassaan Ajmal',
      phone: '03098853177',
      formatted_phone: '03098853177',
      whatsapp: '923098853177'
    }
  ],

  // Sample Personalized Invitations (Fully functional client-side)
  sampleInvitations: {
    '8f73kd92': {
      id: 'inv-ali',
      token: '8f73kd92',
      guest_name: 'Ali Khan & Family',
      greeting_title: 'Dear Ali & Family,',
      relationship: 'Family & Friends',
      allowed_guests: 4,
      phone: '+92 321 0000000',
      email: 'ali.khan@example.com',
      is_vip: 1,
      status: 'pending',
      assigned_events: [
        {
          id: 'event-shehndi',
          slug: 'shehndi',
          name: 'Shehndi Celebrations',
          event_date: '2026-12-12',
          start_time: '07:00 PM',
          venue_name: 'Topaz Marquee',
          venue_address: 'Topaz Marquee, Model Town, Lahore',
          dress_code: 'Royal Formal / Sherwani'
        },
        {
          id: 'event-walima',
          slug: 'walima',
          name: 'Walima Grand Reception',
          event_date: '2026-12-13',
          start_time: '06:00 PM',
          venue_name: 'Topaz Marquee',
          venue_address: 'Topaz Marquee, Model Town, Lahore',
          dress_code: 'Formal Black Tie / Dark Suits'
        }
      ]
    },
    'fatima-malik-4m9a': {
      id: 'inv-fatima',
      token: 'fatima-malik-4m9a',
      guest_name: 'Dr. Fatima Malik',
      greeting_title: 'Respected Dr. Fatima Malik,',
      relationship: 'Family & Friends',
      allowed_guests: 2,
      phone: '+92 333 0000000',
      email: 'fatima.malik@example.com',
      is_vip: 1,
      status: 'confirmed',
      assigned_events: [
        {
          id: 'event-shehndi',
          slug: 'shehndi',
          name: 'Shehndi Celebrations',
          event_date: '2026-12-12',
          start_time: '07:00 PM',
          venue_name: 'Topaz Marquee',
          venue_address: 'Topaz Marquee, Model Town, Lahore',
          dress_code: 'Royal Formal / Bridals'
        },
        {
          id: 'event-walima',
          slug: 'walima',
          name: 'Walima Grand Reception',
          event_date: '2026-12-13',
          start_time: '06:00 PM',
          venue_name: 'Topaz Marquee',
          venue_address: 'Topaz Marquee, Model Town, Lahore',
          dress_code: 'Formal Black Tie'
        }
      ]
    },
    'usman-tariq-7q2b': {
      id: 'inv-usman',
      token: 'usman-tariq-7q2b',
      guest_name: 'Uncle Usman & Family',
      greeting_title: 'Respected Uncle Usman & Dearest Family,',
      relationship: 'Family & Friends',
      allowed_guests: 5,
      phone: '+92 300 0000000',
      email: 'usman.tariq@example.com',
      is_vip: 1,
      status: 'confirmed',
      assigned_events: [
        {
          id: 'event-shehndi',
          slug: 'shehndi',
          name: 'Shehndi Celebrations',
          event_date: '2026-12-12',
          start_time: '07:00 PM',
          venue_name: 'Topaz Marquee',
          venue_address: 'Topaz Marquee, Model Town, Lahore',
          dress_code: 'Royal Formal'
        },
        {
          id: 'event-walima',
          slug: 'walima',
          name: 'Walima Grand Reception',
          event_date: '2026-12-13',
          start_time: '06:00 PM',
          venue_name: 'Topaz Marquee',
          venue_address: 'Topaz Marquee, Model Town, Lahore',
          dress_code: 'Formal Black Tie'
        }
      ]
    }
  }
};

export default weddingData;
