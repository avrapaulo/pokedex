module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#F1EBE8',
          100: '#E8DCD8',
          200: '#D5C0B8',
          300: '#C2A498',
          400: '#AF8778',
          500: '#996C5B',
          600: '#795548',
          700: '#593F35',
          800: '#392822',
          900: '#19120F'
        },
        black: {
          DEFAULT: '#000000',
          400: '#000000',
          600: '#ffffff'
        },
        white: {
          DEFAULT: '#ffffff',
          400: '#ffffff',
          600: '#000000'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
