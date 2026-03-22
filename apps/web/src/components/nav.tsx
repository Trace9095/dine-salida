'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
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
            className="flex min-h-[44px] items-center gap-2.5"
            onClick={() => setOpen(false)}
            aria-label="Dine Salida — Home"
          >
            {/* Mountain + fork mark */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Dark rounded background */}
              <rect width="28" height="28" rx="6" fill="#161B22" />
              {/* Mountain left slope */}
              <line x1="14" y1="4" x2="5" y2="16" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" />
              {/* Mountain right slope */}
              <line x1="14" y1="4" x2="23" y2="16" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" />
              {/* Mountain base */}
              <line x1="5" y1="16" x2="23" y2="16" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" />
              {/* Snow cap highlight */}
              <line x1="14" y1="4" x2="10.5" y2="10" stroke="#F5D78A" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="14" y1="4" x2="17.5" y2="10" stroke="#F5D78A" strokeWidth="1.5" strokeLinecap="round" />
              {/* Fork handle below */}
              <rect x="12.5" y="18" width="3" height="7" rx="1.5" fill="#D4A853" />
              {/* Fork tine left */}
              <rect x="9.5" y="17" width="2" height="5" rx="1" fill="#D4A853" />
              {/* Fork tine right */}
              <rect x="16.5" y="17" width="2" height="5" rx="1" fill="#D4A853" />
            </svg>
            {/* Wordmark */}
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight text-[#D4A853]">Dine Salida</span>
              <span className="text-[9px] font-medium tracking-widest text-[#8B949E] uppercase">Colorado</span>
            </div>
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
