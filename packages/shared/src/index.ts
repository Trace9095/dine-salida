export type ListingTier = 'free' | 'premium' | 'sponsored'

export interface Restaurant {
  id: number
  name: string
  slug: string
  description: string
  shortDescription: string | null
  address: string
  phone: string | null
  website: string | null
  email: string | null
  hours: string | null
  cuisineType: string | null
  priceRange: string | null
  imageUrl: string | null
  galleryUrls: string[] | null
  neighborhood: string | null
  featured: boolean | null
  claimedBy: number | null
  listingTier: ListingTier | null
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  bookingUrl: string | null
  menuUrl: string | null
  lat: string | null
  lng: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  icon: string | null
  color: string | null
  sortOrder: number | null
  createdAt: Date | null
}

export interface Review {
  id: number
  restaurantId: number
  authorName: string
  rating: number
  comment: string | null
  createdAt: Date | null
}

export interface Listing {
  id: number
  restaurantId: number
  ownerEmail: string
  ownerName: string | null
  ownerPhone: string | null
  tier: ListingTier
  stripeSessionId: string | null
  stripeSubscriptionId: string | null
  status: string | null
  createdAt: Date | null
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  imageUrl: string
  metaDescription: string
}

export interface AdminUser {
  id: number
  email: string
  name: string | null
  createdAt: Date | null
}
