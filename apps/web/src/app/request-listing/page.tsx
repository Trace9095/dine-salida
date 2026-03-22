'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

// Note: metadata export doesn't work in 'use client' — handled via generateMetadata in a wrapper
// For simplicity this page handles its own head via layout

export default function RequestListingPage() {
  const [form, setForm] = useState({
    businessName: '',
    requestorName: '',
    requestorEmail: '',
    notes: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/request-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Submission failed')
      }
      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1B0E]">
      <Nav />
      <main className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#F0F4EF]">Request a Listing</h1>
          <p className="mt-3 text-[#7A9B7D]">
            Know a great Salida restaurant that&apos;s not in our directory? Let us know and
            we&apos;ll reach out to get them listed.
          </p>
        </div>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#253826] bg-[#131F14] p-10 text-center">
            <CheckCircle className="h-12 w-12 text-[#22C55E]" aria-hidden="true" />
            <h2 className="text-xl font-bold text-[#F0F4EF]">Request received!</h2>
            <p className="text-[#7A9B7D]">
              Thanks for the tip. We&apos;ll follow up with the restaurant and get them added
              to the directory.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-[#253826] bg-[#131F14] p-8"
          >
            <div>
              <label
                htmlFor="businessName"
                className="mb-1.5 block text-sm font-medium text-[#F0F4EF]"
              >
                Restaurant / Business Name <span className="text-[#F59E0B]">*</span>
              </label>
              <input
                id="businessName"
                type="text"
                required
                value={form.businessName}
                onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                placeholder="e.g. The Salida Café"
                className="w-full rounded-xl border border-[#253826] bg-[#0D1B0E] px-4 py-3 text-[#F0F4EF] placeholder-[#7A9B7D] focus:border-[#F59E0B] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="requestorName"
                className="mb-1.5 block text-sm font-medium text-[#F0F4EF]"
              >
                Your Name <span className="text-[#F59E0B]">*</span>
              </label>
              <input
                id="requestorName"
                type="text"
                required
                value={form.requestorName}
                onChange={(e) => setForm({ ...form, requestorName: e.target.value })}
                placeholder="Your full name"
                className="w-full rounded-xl border border-[#253826] bg-[#0D1B0E] px-4 py-3 text-[#F0F4EF] placeholder-[#7A9B7D] focus:border-[#F59E0B] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="requestorEmail"
                className="mb-1.5 block text-sm font-medium text-[#F0F4EF]"
              >
                Your Email <span className="text-[#F59E0B]">*</span>
              </label>
              <input
                id="requestorEmail"
                type="email"
                required
                value={form.requestorEmail}
                onChange={(e) => setForm({ ...form, requestorEmail: e.target.value })}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#253826] bg-[#0D1B0E] px-4 py-3 text-[#F0F4EF] placeholder-[#7A9B7D] focus:border-[#F59E0B] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="notes"
                className="mb-1.5 block text-sm font-medium text-[#F0F4EF]"
              >
                Additional Notes
              </label>
              <textarea
                id="notes"
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Address, website, why you love it..."
                className="w-full rounded-xl border border-[#253826] bg-[#0D1B0E] px-4 py-3 text-[#F0F4EF] placeholder-[#7A9B7D] focus:border-[#F59E0B] focus:outline-none"
              />
            </div>

            {status === 'error' && (
              <p className="rounded-lg border border-[#EF4444]/30 bg-[#EF4444]/10 px-4 py-3 text-sm text-[#EF4444]">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#F59E0B] font-semibold text-[#0D1B0E] transition-colors hover:bg-[#FCD34D] disabled:opacity-60"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              {status === 'loading' ? 'Sending…' : 'Submit Request'}
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  )
}
