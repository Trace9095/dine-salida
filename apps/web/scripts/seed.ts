import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import * as schema from '../src/db/schema'
import { SALIDA_CATEGORIES } from '../src/data/categories'
import { SALIDA_RESTAURANTS } from '../src/data/restaurants'

const DATABASE_URL = process.env['DATABASE_URL']
if (!DATABASE_URL) {
  console.error('DATABASE_URL env var is required')
  process.exit(1)
}

const db = drizzle(neon(DATABASE_URL), { schema })

async function seed() {
  console.log('Starting seed...')

  // ── 1. Admin user ──────────────────────────────────────────────
  console.log('Seeding admin user...')
  const hash = await bcrypt.hash('Trace87223!', 10)
  const existing = await db
    .select()
    .from(schema.adminUsers)
    .where(eq(schema.adminUsers.email, 'CEO@epicai.ai'))
    .limit(1)

  if (existing.length === 0) {
    await db.insert(schema.adminUsers).values({
      email: 'CEO@epicai.ai',
      passwordHash: hash,
      name: 'Trace Hildebrand',
    })
    console.log('  Admin user created: CEO@epicai.ai')
  } else {
    await db
      .update(schema.adminUsers)
      .set({ passwordHash: hash, name: 'Trace Hildebrand' })
      .where(eq(schema.adminUsers.email, 'CEO@epicai.ai'))
    console.log('  Admin user updated: CEO@epicai.ai')
  }

  // ── 2. Categories ──────────────────────────────────────────────
  console.log('Seeding categories...')
  for (const cat of SALIDA_CATEGORIES) {
    const existing = await db
      .select()
      .from(schema.categories)
      .where(eq(schema.categories.slug, cat.slug))
      .limit(1)

    if (existing.length === 0) {
      await db.insert(schema.categories).values(cat)
      console.log(`  Created category: ${cat.name}`)
    } else {
      await db
        .update(schema.categories)
        .set(cat)
        .where(eq(schema.categories.slug, cat.slug))
      console.log(`  Updated category: ${cat.name}`)
    }
  }

  // ── 3. Restaurants ─────────────────────────────────────────────
  console.log('Seeding restaurants...')
  for (const r of SALIDA_RESTAURANTS) {
    const { categories: catSlugs, ...restaurantData } = r

    const existing = await db
      .select()
      .from(schema.restaurants)
      .where(eq(schema.restaurants.slug, restaurantData.slug))
      .limit(1)

    let restaurantId: number

    if (existing.length === 0) {
      const inserted = await db
        .insert(schema.restaurants)
        .values(restaurantData)
        .returning()
      restaurantId = inserted[0]!.id
      console.log(`  Created restaurant: ${restaurantData.name}`)
    } else {
      await db
        .update(schema.restaurants)
        .set({ ...restaurantData, updatedAt: new Date() })
        .where(eq(schema.restaurants.slug, restaurantData.slug))
      restaurantId = existing[0]!.id
      console.log(`  Updated restaurant: ${restaurantData.name}`)
    }

    // ── 4. Link categories ──────────────────────────────────────
    // Remove existing links then re-insert
    await db
      .delete(schema.restaurantCategories)
      .where(eq(schema.restaurantCategories.restaurantId, restaurantId))

    for (const slug of catSlugs) {
      const catRows = await db
        .select()
        .from(schema.categories)
        .where(eq(schema.categories.slug, slug))
        .limit(1)

      if (catRows[0]) {
        await db.insert(schema.restaurantCategories).values({
          restaurantId,
          categoryId: catRows[0].id,
        })
      }
    }
  }

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
