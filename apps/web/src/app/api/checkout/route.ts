import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'

let _stripe: Stripe | null = null
function getStripe() {
  if (!_stripe) {
    _stripe = new Stripe(process.env['STRIPE_SECRET_KEY']!)
  }
  return _stripe
}

const PRICES: Record<string, number> = {
  premium: 9900,    // $99.00
  sponsored: 19900, // $199.00
}

const CheckoutSchema = z.object({
  tier: z.enum(['premium', 'sponsored']),
  restaurantId: z.number().int().positive(),
  ownerEmail: z.string().email(),
  ownerName: z.string().min(1),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = CheckoutSchema.parse(body)

    const stripe = getStripe()
    const base = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://dinesalida.com'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: data.ownerEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            recurring: { interval: 'month' },
            unit_amount: PRICES[data.tier],
            product_data: {
              name: `Dine Salida ${data.tier === 'premium' ? 'Premium' : 'Sponsored'} Listing`,
              description: `Monthly ${data.tier} listing for restaurant ID ${data.restaurantId}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        restaurantId: String(data.restaurantId),
        tier: data.tier,
        ownerEmail: data.ownerEmail,
        ownerName: data.ownerName,
      },
      success_url: `${base}/claim/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/pricing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
