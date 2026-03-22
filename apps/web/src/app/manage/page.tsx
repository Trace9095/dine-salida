import type { Metadata } from 'next'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import ManageClient from './manage-client'

export const metadata: Metadata = {
  title: 'Manage Your Listing | Dine Salida',
  description:
    'Look up your Dine Salida restaurant listing, check your subscription status, and manage billing through the Stripe Customer Portal.',
}

export default function ManagePage() {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      <Nav />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#E6EDF3] sm:text-4xl">
              Manage Your Listing
            </h1>
            <p className="mt-3 text-[#8B949E] leading-relaxed">
              Look up your listing by email, check subscription status, and manage billing —
              including updating your payment method, changing your plan, or cancelling.
            </p>
          </div>

          <ManageClient />
        </div>
      </section>

      <Footer />
    </div>
  )
}
