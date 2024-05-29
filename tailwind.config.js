/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        // CAST
        castPrimary: '#C07FDE',
        castSecondary: '#F6DBFF',
        castBackground: '#424242',
        castTitle: '#000000',
        castTitleDisabled: '#FFFFFF',
        castFormBg: '#FFFEFE',
        castBorders: '#600C87'
      },
      fontFamily: {
        // CAST
        castFont: ['Rowdies', 'sans-serif'],
        castForm: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}

