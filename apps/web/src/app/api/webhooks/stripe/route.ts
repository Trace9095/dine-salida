import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { eq } from 'drizzle-orm'
import { getDb } from '@/db'
import { schema } from '@/db'

let _stripe: Stripe | null = null
function getStripe() {
  if (!_stripe) _stripe = new Stripe(process.env['STRIPE_SECRET_KEY']!)
  return _stripe
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env['STRIPE_WEBHOOK_SECRET']!
    )
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const db = getDb()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const restaurantId = session.metadata?.['restaurantId']
      const tier = session.metadata?.['tier'] as 'premium' | 'sponsored' | undefined

      if (restaurantId && tier) {
        const id = parseInt(restaurantId, 10)
        await db
          .update(schema.restaurants)
          .set({
            listingTier: tier,
            stripeCustomerId: session.customer as string | null,
            stripeSubscriptionId: session.subscription as string | null,
            updatedAt: new Date(),
          })
          .where(eq(schema.restaurants.id, id))

        await db
          .update(schema.listings)
          .set({ status: 'active', stripeSessionId: session.id })
          .where(eq(schema.listings.restaurantId, id))
      }
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      const customerId = sub.customer as string
      await db
        .update(schema.restaurants)
        .set({ listingTier: 'free', stripeSubscriptionId: null, updatedAt: new Date() })
        .where(eq(schema.restaurants.stripeCustomerId, customerId))
      break
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      if (sub.status === 'past_due' || sub.status === 'unpaid') {
        const customerId = sub.customer as string
        await db
          .update(schema.restaurants)
          .set({ listingTier: 'free', updatedAt: new Date() })
          .where(eq(schema.restaurants.stripeCustomerId, customerId))
      }
      break
    }

    case 'invoice.paid':
    case 'invoice.payment_failed':
      // No action needed — subscription status updates handled above
      break

    default:
      break
  }

  return NextResponse.json({ received: true })
}
