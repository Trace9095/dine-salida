'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function AdminLogout() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="flex min-h-[44px] w-full items-center gap-2 rounded-lg px-3 text-sm font-medium text-[#8B949E] transition-colors hover:bg-[#0D1117] hover:text-[#F85149]"
    >
      <LogOut className="h-4 w-4" aria-hidden="true" />
      Sign Out
    </button>
  )
}
