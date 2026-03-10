/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sylitheDark: '#0F172A', // Deep dark blue
        sylitheGreen: '#A3E635', // Lime green
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        arrowFloat: {
          '0%, 100%': { transform: 'translateX(0px)', opacity: '0.7' },
          '50%': { transform: 'translateX(6px)', opacity: '1' },
        },
      },
      animation: {
        'arrow-float': 'arrowFloat 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}