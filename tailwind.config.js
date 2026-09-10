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
        }
      },
      fontFamily: {
        cute: ['"Nunito"', '"Quicksand"', 'sans-serif'],
      },
      animation: {
        'bounce-gentle': 'bounce-gentle 2s infinite ease-in-out',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'pop': 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
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
        }
      }
    },
  },
  plugins: [],
}
