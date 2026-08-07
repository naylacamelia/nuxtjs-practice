// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui','@nuxt/image','@nuxthub/core','nitro-cloudflare-dev'],
  css:['@/assets/css/main.css'],
  nitro: {
    preset: 'cloudflare-pages'
  },
  
  // hub: {
  //   database: true, // Mengaktifkan Cloudflare D1 (Database SQL)
  //   blob: true,     // Mengaktifkan Cloudflare R2 (Upload Gambar/File)
  //   kv: true        // Mengaktifkan Cloudflare KV (Cache)
  // }
})