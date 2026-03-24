import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { CookieConsent } from '@/components/cookie-consent'
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
  openGraph: {
    siteName: 'Dine Salida',
    type: 'website',
    locale: 'en_US',
    url: 'https://dinesalida.com',
    title: 'Dine Salida — Salida, CO Restaurant Guide',
    description: 'Discover the best restaurants, breweries, and cafes in Salida, Colorado. Farm-to-table, craft beer, mountain cuisine, and more.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Dine Salida' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dine Salida — Salida, CO Restaurant Guide',
    description: 'Discover the best restaurants, breweries, and cafes in Salida, Colorado. Farm-to-table, craft beer, mountain cuisine.',
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true },
  verification: {
    google: '7jc12-lVG5f_urymoqzGqftRCjj_5iFngU0PSXzXdPI',
  },
}

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://dinesalida.com',
  name: 'Dine Salida',
  description: 'Find the best restaurants and local dining in Salida, Colorado.',
})

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
      <head>
        {/* eslint-disable-next-line react/no-danger */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </head>
      <body className="bg-[#0D1117] text-[#E6EDF3] antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <main id="main-content">{children}</main>
        <Analytics />
        <SpeedInsights />
        <CookieConsent />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
// GA4 + GSC v2 - 2026-03-23
