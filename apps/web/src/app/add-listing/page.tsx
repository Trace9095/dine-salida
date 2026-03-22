import type { Metadata } from 'next'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import AddListingForm from './add-listing-form'

export const metadata: Metadata = {
  title: 'Add Your Listing',
  description: 'Submit your Salida restaurant, brewery, or cafe to the Dine Salida directory.',
}

export default function AddListingPage() {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      <Nav />
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#E6EDF3]">Add Your Restaurant</h1>
          <p className="mt-2 text-[#8B949E]">
            Submit your Salida dining business to our directory. Free listings are reviewed
            within 1–2 business days.
          </p>
        </div>
        <AddListingForm />
      </main>
      <Footer />
    </div>
  )
}
