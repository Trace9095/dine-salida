import Link from 'next/link'
import { UtensilsCrossed, ClipboardList, Tag, TrendingUp } from 'lucide-react'
import { getDb } from '@/db'
import { schema } from '@/db'
import { eq, count } from 'drizzle-orm'

async function getStats() {
  try {
    const db = getDb()
    const [restaurantCount] = await db.select({ count: count() }).from(schema.restaurants)
    const [listingCount] = await db.select({ count: count() }).from(schema.listings)
    const [pendingCount] = await db
      .select({ count: count() })
      .from(schema.listings)
      .where(eq(schema.listings.status, 'pending'))
    const premium = await db
      .select()
      .from(schema.restaurants)
      .where(eq(schema.restaurants.listingTier, 'premium'))
    const sponsored = await db
      .select()
      .from(schema.restaurants)
      .where(eq(schema.restaurants.listingTier, 'sponsored'))
    const revenueEst = premium.length * 49 + sponsored.length * 99

    return {
      restaurants: restaurantCount?.count ?? 0,
      listings: listingCount?.count ?? 0,
      pending: pendingCount?.count ?? 0,
      revenueEst,
    }
  } catch {
    return { restaurants: 0, listings: 0, pending: 0, revenueEst: 0 }
  }
}

async function getRecentListings() {
  try {
    const db = getDb()
    return await db
      .select()
      .from(schema.listings)
      .orderBy(schema.listings.createdAt)
      .limit(10)
  } catch {
    return []
  }
}

export default async function AdminDashboard() {
  const [stats, recentListings] = await Promise.all([getStats(), getRecentListings()])

  const cards = [
    { label: 'Total Restaurants', value: stats.restaurants, icon: UtensilsCrossed, href: '/admin/restaurants' },
    { label: 'Total Listings', value: stats.listings, icon: ClipboardList, href: '/admin/listings' },
    { label: 'Pending Review', value: stats.pending, icon: Tag, href: '/admin/listings' },
    { label: 'Est. Monthly Revenue', value: `$${stats.revenueEst}`, icon: TrendingUp, href: '/admin/restaurants' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#E6EDF3]">Dashboard</h1>
        <p className="mt-1 text-sm text-[#8B949E]">Dine Salida admin overview</p>
      </div>

      {/* Stats grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-xl border border-[#30363D] bg-[#161B22] p-5 transition-colors hover:border-[#D4A853]/50"
            >
              <div className="mb-3 flex items-center justify-between">
                <Icon className="h-5 w-5 text-[#D4A853]" aria-hidden="true" />
              </div>
              <p className="text-2xl font-bold text-[#E6EDF3]">{card.value}</p>
              <p className="mt-1 text-xs text-[#8B949E]">{card.label}</p>
            </Link>
          )
        })}
      </div>

      {/* Quick links */}
      <div className="mb-8 flex flex-wrap gap-3">
        <Link
          href="/admin/restaurants"
          className="flex min-h-[44px] items-center gap-2 rounded-lg bg-[#D4A853] px-5 text-sm font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A]"
        >
          <UtensilsCrossed className="h-4 w-4" aria-hidden="true" />
          Manage Restaurants
        </Link>
        <Link
          href="/admin/categories"
          className="flex min-h-[44px] items-center gap-2 rounded-lg border border-[#30363D] px-5 text-sm font-medium text-[#E6EDF3] transition-colors hover:border-[#D4A853]"
        >
          <Tag className="h-4 w-4" aria-hidden="true" />
          Manage Categories
        </Link>
      </div>

      {/* Recent listings */}
      {recentListings.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-[#E6EDF3]">Recent Listing Requests</h2>
          <div className="overflow-hidden rounded-xl border border-[#30363D]">
            <table className="w-full text-sm">
              <thead className="bg-[#161B22]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Owner</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Tier</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30363D] bg-[#0D1117]">
                {recentListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-[#161B22] transition-colors">
                    <td className="px-4 py-3 text-[#E6EDF3]">
                      <div>{listing.ownerName ?? '—'}</div>
                      <div className="text-xs text-[#8B949E]">{listing.ownerEmail}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        listing.tier === 'sponsored'
                          ? 'bg-[#D4A853]/20 text-[#D4A853]'
                          : listing.tier === 'premium'
                          ? 'bg-[#58A6FF]/20 text-[#58A6FF]'
                          : 'bg-[#30363D] text-[#8B949E]'
                      }`}>
                        {listing.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        listing.status === 'active'
                          ? 'bg-[#3FB950]/20 text-[#3FB950]'
                          : 'bg-[#D4A853]/20 text-[#D4A853]'
                      }`}>
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#8B949E]">
                      {listing.createdAt?.toLocaleDateString() ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
