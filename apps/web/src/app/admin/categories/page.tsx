import { getDb } from '@/db'
import { schema } from '@/db'
import CategoriesClient from './categories-client'

async function getCategories() {
  try {
    const db = getDb()
    return await db
      .select()
      .from(schema.categories)
      .orderBy(schema.categories.sortOrder)
  } catch {
    return []
  }
}

export default async function AdminCategoriesPage() {
  const categories = await getCategories()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#E6EDF3]">Categories</h1>
        <p className="mt-1 text-sm text-[#8B949E]">{categories.length} categories</p>
      </div>
      <CategoriesClient categories={categories} />
    </div>
  )
}
