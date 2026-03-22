import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getDb } from '@/db'
import { schema } from '@/db'

const ReviewSchema = z.object({
  restaurantId: z.number().int().positive(),
  authorName: z.string().min(1).max(100),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = ReviewSchema.parse(body)
    const db = getDb()
    const inserted = await db
      .insert(schema.reviews)
      .values(data)
      .returning()
    return NextResponse.json(inserted[0], { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  }
}
