import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MapPin, Phone, Clock, Star, ExternalLink, Award } from 'lucide-react'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Rooftop Social — Downtown Canon City, CO | Worth the Drive',
  description:
    "Canon City's premier rooftop restaurant and bar. Craft cocktails, elevated eats, and stunning mountain views from a 2,000 sq ft open-air rooftop patio. (719) 451-7241.",
}

const HIGHLIGHTS = [
  "Canon City's premier rooftop",
  '2,000 sq ft open-air patio',
  'Craft cocktails & mountain views',
  'Elevated food menu',
  'Downtown location',
  'Private events & buyouts',
  'Stunning Royal Gorge area views',
  'Just 1 hour from Salida',
]

export default function RooftopSocialPage() {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#30363D] bg-gradient-to-b from-[#0D1117] to-[#0D1117] px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,168,83,0.10)_0%,_transparent_65%)]" />
        <div className="relative mx-auto max-w-5xl">
          {/* Featured Partner badge */}
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4A853] bg-[#D4A853]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D4A853]">
              <Award className="h-3.5 w-3.5" aria-hidden="true" />
              Featured Partner
            </span>
            <span className="text-sm text-[#8B949E]">Worth the Drive — 1 hour from Salida</span>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex h-32 w-64 items-center justify-center rounded-2xl border border-[#D4A853]/20 bg-[#161B22] p-6">
                <Image
                  src="/brand/rt-logo.svg"
                  alt="Rooftop Social"
                  width={220}
                  height={80}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="mb-3 text-3xl font-bold text-[#E6EDF3] sm:text-4xl">
                Whitewater Rooftop Social
              </h1>

              {/* 5-star rating */}
              <div className="mb-4 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#D4A853] text-[#D4A853]" aria-hidden="true" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#D4A853]">5.0</span>
                <span className="text-sm text-[#8B949E]">· Canon City&apos;s Premier Rooftop</span>
              </div>

              <p className="mb-6 max-w-xl text-[#8B949E] leading-relaxed">
                Canon City&apos;s premier rooftop restaurant and bar at 302 Royal Gorge Blvd —
                craft cocktails, elevated eats, and stunning mountain views from our
                2,000 sq ft open-air rooftop patio in the heart of downtown.
              </p>

              {/* Contact details */}
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="tel:+17194517241"
                  className="flex min-h-[44px] items-center gap-2 rounded-lg border border-[#30363D] bg-[#161B22] px-4 text-sm text-[#E6EDF3] transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
                >
                  <Phone className="h-4 w-4 text-[#D4A853]" aria-hidden="true" />
                  (719) 451-7241
                </a>
                <div className="flex min-h-[44px] items-center gap-2 rounded-lg border border-[#30363D] bg-[#161B22] px-4 text-sm text-[#8B949E]">
                  <MapPin className="h-4 w-4 text-[#D4A853]" aria-hidden="true" />
                  302 Royal Gorge Blvd, Canon City, CO
                </div>
                <div className="flex min-h-[44px] items-center gap-2 rounded-lg border border-[#30363D] bg-[#161B22] px-4 text-sm text-[#8B949E]">
                  <Clock className="h-4 w-4 text-[#D4A853]" aria-hidden="true" />
                  Daily 11am – 9pm
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wwrooftopsocial.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center gap-2 rounded-xl bg-[#D4A853] px-6 font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A]"
                >
                  Visit Website
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="tel:+17194517241"
                  className="flex min-h-[44px] items-center gap-2 rounded-xl border border-[#D4A853] px-6 font-semibold text-[#D4A853] transition-colors hover:bg-[#D4A853]/10"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call Now
                </a>
                <a
                  href="https://wwrooftopsocial.com/book"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center gap-2 rounded-xl border border-[#30363D] px-6 font-semibold text-[#E6EDF3] transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
                >
                  Book a Table
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-xl font-bold text-[#E6EDF3]">Why Diners Love It</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h}
                className="flex items-start gap-3 rounded-xl border border-[#30363D] bg-[#161B22] p-4"
              >
                <Star className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" aria-hidden="true" />
                <span className="text-sm text-[#8B949E]">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About + Plan */}
      <section className="border-t border-[#30363D] bg-[#161B22] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl font-bold text-[#E6EDF3]">About Rooftop Social</h2>
              <p className="mb-4 text-sm leading-relaxed text-[#8B949E]">
                Whitewater Rooftop Social is Canon City&apos;s most unique dining experience —
                a 2,000 square foot open-air rooftop patio perched above downtown at
                302 Royal Gorge Blvd. Enjoy craft cocktails, elevated food, and sweeping
                views of the mountains and the heart of Canon City.
              </p>
              <p className="text-sm leading-relaxed text-[#8B949E]">
                Perfect for date nights, group gatherings, and private events. Located just
                one hour from Salida and within minutes of the Royal Gorge, Rooftop Social
                makes the ideal post-adventure destination. Daily hours 11am–9pm.
              </p>
            </div>
            <div>
              <div className="rounded-xl border border-[#30363D] bg-[#0D1117] p-6">
                <h3 className="mb-4 font-semibold text-[#E6EDF3]">Plan Your Visit</h3>
                <ul className="space-y-3 text-sm text-[#8B949E]">
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" aria-hidden="true" />
                    302 Royal Gorge Blvd, Canon City, CO 81212
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" aria-hidden="true" />
                    <a href="tel:+17194517241" className="hover:text-[#D4A853] transition-colors">
                      (719) 451-7241
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" aria-hidden="true" />
                    Daily 11am – 9pm
                  </li>
                </ul>
                <div className="mt-6 flex flex-col gap-2">
                  <a
                    href="https://wwrooftopsocial.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#D4A853] font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A]"
                  >
                    View Menu &amp; Book
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="https://maps.google.com/?q=302+Royal+Gorge+Blvd+Canon+City+CO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#30363D] font-semibold text-[#E6EDF3] transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
                  >
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Also in Canon City */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-xl font-bold text-[#E6EDF3]">Also in Canon City</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/partners/whitewater-bar-grill"
              className="group flex min-h-[44px] items-center justify-between rounded-xl border border-[#30363D] bg-[#161B22] p-5 transition-colors hover:border-[#D4A853]"
            >
              <div>
                <p className="font-semibold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors">
                  Whitewater Bar &amp; Grill
                </p>
                <p className="mt-0.5 text-sm text-[#8B949E]">#1 restaurant near Royal Gorge</p>
              </div>
              <ExternalLink className="h-4 w-4 text-[#8B949E] group-hover:text-[#D4A853] transition-colors" aria-hidden="true" />
            </Link>
            <a
              href="https://royalgorgerafting.net"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[44px] items-center justify-between rounded-xl border border-[#30363D] bg-[#161B22] p-5 transition-colors hover:border-[#D4A853]"
            >
              <div>
                <p className="font-semibold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors">
                  Royal Gorge Rafting
                </p>
                <p className="mt-0.5 text-sm text-[#8B949E]">(719) 275-7238 · Whitewater on the Arkansas</p>
              </div>
              <ExternalLink className="h-4 w-4 text-[#8B949E] group-hover:text-[#D4A853] transition-colors" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
