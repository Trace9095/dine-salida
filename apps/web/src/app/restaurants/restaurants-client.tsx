'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import RestaurantCard from '@/components/restaurant-card'
import type { CategorySeed } from '@/data/categories'

interface Restaurant {
  id: number
  name: string
  slug: string
  shortDescription: string | null
  cuisineType: string | null
  priceRange: string | null
  imageUrl: string | null
  neighborhood: string | null
  listingTier: string | null
  featured: boolean | null
  createdAt: Date | null
}

interface RestaurantsClientProps {
  restaurants: Restaurant[]
  categories: CategorySeed[]
}

export default function RestaurantsClient({
  restaurants,
  categories,
}: RestaurantsClientProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [sortBy, setSortBy] = useState('featured')

  const filtered = useMemo(() => {
    let result = [...restaurants]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisineType?.toLowerCase().includes(q) ||
          r.neighborhood?.toLowerCase().includes(q) ||
          r.shortDescription?.toLowerCase().includes(q)
      )
    }

    if (priceRange) {
      result = result.filter((r) => r.priceRange === priceRange)
    }

    // Sort
    if (sortBy === 'featured') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    } else if (sortBy === 'newest') {
      result.sort(
        (a, b) =>
          (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0)
      )
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [restaurants, search, priceRange, sortBy])

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B949E]"
            aria-hidden="true"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search restaurants..."
            className="h-11 w-full rounded-lg border border-[#30363D] bg-[#161B22] pl-10 pr-4 text-sm text-[#E6EDF3] placeholder-[#8B949E] outline-none focus:border-[#D4A853]"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#8B949E]" aria-hidden="true" />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-11 min-w-[140px] rounded-lg border border-[#30363D] bg-[#161B22] px-3 text-sm text-[#E6EDF3] outline-none focus:border-[#D4A853]"
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="h-11 min-w-[120px] rounded-lg border border-[#30363D] bg-[#161B22] px-3 text-sm text-[#E6EDF3] outline-none focus:border-[#D4A853]"
          aria-label="Filter by price range"
        >
          <option value="">All Prices</option>
          <option value="$">$ — Budget</option>
          <option value="$$">$$ — Mid</option>
          <option value="$$$">$$$ — Upscale</option>
          <option value="$$$$">$$$$ — Fine</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="h-11 min-w-[120px] rounded-lg border border-[#30363D] bg-[#161B22] px-3 text-sm text-[#E6EDF3] outline-none focus:border-[#D4A853]"
          aria-label="Sort restaurants"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>

      {/* Count */}
      <p className="mb-6 text-sm text-[#8B949E]">
        Showing {filtered.length} restaurant{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-12 text-center">
          <p className="text-[#8B949E]">No restaurants match your search.</p>
          <button
            type="button"
            onClick={() => {
              setSearch('')
              setCategory('')
              setPriceRange('')
              setSortBy('featured')
            }}
            className="mt-4 min-h-[44px] rounded-lg border border-[#30363D] px-6 text-sm text-[#E6EDF3] hover:border-[#D4A853] hover:text-[#D4A853] transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
