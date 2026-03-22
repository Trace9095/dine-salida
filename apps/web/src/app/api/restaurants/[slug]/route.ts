import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { getDb } from '@/db'
import { schema } from '@/db'
import { requireAdmin } from '@/lib/auth'

interface RouteContext {
  params: Promise<{ slug: string }>
}

const UpdateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
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
})

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { slug } = await params
  try {
    const db = getDb()
    const rows = await db
      .select()
      .from(schema.restaurants)
      .where(eq(schema.restaurants.slug, slug))
      .limit(1)

    if (!rows[0]) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const reviews = await db
      .select()
      .from(schema.reviews)
      .where(eq(schema.reviews.restaurantId, rows[0].id))

    return NextResponse.json({ ...rows[0], reviews })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch restaurant' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params
  try {
    const body = await req.json()
    const data = UpdateSchema.parse(body)

    const db = getDb()
    const updated = await db
      .update(schema.restaurants)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.restaurants.slug, slug))
      .returning()

    if (!updated[0]) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(updated[0])
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update restaurant' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params
  try {
    const db = getDb()
    const deleted = await db
      .delete(schema.restaurants)
      .where(eq(schema.restaurants.slug, slug))
      .returning()

    if (!deleted[0]) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete restaurant' }, { status: 500 })
  }
}
