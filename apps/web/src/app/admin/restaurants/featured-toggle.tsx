'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

interface Props {
  restaurantId: number
  featured: boolean
  slug: string
}

export default function AdminFeaturedToggle({ restaurantId, featured: initialFeatured, slug }: Props) {
  const [featured, setFeatured] = useState(initialFeatured)
  const [loading, setLoading] = useState(false)

  async function toggle() {
    setLoading(true)
    try {
      await fetch(`/api/restaurants/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !featured }),
      })
      setFeatured((prev) => !prev)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      aria-label={featured ? 'Remove featured' : 'Mark as featured'}
      className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border transition-colors disabled:opacity-50 ${
        featured
          ? 'border-[#D4A853] text-[#D4A853]'
          : 'border-[#30363D] text-[#8B949E] hover:border-[#D4A853] hover:text-[#D4A853]'
      }`}
    >
      <Star className={`h-4 w-4 ${featured ? 'fill-[#D4A853]' : ''}`} aria-hidden="true" />
    </button>
  )
}
