'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

interface ReviewFormProps {
  restaurantId: number
}

export default function ReviewForm({ restaurantId }: ReviewFormProps) {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setStatus('loading')

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId, authorName: name, rating, comment }),
      })
      if (res.ok) {
        setStatus('success')
        setName('')
        setComment('')
        setRating(5)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-[#3FB950]/30 bg-[#3FB950]/10 p-4 text-sm text-[#3FB950]">
        Thank you for your review!
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-[#30363D] bg-[#161B22] p-6">
      <h3 className="mb-4 font-semibold text-[#E6EDF3]">Leave a Review</h3>
      <div className="mb-4">
        <label className="mb-1 block text-xs font-medium text-[#8B949E]">Your Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="h-11 w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3 text-sm text-[#E6EDF3] placeholder-[#8B949E] outline-none focus:border-[#D4A853]"
          placeholder="Jane D."
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-xs font-medium text-[#8B949E]">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="h-11 w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3 text-sm text-[#E6EDF3] outline-none focus:border-[#D4A853]"
        >
          <option value={5}>5 — Excellent</option>
          <option value={4}>4 — Very Good</option>
          <option value={3}>3 — Good</option>
          <option value={2}>2 — Fair</option>
          <option value={1}>1 — Poor</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-xs font-medium text-[#8B949E]">Comment (optional)</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3 py-2 text-sm text-[#E6EDF3] placeholder-[#8B949E] outline-none focus:border-[#D4A853] resize-none"
          placeholder="Tell others about your experience..."
        />
      </div>
      {status === 'error' && (
        <p className="mb-3 text-sm text-[#F85149]">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex min-h-[44px] items-center gap-2 rounded-lg bg-[#D4A853] px-6 font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A] disabled:opacity-50"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {status === 'loading' ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}
