/** @type {import('tailwindcss').Config} */
export default {
  plugins: [],
    theme: {
    extend: {
      colors: {
        primary: '#EA2B1F',
        light: '#F5F3F7',
        dark: '#313638',
        gray: '#DAD5D5',
      },
      fontFamily: {
        body: ['Inter'],
        display: ['Afacad'],
      },
      borderWidth: {
        6: '6px'
      },
      animation: {
        'shake': 'shake 0.5s ease-in-out',
        'slide-in-right': 'slide-in-right 0.5s ease-in-out',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(0)' },
          '20%, 60%': { transform: 'rotate(-5deg)' },
          '40%, 80%': { transform: 'rotate(5deg)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      }
    },
  },
  content: ["./index.html",'./src/**/*.{svelte,js,ts}'], // for unused CSS
  variants: {
    extend: {},
  },
}