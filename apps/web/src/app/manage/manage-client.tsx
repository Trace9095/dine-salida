'use client'

import { useState } from 'react'
import { Search, CreditCard, CheckCircle, AlertCircle, ExternalLink, Star, Clock, MapPin } from 'lucide-react'

interface ListingResult {
  listingId: number
  restaurantId: number
  restaurantName: string
  restaurantSlug: string
  tier: string
  status: string | null
  createdAt: string | null
  hasActiveSubscription: boolean
  stripeCustomerId: string | null
}

export default function ManageClient() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [portalLoading, setPortalLoading] = useState<number | null>(null)
  const [results, setResults] = useState<ListingResult[] | null>(null)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setError('')
    setResults(null)
    setSearched(false)

    try {
      const res = await fetch(`/api/manage/lookup?email=${encodeURIComponent(email.trim())}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Lookup failed')
      setResults(data.listings)
      setSearched(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function handleManageSubscription(listing: ListingResult) {
    if (!listing.stripeCustomerId) return
    setPortalLoading(listing.listingId)

    try {
      const res = await fetch('/api/manage/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stripeCustomerId: listing.stripeCustomerId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Could not open portal')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not open subscription portal')
      setPortalLoading(null)
    }
  }

  const tierLabel = (tier: string) =>
    tier === 'premium' ? 'Premium' : tier === 'sponsored' ? 'Sponsored' : 'Free'

  const tierColor = (tier: string) =>
    tier === 'sponsored'
      ? 'text-[#D4A853] border-[#D4A853] bg-[#D4A853]/10'
      : tier === 'premium'
      ? 'text-[#60A5FA] border-[#60A5FA] bg-[#60A5FA]/10'
      : 'text-[#8B949E] border-[#30363D] bg-[#161B22]'

  return (
    <div className="mx-auto max-w-2xl">
      {/* Email lookup form */}
      <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-8">
        <h2 className="mb-2 text-lg font-semibold text-[#E6EDF3]">Look Up Your Listing</h2>
        <p className="mb-6 text-sm text-[#8B949E]">
          Enter the email address you used when submitting your listing.
        </p>

        <form onSubmit={handleLookup} className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B949E]" aria-hidden="true" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@restaurant.com"
              required
              className="h-11 w-full rounded-xl border border-[#30363D] bg-[#0D1117] pl-10 pr-4 text-sm text-[#E6EDF3] placeholder-[#8B949E] outline-none focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex h-11 min-w-[120px] items-center justify-center rounded-xl bg-[#D4A853] px-6 text-sm font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A] disabled:opacity-60"
          >
            {loading ? 'Searching…' : 'Look Up'}
          </button>
        </form>

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {searched && results !== null && (
        <div className="mt-6">
          {results.length === 0 ? (
            <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-8 text-center">
              <AlertCircle className="mx-auto mb-3 h-8 w-8 text-[#8B949E]" aria-hidden="true" />
              <p className="font-semibold text-[#E6EDF3]">No listings found</p>
              <p className="mt-1 text-sm text-[#8B949E]">
                No listings are associated with <strong className="text-[#E6EDF3]">{email}</strong>.
                <br />
                Try another email or{' '}
                <a href="/add-listing" className="text-[#D4A853] hover:underline">
                  submit a new listing
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-[#8B949E]">
                Found {results.length} listing{results.length !== 1 ? 's' : ''} for{' '}
                <strong className="text-[#E6EDF3]">{email}</strong>
              </p>

              {results.map((listing) => (
                <div
                  key={listing.listingId}
                  className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6"
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-[#E6EDF3]">{listing.restaurantName}</h3>
                      <a
                        href={`/restaurants/${listing.restaurantSlug}`}
                        className="mt-0.5 flex items-center gap-1 text-xs text-[#8B949E] hover:text-[#D4A853] transition-colors"
                      >
                        View listing
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${tierColor(listing.tier)}`}
                    >
                      {tierLabel(listing.tier)}
                    </span>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-3 text-sm text-[#8B949E]">
                    <span className="flex items-center gap-1.5">
                      {listing.status === 'active' ? (
                        <CheckCircle className="h-4 w-4 text-green-400" aria-hidden="true" />
                      ) : (
                        <Clock className="h-4 w-4 text-[#8B949E]" aria-hidden="true" />
                      )}
                      {listing.status === 'active' ? 'Active' : listing.status === 'pending' ? 'Pending review' : listing.status ?? 'Unknown'}
                    </span>

                    {listing.hasActiveSubscription && (
                      <span className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 text-[#D4A853]" aria-hidden="true" />
                        Subscription active
                      </span>
                    )}

                    {listing.createdAt && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        Listed{' '}
                        {new Date(listing.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    {listing.stripeCustomerId ? (
                      <button
                        onClick={() => handleManageSubscription(listing)}
                        disabled={portalLoading === listing.listingId}
                        className="flex min-h-[40px] items-center gap-2 rounded-xl bg-[#D4A853] px-5 text-sm font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A] disabled:opacity-60"
                      >
                        <CreditCard className="h-4 w-4" aria-hidden="true" />
                        {portalLoading === listing.listingId ? 'Opening…' : 'Manage Subscription'}
                      </button>
                    ) : listing.tier !== 'free' ? null : (
                      <a
                        href={`/claim/${listing.restaurantSlug}`}
                        className="flex min-h-[40px] items-center gap-2 rounded-xl border border-[#D4A853] px-5 text-sm font-semibold text-[#D4A853] transition-colors hover:bg-[#D4A853]/10"
                      >
                        Upgrade to Premium
                      </a>
                    )}

                    <a
                      href={`/restaurants/${listing.restaurantSlug}`}
                      className="flex min-h-[40px] items-center gap-2 rounded-xl border border-[#30363D] px-5 text-sm font-semibold text-[#E6EDF3] transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
                    >
                      View Listing
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Help text */}
      <div className="mt-8 rounded-xl border border-[#30363D] bg-[#161B22] p-5">
        <h3 className="mb-3 text-sm font-semibold text-[#E6EDF3]">Need help?</h3>
        <ul className="space-y-2 text-sm text-[#8B949E]">
          <li>
            <strong className="text-[#E6EDF3]">Update payment method</strong> — Use the &ldquo;Manage Subscription&rdquo; button above to update your card, change plan, or cancel.
          </li>
          <li>
            <strong className="text-[#E6EDF3]">Listing not found?</strong> — Use the same email you submitted your listing with. Contact us if you are still having trouble.
          </li>
          <li>
            <strong className="text-[#E6EDF3]">Not listed yet?</strong>{' '}
            <a href="/add-listing" className="text-[#D4A853] hover:underline">
              Submit your restaurant
            </a>{' '}
            to get started.
          </li>
        </ul>
      </div>
    </div>
  )
}
