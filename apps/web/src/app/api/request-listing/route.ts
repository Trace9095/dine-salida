import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendRequestListingNotification } from '@/lib/email'

const Schema = z.object({
  businessName: z.string().min(2),
  requestorName: z.string().min(1),
  requestorEmail: z.string().email(),
  notes: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = Schema.parse(body)

    void sendRequestListingNotification(data).catch(() => {})

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 })
  }
}
