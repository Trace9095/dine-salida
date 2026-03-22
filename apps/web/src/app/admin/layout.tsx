import { redirect } from 'next/navigation'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { LayoutDashboard, UtensilsCrossed, Tag, ClipboardList, MapPin } from 'lucide-react'
import AdminLogout from './admin-logout'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/restaurants', label: 'Restaurants', icon: UtensilsCrossed },
  { href: '/admin/categories', label: 'Categories', icon: Tag },
  { href: '/admin/listings', label: 'Listings', icon: ClipboardList },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireAdmin()
  if (!session) redirect('/admin/login')

  return (
    <div className="flex min-h-screen bg-[#0D1117]">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-[#30363D] bg-[#161B22] md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-[#30363D] px-4">
          <MapPin className="h-5 w-5 text-[#D4A853]" aria-hidden="true" />
          <span className="font-bold text-[#D4A853]">Dine Salida</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-sm font-medium text-[#8B949E] transition-colors hover:bg-[#0D1117] hover:text-[#E6EDF3]"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-[#30363D] p-3">
          <p className="mb-2 truncate px-3 text-xs text-[#8B949E]">{session.email}</p>
          <AdminLogout />
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-[#30363D] bg-[#161B22] px-4 md:hidden">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-[#D4A853]" aria-hidden="true" />
          <span className="font-bold text-[#D4A853]">Admin</span>
        </div>
        <div className="flex items-center gap-1">
          {NAV.slice(0, 3).map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[#8B949E] transition-colors hover:text-[#E6EDF3]"
                aria-label={item.label}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto pt-14 md:pt-0">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
      </main>
    </div>
  )
}
