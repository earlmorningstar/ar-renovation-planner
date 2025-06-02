module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enabling dark mode with class switching
  theme: {
    extend: {
      colors: {
        primary: '#A78B71',
        secondary: '#6E9075',
        background: '#F9F6F1',
        text: '#3A3A3A',
        error: '#C1666B',
        success: '#88B7B5',
        warning: '#E3B23C',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}