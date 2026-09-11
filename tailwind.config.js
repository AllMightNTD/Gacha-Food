/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cute: {
          pink: '#FFE4E6',
          rose: '#FDA4AF',
          primary: '#FB7185',
          dark: '#E11D48',
          cream: '#FFFBEB',
          yellow: '#FEF08A',
          mint: '#D1FAE5',
          lavender: '#F3E8FF',
        },
        figma: {
          indigo: '#1E1B4B',
          purple: '#8B5CF6',
          darkPurple: '#6B21A8',
          pink: '#FCE7F3',
          lightPink: '#FEE2E2',
          blue: '#3B82F6',
          gold: '#F59E0B',
          borderPink: '#DDD6FE',
          cardCream: '#FFFBEB',
          cardPurple: '#F3E8FF',
        }
      },
      fontFamily: {
        cute: ['"Sora"', '"Nunito"', 'sans-serif'],
        sora: ['"Sora"', 'sans-serif'],
        bricolage: ['"Bricolage Grotesque"', 'sans-serif'],
      },
      animation: {
        'bounce-gentle': 'bounce-gentle 2s infinite ease-in-out',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'pop': 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'pulse-glow': 'pulse-glow 2s infinite ease-in-out',
      },
      keyframes: {
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        'pop': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(139, 92, 246, 0.6)' },
          '50%': { boxShadow: '0 0 25px rgba(139, 92, 246, 0.9)' },
        }
      }
    },
  },
  plugins: [],
}
