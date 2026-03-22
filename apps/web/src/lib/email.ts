import { Resend } from 'resend'

let _resend: Resend | null = null

function getResend(): Resend | null {
  if (!process.env['RESEND_API_KEY']) {
    console.warn('[email] RESEND_API_KEY not set — email sending disabled')
    return null
  }
  if (!_resend) _resend = new Resend(process.env['RESEND_API_KEY'])
  return _resend
}

const FROM = process.env['RESEND_FROM_EMAIL'] ?? 'noreply@dinesalida.com'
const CEO_EMAIL = process.env['CEO_NOTIFY_EMAIL'] ?? 'CEO@epicai.ai'

export async function sendListingConfirmation({
  ownerName,
  ownerEmail,
  businessName,
  tier,
}: {
  ownerName: string
  ownerEmail: string
  businessName: string
  tier: string
}) {
  const resend = getResend()
  if (!resend) return
  const tierLabel = tier === 'premium' ? 'Premium ($99/mo)' : tier === 'sponsored' ? 'Sponsored ($199/mo)' : 'Free'

  await resend.emails.send({
    from: `Dine Salida <${FROM}>`,
    to: ownerEmail,
    subject: `Your listing for ${businessName} has been received`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="color: #F59E0B; font-size: 24px;">Listing Received</h1>
        <p>Hi ${ownerName},</p>
        <p>We've received your listing request for <strong>${businessName}</strong> on Dine Salida — Salida, Colorado's premier dining guide.</p>
        <p><strong>Tier:</strong> ${tierLabel}</p>
        <p>Your listing will be reviewed and go live within 1–2 business days. Premium and Sponsored listings go live immediately after payment confirmation.</p>
        <p>Questions? Reply to this email.</p>
        <hr style="border-color: #253826; margin: 24px 0;" />
        <p style="font-size: 13px; color: #7A9B7D;">Dine Salida — <a href="https://dinesalida.com">dinesalida.com</a></p>
      </div>
    `,
  })
}

export async function notifyCeoNewListing({
  ownerName,
  ownerEmail,
  businessName,
  tier,
  restaurantId,
}: {
  ownerName: string
  ownerEmail: string
  businessName: string
  tier: string
  restaurantId?: number
}) {
  const resend = getResend()
  if (!resend) return

  await resend.emails.send({
    from: `Dine Salida <${FROM}>`,
    to: CEO_EMAIL,
    subject: `New listing submission: ${businessName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="color: #F59E0B; font-size: 20px;">New Listing Submission</h1>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #7A9B7D;">Business</td><td><strong>${businessName}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #7A9B7D;">Owner</td><td>${ownerName}</td></tr>
          <tr><td style="padding: 8px 0; color: #7A9B7D;">Email</td><td>${ownerEmail}</td></tr>
          <tr><td style="padding: 8px 0; color: #7A9B7D;">Tier</td><td>${tier}</td></tr>
          ${restaurantId ? `<tr><td style="padding: 8px 0; color: #7A9B7D;">Restaurant ID</td><td>${restaurantId}</td></tr>` : ''}
        </table>
        <p><a href="https://dinesalida.com/admin/listings" style="color: #F59E0B;">View in admin</a></p>
      </div>
    `,
  })
}

export async function sendRequestListingNotification({
  businessName,
  requestorName,
  requestorEmail,
  notes,
}: {
  businessName: string
  requestorName: string
  requestorEmail: string
  notes?: string
}) {
  const resend = getResend()
  if (!resend) return

  // Notify CEO
  await resend.emails.send({
    from: `Dine Salida <${FROM}>`,
    to: CEO_EMAIL,
    subject: `Listing request: ${businessName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="color: #F59E0B; font-size: 20px;">Listing Request Submitted</h1>
        <p>Someone requested a listing for a business not yet in the directory.</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #7A9B7D;">Business</td><td><strong>${businessName}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #7A9B7D;">Requested by</td><td>${requestorName}</td></tr>
          <tr><td style="padding: 8px 0; color: #7A9B7D;">Email</td><td>${requestorEmail}</td></tr>
          ${notes ? `<tr><td style="padding: 8px 0; color: #7A9B7D;">Notes</td><td>${notes}</td></tr>` : ''}
        </table>
        <p><a href="https://dinesalida.com/admin" style="color: #F59E0B;">Go to admin</a></p>
      </div>
    `,
  })
}

export async function sendSubscriptionConfirmed({
  ownerEmail,
  ownerName,
  businessName,
  tier,
}: {
  ownerEmail: string
  ownerName: string
  businessName: string
  tier: string
}) {
  const resend = getResend()
  if (!resend) return
  const tierLabel = tier === 'premium' ? 'Premium ($99/mo)' : 'Sponsored ($199/mo)'
  const appUrl = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://dinesalida.com'

  await resend.emails.send({
    from: `Dine Salida <${FROM}>`,
    to: ownerEmail,
    subject: `Your ${tierLabel} listing for ${businessName} is now live`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="color: #F59E0B; font-size: 24px;">Your Listing Is Live</h1>
        <p>Hi ${ownerName},</p>
        <p>Great news — your <strong>${tierLabel}</strong> listing for <strong>${businessName}</strong> on Dine Salida is now active.</p>
        <p>Diners in Salida and visitors from across Colorado can now find your business in our directory.</p>
        <div style="margin: 24px 0; padding: 16px; background: #0D1117; border-left: 3px solid #F59E0B; border-radius: 4px;">
          <p style="margin: 0; color: #E6EDF3; font-size: 14px;">
            Manage your subscription anytime at<br/>
            <a href="${appUrl}/manage" style="color: #F59E0B;">${appUrl}/manage</a>
          </p>
        </div>
        <p>Questions? Reply to this email and we will get back to you promptly.</p>
        <hr style="border-color: #253826; margin: 24px 0;" />
        <p style="font-size: 13px; color: #7A9B7D;">Dine Salida — <a href="${appUrl}" style="color: #7A9B7D;">${appUrl}</a></p>
      </div>
    `,
  })
}
