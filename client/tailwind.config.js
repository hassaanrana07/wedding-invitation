/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFCF9',
          100: '#FAF8F5',
          200: '#F5F1E8',
          300: '#EDE6D8',
          400: '#E4DAC6',
          500: '#D5C7AD',
        },
        champagne: {
          50: '#FCFAF5',
          100: '#F7F2E7',
          200: '#EFE5D2',
          300: '#E5D6BA',
          400: '#D9C49E',
          500: '#C9AF7E',
        },
        forest: {
          50: '#F3F7F5',
          100: '#E2ECE6',
          200: '#C4D9CD',
          600: '#2E5A45',
          700: '#234737',
          800: '#1B382B', // Primary deep forest green
          900: '#13281E',
          deep: '#0F231A',
        },
        olive: {
          500: '#5A6B48',
          600: '#48563A',
          700: '#38432D',
          800: '#2A3322',
        },
        gold: {
          50: '#FDFBF7',
          100: '#F9F4EB',
          200: '#EFE2C8',
          300: '#E2CFA0',
          400: '#D4B872',
          500: '#C5A059', // Primary Royal Gold
          600: '#AF8840',
          700: '#8C692B',
          800: '#694D1D',
          900: '#473310',
          light: '#EAD7A5',
          metallic: '#D4AF37',
          antique: '#B89047',
        },
        rosewood: {
          50: '#FAF5F5',
          100: '#F5ECEC',
          200: '#E7D1D1',
          300: '#D5AFA6',
          400: '#C1897C',
          500: '#9E5B4F',
          600: '#7E4238',
          700: '#602F27',
          800: '#431E18',
          900: '#2A100C',
        },
        cream: {
          50: '#FDFCF9',
          100: '#FAF7F0',
          200: '#F4EFE2',
          300: '#ECE4CF',
          400: '#DFD4BA',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        script: ['"Great Vibes"', '"Alex Brush"', 'cursive'],
        calligraphy: ['"Great Vibes"', '"Alex Brush"', 'cursive'],
        alex: ['"Alex Brush"', 'cursive'],
        lora: ['"Lora"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(12px) rotate(-2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 10px rgba(197, 160, 89, 0.4))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 20px rgba(197, 160, 89, 0.8))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FBF6E9 0%, #D4AF37 50%, #AA7C11 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.2) 50%, transparent 100%)',
        'dark-royal': 'radial-gradient(circle at 50% 20%, #1A1423 0%, #0D0A11 100%)',
      }
    },
  },
  plugins: [],
}
