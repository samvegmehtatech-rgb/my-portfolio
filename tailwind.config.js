/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          primary: '#2563EB',
          light:   '#DBEAFE',
        },
        charcoal: '#0A0A0A',
        grey:     '#64748B',
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        body:    ['Satoshi', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
