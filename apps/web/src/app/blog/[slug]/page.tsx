import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import WorthTheDriveStrip from '@/components/worth-the-drive-strip'
import { BLOG_POSTS } from '@/data/blog-posts'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      images: [{ url: post.imageUrl }],
    },
  }
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2)

  // FAQ structured data — server-controlled content only
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the best restaurants in Salida, Colorado?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Top restaurants in Salida include Amicas Pizza & Wine Bar, Fritz Restaurant (farm-to-table fine dining), The Laughing Ladies Restaurant, Moonlight Pizza & Brewpub, and The Boathouse Cantina.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there breweries in Salida, Colorado?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — Salida has three breweries: Elevation Beer Co. in nearby Poncha Springs, Soulcraft Brewing, and Moonlight Pizza & Brewpub, which brews beer on-site.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Salida good for food tourism?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Salida has a vibrant farm-to-table dining scene with a surprising number of high-quality restaurants for a small mountain town. Summer and fall are peak seasons for the best menus.',
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <Nav />

      {/* Hero */}
      <div className="relative h-64 w-full sm:h-80">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          sizes="100vw"
          priority
          quality={90}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/50 via-transparent to-transparent" />
      </div>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-[#8B949E]" aria-label="Breadcrumb">
          <Link href="/blog" className="hover:text-[#D4A853] transition-colors">Dining Guide</Link>
          <span>/</span>
          <span className="text-[#E6EDF3] truncate max-w-xs">{post.title}</span>
        </nav>

        <time className="text-xs text-[#8B949E]">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>

        <h1 className="mt-2 text-3xl font-bold text-[#E6EDF3] sm:text-4xl">{post.title}</h1>
        <p className="mt-4 text-lg text-[#8B949E]">{post.excerpt}</p>

        {/* Article content — server-rendered HTML from static data file */}
        <div
          className="prose prose-invert mt-10 max-w-none prose-headings:text-[#E6EDF3] prose-h2:text-xl prose-h2:font-bold prose-h2:mt-8 prose-h3:text-lg prose-h3:font-semibold prose-h3:text-[#D4A853] prose-p:text-[#8B949E] prose-p:leading-relaxed prose-strong:text-[#E6EDF3]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-[#30363D] pt-10">
            <h2 className="mb-6 text-xl font-bold text-[#E6EDF3]">More from the Dining Guide</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group rounded-xl border border-[#30363D] bg-[#161B22] p-4 transition-colors hover:border-[#D4A853]/50"
                >
                  <p className="text-xs text-[#8B949E]">
                    {new Date(r.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                  <h3 className="mt-1 font-semibold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors line-clamp-2">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <WorthTheDriveStrip />
      <Footer />

      {/* FAQ JSON-LD — server-controlled structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    </div>
  )
}
