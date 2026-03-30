import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { 
        sans: ['Outfit', 'sans-serif'], 
        display: ['Syne', 'sans-serif'] 
      },
      colors: {
        primary: '#9B89C9', 
        secondary: '#C7CEEA', 
        accent: '#7FD8BE',
        warning: '#F59E0B', 
        danger: '#FF8B94', 
        dark: '#1e293b',
      },
      animation: {
        'blob': 'blob 10s infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: { 
          '0%': { transform:'translate(0,0) scale(1)' }, 
          '33%': { transform:'translate(40px,-60px) scale(1.1)' }, 
          '66%': { transform:'translate(-30px,30px) scale(0.9)' }, 
          '100%': { transform:'translate(0,0) scale(1)' } 
        },
        fadeIn: { 
          '0%': { opacity:'0' }, 
          '100%': { opacity:'1' } 
        },
        slideUp: { 
          '0%': { opacity:'0', transform:'translateY(20px)' }, 
          '100%': { opacity:'1', transform:'translateY(0)' } 
        }
      }
    },
  },
  plugins: [],
} satisfies Config
