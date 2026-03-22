'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { SALIDA_CATEGORIES } from '@/data/categories'
import { slugify } from '@/lib/utils'

const PRICE_RANGES = ['$', '$$', '$$$', '$$$$']

interface FormState {
  name: string
  address: string
  phone: string
  website: string
  cuisineType: string
  description: string
  hours: string
  priceRange: string
  imageUrl: string
  ownerName: string
  ownerEmail: string
  categories: string[]
}

const INITIAL: FormState = {
  name: '',
  address: '',
  phone: '',
  website: '',
  cuisineType: '',
  description: '',
  hours: '',
  priceRange: '$',
  imageUrl: '',
  ownerName: '',
  ownerEmail: '',
  categories: [],
}

export default function AddListingForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  function set(key: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }))
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  function toggleCategory(slug: string) {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(slug)
        ? prev.categories.filter((c) => c !== slug)
        : [...prev.categories, slug],
    }))
  }

  function validate(): boolean {
    const errs: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) errs.name = 'Business name is required'
    if (!form.address.trim()) errs.address = 'Address is required'
    if (!form.description.trim()) errs.description = 'Description is required'
    if (!form.ownerName.trim()) errs.ownerName = 'Your name is required'
    if (!form.ownerEmail.trim()) errs.ownerEmail = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.ownerEmail))
      errs.ownerEmail = 'Enter a valid email'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')

    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          slug: slugify(form.name),
          tier: 'premium',
        }),
      })
      if (res.ok) {
        setStatus('success')
        setForm(INITIAL)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-[#3FB950]/30 bg-[#3FB950]/10 p-10 text-center">
        <CheckCircle className="mx-auto mb-3 h-10 w-10 text-[#3FB950]" aria-hidden="true" />
        <h2 className="mb-2 text-xl font-bold text-[#E6EDF3]">Listing Submitted!</h2>
        <p className="text-[#8B949E]">
          Thank you! We will review your listing and get back to you within 1–2 business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="rounded-xl border border-[#30363D] bg-[#161B22] p-6">
        <h2 className="mb-4 font-semibold text-[#E6EDF3]">Restaurant Details</h2>
        <div className="space-y-4">
          <Field label="Business Name *" error={errors.name}>
            <input
              type="text"
              value={form.name}
              onChange={set('name')}
              className={inputCls(!!errors.name)}
              placeholder="Amicas Pizza & Wine Bar"
            />
          </Field>
          <Field label="Address *" error={errors.address}>
            <input
              type="text"
              value={form.address}
              onChange={set('address')}
              className={inputCls(!!errors.address)}
              placeholder="136 E 2nd St, Salida, CO 81201"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone">
              <input
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                className={inputCls(false)}
                placeholder="(719) 555-0100"
              />
            </Field>
            <Field label="Price Range">
              <select
                value={form.priceRange}
                onChange={set('priceRange')}
                className={inputCls(false)}
              >
                {PRICE_RANGES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Website">
            <input
              type="url"
              value={form.website}
              onChange={set('website')}
              className={inputCls(false)}
              placeholder="https://yourrestaurant.com"
            />
          </Field>
          <Field label="Cuisine Type">
            <input
              type="text"
              value={form.cuisineType}
              onChange={set('cuisineType')}
              className={inputCls(false)}
              placeholder="Pizza, American, Mexican..."
            />
          </Field>
          <Field label="Hours">
            <input
              type="text"
              value={form.hours}
              onChange={set('hours')}
              className={inputCls(false)}
              placeholder="Mon–Sat 11am–9pm, Sun 11am–8pm"
            />
          </Field>
          <Field label="Description *" error={errors.description}>
            <textarea
              value={form.description}
              onChange={set('description')}
              rows={4}
              className={`${inputCls(!!errors.description)} resize-none`}
              placeholder="Tell diners about your restaurant, cuisine, and atmosphere..."
            />
          </Field>
          <Field label="Photo URL">
            <input
              type="url"
              value={form.imageUrl}
              onChange={set('imageUrl')}
              className={inputCls(false)}
              placeholder="https://images.unsplash.com/..."
            />
          </Field>
        </div>
      </section>

      {/* Categories */}
      <section className="rounded-xl border border-[#30363D] bg-[#161B22] p-6">
        <h2 className="mb-4 font-semibold text-[#E6EDF3]">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {SALIDA_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => toggleCategory(cat.slug)}
              className={`min-h-[44px] rounded-lg border px-4 text-sm font-medium transition-colors ${
                form.categories.includes(cat.slug)
                  ? 'border-[#D4A853] bg-[#D4A853]/10 text-[#D4A853]'
                  : 'border-[#30363D] text-[#8B949E] hover:border-[#8B949E]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Owner info */}
      <section className="rounded-xl border border-[#30363D] bg-[#161B22] p-6">
        <h2 className="mb-4 font-semibold text-[#E6EDF3]">Your Details</h2>
        <div className="space-y-4">
          <Field label="Your Name *" error={errors.ownerName}>
            <input
              type="text"
              value={form.ownerName}
              onChange={set('ownerName')}
              className={inputCls(!!errors.ownerName)}
              placeholder="Jane Doe"
            />
          </Field>
          <Field label="Email Address *" error={errors.ownerEmail}>
            <input
              type="email"
              value={form.ownerEmail}
              onChange={set('ownerEmail')}
              className={inputCls(!!errors.ownerEmail)}
              placeholder="you@restaurant.com"
            />
          </Field>
        </div>
      </section>

      {status === 'error' && (
        <p className="text-sm text-[#F85149]">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#D4A853] font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A] disabled:opacity-50"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {status === 'loading' ? 'Submitting...' : 'Submit Your Listing'}
      </button>
    </form>
  )
}

function Field({
  label,
  children,
  error,
}: {
  label: string
  children: React.ReactNode
  error?: string
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-[#8B949E]">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-[#F85149]">{error}</p>}
    </div>
  )
}

function inputCls(hasError: boolean) {
  return `h-11 w-full rounded-lg border ${
    hasError ? 'border-[#F85149]' : 'border-[#30363D]'
  } bg-[#0D1117] px-3 text-sm text-[#E6EDF3] placeholder-[#8B949E] outline-none focus:border-[#D4A853] transition-colors`
}
