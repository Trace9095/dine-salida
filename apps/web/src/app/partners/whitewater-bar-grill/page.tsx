import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MapPin, Phone, Clock, Star, ExternalLink, Award } from 'lucide-react'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Whitewater Bar & Grill — Canon City, CO | Worth the Drive',
  description:
    '#1 restaurant in Canon City. Colorado-raised beef, live music, outdoor patio, 80+ menu items near Royal Gorge. Open seasonally April–October. (719) 269-1009.',
}

const HIGHLIGHTS = [
  '#1 on TripAdvisor — Canon City',
  'Colorado-raised beef burgers',
  'Live music & outdoor patio',
  '80+ menu items',
  'Fresh-cut curly fries',
  'Colorado craft beer on tap',
  'Open seasonally Apr 17 – Oct 31',
  'Just 1 hour from Salida',
]

export default function WaterwaterBarGrillPage() {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#30363D] bg-gradient-to-b from-[#1A1200] to-[#0D1117] px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,168,83,0.12)_0%,_transparent_65%)]" />
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
                  src="/brand/wwbg-logo.svg"
                  alt="Whitewater Bar & Grill"
                  width={200}
                  height={64}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="mb-3 text-3xl font-bold text-[#E6EDF3] sm:text-4xl">
                Whitewater Bar &amp; Grill
              </h1>

              {/* 5-star rating */}
              <div className="mb-4 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#D4A853] text-[#D4A853]" aria-hidden="true" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#D4A853]">5.0</span>
                <span className="text-sm text-[#8B949E]">· #1 in Canon City on TripAdvisor</span>
              </div>

              <p className="mb-6 max-w-xl text-[#8B949E] leading-relaxed">
                Western-style restaurant &amp; bar near Royal Gorge — Colorado-raised beef,
                undefeated flavors, legendary portions. Live music, an outdoor patio,
                and 80+ menu items that keep diners coming back all season long.
              </p>

              {/* Contact details */}
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="tel:+17192691009"
                  className="flex min-h-[44px] items-center gap-2 rounded-lg border border-[#30363D] bg-[#161B22] px-4 text-sm text-[#E6EDF3] transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
                >
                  <Phone className="h-4 w-4 text-[#D4A853]" aria-hidden="true" />
                  (719) 269-1009
                </a>
                <div className="flex min-h-[44px] items-center gap-2 rounded-lg border border-[#30363D] bg-[#161B22] px-4 text-sm text-[#8B949E]">
                  <MapPin className="h-4 w-4 text-[#D4A853]" aria-hidden="true" />
                  45045 Hwy 50 West, Canon City, CO
                </div>
                <div className="flex min-h-[44px] items-center gap-2 rounded-lg border border-[#30363D] bg-[#161B22] px-4 text-sm text-[#8B949E]">
                  <Clock className="h-4 w-4 text-[#D4A853]" aria-hidden="true" />
                  Open Apr 17 – Oct 31
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://whitewaterbar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center gap-2 rounded-xl bg-[#D4A853] px-6 font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A]"
                >
                  Visit Website
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="tel:+17192691009"
                  className="flex min-h-[44px] items-center gap-2 rounded-xl border border-[#D4A853] px-6 font-semibold text-[#D4A853] transition-colors hover:bg-[#D4A853]/10"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call Now
                </a>
                <a
                  href="https://whitewaterbar.com/book"
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

      {/* About + Map CTA */}
      <section className="border-t border-[#30363D] bg-[#161B22] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl font-bold text-[#E6EDF3]">About Whitewater Bar &amp; Grill</h2>
              <p className="mb-4 text-sm leading-relaxed text-[#8B949E]">
                Whitewater Bar &amp; Grill is Canon City&apos;s most celebrated dining destination,
                sitting just minutes from the Royal Gorge. Known for Colorado-raised beef,
                hand-cut curly fries, and a laid-back Western atmosphere, it&apos;s the perfect
                stop before or after a day of rafting, ziplining, or exploring the gorge.
              </p>
              <p className="text-sm leading-relaxed text-[#8B949E]">
                With live music on the outdoor patio, an extensive menu of 80+ items, and
                Colorado craft beer on tap, Whitewater is the kind of place that turns a
                day trip into an all-day event. Open seasonally April 17 through October 31.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-[#30363D] bg-[#0D1117] p-6">
                <h3 className="mb-4 font-semibold text-[#E6EDF3]">Plan Your Visit</h3>
                <ul className="space-y-3 text-sm text-[#8B949E]">
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" aria-hidden="true" />
                    45045 Hwy 50 West, Canon City, CO 81212
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" aria-hidden="true" />
                    <a href="tel:+17192691009" className="hover:text-[#D4A853] transition-colors">
                      (719) 269-1009
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A853]" aria-hidden="true" />
                    Open April 17 – October 31
                  </li>
                </ul>
                <div className="mt-6 flex flex-col gap-2">
                  <a
                    href="https://whitewaterbar.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#D4A853] font-semibold text-[#0D1117] transition-colors hover:bg-[#E8C97A]"
                  >
                    View Full Menu
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="https://maps.google.com/?q=45045+Hwy+50+West+Canon+City+CO"
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

      {/* Also from Canon City */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-xl font-bold text-[#E6EDF3]">Also in Canon City</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/partners/rooftop-social"
              className="group flex min-h-[44px] items-center justify-between rounded-xl border border-[#30363D] bg-[#161B22] p-5 transition-colors hover:border-[#D4A853]"
            >
              <div>
                <p className="font-semibold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors">
                  Rooftop Social
                </p>
                <p className="mt-0.5 text-sm text-[#8B949E]">Downtown Canon City rooftop bar</p>
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
