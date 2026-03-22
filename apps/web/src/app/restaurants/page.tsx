import { Suspense } from 'react'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import RestaurantsClient from './restaurants-client'
import { getDb } from '@/db'
import { schema } from '@/db'
import { SALIDA_CATEGORIES } from '@/data/categories'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Restaurants',
  description: 'Browse all restaurants, breweries, and cafes in Salida, Colorado.',
}

async function getAllRestaurants() {
  try {
    const db = getDb()
    return await db.select().from(schema.restaurants)
  } catch {
    return []
  }
}

export default async function RestaurantsPage() {
  const restaurants = await getAllRestaurants()

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#E6EDF3]">Salida Restaurants</h1>
          <p className="mt-2 text-[#8B949E]">
            Discover {restaurants.length} dining experiences in Salida, Colorado
          </p>
        </div>
        <Suspense fallback={<div className="text-[#8B949E]">Loading...</div>}>
          <RestaurantsClient
            restaurants={restaurants}
            categories={SALIDA_CATEGORIES}
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
