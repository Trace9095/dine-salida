import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getDb } from '@/db'
import { schema } from '@/db'
import { slugify } from '@/lib/utils'

const ListingSchema = z.object({
  restaurantId: z.number().int().positive().optional(),
  ownerEmail: z.string().email(),
  ownerName: z.string().min(1),
  ownerPhone: z.string().optional(),
  tier: z.enum(['free', 'premium', 'sponsored']).default('free'),
  // New restaurant fields (when no restaurantId)
  name: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  cuisineType: z.string().optional(),
  priceRange: z.enum(['$', '$$', '$$$', '$$$$']).optional(),
  hours: z.string().optional(),
  imageUrl: z.string().optional(),
  slug: z.string().optional(),
  categories: z.array(z.string()).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = ListingSchema.parse(body)
    const db = getDb()

    let restaurantId = data.restaurantId

    // If no restaurantId, create a new restaurant record
    if (!restaurantId) {
      if (!data.name || !data.address || !data.description) {
        return NextResponse.json(
          { error: 'name, address, and description are required for new listings' },
          { status: 400 }
        )
      }

      const inserted = await db
        .insert(schema.restaurants)
        .values({
          name: data.name,
          slug: data.slug ?? slugify(data.name),
          description: data.description,
          address: data.address,
          phone: data.phone,
          website: data.website,
          cuisineType: data.cuisineType,
          priceRange: data.priceRange ?? '$',
          hours: data.hours,
          imageUrl: data.imageUrl,
          listingTier: data.tier,
        })
        .returning()

      restaurantId = inserted[0]?.id
    }

    if (!restaurantId) {
      return NextResponse.json({ error: 'Failed to resolve restaurant' }, { status: 500 })
    }

    const listing = await db
      .insert(schema.listings)
      .values({
        restaurantId,
        ownerEmail: data.ownerEmail,
        ownerName: data.ownerName,
        ownerPhone: data.ownerPhone,
        tier: data.tier,
        status: 'pending',
      })
      .returning()

    return NextResponse.json({ success: true, listing: listing[0] }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to submit listing' }, { status: 500 })
  }
}
