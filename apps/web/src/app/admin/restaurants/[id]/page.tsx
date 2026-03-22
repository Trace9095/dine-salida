import { notFound } from 'next/navigation'
import { getDb } from '@/db'
import { schema } from '@/db'
import { eq } from 'drizzle-orm'
import EditRestaurantForm from './edit-form'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditRestaurantPage({ params }: PageProps) {
  const { id } = await params
  const numId = parseInt(id, 10)

  if (isNaN(numId)) notFound()

  let restaurant = null
  try {
    const db = getDb()
    const rows = await db
      .select()
      .from(schema.restaurants)
      .where(eq(schema.restaurants.id, numId))
      .limit(1)
    restaurant = rows[0] ?? null
  } catch {
    restaurant = null
  }

  if (!restaurant) notFound()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#E6EDF3]">Edit Restaurant</h1>
        <p className="mt-1 text-sm text-[#8B949E]">{restaurant.name}</p>
      </div>
      <EditRestaurantForm restaurant={restaurant} />
    </div>
  )
}
