const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontSize: {
        'display-lg': ['var(--text-display-lg)'],
        'display-md': ['var(--text-display-md)'],
        'display-sm': ['var(--text-display-sm)'],

        'headline-lg': ['var(--text-headline-lg)'],
        'headline-md': ['var(--text-headline-md)'],
        'headline-sm': ['var(--text-headline-sm)'],

        'title-lg': ['var(--text-title-lg)'],
        'title-md': ['var(--text-title-md)'],
        'title-sm': ['var(--text-title-sm)'],

        'body-lg': ['var(--text-body-lg)'],
        'body-md': ['var(--text-body-md)'],
        'body-sm': ['var(--text-body-sm)'],

        'label-lg': ['var(--text-label-lg)'],
        'label-md': ['var(--text-label-md)'],
        'label-sm': ['var(--text-label-sm)'],
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
};
