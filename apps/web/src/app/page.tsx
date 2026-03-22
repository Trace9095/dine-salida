import Image from 'next/image'
import Link from 'next/link'
import { Search, Star, TrendingUp, Award, MapPin, Phone, ExternalLink, Clock } from 'lucide-react'
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
            From farm-to-table fine dining to craft breweries and mountain patios.
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
                className="flex min-h-[44px] items-center text-sm font-medium text-[#D4A853] transition-colors hover:text-[#E8C97A]"
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

      {/* Worth the Drive — Sister Businesses */}
      <section className="border-t border-[#30363D] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D4A853]/30 bg-[#D4A853]/10 px-4 py-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#D4A853]" aria-hidden="true" />
              <span className="text-xs font-medium text-[#D4A853]">1 Hour East on US-50</span>
            </div>
            <h2 className="text-2xl font-bold text-[#E6EDF3] sm:text-3xl">
              Worth the Drive
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#8B949E]">
              Heading to or from the Royal Gorge? These Canon City dining institutions are
              worth every mile.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Whitewater Bar & Grill */}
            <div className="group relative overflow-hidden rounded-2xl border border-[#30363D] bg-[#161B22] transition-colors hover:border-[#D4A853]/50">
              {/* Featured Partner badge */}
              <div className="absolute left-4 top-4 z-10">
                <span className="inline-flex items-center gap-1 rounded-full border border-[#D4A853] bg-[#0D1117]/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#D4A853] backdrop-blur-sm">
                  Featured Partner
                </span>
              </div>

              <div className="p-6 pt-14">
                {/* Logo */}
                <div className="mb-5 flex h-16 w-48 items-center justify-center rounded-xl border border-[#30363D] bg-[#0D1117] p-3">
                  <Image
                    src="/brand/wwbg-logo.svg"
                    alt="Whitewater Bar & Grill"
                    width={160}
                    height={48}
                    className="h-auto w-full"
                  />
                </div>

                <h3 className="mb-1 text-xl font-bold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors">
                  Whitewater Bar &amp; Grill
                </h3>

                {/* 5-star */}
                <div className="mb-3 flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#D4A853] text-[#D4A853]" aria-hidden="true" />
                  ))}
                  <span className="text-xs text-[#8B949E]">#1 on TripAdvisor — Canon City</span>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-[#8B949E]">
                  Colorado-raised beef, fresh-cut curly fries, live music, and an outdoor
                  patio near Royal Gorge. Undefeated Flavors. Legendary Portions.
                  Open April 17 – October 31.
                </p>

                {/* Details */}
                <div className="mb-5 flex flex-col gap-2">
                  <a
                    href="tel:+17192691009"
                    className="flex items-center gap-2 text-sm text-[#8B949E] transition-colors hover:text-[#D4A853]"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#D4A853]" aria-hidden="true" />
                    (719) 269-1009
                  </a>
                  <div className="flex items-center gap-2 text-sm text-[#8B949E]">
                    <MapPin className="h-3.5 w-3.5 text-[#D4A853]" aria-hidden="true" />
                    45045 Hwy 50 West, Canon City, CO
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8B949E]">
                    <Clock className="h-3.5 w-3.5 text-[#D4A853]" aria-hidden="true" />
                    Open Apr 17 – Oct 31
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://whitewaterbar.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-center gap-1.5 rounded-xl bg-[#D4A853] px-5 text-sm font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A]"
                  >
                    Visit Website
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  <a
                    href="tel:+17192691009"
                    className="flex min-h-[44px] items-center gap-1.5 rounded-xl border border-[#30363D] px-5 text-sm font-semibold text-[#E6EDF3] transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    Call
                  </a>
                  <Link
                    href="/partners/whitewater-bar-grill"
                    className="flex min-h-[44px] items-center px-3 text-sm font-medium text-[#D4A853] transition-colors hover:text-[#E8C97A]"
                  >
                    Learn more &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Rooftop Social */}
            <div className="group relative overflow-hidden rounded-2xl border border-[#30363D] bg-[#161B22] transition-colors hover:border-[#D4A853]/50">
              {/* Featured Partner badge */}
              <div className="absolute left-4 top-4 z-10">
                <span className="inline-flex items-center gap-1 rounded-full border border-[#D4A853] bg-[#0D1117]/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#D4A853] backdrop-blur-sm">
                  Featured Partner
                </span>
              </div>

              <div className="p-6 pt-14">
                {/* Logo */}
                <div className="mb-5 flex h-16 w-48 items-center justify-center rounded-xl border border-[#30363D] bg-[#0D1117] p-3">
                  <Image
                    src="/brand/rt-logo.svg"
                    alt="Rooftop Social"
                    width={180}
                    height={48}
                    className="h-auto w-full"
                  />
                </div>

                <h3 className="mb-1 text-xl font-bold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors">
                  Whitewater Rooftop Social
                </h3>

                {/* 5-star */}
                <div className="mb-3 flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#D4A853] text-[#D4A853]" aria-hidden="true" />
                  ))}
                  <span className="text-xs text-[#8B949E]">Canon City&apos;s Premier Rooftop</span>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-[#8B949E]">
                  Craft cocktails, elevated eats, and stunning mountain views from a 2,000 sq ft
                  open-air rooftop patio in downtown Canon City. The perfect post-gorge
                  destination. Daily 11am – 9pm.
                </p>

                {/* Details */}
                <div className="mb-5 flex flex-col gap-2">
                  <a
                    href="tel:+17194517241"
                    className="flex items-center gap-2 text-sm text-[#8B949E] transition-colors hover:text-[#D4A853]"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#D4A853]" aria-hidden="true" />
                    (719) 451-7241
                  </a>
                  <div className="flex items-center gap-2 text-sm text-[#8B949E]">
                    <MapPin className="h-3.5 w-3.5 text-[#D4A853]" aria-hidden="true" />
                    302 Royal Gorge Blvd, Canon City, CO
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8B949E]">
                    <Clock className="h-3.5 w-3.5 text-[#D4A853]" aria-hidden="true" />
                    Daily 11am – 9pm
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://wwrooftopsocial.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-center gap-1.5 rounded-xl bg-[#D4A853] px-5 text-sm font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A]"
                  >
                    Visit Website
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  <a
                    href="tel:+17194517241"
                    className="flex min-h-[44px] items-center gap-1.5 rounded-xl border border-[#30363D] px-5 text-sm font-semibold text-[#E6EDF3] transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    Call
                  </a>
                  <Link
                    href="/partners/rooftop-social"
                    className="flex min-h-[44px] items-center px-3 text-sm font-medium text-[#D4A853] transition-colors hover:text-[#E8C97A]"
                  >
                    Learn more &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Royal Gorge day trips strip */}
          <div className="mt-6 rounded-xl border border-[#30363D] bg-[#161B22] px-6 py-5">
            <p className="mb-3 text-sm font-semibold text-[#D4A853]">Plan a full Royal Gorge day trip</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://royalgorgerafting.net"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#8B949E] transition-colors hover:text-[#D4A853]"
              >
                <ExternalLink className="h-3.5 w-3.5 text-[#D4A853]" aria-hidden="true" />
                <span>Royal Gorge Rafting</span>
                <span className="text-[#30363D]">·</span>
                <a href="tel:+17192757238" className="hover:text-[#D4A853]">(719) 275-7238</a>
              </a>
              <a
                href="https://royalgorgeziplinetours.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#8B949E] transition-colors hover:text-[#D4A853]"
              >
                <ExternalLink className="h-3.5 w-3.5 text-[#D4A853]" aria-hidden="true" />
                <span>Royal Gorge Zipline</span>
                <span className="text-[#30363D]">·</span>
                <a href="tel:+17192757238" className="hover:text-[#D4A853]">(719) 275-7238</a>
              </a>
              <a
                href="https://royalgorgevacationrentals.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#8B949E] transition-colors hover:text-[#D4A853]"
              >
                <ExternalLink className="h-3.5 w-3.5 text-[#D4A853]" aria-hidden="true" />
                <span>Vacation Rentals</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="border-t border-[#30363D] bg-[#161B22] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#E6EDF3]">List Your Business</h2>
            <p className="mt-2 text-[#8B949E]">
              Get your restaurant in front of thousands of Salida diners. Starting at $99/month.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Premium */}
            <div className="relative rounded-xl border-2 border-[#D4A853] bg-[#0D1117] p-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#D4A853] px-3 py-0.5 text-xs font-bold text-[#0D1117]">
                Most Popular
              </div>
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#D4A853]" aria-hidden="true" />
                <h3 className="font-semibold text-[#E6EDF3]">Premium</h3>
              </div>
              <p className="mb-4 text-3xl font-bold text-[#D4A853]">
                $99<span className="text-base font-normal text-[#8B949E]">/mo</span>
              </p>
              <ul className="mb-6 space-y-2 text-sm text-[#8B949E]">
                <li>Enhanced photo gallery</li>
                <li>Booking &amp; menu links</li>
                <li>Priority in search results</li>
                <li>Extended description</li>
                <li>Premium badge on listing</li>
              </ul>
              <Link
                href="/add-listing?tier=premium"
                className="flex min-h-[44px] items-center justify-center rounded-lg bg-[#D4A853] text-sm font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A]"
              >
                Start Premium
              </Link>
            </div>

            {/* Sponsored */}
            <div className="rounded-xl border border-[#30363D] bg-[#0D1117] p-6">
              <div className="mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-[#D4A853]" aria-hidden="true" />
                <h3 className="font-semibold text-[#E6EDF3]">Sponsored</h3>
              </div>
              <p className="mb-4 text-3xl font-bold text-[#E6EDF3]">
                $199<span className="text-base font-normal text-[#8B949E]">/mo</span>
              </p>
              <ul className="mb-6 space-y-2 text-sm text-[#8B949E]">
                <li>Everything in Premium</li>
                <li>Homepage featured placement</li>
                <li>Gold &quot;Sponsored&quot; badge</li>
                <li>Top of search results</li>
                <li>Analytics dashboard</li>
              </ul>
              <Link
                href="/add-listing?tier=sponsored"
                className="flex min-h-[44px] items-center justify-center rounded-lg border border-[#D4A853] text-sm font-medium text-[#D4A853] transition-colors hover:bg-[#D4A853]/10"
              >
                Go Sponsored
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link href="/pricing" className="text-sm text-[#8B949E] transition-colors hover:text-[#D4A853]">
              View full pricing details &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Recent additions */}
      {recent.length > 0 && (
        <section className="border-t border-[#30363D] px-4 py-16 sm:px-6 lg:px-8">
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
