/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'background-pitch-black' : '#000000',
      'overlay-black' : '#1B1A1A',
      'secondary-gray' : '#333333',
      'default-font' : '#E5E5E5',
      'secondary-font': '#BCBCBC',
      'spoti-green': '#1db954',
      'spoti-red': '#db0000',
      'pure-white': '#ffffff',
    },
  },
  plugins: [],
}

