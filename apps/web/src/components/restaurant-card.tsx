'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RestaurantCardProps {
  restaurant: {
    id: number
    name: string
    slug: string
    shortDescription: string | null
    cuisineType: string | null
    priceRange: string | null
    imageUrl: string | null
    neighborhood: string | null
    listingTier: string | null
  }
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const isSponsored = restaurant.listingTier === 'sponsored'
  const isPremium = restaurant.listingTier === 'premium'

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border bg-[#161B22] transition-all duration-200 hover:border-[#D4A853]/50 hover:shadow-lg hover:shadow-[#D4A853]/5',
        isSponsored ? 'border-[#D4A853]/40' : 'border-[#30363D]'
      )}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-[#0D1117]">
        {restaurant.imageUrl ? (
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            quality={90}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Star className="h-12 w-12 text-[#30363D]" aria-hidden="true" />
          </div>
        )}
        {/* Tier badges */}
        {isSponsored && (
          <span className="absolute left-3 top-3 rounded-full bg-[#D4A853] px-2 py-0.5 text-xs font-semibold text-[#0D1117]">
            Sponsored
          </span>
        )}
        {isPremium && !isSponsored && (
          <span className="absolute left-3 top-3 rounded-full bg-[#161B22] border border-[#D4A853] px-2 py-0.5 text-xs font-semibold text-[#D4A853]">
            Premium
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-semibold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors">
            {restaurant.name}
          </h3>
          {restaurant.priceRange && (
            <span className="shrink-0 text-sm font-medium text-[#D4A853]">
              {restaurant.priceRange}
            </span>
          )}
        </div>

        {restaurant.cuisineType && (
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[#8B949E]">
            {restaurant.cuisineType}
          </p>
        )}

        {restaurant.neighborhood && (
          <div className="mb-3 flex items-center gap-1">
            <MapPin className="h-3 w-3 text-[#8B949E]" aria-hidden="true" />
            <span className="text-xs text-[#8B949E]">{restaurant.neighborhood}</span>
          </div>
        )}

        {restaurant.shortDescription && (
          <p className="mb-4 flex-1 text-sm leading-relaxed text-[#8B949E] line-clamp-2">
            {restaurant.shortDescription}
          </p>
        )}

        <Link
          href={`/restaurants/${restaurant.slug}`}
          className="mt-auto flex min-h-[44px] items-center justify-center rounded-lg border border-[#30363D] bg-[#0D1117] px-4 text-sm font-medium text-[#E6EDF3] transition-all duration-200 hover:border-[#D4A853] hover:text-[#D4A853]"
        >
          View Details
        </Link>
      </div>
    </article>
  )
}
