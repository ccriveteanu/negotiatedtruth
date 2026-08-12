/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0518', // Dark background
        'background-dark': '#0a0518',
        'text': '#e5e5e5',
        'text-dark': '#f5f5f5',
        primary: '#50168a', // Stardrive hot pink/purple
        'primary-light': '#7c2d9b',
        'primary-contrast': '#ffffff',
        secondary: '#2a1b3d',
        'secondary-dark': '#1a0f24',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        headline: ['Geist', 'system-ui', 'sans-serif'],
        body: ['Geist', 'system-ui', 'sans-serif'],
      },
      animation: {
        galaxyRotate: 'galaxyRotate 150s linear infinite',
        nebulaPulse: 'nebulaPulse 24s ease-in-out infinite alternate',
        twinkle: 'twinkle 10s ease-in-out infinite alternate',
      },
      keyframes: {
        galaxyRotate: {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        nebulaPulse: {
          '0%': { opacity: '0.72' },
          '100%': { opacity: '1' },
        },
        twinkle: {
          '0%': { opacity: '0.6' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
