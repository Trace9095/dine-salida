import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { getDb } from '@/db'
import { schema } from '@/db'
import { requireAdmin } from '@/lib/auth'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const numId = parseInt(id, 10)
  if (isNaN(numId)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  try {
    const db = getDb()
    await db.delete(schema.categories).where(eq(schema.categories.id, numId))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}
