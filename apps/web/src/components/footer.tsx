import Link from 'next/link'
import { MapPin, ExternalLink, Mountain } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#2A2A2A] bg-[#0D1117]">
      {/* Royal Gorge day-trip banner */}
      <div className="border-b border-[#2A2A2A] bg-[#161B22] px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <Mountain className="h-5 w-5 shrink-0 text-[#D4A853]" aria-hidden="true" />
          <p className="text-sm text-[#E6EDF3]">
            <strong className="text-[#D4A853]">Plan a Royal Gorge day trip from Salida</strong>
            {' '}— just 1 hour east on US-50.{' '}
            <a href="https://royalgorgerafting.net" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#D4A853]">Whitewater rafting</a>
            {', '}
            <a href="https://royalgorgeziplinetours.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#D4A853]">zipline tours</a>
            {', and '}
            <a href="https://whitewaterbar.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#D4A853]">legendary dining</a>
            {' await.'}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#D4A853]" aria-hidden="true" />
              <span className="text-lg font-bold text-[#D4A853]">Dine Salida</span>
            </div>
            <p className="mt-3 text-sm text-[#8B949E]">
              Salida, Colorado&apos;s independent dining guide. Farm-to-table, craft
              beer, mountain cuisine — all in one place.
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
                { href: '/blog', label: 'Dining Guide' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/add-listing', label: 'Add Your Business' },
                { href: '/manage', label: 'Manage Listing' },
                { href: '/request-listing', label: 'Request a Listing' },
                { href: '/partners/whitewater-bar-grill', label: 'Worth the Drive' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8B949E] transition-colors hover:text-[#D4A853]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nearby adventures */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#E6EDF3]">
              Royal Gorge Area
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://royalgorgerafting.net" target="_blank" rel="noopener noreferrer" className="flex items-start gap-1 text-sm text-[#8B949E] transition-colors hover:text-[#D4A853]">
                  <span>Royal Gorge Rafting</span>
                  <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                </a>
                <a href="tel:+17192757238" className="text-xs text-[#8B949E] transition-colors hover:text-[#D4A853]">(719) 275-7238</a>
              </li>
              <li>
                <a href="https://royalgorgeziplinetours.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-1 text-sm text-[#8B949E] transition-colors hover:text-[#D4A853]">
                  <span>Royal Gorge Zipline</span>
                  <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                </a>
                <a href="tel:+17192757238" className="text-xs text-[#8B949E] transition-colors hover:text-[#D4A853]">(719) 275-7238</a>
              </li>
              <li>
                <a href="https://royalgorgevacationrentals.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-1 text-sm text-[#8B949E] transition-colors hover:text-[#D4A853]">
                  <span>Vacation Rentals</span>
                  <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                </a>
                <a href="tel:+17192757238" className="text-xs text-[#8B949E] transition-colors hover:text-[#D4A853]">(719) 275-7238</a>
              </li>
            </ul>
          </div>

          {/* Canon City dining */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#E6EDF3]">
              Canon City Dining
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://whitewaterbar.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-1 text-sm text-[#8B949E] transition-colors hover:text-[#D4A853]">
                  <span>Whitewater Bar &amp; Grill</span>
                  <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                </a>
                <a href="tel:+17192691009" className="text-xs text-[#8B949E] transition-colors hover:text-[#D4A853]">(719) 269-1009</a>
              </li>
              <li>
                <a href="https://wwrooftopsocial.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-1 text-sm text-[#8B949E] transition-colors hover:text-[#D4A853]">
                  <span>Rooftop Social</span>
                  <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                </a>
                <a href="tel:+17194517241" className="text-xs text-[#8B949E] transition-colors hover:text-[#D4A853]">(719) 451-7241</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Also Explore — Salida */}
        <div className="pb-6 mt-10">
          <p className="text-[#6B7280] text-xs uppercase tracking-wider font-medium mb-3">
            Also Explore Salida
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="https://visitsalida.co" target="_blank" rel="noopener noreferrer" className="text-[#8B949E] text-sm hover:text-[#D4A853] transition-colors">
              Visit Salida
            </a>
            <a href="https://shopsalida.com" target="_blank" rel="noopener noreferrer" className="text-[#8B949E] text-sm hover:text-[#D4A853] transition-colors">
              Shop Salida
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#2A2A2A] pt-6 sm:flex-row">
          <p className="text-xs text-[#8B949E]">
            &copy; {year} Dine Salida. Independent dining guide for Salida, Colorado.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-[#8B949E] transition-colors hover:text-[#D4A853]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
