/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          serif: ['var(--font-kaisei)'],
        },
        typography: {
          quoteless: {
            css: {
              'blockquote p:first-of-type::before': { content: 'none' },
              'blockquote p:first-of-type::after': { content: 'none' },
            },
          },
        },
      },
    },
    future: {
      hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/typography')],
  };
  