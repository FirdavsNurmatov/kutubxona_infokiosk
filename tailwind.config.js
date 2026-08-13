/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e8ecf4',
          100: '#c5cfe3',
          200: '#9fb0d0',
          300: '#7890bc',
          400: '#5a78ae',
          500: '#3c60a0',
          600: '#2d4d8a',
          700: '#1e3a74',
          800: '#122860',
          900: '#0D1B4B',
          950: '#091333',
        },
        gold: {
          100: '#fdf3d7',
          200: '#fae4a5',
          300: '#f5cd6a',
          400: '#e8b83c',
          500: '#C9A84C',
          600: '#b8922e',
          700: '#9a7520',
          800: '#7d5c17',
          900: '#5e4310',
        },
        cream: {
          50: '#fdfaf4',
          100: '#f8f1e0',
          200: '#f0e2c4',
          300: '#e6d0a3',
          400: '#d9b97a',
          500: '#c9a054',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 0 0 1px rgba(201, 168, 76, 0.3), 0 4px 24px rgba(0,0,0,0.18)',
        'card': '0 2px 16px rgba(13,27,75,0.10)',
      },
    },
  },
  plugins: [],
};
