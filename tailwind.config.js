/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          cream: '#F8F6F3',
          sand: '#E8E4DF',
          stone: '#C9C5BE',
          charcoal: '#2C2C2C',
          gold: '#B8956A',
          'gold-light': '#D4B896',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'heading': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.2' }],
      },
      spacing: {
        'section': 'clamp(4rem, 10vh, 8rem)',
        'section-sm': 'clamp(2rem, 5vh, 4rem)',
      },
      animation: {
        'ken-burns': 'kenBurns 20s ease-out infinite alternate',
        'shine': 'shine 1.5s infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
