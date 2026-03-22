import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { getDb } from '@/db'
import { schema } from '@/db'
import { z } from 'zod'

const QuerySchema = z.object({
  email: z.string().email(),
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const parsed = QuerySchema.safeParse({ email: searchParams.get('email') })

  if (!parsed.success) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  try {
    const db = getDb()
    const listings = await db
      .select({
        listingId: schema.listings.id,
        restaurantId: schema.listings.restaurantId,
        tier: schema.listings.tier,
        status: schema.listings.status,
        createdAt: schema.listings.createdAt,
        restaurantName: schema.restaurants.name,
        restaurantSlug: schema.restaurants.slug,
        listingTier: schema.restaurants.listingTier,
        stripeCustomerId: schema.restaurants.stripeCustomerId,
        stripeSubscriptionId: schema.restaurants.stripeSubscriptionId,
      })
      .from(schema.listings)
      .innerJoin(schema.restaurants, eq(schema.listings.restaurantId, schema.restaurants.id))
      .where(eq(schema.listings.ownerEmail, parsed.data.email.toLowerCase()))

    if (listings.length === 0) {
      return NextResponse.json({ found: false, listings: [] })
    }

    return NextResponse.json({
      found: true,
      listings: listings.map((l) => ({
        listingId: l.listingId,
        restaurantId: l.restaurantId,
        restaurantName: l.restaurantName,
        restaurantSlug: l.restaurantSlug,
        tier: l.listingTier ?? l.tier,
        status: l.status,
        createdAt: l.createdAt,
        hasActiveSubscription: !!l.stripeSubscriptionId,
        stripeCustomerId: l.stripeCustomerId,
      })),
    })
  } catch (err) {
    console.error('[manage/lookup]', err)
    return NextResponse.json({ error: 'Lookup failed' }, { status: 500 })
  }
}
