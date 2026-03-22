import Link from 'next/link'
import { Phone, MapPin, Clock, ExternalLink, Star, Waves, Mountain, Home } from 'lucide-react'

// ─── Featured Partner Restaurants (Canon City / Royal Gorge area) ───────────

const FEATURED_PARTNERS = [
  {
    name: 'Whitewater Bar & Grill',
    slug: '/partners/whitewater-bar-grill',
    tagline: 'Undefeated Flavors. Legendary Portions.',
    description:
      '#1 restaurant in Canon City on TripAdvisor. Colorado-raised beef, live music, outdoor patio, 80+ menu items — just 1 hour from Salida.',
    address: '45045 Hwy 50 West, Canon City, CO',
    phone: '(719) 269-1009',
    tel: 'tel:+17192691009',
    web: 'https://whitewaterbar.com',
    hours: 'Open Apr 17 – Oct 31',
    rating: 5,
    priceRange: '$$',
    cuisine: 'American / Bar & Grill',
    badge: 'Featured Partner · Worth the Drive',
  },
  {
    name: 'Rooftop Social',
    slug: '/partners/rooftop-social',
    tagline: "Canon City's rooftop destination.",
    description:
      'Elevated dining and cocktails above downtown Canon City. Rooftop patio, craft cocktails, and a full dinner menu — a perfect stop on any Royal Gorge day trip.',
    address: 'Downtown Canon City, CO',
    phone: '(719) 451-7241',
    tel: 'tel:+17194517241',
    web: 'https://wwrooftopsocial.com',
    hours: 'Check website for hours',
    rating: 5,
    priceRange: '$$',
    cuisine: 'Rooftop Bar & Dining',
    badge: 'Featured Partner · Worth the Drive',
  },
]

// ─── Day Trip Adventures ─────────────────────────────────────────────────────

const DAY_TRIP_ADVENTURES = [
  {
    name: 'Royal Gorge Rafting',
    icon: Waves,
    description: 'Class III–V whitewater rafting on the Arkansas River through Royal Gorge — the most thrilling stretch in Colorado.',
    phone: '(719) 275-7238',
    tel: 'tel:+17192757238',
    web: 'https://royalgorgerafting.net',
    distance: '~40 min east via US-50',
  },
  {
    name: 'Royal Gorge Zipline Tours',
    icon: Mountain,
    description: 'Soar above the Royal Gorge on a zipline adventure with views that will stay with you forever.',
    phone: '(719) 275-7238',
    tel: 'tel:+17192757238',
    web: 'https://royalgorgeziplinetours.com',
    distance: '~40 min east via US-50',
  },
  {
    name: 'Royal Gorge Vacation Rentals',
    icon: Home,
    description: 'Yurts, Airstreams, and cabins near the Royal Gorge — extend your day trip into an overnight adventure.',
    phone: '(719) 275-7238',
    tel: 'tel:+17192757238',
    web: 'https://royalgorgevacationrentals.com',
    distance: '~1 hour east via US-50',
  },
]

// ─── Components ──────────────────────────────────────────────────────────────

export function FeaturedPartnerRestaurants() {
  return (
    <div className="mt-12 border-t border-[#30363D] pt-10">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#D4A853]">
          Worth the Drive — 1 Hour East
        </p>
        <h2 className="mt-1 text-xl font-bold text-[#E6EDF3]">Featured Partner Restaurants</h2>
        <p className="mt-1 text-sm text-[#8B949E]">
          Just 1 hour east on US-50 — exceptional dining near the Royal Gorge.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {FEATURED_PARTNERS.map((p) => (
          <div
            key={p.name}
            className="flex flex-col justify-between rounded-xl border border-[#D4A853]/30 bg-[#161B22] p-5"
          >
            <div>
              <span className="inline-block rounded-full border border-[#D4A853]/30 bg-[#D4A853]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#D4A853]">
                {p.badge}
              </span>
              <h3 className="mt-3 text-lg font-bold text-[#E6EDF3]">{p.name}</h3>
              <p className="text-sm font-medium text-[#D4A853]">{p.tagline}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#8B949E]">{p.description}</p>

              <div className="mt-3 flex flex-col gap-1.5 text-xs text-[#8B949E]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#D4A853]" aria-hidden="true" />
                  {p.address}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-[#D4A853]" aria-hidden="true" />
                  {p.hours}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[...Array(p.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#D4A853] text-[#D4A853]" aria-hidden="true" />
                  ))}
                </div>
                <span className="text-xs text-[#8B949E]">{p.cuisine} · {p.priceRange}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={p.tel}
                className="flex min-h-[44px] items-center gap-1.5 rounded-lg border border-[#30363D] px-3 text-sm font-medium text-[#8B949E] transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {p.phone}
              </a>
              <a
                href={p.web}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center gap-1.5 rounded-lg bg-[#D4A853] px-4 text-sm font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A]"
              >
                Visit Website
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <Link
                href={p.slug}
                className="flex min-h-[44px] items-center gap-1.5 rounded-lg border border-[#30363D] px-4 text-sm font-medium text-[#8B949E] transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DayTripAdventures() {
  return (
    <div className="mt-10 border-t border-[#30363D] pt-10">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#D4A853]">
          While You're in the Area
        </p>
        <h2 className="mt-1 text-xl font-bold text-[#E6EDF3]">Day Trip Adventures</h2>
        <p className="mt-1 text-sm text-[#8B949E]">
          Combine great dining with unforgettable outdoor experiences — all within an hour of Salida.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {DAY_TRIP_ADVENTURES.map((a) => {
          const Icon = a.icon
          return (
            <div
              key={a.name}
              className="rounded-xl border border-[#30363D] bg-[#161B22] p-4"
            >
              <Icon className="h-5 w-5 text-[#D4A853]" aria-hidden="true" />
              <p className="mt-2 font-semibold text-[#E6EDF3]">{a.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#8B949E]">{a.description}</p>
              <p className="mt-2 text-xs text-[#D4A853]">{a.distance}</p>
              <div className="mt-3 flex gap-2">
                <a
                  href={a.tel}
                  className="flex min-h-[40px] items-center gap-1 rounded-lg border border-[#30363D] px-2.5 text-xs text-[#8B949E] transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  {a.phone}
                </a>
                <a
                  href={a.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[40px] items-center gap-1 rounded-lg bg-[#D4A853]/10 px-2.5 text-xs font-medium text-[#D4A853] transition-colors hover:bg-[#D4A853]/20"
                >
                  Website
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
