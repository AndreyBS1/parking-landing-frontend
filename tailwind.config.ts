import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',
      'black-transparent': {
        70: '#000000B2',
      },
      primary: '#F9B004',
      'primary-accent': '#9A8452',
      secondary: '#D9D9D9',
      'secondary-accent': '#E4E4E4',
    },
    extend: {
      backgroundImage: {
        hero: "url('/images/hero.jpg')",
      },
    },
  },
  plugins: [],
} satisfies Config
