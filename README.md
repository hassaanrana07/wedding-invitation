# Wedding Invitation Website

A luxury, interactive, frontend-only wedding invitation web application featuring a theatrical curtain entrance, an interactive heart scratch-to-reveal card, traditional background melodies, event timeline, countdown, and RSVP management.

---

## ✨ Features

- **Theatrical Curtain Opening**: Symmetrical silk curtain entrance with realistic fabric drape, gold valance, bullion tassels, and a central monogram medallion.
- **Interactive Heart Scratch Reveal**: Custom scratchable canvas surface with dynamic reveal threshold and celebratory animation.
- **Traditional Wedding Music Controller**: Ambient background melody player with interactive play, pause, volume, and mute controls complying with browser audio policies.
- **Hero Invitation Stage**: Centered invitation card with Quranic blessing (*Bismillah*), event details, and venue information.
- **Event Countdown**: Real-time countdown timer to the wedding celebrations.
- **Celebration Timeline & Events**: Detailed cards for each ceremony with Google Calendar and Google Maps integration.
- **Personalized Invites & RSVP**: Token-based invitations with custom guest allowances, interactive RSVP submission, and WhatsApp sharing.
- **Mobile Responsive**: Fully responsive layout optimized for mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Effects**: Canvas Confetti
- **Architecture**: 100% Frontend-Only (No external backend or database required)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hassaanrana07/wedding-invitation.git
   cd wedding-invitation
   ```

2. Install dependencies:
   ```bash
   npm install --prefix client
   ```

### Development

Run the local development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

Create an optimized production build:
```bash
npm run build
```

Preview the build locally:
```bash
npm run preview
```

The compiled files will be located in the `client/dist/` directory.

---

## ⚙️ Configuration

All wedding information, events, venues, schedule timings, and audio tracks can be customized in a single configuration file:

`client/src/data/weddingData.js`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
