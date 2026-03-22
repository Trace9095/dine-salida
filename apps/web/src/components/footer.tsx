import Link from 'next/link'
import { MapPin, ExternalLink } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#30363D] bg-[#161B22]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#D4A853]" aria-hidden="true" />
              <span className="text-lg font-bold text-[#D4A853]">Dine Salida</span>
            </div>
            <p className="mt-3 text-sm text-[#8B949E]">
              The premier dining guide for Salida, Colorado. Discover restaurants,
              breweries, and cafes in the heart of the Arkansas Valley.
            </p>
          </div>

          {/* Directory links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#E6EDF3]">
              Directory
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/restaurants', label: 'All Restaurants' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/add-listing', label: 'Add Your Business' },
                { href: '/blog', label: 'Dining Guide' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="min-h-[44px] text-sm text-[#8B949E] transition-colors hover:text-[#D4A853]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nearby dining */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#E6EDF3]">
              Nearby Dining
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://whitewaterbar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-1 text-sm text-[#8B949E] transition-colors hover:text-[#D4A853]"
                >
                  <span>Whitewater Bar &amp; Grill</span>
                  <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                </a>
                <span className="text-xs text-[#8B949E]">Canon City, CO</span>
              </li>
              <li>
                <a
                  href="https://wwrooftopsocial.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-1 text-sm text-[#8B949E] transition-colors hover:text-[#D4A853]"
                >
                  <span>Rooftop Bar</span>
                  <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                </a>
                <span className="text-xs text-[#8B949E]">Canon City, CO</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#30363D] pt-6 sm:flex-row">
          <p className="text-xs text-[#8B949E]">
            &copy; {year} Dine Salida. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-xs text-[#8B949E] transition-colors hover:text-[#D4A853]"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
