import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getDb } from '@/db'
import { schema } from '@/db'
import { requireAdmin } from '@/lib/auth'

const CategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
  sortOrder: z.number().int().optional(),
})

export async function GET() {
  try {
    const db = getDb()
    const rows = await db
      .select()
      .from(schema.categories)
      .orderBy(schema.categories.sortOrder)
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const data = CategorySchema.parse(body)
    const db = getDb()
    const inserted = await db
      .insert(schema.categories)
      .values(data)
      .returning()
    return NextResponse.json(inserted[0], { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
