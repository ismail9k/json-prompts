// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/variables.css'],
  
  // Enable static site generation
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  
  // GitHub Pages configuration
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/json-prompts/' : '/',
    head: {
      title: 'JSON Prompts Gallery',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'ChatGPT Image Generation Prompts Collection' },
        { property: 'og:title', content: 'JSON Prompts Gallery' },
        { property: 'og:description', content: 'ChatGPT Image Generation Prompts Collection' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  // Enable static generation
  ssr: false
})
