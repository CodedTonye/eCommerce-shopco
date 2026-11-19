/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Real body font from the design, loaded free via Fontshare.
        sans: ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Integral CF (the design's heading font) is a paid font we can't
        // bundle; Clash Display is a free, license-safe stand-in with a
        // similar bold geometric character.
        display: ['"Clash Display"', 'ui-sans-serif', 'sans-serif'],
      },
      fontSize: {
        hero: ['56px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'hero-sm': ['36px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h2: ['36px', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h2-sm': ['24px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        h3: ['24px', { lineHeight: '1.2' }],
        'product-title': ['20px', { lineHeight: '1.3' }],
        'product-price': ['24px', { lineHeight: '1.2' }],
      },
      colors: {
        ink: '#000000',
        cream: '#F2F0F1',
      },
    },
  },
  plugins: [],
};
