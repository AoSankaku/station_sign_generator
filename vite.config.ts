import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import { VitePWA } from 'vite-plugin-pwa';
import i18next from 'i18next';
import { ManifestOptions } from 'vite-plugin-pwa';
import vike from 'vike/plugin'

const base = "/station_sign_generator/"

const generateManifest = (t: Function) => ({
  name: t('meta.pwa.name'),
  short_name: t('meta.pwa.short-name'),
  description: t('meta.description'),
  theme_color: '#ffffff',
  icons: [
    {
      src: 'android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: 'android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
}) as (false | Partial<ManifestOptions> | undefined);

// https://vitejs.dev/config/
export default defineConfig({
  base: base,
  plugins: [
    react(),
    ViteYaml(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: generateManifest(i18next.t),
    }),
    vike({
      prerender: {
        noExtraDir: true
      }
    })
  ],
})
