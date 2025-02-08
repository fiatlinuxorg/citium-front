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
      }
    },
  },
  content: ["./index.html",'./src/**/*.{svelte,js,ts}'], // for unused CSS
  variants: {
    extend: {},
  },
}