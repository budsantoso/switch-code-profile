import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock, Share2, Sparkles, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { API_BASE_URL, Article } from "@/lib/types";
import { FALLBACK_ARTICLES } from "@/components/sections/articles";

export async function generateStaticParams() {
  let articles = FALLBACK_ARTICLES;
  try {
    const res = await fetch(`${API_BASE_URL}/api/articles`);
    if (res.ok) {
      const json = await res.json();
      const items: Article[] = json?.data?.data || json?.data || [];
      if (items.length > 0) {
        articles = items;
      }
    }
  } catch {
    // Gunakan fallback
  }

  return articles.map((a) => ({
    slug: a.slug,
  }));
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/articles/${slug}`);
    if (res.ok) {
      const json = await res.json();
      return json?.data || null;
    }
  } catch {
    // Fallback
  }

  const found = FALLBACK_ARTICLES.find((a) => a.slug === slug);
  return found || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan | Switch Code",
    };
  }

  return {
    title: `${article.title} | Switch Code News`,
    description: article.summary || article.content.slice(0, 160),
    openGraph: {
      title: article.title,
      description: article.summary || article.content.slice(0, 160),
      url: `https://switchcode.id/news/${article.slug}/`,
      type: "article",
      publishedTime: article.published_at || undefined,
      authors: [article.author?.name || "Switch Code"],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "Terbaru";
    try {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "Terbaru";
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.summary || article.content.slice(0, 160),
    "datePublished": article.published_at,
    "dateModified": article.published_at,
    "author": {
      "@type": "Person",
      "name": article.author?.name || "Tim Switch Code",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Switch Code",
      "logo": {
        "@type": "ImageObject",
        "url": "https://switchcode.id/logo-icon.png",
      },
    },
    "mainEntityOfPage": `https://switchcode.id/news/${article.slug}/`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 relative overflow-hidden bg-background">
        {/* Glow backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-1/4 -left-40 h-[450px] w-[450px] rounded-full bg-accent/10 blur-[150px]" />
          <div className="absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-tertiary/15 blur-[150px]" />
        </div>

        <div className="mx-auto max-w-4xl px-6">
          {/* Back button */}
          <Link
            href="/#news"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            <span>Kembali ke Beranda (News)</span>
          </Link>

          {/* Article Header */}
          <header className="mb-10 pb-8 border-b border-border/80">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4 font-mono">
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-semibold text-accent">
                Tech News & Insights
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-accent" />
                {formatDate(article.published_at)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <User className="size-3.5 text-muted-foreground" />
                {article.author?.name || "Tim Switch Code"}
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
              {article.title}
            </h1>

            {article.summary && (
              <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed italic border-l-2 border-accent pl-4">
                &ldquo;{article.summary}&rdquo;
              </p>
            )}
          </header>

          {/* Article Body */}
          <article className="prose prose-invert max-w-none text-foreground/90 leading-relaxed text-sm sm:text-base space-y-6">
            {article.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="whitespace-pre-line text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </article>

          {/* Bottom CTA Card */}
          <div className="mt-16 rounded-3xl border border-border/80 bg-card/80 p-8 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-accent uppercase tracking-wider">
                <Sparkles className="size-3.5" />
                Konsultasi Rekayasa Perangkat Lunak
              </span>
              <h3 className="font-heading text-xl font-bold text-foreground mt-1">
                Tertarik Mengimplementasikan Solusi Serupa?
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Diskusikan kebutuhan arsitektur web dan sistem bisnis Anda bersama Switch Code.
              </p>
            </div>

            <a
              href="https://wa.me/6281283626388?text=Halo%20Switch%20Code,%20saya%20tertarik%20berdiskusi%20lebih%20lanjut%20setelah%20membaca%20artikel%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-tertiary px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-accent/25 hover:scale-105 transition-all shrink-0"
            >
              <MessageCircle className="size-4" />
              <span>Konsultasi via WhatsApp</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
