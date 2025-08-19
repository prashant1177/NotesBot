// tailwind.config.js
import typography from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
},
  },
  darkMode: 'class', 
  plugins: [typography],
}
