'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  icon: string | null
  color: string | null
  sortOrder: number | null
}

interface Props {
  categories: Category[]
}

export default function CategoriesClient({ categories: initialCategories }: Props) {
  const [categories, setCategories] = useState(initialCategories)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('utensils')
  const [color, setColor] = useState('#D4A853')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !slug.trim()) return
    setAdding(true)
    setError('')
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug, description, icon, color }),
      })
      const data = await res.json() as Category & { error?: string }
      if (res.ok) {
        setCategories((prev) => [...prev, data])
        setName('')
        setSlug('')
        setDescription('')
      } else {
        setError(data.error ?? 'Failed to add')
      }
    } catch {
      setError('Network error')
    } finally {
      setAdding(false)
    }
  }

  async function handleDelete(id: number) {
    try {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      setCategories((prev) => prev.filter((c) => c.id !== id))
    } catch {
      // silent
    }
  }

  const inputCls = 'h-11 w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3 text-sm text-[#E6EDF3] placeholder-[#8B949E] outline-none focus:border-[#D4A853] transition-colors'

  return (
    <div className="space-y-6">
      {/* Add form */}
      <form onSubmit={handleAdd} className="rounded-xl border border-[#30363D] bg-[#161B22] p-6">
        <h2 className="mb-4 font-semibold text-[#E6EDF3]">Add Category</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#8B949E]">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''))
              }}
              required
              className={inputCls}
              placeholder="Pizza"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#8B949E]">Slug *</label>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className={inputCls} placeholder="pizza" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#8B949E]">Icon (Lucide name)</label>
            <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} className={inputCls} placeholder="utensils" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#8B949E]">Color</label>
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className={inputCls} placeholder="#D4A853" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-[#8B949E]">Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls} placeholder="Description..." />
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-[#F85149]">{error}</p>}
        <button
          type="submit"
          disabled={adding}
          className="mt-4 flex min-h-[44px] items-center gap-2 rounded-lg bg-[#D4A853] px-5 text-sm font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A] disabled:opacity-50"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {adding ? 'Adding...' : 'Add Category'}
        </button>
      </form>

      {/* Category list */}
      <div className="overflow-hidden rounded-xl border border-[#30363D]">
        <table className="w-full text-sm">
          <thead className="bg-[#161B22]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Slug</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Icon</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#8B949E]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#30363D] bg-[#0D1117]">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-[#161B22] transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: cat.color ?? '#D4A853' }}
                    />
                    <span className="font-medium text-[#E6EDF3]">{cat.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#8B949E]">{cat.slug}</td>
                <td className="px-4 py-3 text-[#8B949E]">{cat.icon}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleDelete(cat.id)}
                    aria-label={`Delete ${cat.name}`}
                    className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#30363D] text-[#8B949E] transition-colors hover:border-[#F85149] hover:text-[#F85149]"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
