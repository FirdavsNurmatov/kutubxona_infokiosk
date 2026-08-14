/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Sahifa va sirtlar — to'q navy */
        ink: {
          950: '#010B1C',
          900: '#010F26',
          800: '#011A36',
          700: '#062240',
          600: '#092A48',
          500: '#112F43',
          400: '#143A5C',
          300: '#1E4A72',
        },
        /* Afisha ustuni — cyan */
        cyan: {
          200: '#9FE4F5',
          300: '#5FD3EC',
          400: '#22C3E6',
          500: '#0FA5C9',
          600: '#017185',
          700: '#016C89',
          800: '#0E5270',
          900: '#07617E',
        },
        /* Reyting va diqqat */
        amber: {
          300: '#F8CE72',
          400: '#F0AB2A',
          500: '#D99418',
        },
        /* Och kartochkalar */
        paper: {
          50: '#FFFFFF',
          100: '#F5F9FC',
          200: '#E6ECF3',
          300: '#C8D4E2',
          400: '#8FA3B8',
          500: '#5B7086',
          600: '#3A4C5F',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 8px 32px rgba(0, 8, 24, 0.45)',
        tile: '0 2px 10px rgba(0, 8, 24, 0.35)',
      },
    },
  },
  plugins: [],
};
