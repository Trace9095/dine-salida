import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#0D1117',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'Dine Salida — Salida, CO Restaurant Guide',
    template: '%s | Dine Salida',
  },
  description:
    'Discover the best restaurants, breweries, and cafes in Salida, Colorado. Farm-to-table, craft beer, mountain cuisine, and more.',
  metadataBase: new URL(
    process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://dinesalida.com'
  ),
  keywords: [
    'Salida restaurants',
    'Salida Colorado dining',
    'Salida food guide',
    'Salida breweries',
    'Arkansas River dining',
  ],
  openGraph: { siteName: 'Dine Salida', type: 'website', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  verification: {
    google: '7jc12-lVG5f_urymoqzGqftRCjj_5iFngU0PSXzXdPI',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
    >
      <body className="bg-[#0D1117] text-[#E6EDF3] antialiased">
        {children}
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
// GA4 + GSC v2 - 2026-03-23
