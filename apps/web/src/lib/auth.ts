import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET = new TextEncoder().encode(
  process.env['JWT_SECRET'] ?? 'dev-secret-change-me'
)
const COOKIE = 'ds_admin_token'

export async function signToken(payload: { id: number; email: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as { id: number; email: string }
  } catch {
    return null
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE)?.value
  if (!token) return null
  return verifyToken(token)
}

export async function requireAdmin() {
  const session = await getAdminSession()
  if (!session) return null
  return session
}

export { COOKIE as AUTH_COOKIE }
