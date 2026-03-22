import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// Fork icon using pure flex rectangles — fully Satori-compatible
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#0D1117',
          borderRadius: 7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1.5px solid #D4A853',
        }}
      >
        {/* Fork silhouette: 3 tines + connector + handle */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Tines row */}
          <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
            <div
              style={{
                width: '2.5px',
                height: '8px',
                background: '#D4A853',
                borderRadius: '2px 2px 0 0',
              }}
            />
            <div
              style={{
                width: '2.5px',
                height: '8px',
                background: '#D4A853',
                borderRadius: '2px 2px 0 0',
              }}
            />
            <div
              style={{
                width: '2.5px',
                height: '8px',
                background: '#D4A853',
                borderRadius: '2px 2px 0 0',
              }}
            />
          </div>
          {/* Connector bar */}
          <div
            style={{
              width: '10.5px',
              height: '2px',
              background: '#D4A853',
            }}
          />
          {/* Handle */}
          <div
            style={{
              width: '2.5px',
              height: '6px',
              background: '#D4A853',
              borderRadius: '0 0 2px 2px',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}
