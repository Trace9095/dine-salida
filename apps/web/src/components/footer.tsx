import Link from 'next/link'
import { MapPin, ExternalLink, Mountain } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#253826] bg-[#131F14]">
      {/* Royal Gorge day-trip banner */}
      <div className="border-b border-[#253826] bg-[#192619] px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <Mountain className="h-5 w-5 shrink-0 text-[#F59E0B]" aria-hidden="true" />
          <p className="text-sm text-[#F0F4EF]">
            <strong className="text-[#F59E0B]">Plan a Royal Gorge day trip from Salida</strong>
            {' '}— just 1 hour east on US-50.{' '}
            <a href="https://royalgorgerafting.net" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#F59E0B]">Whitewater rafting</a>
            {', '}
            <a href="https://royalgorgeziplinetours.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#F59E0B]">zipline tours</a>
            {', and '}
            <a href="https://whitewaterbar.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#F59E0B]">riverside dining</a>
            {' await.'}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#F59E0B]" aria-hidden="true" />
              <span className="text-lg font-bold text-[#F59E0B]">Dine Salida</span>
            </div>
            <p className="mt-3 text-sm text-[#7A9B7D]">
              Salida, Colorado&apos;s independent dining guide. Farm-to-table, craft
              beer, mountain cuisine — all in one place.
            </p>
          </div>

          {/* Directory links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#F0F4EF]">
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
                    className="text-sm text-[#7A9B7D] transition-colors hover:text-[#F59E0B]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nearby adventures */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#F0F4EF]">
              Royal Gorge Area
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://royalgorgerafting.net" target="_blank" rel="noopener noreferrer" className="flex items-start gap-1 text-sm text-[#7A9B7D] transition-colors hover:text-[#F59E0B]">
                  <span>Royal Gorge Rafting</span>
                  <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                </a>
                <a href="tel:+17192757238" className="text-xs text-[#7A9B7D] transition-colors hover:text-[#F59E0B]">(719) 275-7238</a>
              </li>
              <li>
                <a href="https://royalgorgeziplinetours.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-1 text-sm text-[#7A9B7D] transition-colors hover:text-[#F59E0B]">
                  <span>Royal Gorge Zipline</span>
                  <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                </a>
                <a href="tel:+17192757238" className="text-xs text-[#7A9B7D] transition-colors hover:text-[#F59E0B]">(719) 275-7238</a>
              </li>
              <li>
                <a href="https://royalgorgevacationrentals.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-1 text-sm text-[#7A9B7D] transition-colors hover:text-[#F59E0B]">
                  <span>Vacation Rentals</span>
                  <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                </a>
                <span className="text-xs text-[#7A9B7D]">Stay near the gorge</span>
              </li>
            </ul>
          </div>

          {/* Canon City dining */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#F0F4EF]">
              Canon City Dining
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://whitewaterbar.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-1 text-sm text-[#7A9B7D] transition-colors hover:text-[#F59E0B]">
                  <span>Whitewater Bar &amp; Grill</span>
                  <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                </a>
                <a href="tel:+17192691009" className="text-xs text-[#7A9B7D] transition-colors hover:text-[#F59E0B]">(719) 269-1009</a>
              </li>
              <li>
                <a href="https://wwrooftopsocial.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-1 text-sm text-[#7A9B7D] transition-colors hover:text-[#F59E0B]">
                  <span>Rooftop Social</span>
                  <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                </a>
                <a href="tel:+17194517241" className="text-xs text-[#7A9B7D] transition-colors hover:text-[#F59E0B]">(719) 451-7241</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#253826] pt-6 sm:flex-row">
          <p className="text-xs text-[#7A9B7D]">
            &copy; {year} Dine Salida. Independent dining guide for Salida, Colorado.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-[#7A9B7D] transition-colors hover:text-[#F59E0B]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
