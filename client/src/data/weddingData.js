/**
 * RIHA — Wedding of Rida & Harish
 * Centralized Wedding Data & Configuration (100% Frontend-Only)
 * 
 * All wedding details, venues, timings, gallery images, story milestones,
 * family dignitaries, and contact numbers are curated here.
 */

export const weddingData = {
  settings: {
    app_title: 'RIHA',
    couple_title: 'Rida & Harish',
    bride_name: 'Rida Sami',
    bride_relation: 'Daughter of',
    bride_parents: 'Mr. and Mrs. Rana Sami-ul-Aziz Khan',
    groom_name: 'Harish Hassan',
    groom_relation: 'Son of',
    groom_parents: 'Mr. and Mrs. Shameem Rana',
    couple_monogram: 'R & H',
    wedding_date: '2027-03-27T19:00:00+05:00',
    wedding_city: 'Lahore, Pakistan',
    timezone: 'Asia/Karachi',
    hero_headline: 'Together with their families',
    hero_subheadline: 'warmly invite you to celebrate their union of love and togetherness',
    invitation_message: 'With immense gratitude to Allah Almighty and the blessings of our parents, we cordially invite you to celebrate the joyous union of Rida & Harish. Your gracious presence and prayers will make our celebrations truly unforgettable.',
    intro_story: 'Two souls destined to meet, two hearts destined to beat as one. From college debates to quiet coffees in Gulberg, through travels across northern peaks to the warmth of family dinners — our story is a celebration of true companionship, shared dreams, and endless laughter.',
    hero_image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85',
    couple_image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    contact_email: 'rsvp@riha.pk',
    contact_phone: '+92 300 1234567',
    footer_text: 'Thank you for being an indispensable part of our story and celebrations. Made with love for Rida & Harish.',
    hashtag: '#RidaWedsHarish',
    custom_slug: 'rida-harish'
  },

  theme: {
    theme_preset: 'royal_gold',
    primary_color: '#C5A059',
    secondary_color: '#0F2E23',
    accent_color: '#EAD7A5',
    background_color: '#0C0F14',
    font_heading: 'Cormorant Garamond',
    font_body: 'Plus Jakarta Sans',
    particle_effects: 1,
    border_radius: 'rounded-2xl',
    animation_intensity: 'medium'
  },

  music: {
    id: 'track-1',
    title: 'Royal Wedding March & Sitar Harmony (Instrumental)',
    artist: 'Traditional Shehnai & Strings Ensemble',
    file_url: '/audio/wedding-melody.mp3',
    is_active: 1,
    autoplay_prompt: 1
  },

  // 4 Traditional Pakistani Wedding Functions (Official March 2027 Schedule)
  events: [
    {
      id: 'event-mayun',
      slug: 'mayun',
      name: 'Mayun & Dholki',
      event_day: 'Wednesday',
      event_date: '2027-03-24',
      formatted_date: 'Wednesday, 24 March 2027',
      start_time: '06:30 PM',
      end_time: '10:30 PM',
      tagline: 'Haldi, Ubtan & Traditional Folk Geet',
      description: 'An intimate, vibrant pre-wedding evening celebrating timeless family heritage. The ceremony features fragrant ubtan and haldi application, lively dholak rhythms, traditional folk singing, and joyous family bonding.',
      venue_name: 'The Royal Palm Golf & Country Club',
      venue_address: '52 Canal Bank Road, Cantt, Lahore, Punjab, Pakistan',
      city: 'Lahore, Pakistan',
      google_maps_url: 'https://maps.google.com/?q=Royal+Palm+Golf+and+Country+Club+Lahore',
      cover_image_url: 'https://images.unsplash.com/photo-1545232979-fbf68fe9ec92?auto=format&fit=crop&w=1000&q=80',
      dress_code: 'Sunshine Yellow, Mustard, Gold & Traditional Kurta Pajama',
      additional_notes: 'Traditional floor seating with dholak and desi chai station. Complimentary valet parking at Canal Bank Entrance.',
      program_highlights: 'Ubtan Ceremony at 7:00 PM • Traditional Dholki at 8:00 PM • Desi Folk Feast at 9:15 PM',
      display_order: 1,
      is_active: 1
    },
    {
      id: 'event-mehndi',
      slug: 'mehndi',
      name: 'Mehndi Rung',
      event_day: 'Friday',
      event_date: '2027-03-26',
      formatted_date: 'Friday, 26 March 2027',
      start_time: '07:30 PM',
      end_time: '12:00 AM',
      tagline: 'Music, Dance Performances & Henna Night',
      description: 'An exhilarating night of vibrant festive colors, friendly family dance face-offs between Ladkewale & Ladkiwale, intricate henna application, and authentic Lahore street-food live counters.',
      venue_name: 'Pearl Continental Grand Marquee',
      venue_address: 'Shahrah-e-Quaid-e-Azam, Mall Road, Lahore, Pakistan',
      city: 'Lahore, Pakistan',
      google_maps_url: 'https://maps.google.com/?q=Pearl+Continental+Hotel+Lahore',
      cover_image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
      dress_code: 'Festive Jewel Tones, Emerald Green, Bright Orange, Shararas & Waistcoats',
      additional_notes: 'Professional henna artists available throughout the evening. Dance performances begin at 09:30 PM sharp.',
      program_highlights: 'Henna Lounge opens at 7:30 PM • Grand Couple Entry at 8:30 PM • Dance Face-Off at 9:30 PM • Midnight Food Street at 10:30 PM',
      display_order: 2,
      is_active: 1
    },
    {
      id: 'event-baraat',
      slug: 'baraat',
      name: 'The Baraat & Nikkah',
      event_day: 'Saturday',
      event_date: '2027-03-27',
      formatted_date: 'Saturday, 27 March 2027',
      start_time: '08:00 PM',
      end_time: '11:30 PM',
      tagline: 'The Grand Wedding Day & Solemn Nikkah',
      description: 'The auspicious centerpiece of our celebrations. Under divine blessings, the solemn Nikkah ceremony will be recited, followed by the grand royal dinner reception welcoming Harish, Rida, and honored guests.',
      venue_name: 'The Nishat Grand Ballroom (Emporium)',
      venue_address: 'Abdul Haque Road, Commercial Area Phase 2, Johar Town, Lahore, Pakistan',
      city: 'Lahore, Pakistan',
      google_maps_url: 'https://maps.google.com/?q=The+Nishat+Hotel+Johar+Town+Lahore',
      cover_image_url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
      dress_code: 'Royal Formal / Sherwani, Formal Dark Suits & Heavily Embellished Bridal Formals',
      additional_notes: 'Seerat-un-Nabi recital and Nikkah at 8:45 PM sharp. Dedicated valet parking at Emporium East Ballroom Gate.',
      program_highlights: 'Baraat Arrival at 8:00 PM • Sacred Nikkah at 8:45 PM • Royal Dinner Banquet at 9:45 PM • Rukhsati at 11:15 PM',
      display_order: 3,
      is_active: 1
    },
    {
      id: 'event-walima',
      slug: 'walima',
      name: 'The Walima Reception',
      event_day: 'Sunday',
      event_date: '2027-03-28',
      formatted_date: 'Sunday, 28 March 2027',
      start_time: '08:00 PM',
      end_time: '11:30 PM',
      tagline: 'An Evening of Elegance & Gratitude',
      description: 'Hosted with profound gratitude by the Groom’s family to celebrate our new beginning. An enchanting dinner evening filled with heartfelt speeches, exquisite culinary creations, and joyous family portraits.',
      venue_name: 'Defence Raya Golf & Country Club',
      venue_address: 'Phase 6, DHA, Lahore, Punjab, Pakistan',
      city: 'Lahore, Pakistan',
      google_maps_url: 'https://maps.google.com/?q=Defence+Raya+Golf+and+Country+Club+Lahore',
      cover_image_url: 'https://images.unsplash.com/photo-1519225424982-f79a957a0752?auto=format&fit=crop&w=1000&q=80',
      dress_code: 'Formal Black Tie / Tuxedos, Dark Suits, Pastel Chiffons & Raw Silks',
      additional_notes: 'Live acoustic instrumental sitar and shehnai melodies throughout the dinner. Valet available at Main Clubhouse entrance.',
      program_highlights: 'Guest Reception at 8:00 PM • Couple Grand Entry at 8:45 PM • Family Felicitations at 9:15 PM • Gourmet Dinner at 9:45 PM',
      display_order: 4,
      is_active: 1
    }
  ],

  // Special Honored Family Members & Dignitaries
  specialGuests: [
    {
      id: 'sp-1',
      name: 'Rana Zawar Sami',
      relationship: 'Brother of the Bride',
      family_side: 'bride',
      contact_phone: '+92 300 1122334',
      secondary_contact: 'Islamabad Residence',
      photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      display_order: 1,
      is_visible: 1,
      notes: 'Chief Guest Coordinator for Barat Seating'
    },
    {
      id: 'sp-2',
      name: 'Begum Perveen Malik',
      relationship: 'Paternal Grandmother (Dadi Ammi)',
      family_side: 'bride',
      contact_phone: '+92 321 5566778',
      secondary_contact: 'Lahore Cantt',
      photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      display_order: 2,
      is_visible: 1,
      notes: 'Family Matriarch & Spiritual Guardian'
    },
    {
      id: 'sp-3',
      name: 'Mr. Ahmed Sami Khan',
      relationship: 'Brother of the Bride',
      family_side: 'bride',
      contact_phone: '+92 333 9988776',
      secondary_contact: 'Karachi',
      photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      display_order: 3,
      is_visible: 1,
      notes: 'Ladkiwalay Event Lead & Hospitality Head'
    },
    {
      id: 'sp-4',
      name: 'Dr. Shahzad Hassan',
      relationship: 'Elder Brother of the Groom',
      family_side: 'groom',
      contact_phone: '+92 301 4433221',
      secondary_contact: 'Dubai',
      photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      display_order: 4,
      is_visible: 1,
      notes: 'Walima Stage Host & Ladkewale Reception Lead'
    },
    {
      id: 'sp-5',
      name: 'Mr. Tariq Rana',
      relationship: 'Maternal Uncle (Mamoo Jaan)',
      family_side: 'groom',
      contact_phone: '+92 324 5688745',
      secondary_contact: 'Lahore',
      photo_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      display_order: 5,
      is_visible: 1,
      notes: 'Barat Ceremony Coordinator & Elder'
    },
    {
      id: 'sp-6',
      name: 'Rana Usman Saeed',
      relationship: 'Brother-in-Law',
      family_side: 'bride',
      contact_phone: '+92 300 8765432',
      secondary_contact: 'Lahore',
      photo_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      display_order: 6,
      is_visible: 1,
      notes: 'Guest Welcome & Transport Lead'
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
      caption: 'Vibrant yellows, ubtan aromas, and traditional folk songs.',
      category: 'Mayun',
      collection_type: 'Mehndi',
      image_url: 'https://images.unsplash.com/photo-1545232979-fbf68fe9ec92?auto=format&fit=crop&w=1200&q=85',
      display_order: 3,
      is_featured: 0
    },
    {
      id: 'gal-4',
      title: 'Mehndi Rung Beats',
      caption: 'Joyous laughter and rhythmic dholak melodies filling the evening air.',
      category: 'Mehndi',
      collection_type: 'Mehndi',
      image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
      display_order: 4,
      is_featured: 1
    },
    {
      id: 'gal-5',
      title: 'Royal Baraat Grandeur',
      caption: 'Traditional Pakistani craftsmanship and regal bridal motifs.',
      category: 'Baraat',
      collection_type: 'Baraat',
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
      category: 'Baraat',
      collection_type: 'Baraat',
      image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      display_order: 7,
      is_featured: 1
    },
    {
      id: 'gal-8',
      title: 'Bridal Henna & Glass Bangles',
      caption: 'Intricate Pakistani mehndi patterns and shimmering crimson glass churiyaan.',
      category: 'Mehndi',
      collection_type: 'Mehndi',
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
      description: 'Under the golden autumn peaks of Rakaposhi and a canopy of a million stars, Harish asked the question that made two hearts beat forever in unison, promising a lifetime of shared adventures.',
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

  // Verified Venue & Location Directory
  venues: [
    {
      name: 'The Nishat Grand Ballroom (Emporium)',
      event: 'The Baraat & Nikkah Ceremony',
      date: 'Saturday, March 27, 2027',
      time: '08:00 PM',
      address: 'Abdul Haque Road, Commercial Area Phase 2, Johar Town, Lahore, Pakistan',
      city: 'Lahore',
      google_maps_url: 'https://maps.google.com/?q=The+Nishat+Hotel+Johar+Town+Lahore'
    },
    {
      name: 'Defence Raya Golf & Country Club',
      event: 'The Walima Reception',
      date: 'Sunday, March 28, 2027',
      time: '08:00 PM',
      address: 'Phase 6, DHA, Lahore, Punjab, Pakistan',
      city: 'Lahore',
      google_maps_url: 'https://maps.google.com/?q=Defence+Raya+Golf+and+Country+Club+Lahore'
    },
    {
      name: 'Pearl Continental Grand Marquee',
      event: 'Mehndi Rung',
      date: 'Friday, March 26, 2027',
      time: '07:30 PM',
      address: 'Shahrah-e-Quaid-e-Azam, Mall Road, Lahore, Pakistan',
      city: 'Lahore',
      google_maps_url: 'https://maps.google.com/?q=Pearl+Continental+Hotel+Lahore'
    },
    {
      name: 'The Royal Palm Golf & Country Club',
      event: 'Mayun & Dholki',
      date: 'Wednesday, March 24, 2027',
      time: '06:30 PM',
      address: '52 Canal Bank Road, Cantt, Lahore, Punjab, Pakistan',
      city: 'Lahore',
      google_maps_url: 'https://maps.google.com/?q=Royal+Palm+Golf+and+Country+Club+Lahore'
    }
  ],

  // 4 Verified Family Contacts for the Footer
  contacts: [
    {
      role: "Bride's Family Lead (Ladkiwalay)",
      name: 'Mr. Ahmed Sami Khan',
      phone: '+92 333 9988776',
      formatted_phone: '+92 333 9988776'
    },
    {
      role: "Groom's Family Lead (Ladkewale)",
      name: 'Dr. Shahzad Hassan',
      phone: '+92 301 4433221',
      formatted_phone: '+92 301 4433221'
    },
    {
      role: 'Baraat Seating & Dignitaries',
      name: 'Mr. Tariq Rana',
      phone: '+92 300 1122334',
      formatted_phone: '+92 300 1122334'
    },
    {
      role: 'Wedding Concierge & RSVP Desk',
      name: 'Rana Usman Saeed',
      phone: '+92 300 1234567',
      formatted_phone: '+92 300 1234567'
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
      phone: '+92 321 9876543',
      email: 'ahmed.khan@example.com',
      is_vip: 1,
      status: 'pending',
      assigned_events: [
        {
          id: 'event-baraat',
          slug: 'baraat',
          name: 'The Baraat & Nikkah',
          event_date: '2027-03-27',
          start_time: '08:00 PM',
          venue_name: 'The Nishat Grand Ballroom (Emporium)',
          venue_address: 'Abdul Haque Road, Commercial Area Phase 2, Johar Town, Lahore',
          dress_code: 'Royal Formal / Sherwani'
        },
        {
          id: 'event-walima',
          slug: 'walima',
          name: 'The Walima Reception',
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
      phone: '+92 333 4567890',
      email: 'fatima.malik@example.com',
      is_vip: 1,
      status: 'confirmed',
      assigned_events: [
        {
          id: 'event-mayun',
          slug: 'mayun',
          name: 'Mayun & Dholki',
          event_date: '2027-03-24',
          start_time: '06:30 PM',
          venue_name: 'The Royal Palm Golf & Country Club',
          venue_address: '52 Canal Bank Road, Cantt, Lahore',
          dress_code: 'Sunshine Yellow & Kurtas'
        },
        {
          id: 'event-mehndi',
          slug: 'mehndi',
          name: 'Mehndi Rung',
          event_date: '2027-03-26',
          start_time: '07:30 PM',
          venue_name: 'Pearl Continental Grand Marquee',
          venue_address: 'Mall Road, Lahore',
          dress_code: 'Festive Jewel Tones'
        },
        {
          id: 'event-baraat',
          slug: 'baraat',
          name: 'The Baraat & Nikkah',
          event_date: '2027-03-27',
          start_time: '08:00 PM',
          venue_name: 'The Nishat Grand Ballroom (Emporium)',
          venue_address: 'Johar Town, Lahore',
          dress_code: 'Royal Formal / Bridals'
        },
        {
          id: 'event-walima',
          slug: 'walima',
          name: 'The Walima Reception',
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
      phone: '+92 300 8765432',
      email: 'usman.tariq@example.com',
      is_vip: 1,
      status: 'confirmed',
      assigned_events: [
        {
          id: 'event-mehndi',
          slug: 'mehndi',
          name: 'Mehndi Rung',
          event_date: '2027-03-26',
          start_time: '07:30 PM',
          venue_name: 'Pearl Continental Grand Marquee',
          venue_address: 'Mall Road, Lahore',
          dress_code: 'Festive Jewel Tones'
        },
        {
          id: 'event-baraat',
          slug: 'baraat',
          name: 'The Baraat & Nikkah',
          event_date: '2027-03-27',
          start_time: '08:00 PM',
          venue_name: 'The Nishat Grand Ballroom (Emporium)',
          venue_address: 'Johar Town, Lahore',
          dress_code: 'Royal Formal'
        },
        {
          id: 'event-walima',
          slug: 'walima',
          name: 'The Walima Reception',
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
