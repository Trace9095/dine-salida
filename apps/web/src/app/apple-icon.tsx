import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// Apple touch icon — mountain + fork motif, scaled for 180×180
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#0D1117',
          borderRadius: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        {/* Mountain peak using rotated rectangles */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: '90px',
            height: '54px',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          {/* Left slope */}
          <div
            style={{
              position: 'absolute',
              bottom: '0px',
              left: '14px',
              width: '5px',
              height: '52px',
              background: '#D4A853',
              borderRadius: '3px 3px 0 0',
              transform: 'rotate(-28deg)',
              transformOrigin: 'bottom center',
            }}
          />
          {/* Right slope */}
          <div
            style={{
              position: 'absolute',
              bottom: '0px',
              right: '14px',
              width: '5px',
              height: '52px',
              background: '#D4A853',
              borderRadius: '3px 3px 0 0',
              transform: 'rotate(28deg)',
              transformOrigin: 'bottom center',
            }}
          />
          {/* Snow cap — left */}
          <div
            style={{
              position: 'absolute',
              bottom: '32px',
              left: '26px',
              width: '4px',
              height: '22px',
              background: '#F5D78A',
              borderRadius: '2px 2px 0 0',
              transform: 'rotate(-28deg)',
              transformOrigin: 'bottom center',
            }}
          />
          {/* Snow cap — right */}
          <div
            style={{
              position: 'absolute',
              bottom: '32px',
              right: '26px',
              width: '4px',
              height: '22px',
              background: '#F5D78A',
              borderRadius: '2px 2px 0 0',
              transform: 'rotate(28deg)',
              transformOrigin: 'bottom center',
            }}
          />
          {/* Base line */}
          <div
            style={{
              position: 'absolute',
              bottom: '0px',
              left: '0px',
              width: '90px',
              height: '4px',
              background: '#D4A853',
              borderRadius: '2px',
            }}
          />
        </div>

        {/* Fork silhouette below mountain */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Tines */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
            <div
              style={{
                width: '8px',
                height: '26px',
                background: '#D4A853',
                borderRadius: '4px 4px 0 0',
              }}
            />
            <div
              style={{
                width: '8px',
                height: '26px',
                background: '#D4A853',
                borderRadius: '4px 4px 0 0',
              }}
            />
            <div
              style={{
                width: '8px',
                height: '26px',
                background: '#D4A853',
                borderRadius: '4px 4px 0 0',
              }}
            />
          </div>
          {/* Connector */}
          <div
            style={{
              width: '32px',
              height: '6px',
              background: '#D4A853',
            }}
          />
          {/* Handle */}
          <div
            style={{
              width: '8px',
              height: '18px',
              background: '#D4A853',
              borderRadius: '0 0 4px 4px',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}
