import { getDb } from '@/db'
import { schema } from '@/db'

export default async function AdminListingsPage() {
  let listings: typeof schema.listings.$inferSelect[] = []
  try {
    const db = getDb()
    listings = await db
      .select()
      .from(schema.listings)
      .orderBy(schema.listings.createdAt)
      .limit(100)
  } catch {
    listings = []
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#E6EDF3]">Listing Requests</h1>
        <p className="mt-1 text-sm text-[#8B949E]">{listings.length} total requests</p>
      </div>

      {listings.length === 0 ? (
        <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-12 text-center text-[#8B949E]">
          No listing requests yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#30363D]">
          <table className="w-full text-sm">
            <thead className="bg-[#161B22]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Owner</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Restaurant ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Tier</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363D] bg-[#0D1117]">
              {listings.map((listing) => (
                <tr key={listing.id} className="hover:bg-[#161B22] transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-[#E6EDF3]">{listing.ownerName ?? '—'}</div>
                    <div className="text-xs text-[#8B949E]">{listing.ownerEmail}</div>
                    {listing.ownerPhone && (
                      <div className="text-xs text-[#8B949E]">{listing.ownerPhone}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#8B949E]">#{listing.restaurantId}</td>
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
      )}
    </div>
  )
}
