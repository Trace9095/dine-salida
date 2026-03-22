import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import ClaimForm from './claim-form'
import { getDb } from '@/db'
import { schema } from '@/db'
import { eq } from 'drizzle-orm'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  return { title: `Claim Listing — ${slug}` }
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

export default async function ClaimPage({ params }: PageProps) {
  const { slug } = await params
  const restaurant = await getRestaurant(slug)
  if (!restaurant) notFound()

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <Nav />
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#E6EDF3]">Claim Your Listing</h1>
          <p className="mt-2 text-[#8B949E]">
            You are claiming <span className="font-semibold text-[#D4A853]">{restaurant.name}</span>.
            Select a tier and fill in your business owner details.
          </p>
        </div>
        <ClaimForm restaurant={{ id: restaurant.id, name: restaurant.name, address: restaurant.address }} />
      </main>
      <Footer />
    </div>
  )
}
