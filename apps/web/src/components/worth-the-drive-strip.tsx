import { ExternalLink, Phone, MapPin, Mountain } from 'lucide-react'

const PARTNERS = [
  {
    name: 'Whitewater Bar & Grill',
    tagline: 'Undefeated Flavors. Legendary Portions.',
    note: '#1 in Canon City · Open Apr 17–Oct 31',
    phone: '(719) 269-1009',
    href: 'tel:+17192691009',
    web: 'https://whitewaterbar.com',
    badge: 'Restaurant',
  },
  {
    name: 'Rooftop Social',
    tagline: 'Canon City rooftop bar with panoramic views.',
    note: 'Downtown Canon City',
    phone: '(719) 451-7241',
    href: 'tel:+17194517241',
    web: 'https://wwrooftopsocial.com',
    badge: 'Bar & Dining',
  },
  {
    name: 'Royal Gorge Rafting',
    tagline: 'Class III–V whitewater on the Arkansas River.',
    note: 'Just 40 min east on US-50',
    phone: '(719) 275-7238',
    href: 'tel:+17192757238',
    web: 'https://royalgorgerafting.net',
    badge: 'Adventure',
  },
]

export default function WorthTheDriveStrip() {
  return (
    <section className="border-t border-[#253826] bg-[#0F1A10] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-6 flex items-center gap-3">
          <Mountain className="h-5 w-5 shrink-0 text-[#F59E0B]" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#F59E0B]">Worth the Drive</p>
            <p className="text-xs text-[#7A9B7D]">Just 1 hour east via US-50 — Royal Gorge &amp; Canon City</p>
          </div>
        </div>

        {/* Partner cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="flex flex-col justify-between rounded-xl border border-[#253826] bg-[#131F14] p-4"
            >
              <div>
                <span className="inline-block rounded-full bg-[#F59E0B]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#F59E0B]">
                  {p.badge}
                </span>
                <p className="mt-2 font-semibold text-[#F0F4EF]">{p.name}</p>
                <p className="mt-0.5 text-xs text-[#7A9B7D]">{p.tagline}</p>
                <p className="mt-1 text-xs text-[#4D7A51]">{p.note}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={p.href}
                  className="flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#253826] px-3 text-xs font-medium text-[#7A9B7D] transition-colors hover:border-[#F59E0B] hover:text-[#F59E0B]"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  {p.phone}
                </a>
                <a
                  href={p.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[40px] items-center gap-1.5 rounded-lg bg-[#F59E0B] px-3 text-xs font-semibold text-[#0D1117] transition-colors hover:bg-[#FBBF24]"
                >
                  Visit
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Drive note */}
        <p className="mt-4 flex items-center gap-1.5 text-xs text-[#4D7A51]">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          From Salida: head east on US-50 — Canon City in ~1 hour, Royal Gorge in ~65 minutes.
        </p>
      </div>
    </section>
  )
}
