import { ImageResponse } from 'next/og'
import { getDb } from '@/db'
import { schema } from '@/db'
import { eq } from 'drizzle-orm'

export const runtime = 'edge'
export const alt = 'Restaurant on Dine Salida'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let name = 'Dine Salida'
  let cuisine = ''
  let neighborhood = 'Salida, CO'

  try {
    const db = getDb()
    const rows = await db
      .select()
      .from(schema.restaurants)
      .where(eq(schema.restaurants.slug, slug))
      .limit(1)
    if (rows[0]) {
      name = rows[0].name
      cuisine = rows[0].cuisineType ?? ''
      neighborhood = rows[0].neighborhood ?? 'Salida, CO'
    }
  } catch {
    // fallback to defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: 'linear-gradient(160deg, #0D1B0E 0%, #1A3A1C 60%, #0D1B0E 100%)',
          padding: '60px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              background: '#F59E0B',
              color: '#0D1B0E',
              fontSize: '14px',
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Dine Salida
          </div>
          {cuisine && (
            <div
              style={{
                border: '1px solid #253826',
                color: '#7A9B7D',
                fontSize: '14px',
                padding: '4px 12px',
                borderRadius: '20px',
              }}
            >
              {cuisine}
            </div>
          )}
        </div>

        {/* Restaurant name */}
        <div
          style={{
            fontSize: name.length > 24 ? '52px' : '68px',
            fontWeight: 800,
            color: '#F0F4EF',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}
        >
          {name}
        </div>

        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ color: '#F59E0B', fontSize: '18px' }}>&#9679;</div>
          <div style={{ color: '#7A9B7D', fontSize: '18px' }}>{neighborhood}, Colorado</div>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #2D5016, #F59E0B, #2D5016)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
