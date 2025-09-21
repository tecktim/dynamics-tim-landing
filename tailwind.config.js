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
          50: '#F3F7FE',
          100: '#E1ECFE',
          200: '#BCD8FD',
          300: '#93C2FA',
          400: '#4DA2F2',
          500: '#0078D4',
          600: '#0062AC',
          700: '#004C84',
          800: '#003A63',
          900: '#00264C'
        },
        accent: {
          50: '#E9FBFF',
          100: '#C9F2F7',
          200: '#9FE3EC',
          300: '#68D0DE',
          400: '#1CBACD',
          500: '#009AAE',
          600: '#00798A',
          700: '#005B67',
          800: '#004451',
          900: '#012F38'
        },
        surface: {
          50: '#F9FBFF',
          100: '#F2F6FC',
          200: '#E6EEF7',
          300: '#D5E1F0'
        },
        signal: {
          400: '#FFB900',
          500: '#F2A100',
          600: '#D68B00'
        }
      },
      boxShadow: {
        soft: '0 18px 48px rgba(0, 39, 76, 0.12)'
      }
    }
  },
  plugins: [typography, forms]
};

export default config;
