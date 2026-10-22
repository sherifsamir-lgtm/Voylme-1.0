/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        burgundy: {
          50: '#f5e6ec',
          100: '#e6c2cf',
          200: '#cc859f',
          300: '#b34774',
          400: '#992a55',
          500: '#660033',
          600: '#520028',
          700: '#3a001f',
          800: '#260016',
          900: '#13000b',
        },
        gold: {
          50: '#fdf9ec',
          100: '#faf0d2',
          200: '#f5e0a3',
          300: '#efc96b',
          400: '#e6b043',
          500: '#d4982b',
          600: '#b87a20',
          700: '#94591c',
          800: '#6e4218',
          900: '#4a2d12',
        },
        champagne: {
          50: '#fefcf8',
          100: '#fdf6ea',
          200: '#faecd0',
          300: '#f4dfa8',
          400: '#eccc7d',
          500: '#e3b95c',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212,152,43,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(212,152,43,0.35)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};
