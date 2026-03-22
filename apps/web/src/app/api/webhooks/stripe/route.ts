import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { eq } from 'drizzle-orm'
import { getDb } from '@/db'
import { schema } from '@/db'
import { sendSubscriptionConfirmed } from '@/lib/email'

let _stripe: Stripe | null = null
function getStripe(): Stripe {
  if (!process.env['STRIPE_SECRET_KEY']) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  if (!_stripe) _stripe = new Stripe(process.env['STRIPE_SECRET_KEY'])
  return _stripe
}

export async function POST(req: NextRequest) {
  if (!process.env['STRIPE_WEBHOOK_SECRET']) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET not configured')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env['STRIPE_WEBHOOK_SECRET']!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const db = getDb()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const restaurantId = session.metadata?.['restaurantId']
        const tier = session.metadata?.['tier'] as 'premium' | 'sponsored' | undefined
        const ownerEmail = session.metadata?.['ownerEmail'] ?? session.customer_email ?? ''
        const ownerName = session.metadata?.['ownerName'] ?? ''

        if (restaurantId && tier) {
          const id = parseInt(restaurantId, 10)

          // Update restaurant subscription info
          await db
            .update(schema.restaurants)
            .set({
              listingTier: tier,
              stripeCustomerId: session.customer as string | null,
              stripeSubscriptionId: session.subscription as string | null,
              updatedAt: new Date(),
            })
            .where(eq(schema.restaurants.id, id))

          // Activate listing record
          await db
            .update(schema.listings)
            .set({
              status: 'active',
              stripeSessionId: session.id,
              stripeSubscriptionId: session.subscription as string | null,
            })
            .where(eq(schema.listings.restaurantId, id))

          // Look up restaurant name for the confirmation email
          const [restaurant] = await db
            .select({ name: schema.restaurants.name })
            .from(schema.restaurants)
            .where(eq(schema.restaurants.id, id))
            .limit(1)

          if (ownerEmail && restaurant) {
            await sendSubscriptionConfirmed({
              ownerEmail,
              ownerName,
              businessName: restaurant.name,
              tier,
            }).catch((err) => console.error('[webhook] email send failed:', err))
          }
        }
        break
      }

      case 'customer.subscription.created': {
        // Sync subscription ID in case it wasn't set via checkout.session.completed
        const sub = event.data.object as Stripe.Subscription
        const customerId = sub.customer as string

        await db
          .update(schema.restaurants)
          .set({ stripeSubscriptionId: sub.id, updatedAt: new Date() })
          .where(eq(schema.restaurants.stripeCustomerId, customerId))
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const customerId = sub.customer as string

        if (sub.status === 'active') {
          // Re-activate if it was downgraded (e.g., after payment recovered)
          await db
            .update(schema.restaurants)
            .set({ stripeSubscriptionId: sub.id, updatedAt: new Date() })
            .where(eq(schema.restaurants.stripeCustomerId, customerId))
        } else if (sub.status === 'past_due' || sub.status === 'unpaid' || sub.status === 'canceled') {
          await db
            .update(schema.restaurants)
            .set({ listingTier: 'free', updatedAt: new Date() })
            .where(eq(schema.restaurants.stripeCustomerId, customerId))
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

        // Deactivate listing record
        await db
          .update(schema.listings)
          .set({ status: 'cancelled' })
          .where(eq(schema.listings.stripeSubscriptionId, sub.id))
        break
      }

      case 'invoice.paid':
        // Subscription renewed — no extra action needed; subscription.updated handles status
        break

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string
        // Flag as past_due — subscription.updated will handle downgrade
        await db
          .update(schema.restaurants)
          .set({ updatedAt: new Date() })
          .where(eq(schema.restaurants.stripeCustomerId, customerId))
        break
      }

      default:
        break
    }
  } catch (err) {
    console.error('[webhook] handler error:', err)
    return NextResponse.json({ error: 'Handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
