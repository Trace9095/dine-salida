import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { eq, like, or } from 'drizzle-orm'
import { getDb } from '@/db'
import { schema } from '@/db'
import { requireAdmin } from '@/lib/auth'
import { slugify } from '@/lib/utils'

const RestaurantSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  address: z.string().min(1),
  shortDescription: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  email: z.string().email().optional(),
  hours: z.string().optional(),
  cuisineType: z.string().optional(),
  priceRange: z.enum(['$', '$$', '$$$', '$$$$']).optional(),
  imageUrl: z.string().optional(),
  neighborhood: z.string().optional(),
  featured: z.boolean().optional(),
  listingTier: z.enum(['free', 'premium', 'sponsored']).optional(),
  bookingUrl: z.string().optional(),
  menuUrl: z.string().optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
})

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search')
    const tier = searchParams.get('tier')

    const db = getDb()
    let rows = await db.select().from(schema.restaurants)

    if (search) {
      const q = `%${search.toLowerCase()}%`
      rows = await db
        .select()
        .from(schema.restaurants)
        .where(
          or(
            like(schema.restaurants.name, q),
            like(schema.restaurants.cuisineType, q),
            like(schema.restaurants.neighborhood, q)
          )
        )
    }

    if (tier) {
      rows = rows.filter((r) => r.listingTier === tier)
    }

    return NextResponse.json(rows)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const data = RestaurantSchema.parse(body)
    const slug = slugify(data.name)

    const db = getDb()
    const inserted = await db
      .insert(schema.restaurants)
      .values({ ...data, slug })
      .returning()

    return NextResponse.json(inserted[0], { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create restaurant' }, { status: 500 })
  }
}
