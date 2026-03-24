import type { MetadataRoute } from 'next'
import { getDb } from '@/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://dinesalida.com'

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/restaurants`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/add-listing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/manage`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
  ]

  let restaurantPages: MetadataRoute.Sitemap = []

  try {
    const db = getDb()
    const { schema } = await import('@/db')
    const rows = await db
      .select({ slug: schema.restaurants.slug, updatedAt: schema.restaurants.updatedAt })
      .from(schema.restaurants)

    restaurantPages = rows.map((r) => ({
      url: `${base}/restaurants/${r.slug}`,
      lastModified: r.updatedAt ?? new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch {
    restaurantPages = []
  }

  return [...staticPages, ...restaurantPages]
}
