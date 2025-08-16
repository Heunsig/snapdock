/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            h1: {
              fontSize: '1.802rem',
              lineHeight: '1.25'
            },
            h2: {
              fontSize: '1.602rem',
              lineHeight: '1.25'
            },
            h3: {
              fontSize: '1.424rem',
              lineHeight: '1.25'
            },
            h4: {
              fontSize: '1.266rem',
              lineHeight: '1.25'
            },
            h5: {
              fontSize: '1.125rem',
              lineHeight: '1.25'
            },
            h6: {
              fontSize: '1rem',
              lineHeight: '1.5'
            }
          }
        }
      })
    }
  },
  content: {
    files: [
      "./app/**/*.{vue,js,jsx,mjs,ts,tsx,html}"
    ]
  },
}
