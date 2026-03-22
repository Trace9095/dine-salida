import type { Metadata } from 'next'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Dine Salida — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-3xl font-bold text-[#E6EDF3]">Privacy Policy</h1>
        <p className="mb-10 text-sm text-[#8B949E]">Last updated: March 2026</p>

        <div className="space-y-8 text-[#8B949E]">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#E6EDF3]">1. Information We Collect</h2>
            <p className="text-sm leading-relaxed">
              When you submit a restaurant listing or contact form, we collect your name, email
              address, business name, and any details you provide. We also collect standard
              usage data such as page views via privacy-friendly analytics.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#E6EDF3]">2. How We Use Your Information</h2>
            <p className="text-sm leading-relaxed">
              We use your information to process listing submissions, communicate with you about
              your listing, process payments via Stripe, and improve the directory. We do not
              sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#E6EDF3]">3. Payment Processing</h2>
            <p className="text-sm leading-relaxed">
              Payments are processed securely by Stripe. We do not store your credit card
              information. Stripe&apos;s privacy policy governs their handling of your payment data.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#E6EDF3]">4. Cookies</h2>
            <p className="text-sm leading-relaxed">
              We use essential cookies to operate the site. We may use analytics cookies to
              understand how visitors use Dine Salida. You can disable cookies in your browser
              settings at any time.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#E6EDF3]">5. Data Retention</h2>
            <p className="text-sm leading-relaxed">
              We retain listing and contact information for as long as needed to provide our
              services. You may request deletion of your data by contacting us.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[#E6EDF3]">6. Contact</h2>
            <p className="text-sm leading-relaxed">
              For privacy-related questions, email us at{' '}
              <a
                href="mailto:hello@dinesalida.com"
                className="text-[#D4A853] hover:text-[#E8C97A] transition-colors"
              >
                hello@dinesalida.com
              </a>
              .
            </p>
          </section>
        </div>

        <p className="mt-10 text-xs text-[#8B949E]">
          &copy; {year} Dine Salida. All rights reserved.
        </p>
      </main>
      <Footer />
    </div>
  )
}
