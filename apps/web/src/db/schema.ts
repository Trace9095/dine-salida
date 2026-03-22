import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description'),
  icon: text('icon').default('utensils'),
  color: text('color').default('#D4A853'),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
})

export const restaurants = pgTable('restaurants', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description').notNull(),
  shortDescription: text('short_description'),
  address: text('address').notNull(),
  phone: text('phone'),
  website: text('website'),
  email: text('email'),
  hours: text('hours'),
  cuisineType: text('cuisine_type'),
  priceRange: text('price_range').default('$'),
  imageUrl: text('image_url'),
  galleryUrls: text('gallery_urls').array().default([]),
  neighborhood: text('neighborhood').default('Downtown'),
  featured: boolean('featured').default(false),
  claimedBy: integer('claimed_by').references(() => adminUsers.id),
  listingTier: text('listing_tier').default('free'),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  bookingUrl: text('booking_url'),
  menuUrl: text('menu_url'),
  lat: text('lat'),
  lng: text('lng'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const restaurantCategories = pgTable('restaurant_categories', {
  restaurantId: integer('restaurant_id')
    .notNull()
    .references(() => restaurants.id),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id),
})

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  restaurantId: integer('restaurant_id')
    .notNull()
    .references(() => restaurants.id),
  authorName: text('author_name').notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const listings = pgTable('listings', {
  id: serial('id').primaryKey(),
  restaurantId: integer('restaurant_id')
    .notNull()
    .references(() => restaurants.id),
  ownerEmail: text('owner_email').notNull(),
  ownerName: text('owner_name'),
  ownerPhone: text('owner_phone'),
  tier: text('tier').notNull().default('free'),
  stripeSessionId: text('stripe_session_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Relations
export const restaurantsRelations = relations(restaurants, ({ many, one }) => ({
  restaurantCategories: many(restaurantCategories),
  reviews: many(reviews),
  listings: many(listings),
  claimedByUser: one(adminUsers, {
    fields: [restaurants.claimedBy],
    references: [adminUsers.id],
  }),
}))

export const categoriesRelations = relations(categories, ({ many }) => ({
  restaurantCategories: many(restaurantCategories),
}))

export const restaurantCategoriesRelations = relations(
  restaurantCategories,
  ({ one }) => ({
    restaurant: one(restaurants, {
      fields: [restaurantCategories.restaurantId],
      references: [restaurants.id],
    }),
    category: one(categories, {
      fields: [restaurantCategories.categoryId],
      references: [categories.id],
    }),
  })
)

export const reviewsRelations = relations(reviews, ({ one }) => ({
  restaurant: one(restaurants, {
    fields: [reviews.restaurantId],
    references: [restaurants.id],
  }),
}))

export const listingsRelations = relations(listings, ({ one }) => ({
  restaurant: one(restaurants, {
    fields: [listings.restaurantId],
    references: [restaurants.id],
  }),
}))

export type AdminUser = typeof adminUsers.$inferSelect
export type NewAdminUser = typeof adminUsers.$inferInsert
export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
export type Restaurant = typeof restaurants.$inferSelect
export type NewRestaurant = typeof restaurants.$inferInsert
export type RestaurantCategory = typeof restaurantCategories.$inferSelect
export type Review = typeof reviews.$inferSelect
export type NewReview = typeof reviews.$inferInsert
export type Listing = typeof listings.$inferSelect
export type NewListing = typeof listings.$inferInsert
