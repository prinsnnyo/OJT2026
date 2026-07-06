// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: false,

  experimental: {
    appManifest: false,
  },

  modules: ['@vee-validate/nuxt'],

  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
        extensions: ['.vue'],
      },
    ],
  },

  vite: {
    resolve: {
      preserveSymlinks: true,
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
    optimizeDeps: {
      include: [
        '@lucide/vue',
        '@vee-validate/zod',
        'class-variance-authority',
        'clsx',
        'reka-ui',
        'tailwind-merge',
        'zod',
      ],
    },
  },

  css: ['~/assets/css/tailwind.css'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:4000',
    },
  },

  devServer: {
    port: 3000,
    strictPort: true,
  },

  app: {
    head: {
      title: 'OJT Todo App',
      meta: [
        { name: 'description', content: 'Todo list practice app for OJT' },
      ],
    },
  },
})
