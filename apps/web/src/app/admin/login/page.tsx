'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, LogIn } from 'lucide-react'
import type { Metadata } from 'next'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = (await res.json()) as { success?: boolean; error?: string }

      if (res.ok && data.success) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(data.error ?? 'Invalid credentials')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0D1117] px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <MapPin className="h-6 w-6 text-[#D4A853]" aria-hidden="true" />
          <span className="text-xl font-bold text-[#D4A853]">Dine Salida</span>
        </div>

        <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-8">
          <h1 className="mb-6 text-xl font-bold text-[#E6EDF3]">Admin Login</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-[#8B949E]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="h-11 w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3 text-sm text-[#E6EDF3] placeholder-[#8B949E] outline-none focus:border-[#D4A853] transition-colors"
                placeholder="CEO@epicai.ai"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-[#8B949E]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="h-11 w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3 text-sm text-[#E6EDF3] placeholder-[#8B949E] outline-none focus:border-[#D4A853] transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-[#F85149]/30 bg-[#F85149]/10 px-3 py-2 text-sm text-[#F85149]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#D4A853] font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A] disabled:opacity-50"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
