import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import WorthTheDriveStrip from '@/components/worth-the-drive-strip'
import { BLOG_POSTS } from '@/data/blog-posts'

export const metadata: Metadata = {
  title: 'Dining Guide',
  description: 'Your guide to dining in Salida, Colorado. Brewery guides, farm-to-table features, and restaurant recommendations.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#E6EDF3]">Salida Dining Guide</h1>
          <p className="mt-2 text-[#8B949E]">
            Stories, guides, and recommendations for dining in Salida, Colorado.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-xl border border-[#30363D] bg-[#161B22] transition-colors hover:border-[#D4A853]/50"
            >
              <div className="relative h-48 overflow-hidden bg-[#0D1117]">
                {post.imageUrl ? (
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#D4A853]/20 via-[#161B22] to-[#0D1117]" />
                )}
              </div>
              <div className="p-6">
                <time className="text-xs text-[#8B949E]">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <h2 className="mt-2 text-lg font-bold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-[#8B949E] line-clamp-3">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 flex min-h-[44px] items-center text-sm font-medium text-[#D4A853] hover:text-[#E8C97A] transition-colors"
                >
                  Read more &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
      <WorthTheDriveStrip />
      <Footer />
    </div>
  )
}
