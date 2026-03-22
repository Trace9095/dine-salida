import Link from 'next/link'
import { Search, Star, CheckCircle, TrendingUp, Award } from 'lucide-react'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import RestaurantCard from '@/components/restaurant-card'
import { getDb } from '@/db'
import { schema } from '@/db'
import { eq, desc } from 'drizzle-orm'
import { SALIDA_CATEGORIES } from '@/data/categories'

async function getFeaturedRestaurants() {
  try {
    const db = getDb()
    return await db
      .select()
      .from(schema.restaurants)
      .where(eq(schema.restaurants.featured, true))
      .limit(6)
  } catch {
    return []
  }
}

async function getRecentRestaurants() {
  try {
    const db = getDb()
    return await db
      .select()
      .from(schema.restaurants)
      .orderBy(desc(schema.restaurants.createdAt))
      .limit(4)
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [featured, recent] = await Promise.all([
    getFeaturedRestaurants(),
    getRecentRestaurants(),
  ])

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#30363D] bg-gradient-to-b from-[#161B22] to-[#0D1117] px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,168,83,0.08)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4A853]/30 bg-[#D4A853]/10 px-4 py-1.5">
            <Star className="h-3.5 w-3.5 text-[#D4A853]" aria-hidden="true" />
            <span className="text-xs font-medium text-[#D4A853]">Salida, Colorado</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-[#E6EDF3] sm:text-5xl lg:text-6xl">
            Discover Salida&apos;s
            <br />
            <span className="text-[#D4A853]">Best Dining</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-[#8B949E]">
            Your guide to the best restaurants, breweries, and cafes in Salida, Colorado.
            From farm-to-table fine dining to craft breweries and riverside patios.
          </p>

          {/* Search */}
          <div className="mx-auto mb-8 flex max-w-xl gap-2">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B949E]"
                aria-hidden="true"
              />
              <form action="/restaurants" method="GET">
                <input
                  type="text"
                  name="search"
                  placeholder="Search restaurants, cuisine, neighborhood..."
                  className="h-12 w-full rounded-lg border border-[#30363D] bg-[#161B22] pl-10 pr-4 text-sm text-[#E6EDF3] placeholder-[#8B949E] outline-none transition-colors focus:border-[#D4A853]"
                />
              </form>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/restaurants"
              className="flex min-h-[44px] items-center rounded-lg bg-[#D4A853] px-8 font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A]"
            >
              Explore Restaurants
            </Link>
            <Link
              href="/add-listing"
              className="flex min-h-[44px] items-center rounded-lg border border-[#30363D] px-8 font-semibold text-[#E6EDF3] transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
            >
              List Your Business
            </Link>
          </div>
        </div>
      </section>

      {/* Featured restaurants */}
      {featured.length > 0 && (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#E6EDF3]">Featured Restaurants</h2>
                <p className="mt-1 text-sm text-[#8B949E]">Salida&apos;s most-loved dining spots</p>
              </div>
              <Link
                href="/restaurants"
                className="min-h-[44px] flex items-center text-sm font-medium text-[#D4A853] hover:text-[#E8C97A] transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category browse */}
      <section className="border-t border-[#30363D] bg-[#161B22] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-2xl font-bold text-[#E6EDF3]">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {SALIDA_CATEGORIES.slice(0, 12).map((cat) => (
              <Link
                key={cat.slug}
                href={`/restaurants?category=${cat.slug}`}
                className="flex min-h-[44px] items-center justify-center rounded-lg border border-[#30363D] bg-[#0D1117] px-4 py-3 text-center text-sm font-medium text-[#8B949E] transition-all hover:border-[#D4A853] hover:text-[#D4A853]"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#E6EDF3]">List Your Business</h2>
            <p className="mt-2 text-[#8B949E]">
              Get your restaurant in front of thousands of Salida diners
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Free */}
            <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-6">
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#3FB950]" aria-hidden="true" />
                <h3 className="font-semibold text-[#E6EDF3]">Free</h3>
              </div>
              <p className="mb-4 text-3xl font-bold text-[#E6EDF3]">$0</p>
              <ul className="mb-6 space-y-2 text-sm text-[#8B949E]">
                <li>Basic listing with address &amp; phone</li>
                <li>Hours of operation</li>
                <li>Category tagging</li>
                <li>Searchable in directory</li>
              </ul>
              <Link
                href="/add-listing"
                className="flex min-h-[44px] items-center justify-center rounded-lg border border-[#30363D] text-sm font-medium text-[#E6EDF3] transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
              >
                Get Started Free
              </Link>
            </div>

            {/* Premium */}
            <div className="relative rounded-xl border-2 border-[#D4A853] bg-[#161B22] p-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#D4A853] px-3 py-0.5 text-xs font-bold text-[#0D1117]">
                Most Popular
              </div>
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#D4A853]" aria-hidden="true" />
                <h3 className="font-semibold text-[#E6EDF3]">Premium</h3>
              </div>
              <p className="mb-4 text-3xl font-bold text-[#D4A853]">
                $49<span className="text-base font-normal text-[#8B949E]">/mo</span>
              </p>
              <ul className="mb-6 space-y-2 text-sm text-[#8B949E]">
                <li>Everything in Free</li>
                <li>Enhanced photo gallery</li>
                <li>Booking &amp; menu links</li>
                <li>Priority in search results</li>
                <li>Extended description</li>
              </ul>
              <Link
                href="/pricing"
                className="flex min-h-[44px] items-center justify-center rounded-lg bg-[#D4A853] text-sm font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A]"
              >
                Start Premium
              </Link>
            </div>

            {/* Sponsored */}
            <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-6">
              <div className="mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-[#D4A853]" aria-hidden="true" />
                <h3 className="font-semibold text-[#E6EDF3]">Sponsored</h3>
              </div>
              <p className="mb-4 text-3xl font-bold text-[#E6EDF3]">
                $99<span className="text-base font-normal text-[#8B949E]">/mo</span>
              </p>
              <ul className="mb-6 space-y-2 text-sm text-[#8B949E]">
                <li>Everything in Premium</li>
                <li>Homepage featured placement</li>
                <li>Gold &quot;Sponsored&quot; badge</li>
                <li>Top of search results</li>
                <li>Analytics dashboard</li>
              </ul>
              <Link
                href="/pricing"
                className="flex min-h-[44px] items-center justify-center rounded-lg border border-[#30363D] text-sm font-medium text-[#E6EDF3] transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
              >
                Go Sponsored
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent additions */}
      {recent.length > 0 && (
        <section className="border-t border-[#30363D] bg-[#161B22] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-2xl font-bold text-[#E6EDF3]">Recently Added</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recent.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
