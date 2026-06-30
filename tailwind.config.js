/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#4A2A67',         /* Deep Purple */
          'primary-dark': '#361E4C',
          secondary: '#A47BC4',       /* Lavender Highlight */
          'secondary-light': '#E9DDF4', /* Light Lavender Wash */
          silk: '#8E5DAF',            /* Aerial Silk Purple */
          background: '#F7F2EE',      /* Soft Ivory Background */
          surface: '#FFFFFF',
          accent: '#C8A05A',          /* Warm Gold Accent */
          'accent-dark': '#B08B47',
          text: '#2F2438',            /* Dark Purple-Gray */
          muted: '#5E5E66',           /* Body Text Gray */
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
