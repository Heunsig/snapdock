import tailwindcssTypography from '@tailwindcss/typography'

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
      // all directories and extensions will correspond to your Nuxt config
      "./components/**/*.{vue,js,jsx,mjs,ts,tsx}",
      "./layouts/**/*.{vue,js,jsx,mjs,ts,tsx}",
      "./pages/**/*.{vue,js,jsx,mjs,ts,tsx}",
      "./plugins/**/*.{js,ts,mjs}",
      "./composables/**/*.{js,ts,mjs}",
      "./utils/**/*.{js,ts,mjs}",
      "./{A,a}pp.{vue,js,jsx,mjs,ts,tsx}",
      "./{E,e}rror.{vue,js,jsx,mjs,ts,tsx}",
      "./app.config.{js,ts,mjs}",
      "./app/spa-loading-template.html"
    ]
  },
  plugins: [
    tailwindcssTypography()
  ]
}
