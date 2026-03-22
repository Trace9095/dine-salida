import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'

let _stripe: Stripe | null = null
function getStripe(): Stripe {
  if (!process.env['STRIPE_SECRET_KEY']) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  if (!_stripe) _stripe = new Stripe(process.env['STRIPE_SECRET_KEY'])
  return _stripe
}

const PortalSchema = z.object({
  stripeCustomerId: z.string().startsWith('cus_'),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = PortalSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Valid stripeCustomerId required' }, { status: 400 })
  }

  try {
    const stripe = getStripe()
    const returnUrl =
      process.env['STRIPE_PORTAL_RETURN_URL'] ??
      `${process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://dinesalida.com'}/manage`

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: parsed.data.stripeCustomerId,
      return_url: returnUrl,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (err) {
    console.error('[manage/portal]', err)
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 })
  }
}
