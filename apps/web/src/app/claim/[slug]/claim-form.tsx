'use client'

import { useState } from 'react'
import { CheckCircle, TrendingUp, Award } from 'lucide-react'

interface ClaimFormProps {
  restaurant: { id: number; name: string; address: string }
}

const TIERS = [
  {
    id: 'premium' as const,
    label: 'Premium',
    price: '$99/mo',
    description: 'Full profile with photos, booking link, and priority placement.',
    icon: TrendingUp,
    features: ['Address, phone & hours', 'Photo gallery', 'Booking & menu links', 'Priority in search', 'Category tags'],
    popular: true,
  },
  {
    id: 'sponsored' as const,
    label: 'Sponsored',
    price: '$199/mo',
    description: 'Top placement, homepage feature, gold badge, and analytics.',
    icon: Award,
    features: ['Everything in Premium', 'Homepage feature', 'Gold badge', 'Top of search', 'Analytics'],
  },
]

export default function ClaimForm({ restaurant }: ClaimFormProps) {
  const [tier, setTier] = useState<'premium' | 'sponsored'>('premium')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setStatus('loading')
    setError('')

    // All tiers are paid → Stripe checkout
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier,
          restaurantId: restaurant.id,
          ownerEmail: email,
          ownerName: name,
        }),
      })
      const data = (await res.json()) as { url?: string; error?: string }
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error ?? 'Failed to create checkout session.')
        setStatus('error')
      }
    } catch {
      setError('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-[#3FB950]/30 bg-[#3FB950]/10 p-8 text-center">
        <CheckCircle className="mx-auto mb-3 h-10 w-10 text-[#3FB950]" aria-hidden="true" />
        <h2 className="mb-2 text-xl font-bold text-[#E6EDF3]">Claim Submitted!</h2>
        <p className="text-[#8B949E]">
          We&apos;ll review your claim for <strong>{restaurant.name}</strong> and get back to you within
          1–2 business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tier selection */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#8B949E]">
          Select a Plan
        </h2>
        <div className="space-y-3">
          {TIERS.map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTier(t.id)}
                className={`relative w-full rounded-xl border p-4 text-left transition-all ${
                  tier === t.id
                    ? 'border-[#D4A853] bg-[#D4A853]/5'
                    : 'border-[#30363D] bg-[#161B22] hover:border-[#8B949E]'
                }`}
              >
                {t.popular && (
                  <span className="absolute right-4 top-4 rounded-full bg-[#D4A853] px-2 py-0.5 text-xs font-bold text-[#0D1117]">
                    Popular
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-5 w-5 ${tier === t.id ? 'text-[#D4A853]' : 'text-[#8B949E]'}`}
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#E6EDF3]">{t.label}</span>
                      <span className="text-sm font-bold text-[#D4A853]">{t.price}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#8B949E]">{t.description}</p>
                  </div>
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {t.features.map((f) => (
                    <li key={f} className="text-xs text-[#8B949E]">
                      · {f}
                    </li>
                  ))}
                </ul>
              </button>
            )
          })}
        </div>
      </div>

      {/* Owner info */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#8B949E]">
          Your Details
        </h2>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#8B949E]">Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11 w-full rounded-lg border border-[#30363D] bg-[#161B22] px-3 text-sm text-[#E6EDF3] placeholder-[#8B949E] outline-none focus:border-[#D4A853]"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#8B949E]">Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 w-full rounded-lg border border-[#30363D] bg-[#161B22] px-3 text-sm text-[#E6EDF3] placeholder-[#8B949E] outline-none focus:border-[#D4A853]"
              placeholder="you@restaurant.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#8B949E]">Phone (optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 w-full rounded-lg border border-[#30363D] bg-[#161B22] px-3 text-sm text-[#E6EDF3] placeholder-[#8B949E] outline-none focus:border-[#D4A853]"
              placeholder="(719) 555-0100"
            />
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-[#F85149]">{error}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#D4A853] font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A] disabled:opacity-50"
      >
        {status === 'loading'
          ? 'Processing...'
          : `Continue to Payment — ${TIERS.find((t) => t.id === tier)?.price}`}
      </button>
    </form>
  )
}
