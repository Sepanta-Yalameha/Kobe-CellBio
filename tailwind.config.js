/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sweet: { light: '#fce4ec', DEFAULT: '#e91e63', dark: '#880e4f' },
        sour: { light: '#fff9c4', DEFAULT: '#fdd835', dark: '#f9a825' },
        bitter: { light: '#e8f5e9', DEFAULT: '#4caf50', dark: '#1b5e20' },
        umami: { light: '#f3e5f5', DEFAULT: '#9c27b0', dark: '#4a148c' },
        salty: { light: '#e3f2fd', DEFAULT: '#2196f3', dark: '#0d47a1' },
        earth: {
          50: '#fdf8f0',
          100: '#f5e6d0',
          200: '#e8c99b',
          300: '#d4a574',
          400: '#c4854c',
          500: '#a06636',
          600: '#7a4e2a',
          700: '#5c3a20',
          800: '#3e2715',
          900: '#2a1a0e',
        },
        indigenous: {
          red: '#c0392b',
          orange: '#e67e22',
          gold: '#f1c40f',
          teal: '#1abc9c',
          indigo: '#3f51b5',
          terracotta: '#b7553d',
          sage: '#87a96b',
        },
      },
      fontFamily: {
        display: ['"Fredoka"', 'sans-serif'],
        body: ['"Nunito"', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'bubble': 'bubble 2s ease-in-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'cascade': 'cascade 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(192, 57, 43, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(192, 57, 43, 0.6)' },
        },
        bubble: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        cascade: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
