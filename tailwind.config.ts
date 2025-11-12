import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'bebas-neue': ['Bebas Neue', 'sans-serif'],
        'anton': ['Anton', 'sans-serif'],
        'league-spartan': ['League Spartan', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'printy': {
          'white': '#FFFFFF',
          'smoke': '#E5E5E5',
          'stone': '#D9D9D9',
          'carbon': '#2A2A2A',
          'black': '#111111',
          'military': '#2E4630',
          'sand': '#C9B39A',
          'deep-blue': '#203347',
        },
      },
      fontSize: {
        'heading-xl': ['4rem', { lineHeight: '1', letterSpacing: '0.05em' }],
        'heading-lg': ['3rem', { lineHeight: '1', letterSpacing: '0.05em' }],
        'heading-md': ['2rem', { lineHeight: '1', letterSpacing: '0.05em' }],
        'heading-sm': ['1.5rem', { lineHeight: '1', letterSpacing: '0.05em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}

export default config