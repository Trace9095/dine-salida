import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { eq } from 'drizzle-orm'
import { getDb } from '@/db'
import { schema } from '@/db'
import { signToken, AUTH_COOKIE } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { email?: string; password?: string }
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const db = getDb()
    const users = await db
      .select()
      .from(schema.adminUsers)
      .where(eq(schema.adminUsers.email, email.toLowerCase()))
      .limit(1)

    const user = users[0]
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = await signToken({ id: user.id, email: user.email })
    const cookieStore = await cookies()
    cookieStore.set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
