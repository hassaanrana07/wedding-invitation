/**
 * Wedding of Ahmed Hassan & Ayesha Fatima
 * Centralized Wedding Data & Configuration (100% Frontend-Only)
 * 
 * All wedding details, venues, timings, gallery images, story milestones,
 * family dignitaries, and contact numbers are curated here.
 */

export const weddingData = {
  settings: {
    app_title: 'AHMED & AYESHA',
    couple_title: 'Ahmed & Ayesha',
    bride_name: 'Ayesha Fatima',
    bride_relation: 'Daughter of',
    bride_parents: 'Mr. Muhammad Imran & Mrs. Shazia Imran',
    groom_name: 'Ahmed Hassan',
    groom_relation: 'Son of',
    groom_parents: 'Mr. Muhammad Asif & Mrs. Naila Asif',
    couple_monogram: 'A & H',
    wedding_date: '2027-03-27T19:00:00+05:00',
    wedding_city: 'Lahore, Pakistan',
    timezone: 'Asia/Karachi',
    hero_headline: 'Together with their families',
    hero_subheadline: 'warmly invite you to celebrate the wedding union of Ahmed Hassan & Ayesha Fatima',
    invitation_message: 'With immense gratitude to Allah Almighty and the blessings of our parents, we cordially invite you to celebrate the joyous union of Ahmed & Ayesha. Your gracious presence and prayers will make our celebrations truly unforgettable.',
    intro_story: 'Two souls destined to meet, two hearts destined to beat as one. A celebration of true companionship, shared dreams, family blessings, and endless prayers.',
    hero_image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85',
    couple_image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    contact_email: 'rsvp@ahmed-ayesha.pk',
    contact_phone: '+92 300 0000000',
    footer_text: 'Thank you for being an indispensable part of our story and celebrations. Warmly invited by Muhammad Imran, Shazia Imran, Muhammad Asif, and Naila Asif.',
    hashtag: '#AhmedWedsAyesha',
    custom_slug: 'ahmed-ayesha'
  },

  theme: {
    theme_preset: 'ivory_champagne_luxury',
    primary_color: '#1B382B', // Deep forest green
    secondary_color: '#C5A059', // Antique Royal Gold
    accent_color: '#B89047',
    background_color: '#FAF8F5', // Warm ivory
    surface_color: '#FFFDF9',
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

  // Exactly TWO Wedding Functions: Shanti The Grand & Walima
  events: [
    {
      id: 'event-shandi',
      slug: 'shandi',
      name: 'Shanti The Grand',
      event_day: 'Saturday',
      event_date: '2027-03-27',
      formatted_date: 'Saturday, 27 March 2027',
      start_time: '08:00 PM',
      end_time: '11:30 PM',
      tagline: 'Wedding Celebration & Baraat',
      description: 'The auspicious centerpiece of our celebrations. Under divine blessings, the sacred marriage ceremony will be recited, followed by the grand royal dinner reception welcoming Ahmed, Ayesha, and honored guests.',
      venue_name: 'The Nishat Grand Ballroom (Emporium)',
      venue_address: 'Abdul Haque Road, Commercial Area Phase 2, Johar Town, Lahore, Pakistan',
      city: 'Lahore, Pakistan',
      google_maps_url: 'https://maps.google.com/?q=The+Nishat+Hotel+Johar+Town+Lahore',
      cover_image_url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
      dress_code: 'Royal Formal / Sherwani, Formal Dark Suits & Heavily Embellished Bridal Formals',
      color_palette: 'Emerald Green, Antique Gold, Deep Crimson & Regal Ivory',
      menu_details: 'Royal Mughlai Banquet • Live Barbecue & Mutton Karahi, Roghani Naan, Traditional Kashmiri Chai & Lahori Kheer (Banquet served at 09:45 PM)',
      hospitality_notes: 'Dedicated valet parking at Emporium East Ballroom Gate. Guests are requested to be seated by 08:30 PM.',
      additional_notes: 'Ahmed & Ayesha warmly invite you to share this sacred milestone with prayers and joyous family portraits.',
      program_highlights: 'Baraat Arrival at 8:00 PM • Sacred Ceremony at 8:45 PM • Royal Dinner Banquet at 9:45 PM • Rukhsati at 11:15 PM',
      display_order: 1,
      is_active: 1
    },
    {
      id: 'event-walima',
      slug: 'walima',
      name: 'Walima Grand Reception',
      event_day: 'Sunday',
      event_date: '2027-03-28',
      formatted_date: 'Sunday, 28 March 2027',
      start_time: '08:00 PM',
      end_time: '11:30 PM',
      tagline: 'The Blessed Walima Reception',
      description: 'Hosted with profound gratitude by the Groom’s family to celebrate our new beginning. An enchanting dinner evening filled with heartfelt blessings, exquisite culinary creations, and joyous family portraits.',
      venue_name: 'Defence Raya Golf & Country Club',
      venue_address: 'Phase 6, DHA, Lahore, Punjab, Pakistan',
      city: 'Lahore, Pakistan',
      google_maps_url: 'https://maps.google.com/?q=Defence+Raya+Golf+and+Country+Club+Lahore',
      cover_image_url: 'https://images.unsplash.com/photo-1519225424982-f79a957a0752?auto=format&fit=crop&w=1000&q=80',
      dress_code: 'Formal Black Tie / Tuxedos, Dark Suits, Pastel Chiffons & Raw Silks',
      color_palette: 'Soft Champagne, Slate Blue, Blush Pink & Rose Gold',
      menu_details: 'Continental & Oriental Fusion Buffet • Live Carving Stations, Artisanal Pastries & Starlit Terrace Refreshments (Banquet served at 09:45 PM)',
      hospitality_notes: 'Valet parking available at Main Clubhouse entrance. Live acoustic sitar and shehnai melodies throughout dinner.',
      additional_notes: 'Hosted with profound gratitude by the Groom’s family to celebrate our new beginning.',
      program_highlights: 'Guest Reception at 8:00 PM • Couple Grand Entry at 8:45 PM • Family Felicitations at 9:15 PM • Gourmet Dinner at 9:45 PM',
      display_order: 2,
      is_active: 1
    }
  ],

  // Special Honored Family Members & Dignitaries
  specialGuests: [
    {
      id: 'sp-1',
      name: 'Muhammad Imran',
      relationship: 'Father of the Bride',
      family_side: 'bride',
      contact_phone: '+92 300 0000000',
      secondary_contact: 'Lahore (Demo)',
      photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      display_order: 1,
      is_visible: 1,
      notes: 'Beloved father and guardian of the bride'
    },
    {
      id: 'sp-2',
      name: 'Shazia Imran',
      relationship: 'Mother of the Bride',
      family_side: 'bride',
      contact_phone: '+92 300 0000000',
      secondary_contact: 'Lahore (Demo)',
      photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      display_order: 2,
      is_visible: 1,
      notes: 'Cherished mother and matriarch of the bride’s family'
    },
    {
      id: 'sp-3',
      name: 'Muhammad Asif',
      relationship: 'Father of the Groom',
      family_side: 'groom',
      contact_phone: '+92 300 0000001',
      secondary_contact: 'Lahore (Demo)',
      photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      display_order: 3,
      is_visible: 1,
      notes: 'Respected father and head of the groom’s family'
    },
    {
      id: 'sp-4',
      name: 'Naila Asif',
      relationship: 'Mother of the Groom',
      family_side: 'groom',
      contact_phone: '+92 300 0000001',
      secondary_contact: 'Lahore (Demo)',
      photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      display_order: 4,
      is_visible: 1,
      notes: 'Loving mother welcoming the bride with prayers and warmth'
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
      caption: 'Under the starlit chandeliers at Defence Raya Golf & Country Club.',
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
      description: 'Under the golden autumn peaks of Rakaposhi and a canopy of a million stars, Ahmed asked the question that made two hearts beat forever in unison, promising a lifetime of shared adventures.',
      image_url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
      display_order: 2
    },
    {
      id: 'story-3',
      year: '2027',
      title: 'The Beginning of Forever',
      description: 'Surrounded by our beloved parents, cherished families, and prayers of elders, we pledge our vows and embark on our lifelong voyage as husband and wife under Allah’s boundless mercy.',
      image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      display_order: 3
    }
  ],

  // Verified Venue & Location Directory (Shandi & Walima)
  venues: [
    {
      name: 'The Nishat Grand Ballroom (Emporium)',
      event: 'Shandi',
      date: 'Saturday, March 27, 2027',
      time: '08:00 PM',
      address: 'Abdul Haque Road, Commercial Area Phase 2, Johar Town, Lahore, Pakistan',
      city: 'Lahore',
      google_maps_url: 'https://maps.google.com/?q=The+Nishat+Hotel+Johar+Town+Lahore'
    },
    {
      name: 'Defence Raya Golf & Country Club',
      event: 'Walima',
      date: 'Sunday, March 28, 2027',
      time: '08:00 PM',
      address: 'Phase 6, DHA, Lahore, Punjab, Pakistan',
      city: 'Lahore',
      google_maps_url: 'https://maps.google.com/?q=Defence+Raya+Golf+and+Country+Club+Lahore'
    }
  ],

  // Exactly TWO Verified Family Contacts (Bride's & Groom's Leads - Demo Placeholders)
  contacts: [
    {
      role: "Bride's Family Representative",
      relation: 'Father of the Bride',
      name: 'Muhammad Imran',
      phone: '+92 300 0000000',
      formatted_phone: '+92 300 0000000',
      whatsapp: '923000000000'
    },
    {
      role: "Groom's Family Representative",
      relation: 'Father of the Groom',
      name: 'Muhammad Asif',
      phone: '+92 300 0000001',
      formatted_phone: '+92 300 0000001',
      whatsapp: '923000000001'
    }
  ],

  // Sample Personalized Invitations (Fully functional client-side)
  sampleInvitations: {
    '8f73kd92': {
      id: 'inv-ahmed',
      token: '8f73kd92',
      guest_name: 'Ahmed Khan & Family',
      greeting_title: 'Dear Ahmed & Family,',
      relationship: 'Family & Friends',
      allowed_guests: 4,
      phone: '+92 321 0000000',
      email: 'ahmed.khan@example.com',
      is_vip: 1,
      status: 'pending',
      assigned_events: [
        {
          id: 'event-shandi',
          slug: 'shandi',
          name: 'Shandi',
          event_date: '2027-03-27',
          start_time: '08:00 PM',
          venue_name: 'The Nishat Grand Ballroom (Emporium)',
          venue_address: 'Abdul Haque Road, Commercial Area Phase 2, Johar Town, Lahore',
          dress_code: 'Royal Formal / Sherwani'
        },
        {
          id: 'event-walima',
          slug: 'walima',
          name: 'Walima',
          event_date: '2027-03-28',
          start_time: '08:00 PM',
          venue_name: 'Defence Raya Golf & Country Club',
          venue_address: 'Phase 6, DHA, Lahore',
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
          id: 'event-shandi',
          slug: 'shandi',
          name: 'Shandi',
          event_date: '2027-03-27',
          start_time: '08:00 PM',
          venue_name: 'The Nishat Grand Ballroom (Emporium)',
          venue_address: 'Johar Town, Lahore',
          dress_code: 'Royal Formal / Bridals'
        },
        {
          id: 'event-walima',
          slug: 'walima',
          name: 'Walima',
          event_date: '2027-03-28',
          start_time: '08:00 PM',
          venue_name: 'Defence Raya Golf & Country Club',
          venue_address: 'Phase 6, DHA, Lahore',
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
          id: 'event-shandi',
          slug: 'shandi',
          name: 'Shandi',
          event_date: '2027-03-27',
          start_time: '08:00 PM',
          venue_name: 'The Nishat Grand Ballroom (Emporium)',
          venue_address: 'Johar Town, Lahore',
          dress_code: 'Royal Formal'
        },
        {
          id: 'event-walima',
          slug: 'walima',
          name: 'Walima',
          event_date: '2027-03-28',
          start_time: '08:00 PM',
          venue_name: 'Defence Raya Golf & Country Club',
          venue_address: 'Phase 6, DHA, Lahore',
          dress_code: 'Formal Black Tie'
        }
      ]
    }
  }
};

export default weddingData;
