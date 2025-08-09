// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/favicon/favicon_16x16.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/favicon/favicon_32x32.png" },
        { rel: "icon", type: "image/png", sizes: "48x48", href: "/assets/favicon/favicon_48x48.png" },
        { rel: "icon", type: "image/png", sizes: "64x64", href: "/assets/favicon/favicon_64x64.png" },
        { rel: "icon", type: "image/png", sizes: "128x128", href: "/assets/favicon/favicon_128x128.png" },
        { rel: "icon", type: "image/png", sizes: "256x256", href: "/assets/favicon/favicon_256x256.png" },
      ]
    }
  },
  routeRules: {
    "/": {
      redirect: "/projects"
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@nuxt/fonts', '@nuxt/image', '@nuxt/content', '@vueuse/nuxt', "@nuxt/scripts"],
  colorMode: {
    preference: 'system'
  },
  devServer: {
    port: 9000
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai'
          }
        }
      }
    }
  },
  scripts: {
    registry: {
      googleTagManager: {
        id: 'GTM-NB38HJ5Z'
      }
    }
  },
  tailwindcss: {
    cssPath: `~/assets/css/tailwind.css`
  }
})