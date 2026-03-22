import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0D1117',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Gold accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: '#D4A853',
          }}
        />

        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center top, rgba(212,168,83,0.12) 0%, transparent 60%)',
          }}
        />

        {/* Site name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#D4A853',
            letterSpacing: '-2px',
            marginBottom: 16,
          }}
        >
          Dine Salida
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: '#8B949E',
            letterSpacing: '0.5px',
          }}
        >
          Salida, Colorado Dining Guide
        </div>

        {/* Location tag */}
        <div
          style={{
            marginTop: 32,
            padding: '8px 24px',
            borderRadius: 9999,
            border: '1.5px solid rgba(212,168,83,0.4)',
            background: 'rgba(212,168,83,0.08)',
            color: '#D4A853',
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Restaurants · Breweries · Cafes
        </div>

        {/* Bottom label */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            color: '#30363D',
            fontSize: 16,
          }}
        >
          dinesalida.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
