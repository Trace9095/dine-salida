import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Phone, Globe, Clock, Bookmark, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import ReviewForm from './review-form'
import RestaurantCard from '@/components/restaurant-card'
import { BookingButton } from '@/components/BookingButton'
import { getDb } from '@/db'
import { schema } from '@/db'
import { eq } from 'drizzle-orm'
import { formatPhone } from '@/lib/utils'
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getRestaurant(slug: string) {
  try {
    const db = getDb()
    const rows = await db
      .select()
      .from(schema.restaurants)
      .where(eq(schema.restaurants.slug, slug))
      .limit(1)
    return rows[0] ?? null
  } catch {
    return null
  }
}

async function getReviews(restaurantId: number) {
  try {
    const db = getDb()
    return await db
      .select()
      .from(schema.reviews)
      .where(eq(schema.reviews.restaurantId, restaurantId))
      .limit(20)
  } catch {
    return []
  }
}

async function getRelatedRestaurants(currentId: number) {
  try {
    const db = getDb()
    const rows = await db.select().from(schema.restaurants).limit(4)
    return rows.filter((r) => r.id !== currentId).slice(0, 3)
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const restaurant = await getRestaurant(slug)
  if (!restaurant) return {}
  return {
    title: restaurant.name,
    description: restaurant.shortDescription ?? restaurant.description.slice(0, 160),
    openGraph: {
      title: restaurant.name,
      description: restaurant.shortDescription ?? restaurant.description.slice(0, 160),
      images: restaurant.imageUrl ? [{ url: restaurant.imageUrl }] : [],
    },
  }
}

export default async function RestaurantPage({ params }: PageProps) {
  const { slug } = await params
  const restaurant = await getRestaurant(slug)
  if (!restaurant) notFound()

  const [reviews, related] = await Promise.all([
    getReviews(restaurant.id),
    getRelatedRestaurants(restaurant.id),
  ])

  // JSON-LD uses only server-controlled data — safe for structured data injection
  const jsonLdString = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    description: restaurant.description,
    address: { '@type': 'PostalAddress', streetAddress: restaurant.address },
    telephone: restaurant.phone ?? undefined,
    url: restaurant.website ?? undefined,
    openingHours: restaurant.hours ?? undefined,
    priceRange: restaurant.priceRange ?? undefined,
    image: restaurant.imageUrl ?? undefined,
  })

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <Nav />

      {restaurant.imageUrl && (
        <div className="relative h-64 w-full sm:h-80 lg:h-96">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            sizes="100vw"
            priority
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/40 via-transparent to-transparent" />
        </div>
      )}

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            {restaurant.listingTier === 'sponsored' && (
              <span className="rounded-full bg-[#D4A853] px-3 py-0.5 text-xs font-bold text-[#0D1117]">
                Sponsored
              </span>
            )}
            {restaurant.neighborhood && (
              <span className="rounded-full border border-[#30363D] px-3 py-0.5 text-xs text-[#8B949E]">
                {restaurant.neighborhood}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-[#E6EDF3] sm:text-4xl">{restaurant.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#8B949E]">
            {restaurant.cuisineType && <span>{restaurant.cuisineType}</span>}
            {restaurant.cuisineType && restaurant.priceRange && (
              <span className="text-[#30363D]">·</span>
            )}
            {restaurant.priceRange && (
              <span className="font-medium text-[#D4A853]">{restaurant.priceRange}</span>
            )}
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 rounded-xl border border-[#30363D] bg-[#161B22] p-6 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Address</p>
              <p className="text-sm text-[#E6EDF3]">{restaurant.address}</p>
            </div>
          </div>
          {restaurant.phone && (
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Phone</p>
                <a
                  href={`tel:${restaurant.phone.replace(/\D/g, '')}`}
                  className="text-sm text-[#E6EDF3] hover:text-[#D4A853] transition-colors"
                >
                  {formatPhone(restaurant.phone)}
                </a>
              </div>
            </div>
          )}
          {restaurant.website && (
            <div className="flex items-start gap-3">
              <Globe className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Website</p>
                <a
                  href={restaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-[#E6EDF3] hover:text-[#D4A853] transition-colors"
                >
                  Visit website
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          )}
          {restaurant.hours && (
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Hours</p>
                <p className="text-sm text-[#E6EDF3]">{restaurant.hours}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-[#E6EDF3]">About</h2>
          <p className="leading-relaxed text-[#8B949E]">{restaurant.description}</p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {restaurant.bookingUrl && (
            <BookingButton
              href={restaurant.bookingUrl}
              businessName={restaurant.name}
              className="flex min-h-[44px] items-center gap-2 rounded-lg bg-[#D4A853] px-6 font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A]"
            >
              Book a Table
            </BookingButton>
          )}
          {restaurant.menuUrl && (
            <a
              href={restaurant.menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center gap-2 rounded-lg border border-[#30363D] px-6 text-sm font-medium text-[#E6EDF3] transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
            >
              View Menu
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {!restaurant.claimedBy && (
            <Link
              href={`/claim/${restaurant.slug}`}
              className="flex min-h-[44px] items-center gap-2 rounded-lg border border-[#30363D] px-6 text-sm font-medium text-[#8B949E] transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
            >
              <Bookmark className="h-4 w-4" aria-hidden="true" />
              Claim This Listing
            </Link>
          )}
        </div>

        {restaurant.galleryUrls && restaurant.galleryUrls.length > 0 && (
          <div className="mb-10">
            <h2 className="mb-4 text-lg font-semibold text-[#E6EDF3]">Gallery</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {restaurant.galleryUrls.map((url, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={url}
                    alt={`${restaurant.name} photo ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    quality={90}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-[#E6EDF3]">
            Reviews {reviews.length > 0 && `(${reviews.length})`}
          </h2>
          {reviews.length > 0 ? (
            <div className="mb-6 space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-xl border border-[#30363D] bg-[#161B22] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-[#E6EDF3]">{review.authorName}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-[#D4A853]' : 'text-[#30363D]'}>
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>
                  {review.comment && <p className="text-sm text-[#8B949E]">{review.comment}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className="mb-6 text-sm text-[#8B949E]">No reviews yet. Be the first!</p>
          )}
          <ReviewForm restaurantId={restaurant.id} />
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-[#E6EDF3]">More Restaurants</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* JSON-LD structured data (server-controlled, not user input) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
    </div>
  )
}
