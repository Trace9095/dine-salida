/**
 * fix-images.ts — Clears mismatched sister-business imageUrls from the live DB.
 *
 * Only these 6 sister businesses may have imageUrl set:
 *   - royal-gorge-rafting
 *   - royal-gorge-zipline-tours
 *   - royal-gorge-vacation-rentals
 *   - royal-gorge-epic-adventures
 *   - whitewater-bar-grill
 *   - rooftop-social
 *
 * All other restaurants get imageUrl = NULL.
 *
 * Run with: DATABASE_URL=... npx tsx scripts/fix-images.ts
 */

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { notInArray } from 'drizzle-orm'
import * as schema from '../src/db/schema'

const SISTER_BUSINESS_SLUGS = [
  'royal-gorge-rafting',
  'royal-gorge-zipline-tours',
  'royal-gorge-vacation-rentals',
  'royal-gorge-epic-adventures',
  'whitewater-bar-grill',
  'rooftop-social',
]

async function main() {
  const DATABASE_URL = process.env['DATABASE_URL']
  if (!DATABASE_URL) {
    console.error('DATABASE_URL environment variable is required')
    process.exit(1)
  }

  const db = drizzle(neon(DATABASE_URL), { schema })

  console.log('Clearing mismatched imageUrls from non-sister-business restaurants...')

  const result = await db
    .update(schema.restaurants)
    .set({ imageUrl: null })
    .where(notInArray(schema.restaurants.slug, SISTER_BUSINESS_SLUGS))

  console.log('Done. All non-sister-business restaurants now have imageUrl = NULL.')
  console.log('Sister businesses preserved (if any):', SISTER_BUSINESS_SLUGS.join(', '))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
