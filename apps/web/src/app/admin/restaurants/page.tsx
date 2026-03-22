import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import { getDb } from '@/db'
import { schema } from '@/db'
import AdminFeaturedToggle from './featured-toggle'

async function getRestaurants() {
  try {
    const db = getDb()
    return await db.select().from(schema.restaurants).orderBy(schema.restaurants.name)
  } catch {
    return []
  }
}

export default async function AdminRestaurantsPage() {
  const restaurants = await getRestaurants()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#E6EDF3]">Restaurants</h1>
          <p className="mt-1 text-sm text-[#8B949E]">{restaurants.length} total</p>
        </div>
        <Link
          href="/admin/restaurants/new"
          className="flex min-h-[44px] items-center gap-2 rounded-lg bg-[#D4A853] px-5 text-sm font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A]"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add New
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#30363D]">
        <table className="w-full text-sm">
          <thead className="bg-[#161B22]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Tier</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Featured</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Claimed</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#30363D] bg-[#0D1117]">
            {restaurants.map((r) => (
              <tr key={r.id} className="hover:bg-[#161B22] transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-[#E6EDF3]">{r.name}</div>
                  <div className="text-xs text-[#8B949E]">{r.cuisineType}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    r.listingTier === 'sponsored'
                      ? 'bg-[#D4A853]/20 text-[#D4A853]'
                      : r.listingTier === 'premium'
                      ? 'bg-[#58A6FF]/20 text-[#58A6FF]'
                      : 'bg-[#30363D] text-[#8B949E]'
                  }`}>
                    {r.listingTier ?? 'free'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <AdminFeaturedToggle restaurantId={r.id} featured={r.featured ?? false} slug={r.slug} />
                </td>
                <td className="px-4 py-3 text-[#8B949E]">
                  {r.claimedBy ? (
                    <span className="text-xs text-[#3FB950]">Claimed</span>
                  ) : (
                    <span className="text-xs text-[#8B949E]">Unclaimed</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/restaurants/${r.id}`}
                    className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#30363D] text-[#8B949E] transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
                    aria-label={`Edit ${r.name}`}
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
