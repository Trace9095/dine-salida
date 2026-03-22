import Link from 'next/link'
import { CheckCircle, TrendingUp, Award, Check } from 'lucide-react'
import type { Metadata } from 'next'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'List your Salida restaurant on Dine Salida. Free basic listing or upgrade to Premium and Sponsored for maximum visibility.',
}

const TIERS = [
  {
    id: 'free',
    label: 'Free',
    price: '$0',
    period: '',
    description: 'Get your restaurant in the directory at no cost.',
    icon: CheckCircle,
    iconColor: 'text-[#3FB950]',
    cta: 'Get Started Free',
    ctaHref: '/add-listing',
    ctaStyle: 'border border-[#30363D] text-[#E6EDF3] hover:border-[#D4A853] hover:text-[#D4A853]',
    popular: false,
    features: [
      'Basic listing in directory',
      'Address & phone number',
      'Hours of operation',
      'Cuisine type & price range',
      'Category tagging',
      'Searchable in directory',
    ],
  },
  {
    id: 'premium',
    label: 'Premium',
    price: '$49',
    period: '/month',
    description: 'Stand out with an enhanced profile and priority placement.',
    icon: TrendingUp,
    iconColor: 'text-[#D4A853]',
    cta: 'Start Premium',
    ctaHref: '/add-listing?tier=premium',
    ctaStyle: 'bg-[#D4A853] text-[#0D1117] hover:bg-[#E8C97A]',
    popular: true,
    features: [
      'Everything in Free',
      'Enhanced photo gallery (up to 10 photos)',
      'Booking link integration',
      'Menu link',
      'Extended description',
      'Priority in search results',
      'Premium badge on listing',
      'Mobile-optimized profile',
    ],
  },
  {
    id: 'sponsored',
    label: 'Sponsored',
    price: '$99',
    period: '/month',
    description: 'Maximum visibility with homepage placement and analytics.',
    icon: Award,
    iconColor: 'text-[#D4A853]',
    cta: 'Go Sponsored',
    ctaHref: '/add-listing?tier=sponsored',
    ctaStyle: 'border border-[#D4A853] text-[#D4A853] hover:bg-[#D4A853]/10',
    popular: false,
    features: [
      'Everything in Premium',
      'Featured on homepage',
      'Top of all search results',
      'Gold "Sponsored" badge',
      'Analytics dashboard',
      'Monthly performance report',
      'Priority customer support',
      'Social media mention',
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-[#E6EDF3] sm:text-4xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#8B949E]">
            Get your Salida restaurant in front of thousands of diners. Start free and upgrade
            when you are ready to grow.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {TIERS.map((tier) => {
            const Icon = tier.icon
            return (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  tier.popular
                    ? 'border-[#D4A853] bg-[#161B22] shadow-lg shadow-[#D4A853]/10'
                    : 'border-[#30363D] bg-[#161B22]'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[#D4A853] px-4 py-1 text-sm font-bold text-[#0D1117]">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <div className="mb-3 flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${tier.iconColor}`} aria-hidden="true" />
                    <h2 className="text-xl font-bold text-[#E6EDF3]">{tier.label}</h2>
                  </div>
                  <div className="mb-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#E6EDF3]">{tier.price}</span>
                    {tier.period && (
                      <span className="text-sm text-[#8B949E]">{tier.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-[#8B949E]">{tier.description}</p>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-[#8B949E]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.ctaHref}
                  className={`flex min-h-[44px] items-center justify-center rounded-xl font-semibold transition-colors ${tier.ctaStyle}`}
                >
                  {tier.cta}
                </Link>
              </div>
            )
          })}
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-[#E6EDF3]">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-2xl space-y-4">
            {[
              {
                q: 'Can I list my restaurant for free?',
                a: 'Yes! The Free tier gives you a basic listing with address, phone, hours, and category tags at no cost.',
              },
              {
                q: 'How do I upgrade to Premium or Sponsored?',
                a: 'Visit the Add Listing page or Claim Your Listing on your restaurant\'s page. You\'ll be directed to a secure Stripe checkout.',
              },
              {
                q: 'Can I cancel my subscription?',
                a: 'Yes, you can cancel at any time. Your listing will revert to the Free tier at the end of the billing period.',
              },
              {
                q: 'How long does it take for my listing to appear?',
                a: 'Free listings are reviewed within 1–2 business days. Premium and Sponsored listings go live immediately after payment.',
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-[#30363D] bg-[#161B22] p-5"
              >
                <h3 className="mb-2 font-semibold text-[#E6EDF3]">{item.q}</h3>
                <p className="text-sm text-[#8B949E]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
