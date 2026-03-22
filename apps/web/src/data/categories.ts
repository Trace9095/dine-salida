export interface CategorySeed {
  name: string
  slug: string
  description: string
  icon: string
  color: string
  sortOrder: number
}

export const SALIDA_CATEGORIES: CategorySeed[] = [
  {
    name: 'Pizza',
    slug: 'pizza',
    description: 'Wood-fired and artisan pizza',
    icon: 'pizza',
    color: '#E57C3A',
    sortOrder: 1,
  },
  {
    name: 'Breweries',
    slug: 'brewery',
    description: 'Craft breweries and taprooms',
    icon: 'beer',
    color: '#D4A853',
    sortOrder: 2,
  },
  {
    name: 'Fine Dining',
    slug: 'fine-dining',
    description: 'Upscale dining experiences',
    icon: 'utensils',
    color: '#8B6CF6',
    sortOrder: 3,
  },
  {
    name: 'Farm to Table',
    slug: 'farm-to-table',
    description: 'Locally sourced, seasonal menus',
    icon: 'leaf',
    color: '#3FB950',
    sortOrder: 4,
  },
  {
    name: 'American',
    slug: 'american',
    description: 'Classic American cuisine',
    icon: 'star',
    color: '#58A6FF',
    sortOrder: 5,
  },
  {
    name: 'Mexican',
    slug: 'mexican',
    description: 'Mexican and Latin cuisine',
    icon: 'flame',
    color: '#F85149',
    sortOrder: 6,
  },
  {
    name: 'Cafe',
    slug: 'cafe',
    description: 'Coffee shops and casual cafes',
    icon: 'coffee',
    color: '#A07850',
    sortOrder: 7,
  },
  {
    name: 'Breakfast',
    slug: 'breakfast',
    description: 'Breakfast and brunch spots',
    icon: 'sunrise',
    color: '#FFA500',
    sortOrder: 8,
  },
  {
    name: 'Desserts',
    slug: 'desserts',
    description: 'Ice cream, pastries, and sweets',
    icon: 'ice-cream',
    color: '#FF69B4',
    sortOrder: 9,
  },
  {
    name: 'Bar',
    slug: 'bar',
    description: 'Bars and nightlife',
    icon: 'wine',
    color: '#6E40C9',
    sortOrder: 10,
  },
  {
    name: 'Cocktails',
    slug: 'cocktails',
    description: 'Craft cocktails and mixology',
    icon: 'glass-water',
    color: '#4ECDC4',
    sortOrder: 11,
  },
  {
    name: 'Wine Bar',
    slug: 'wine-bar',
    description: 'Wine bars and tasting rooms',
    icon: 'grape',
    color: '#9B2335',
    sortOrder: 12,
  },
]
