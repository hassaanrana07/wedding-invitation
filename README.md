# RIHA — Premium Pakistani Wedding Invitation Web Application
### Wedding of Rida & Harish

**RIHA** is a luxury, standalone, 100% frontend-only Pakistani wedding invitation web application featuring a cinematic stage curtain opening animation, traditional Shehnai background melodies, and an interactive 12-photograph gallery slider.

---

## 💍 Key Features

### 1. Cinematic Wedding Intro — RIHA Opening Animation
* **Scene 1 (Initial Screen)**: Deep velvet-black backdrop with luxury golden "RIHA" center typography and ambient light glow.
* **Scene 2 (Stage Curtains)**: Twin royal crimson & gold embroidered stage curtains with realistic fabric folds that open smoothly toward both sides.
* **Scene 3 (Bismillah Screen)**: Sacred central Islamic calligraphy:
  $$\text{بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ}$$
  *"Bismillah-ir-Rahman-ir-Raheem"* with ornate gold filigree accents.
* **Scene 4 (Invitation Entrance)**: Elegant interactive button *"Begin Our Wedding Celebration"* unlocking the complete wedding experience and unmuting background Shehnai music upon explicit visitor interaction.
* **Accessibility**: Respects `prefers-reduced-motion` and includes a persistent skip option for screen-readers and fast navigation.

### 2. Traditional Wedding Music Controller
* Embedded Shehnai & Sitar instrumental harmony (*Afreen Afreen & Sitar Harmony*).
* Floating interactive soundwave controller (Play / Pause / Volume Slider / Mute).
* Strict adherence to modern browser autoplay policies (starts only upon user gesture).

### 3. Royal Pakistani Hero Section
* Slow-zoom couple backdrop with multi-layer luxury vignette.
* Monogram badge (`R & H`) and Cormorant Garamond typography.
* Clear wedding invitation message and dynamic countdown to the auspicious day.
* Smooth scroll navigation indicator down to wedding celebrations.

### 4. Sacred Spiritual Blessing
* Surah Ar-Rum (30:21) Quranic calligraphy & English translation with delicate gold arabesque borders.

### 5. The Couple & Parental Lineage
* Rida & Harish portrait showcase.
* Formal lineage introduction honoring parents (*Mr. & Mrs. Rana Sami-ul-Aziz Khan* & *Mr. & Mrs. Shameem Rana*).

### 6. Pakistani Wedding Ceremonies Grid
* **Mayun & Dholki**: Oct 10, 2026 (The Royal Palm Golf & Country Club, Lahore)
* **Mehndi Rung**: Oct 12, 2026 (Pearl Continental Grand Marquee, Lahore)
* **The Baraat & Nikkah**: Oct 14, 2026 (The Nishat Grand Ballroom, Johar Town, Lahore)
* **The Walima Reception**: Oct 16, 2026 (Defence Raya Golf & Country Club, DHA Phase 6, Lahore)
* Each event card includes dress code notes, Google Maps directions, and 1-click Google Calendar integration.
* Dedicated deep-linked detail views at `/event/:slug`.

### 7. Honorable Family & Dignitaries
* Dignified portrait cards honoring beloved elders, matriarchs, and ceremony coordinators.
* Interactive slider with mobile touch swipe gestures.

### 8. Interactive Story Milestones
* Elegant vertical timeline with milestone jewel nodes and gold connecting lines.
* Highlights from the first meeting in Gulberg, Lahore, to the Hunza proposal, and the wedding day.

### 9. Upgraded Interactive Gallery (12 Photographs)
* **Multi-Image Interactive Slider**: Prominent center stage photo with previous/next circular gold buttons, pagination dots, and photo counter.
* **Category Filters**: Couple Portraits, Bride's Elegance, Groom's Splendor, Mehndi & Mayun, Baraat & Nikkah, Walima Reception.
* **Fullscreen Lightbox**: Keyboard navigation (Arrow keys & Escape), touch swipe on mobile, captions, and close button.
* **Masonry Grid Toggle**: Switch between interactive carousel and all-in-one grid view.

### 10. Personalized Invitations & RSVP (`/invite/:token`)
* Pre-configured personalized invite tokens:
  * `/invite/8f73kd92` — *Ahmed Khan & Family* (Allowed: 4 guests, Baraat & Walima)
  * `/invite/fatima-malik-4m9a` — *Dr. Fatima Malik* (Allowed: 2 guests, All ceremonies)
  * `/invite/usman-tariq-7q2b` — *Uncle Usman & Family* (Allowed: 5 guests, Mehndi, Baraat, Walima)
* Interactive headcount selector enforcing allowed guest limits.
* Client-side RSVP storage in `localStorage` with celebratory gold confetti.
* One-click WhatsApp invitation sharing and print-ready PDF pass generation.

### 11. Redesigned Wedding Footer
* **Venues**: Complete addresses and Google Maps links for The Nishat Grand Ballroom and Defence Raya.
* **Contacts**: 4 family contact numbers with clickable `tel:` links:
  * *Bride's Family Lead (Ladkiwalay)*: Mr. Ahmed Sami Khan — `+92 333 9988776`
  * *Groom's Family Lead (Ladkewale)*: Dr. Shahzad Hassan — `+92 301 4433221`
  * *Baraat Seating & Dignitaries*: Mr. Tariq Rana — `+92 300 1122334`
  * *Wedding Concierge*: Rana Usman Saeed — `+92 300 1234567`
* Zero admin links, zero CMS artifacts, zero preview labels.

---

## 🛠️ Stack & Architecture

* **Framework**: React 18
* **Build Tool**: Vite 6
* **Styling**: Tailwind CSS
* **Animations**: Framer Motion
* **Icons**: Lucide React
* **Confetti**: Canvas Confetti
* **Architecture**: 100% Frontend-Only (Zero backend, zero database, zero server dependencies).
* **Configuration**: Centralized configuration in `client/src/data/weddingData.js`.

---

## 🚀 Running the Project

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+)

### Development Mode
```bash
# Start local development server (Port 5173)
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
# Compile optimized static bundle
npm run build

# Preview static production build locally
npm run preview
```

The compiled static files are generated in `client/dist/` ready to be hosted on any static hosting platform.

---

## 🌐 Static Deployment

Because this project is 100% frontend-only, it can be deployed in minutes to:

### 1. Vercel
```bash
npx vercel client
```
*(Or import the repository into Vercel and set the Root Directory to `client`)*

### 2. Netlify
* Build command: `npm run build`
* Publish directory: `client/dist`

### 3. GitHub Pages
Deploy the `client/dist` folder directly to GitHub Pages.

---

## ⚙️ Customizing Wedding Information

All wedding details, names, family contacts, venues, music tracks, and gallery photographs are maintained in:
`client/src/data/weddingData.js`

To customize couple names, timings, or photos, simply edit this single file!
