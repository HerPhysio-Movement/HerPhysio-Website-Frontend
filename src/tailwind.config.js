/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FD90A7',
        'primary-dark': '#f77997',
        'primary-light': '#ffb8c9',
      },
      fontFamily: {
        zodiak: ['Zodiak', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};