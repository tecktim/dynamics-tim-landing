import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
        heading: ['"Sora"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        brand: {
          50: '#f2f7ff',
          100: '#dce9ff',
          200: '#b6d0ff',
          300: '#8fb6ff',
          400: '#699cff',
          500: '#4282ff',
          600: '#2b64db',
          700: '#1f4aa8',
          800: '#153376',
          900: '#0c1d45'
        }
      },
      boxShadow: {
        soft: '0 10px 40px rgba(15, 23, 42, 0.12)'
      }
    }
  },
  plugins: [typography, forms]
};

export default config;
