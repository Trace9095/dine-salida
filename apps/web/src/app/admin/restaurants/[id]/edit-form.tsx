'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Trash2 } from 'lucide-react'

interface Restaurant {
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
  neighborhood: string | null
  featured: boolean | null
  listingTier: string | null
  bookingUrl: string | null
  menuUrl: string | null
}

interface Props {
  restaurant: Restaurant
}

export default function EditRestaurantForm({ restaurant }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: restaurant.name,
    description: restaurant.description,
    shortDescription: restaurant.shortDescription ?? '',
    address: restaurant.address,
    phone: restaurant.phone ?? '',
    website: restaurant.website ?? '',
    email: restaurant.email ?? '',
    hours: restaurant.hours ?? '',
    cuisineType: restaurant.cuisineType ?? '',
    priceRange: restaurant.priceRange ?? '$',
    imageUrl: restaurant.imageUrl ?? '',
    neighborhood: restaurant.neighborhood ?? '',
    featured: restaurant.featured ?? false,
    listingTier: restaurant.listingTier ?? 'free',
    bookingUrl: restaurant.bookingUrl ?? '',
    menuUrl: restaurant.menuUrl ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [message, setMessage] = useState('')

  function set(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value
      setForm((prev) => ({ ...prev, [key]: value }))
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch(`/api/restaurants/${restaurant.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setMessage('Saved successfully')
        router.refresh()
      } else {
        setMessage('Failed to save')
      }
    } catch {
      setMessage('Network error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    setDeleting(true)
    try {
      const res = await fetch(`/api/restaurants/${restaurant.slug}`, { method: 'DELETE' })
      if (res.ok) {
        router.push('/admin/restaurants')
        router.refresh()
      }
    } catch {
      setDeleting(false)
    }
  }

  const inputCls = 'h-11 w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3 text-sm text-[#E6EDF3] placeholder-[#8B949E] outline-none focus:border-[#D4A853] transition-colors'
  const labelCls = 'mb-1 block text-xs font-medium text-[#8B949E]'

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-6">
        <h2 className="mb-4 font-semibold text-[#E6EDF3]">Basic Info</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls}>Name</label>
            <input type="text" value={form.name} onChange={set('name')} className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Short Description</label>
            <input type="text" value={form.shortDescription} onChange={set('shortDescription')} className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Description</label>
            <textarea value={form.description} onChange={set('description')} rows={4} className={`${inputCls} h-auto resize-none`} />
          </div>
          <div>
            <label className={labelCls}>Address</label>
            <input type="text" value={form.address} onChange={set('address')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Neighborhood</label>
            <input type="text" value={form.neighborhood} onChange={set('neighborhood')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input type="tel" value={form.phone} onChange={set('phone')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input type="email" value={form.email} onChange={set('email')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Website</label>
            <input type="url" value={form.website} onChange={set('website')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Hours</label>
            <input type="text" value={form.hours} onChange={set('hours')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Cuisine Type</label>
            <input type="text" value={form.cuisineType} onChange={set('cuisineType')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Price Range</label>
            <select value={form.priceRange} onChange={set('priceRange')} className={inputCls}>
              {['$', '$$', '$$$', '$$$$'].map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Listing Tier</label>
            <select value={form.listingTier} onChange={set('listingTier')} className={inputCls}>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
              <option value="sponsored">Sponsored</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Image URL</label>
            <input type="url" value={form.imageUrl} onChange={set('imageUrl')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Booking URL</label>
            <input type="url" value={form.bookingUrl} onChange={set('bookingUrl')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Menu URL</label>
            <input type="url" value={form.menuUrl} onChange={set('menuUrl')} className={inputCls} />
          </div>
          <div className="flex items-center gap-3 sm:col-span-2">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
              className="h-5 w-5 accent-[#D4A853]"
            />
            <label htmlFor="featured" className="text-sm text-[#E6EDF3]">Featured on homepage</label>
          </div>
        </div>
      </div>

      {message && (
        <p className={`text-sm ${message.includes('success') ? 'text-[#3FB950]' : 'text-[#F85149]'}`}>
          {message}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex min-h-[44px] items-center gap-2 rounded-lg bg-[#D4A853] px-6 font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A] disabled:opacity-50"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>

        {!showConfirm ? (
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="flex min-h-[44px] items-center gap-2 rounded-lg border border-[#F85149]/50 px-6 text-sm font-medium text-[#F85149] transition-colors hover:bg-[#F85149]/10"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#8B949E]">Are you sure?</span>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="min-h-[44px] rounded-lg bg-[#F85149] px-4 text-sm font-medium text-white transition-colors hover:bg-[#F85149]/80 disabled:opacity-50"
            >
              {deleting ? 'Deleting...' : 'Yes, delete'}
            </button>
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="min-h-[44px] rounded-lg border border-[#30363D] px-4 text-sm text-[#8B949E] hover:border-[#8B949E] transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </form>
  )
}
