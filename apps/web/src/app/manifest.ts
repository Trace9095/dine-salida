import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dine Salida',
    short_name: 'DineSalida',
    description: 'Salida, CO Restaurant Guide',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D1117',
    theme_color: '#D4A853',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
