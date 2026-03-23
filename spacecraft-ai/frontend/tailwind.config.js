module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9f7ff',
          100: '#f3f1ff',
          500: '#667eea',
          600: '#5568d3',
          700: '#4d5fa8',
        },
        secondary: {
          500: '#764ba2',
          600: '#6a4296',
        },
        accent: {
          500: '#f093fb',
          600: '#e68be6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 15px rgba(0, 0, 0, 0.08)',
        medium: '0 8px 25px rgba(0, 0, 0, 0.12)',
        lg: '0 12px 35px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
