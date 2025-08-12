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
        'display-lg': [
          'var(--text-display-lg)',
          { lineHeight: 'var(--leading-display-lg)' },
        ],
        'display-md': [
          'var(--text-display-md)',
          { lineHeight: 'var(--leading-display-md)' },
        ],
        'display-sm': [
          'var(--text-display-sm)',
          { lineHeight: 'var(--leading-display-sm)' },
        ],

        'headline-lg': [
          'var(--text-headline-lg)',
          { lineHeight: 'var(--leading-headline-lg)' },
        ],
        'headline-md': [
          'var(--text-headline-md)',
          { lineHeight: 'var(--leading-headline-md)' },
        ],
        'headline-sm': [
          'var(--text-headline-sm)',
          { lineHeight: 'var(--leading-headline-sm)' },
        ],

        'title-lg': [
          'var(--text-title-lg)',
          { lineHeight: 'var(--leading-title-lg)' },
        ],
        'title-md': [
          'var(--text-title-md)',
          { lineHeight: 'var(--leading-title-md)' },
        ],
        'title-sm': [
          'var(--text-title-sm)',
          { lineHeight: 'var(--leading-title-sm)' },
        ],

        'body-lg': [
          'var(--text-body-lg)',
          { lineHeight: 'var(--leading-body-lg)' },
        ],
        'body-md': [
          'var(--text-body-md)',
          { lineHeight: 'var(--leading-body-md)' },
        ],
        'body-sm': [
          'var(--text-body-sm)',
          { lineHeight: 'var(--leading-body-sm)' },
        ],

        'label-lg': [
          'var(--text-label-lg)',
          { lineHeight: 'var(--leading-label-lg)' },
        ],
        'label-md': [
          'var(--text-label-md)',
          { lineHeight: 'var(--leading-label-md)' },
        ],
        'label-sm': [
          'var(--text-label-sm)',
          { lineHeight: 'var(--leading-label-sm)' },
        ],
      },
      lineHeight: {
        'display-lg': 'var(--leading-display-lg)',
        'display-md': 'var(--leading-display-md)',
        'display-sm': 'var(--leading-display-sm)',

        'headline-lg': 'var(--leading-headline-lg)',
        'headline-md': 'var(--leading-headline-md)',
        'headline-sm': 'var(--leading-headline-sm)',

        'title-lg': 'var(--leading-title-lg)',
        'title-md': 'var(--leading-title-md)',
        'title-sm': 'var(--leading-title-sm)',

        'body-lg': 'var(--leading-body-lg)',
        'body-md': 'var(--leading-body-md)',
        'body-sm': 'var(--leading-body-sm)',

        'label-lg': 'var(--leading-label-lg)',
        'label-md': 'var(--leading-label-md)',
        'label-sm': 'var(--leading-label-sm)',
      },
      height: {
        'display-lg': 'var(--height-display-lg)',
        'display-md': 'var(--height-display-md)',
        'display-sm': 'var(--height-display-sm)',

        'headline-lg': 'var(--height-headline-lg)',
        'headline-md': 'var(--height-headline-md)',
        'headline-sm': 'var(--height-headline-sm)',

        'title-lg': 'var(--height-title-lg)',
        'title-md': 'var(--height-title-md)',
        'title-sm': 'var(--height-title-sm)',

        'body-lg': 'var(--height-body-lg)',
        'body-md': 'var(--height-body-md)',
        'body-sm': 'var(--height-body-sm)',

        'label-lg': 'var(--height-label-lg)',
        'label-md': 'var(--height-label-md)',
        'label-sm': 'var(--height-label-sm)',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
};
