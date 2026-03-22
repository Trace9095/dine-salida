'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/restaurants', label: 'Restaurants' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/add-listing', label: 'Add Listing' },
  { href: '/manage', label: 'Manage' },
  { href: '/partners/whitewater-bar-grill', label: 'Worth the Drive' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-[#30363D] bg-[#0D1117]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex min-h-[44px] items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <MapPin className="h-5 w-5 text-[#D4A853]" aria-hidden="true" />
            <span className="text-lg font-bold text-[#D4A853]">Dine Salida</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-[44px] items-center rounded-md px-4 text-sm font-medium text-[#8B949E] transition-colors hover:bg-[#161B22] hover:text-[#E6EDF3]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-[#8B949E] transition-colors hover:bg-[#161B22] hover:text-[#E6EDF3] md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'border-t border-[#30363D] bg-[#0D1117] md:hidden',
          open ? 'block' : 'hidden'
        )}
      >
        <div className="flex flex-col px-4 py-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium text-[#8B949E] transition-colors hover:bg-[#161B22] hover:text-[#E6EDF3]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
