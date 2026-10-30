"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
  Tag,
  Share2,
  X,
  Clock,
  ChevronRight,
} from "lucide-react";
import { API_BASE_URL, Article } from "@/lib/types";
import { FALLBACK_ARTICLES } from "@/lib/constants";

export function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>(FALLBACK_ARTICLES);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/articles?per_page=12`);
        if (res.ok) {
          const json = await res.json();
          const items: Article[] = json?.data?.data || json?.data || [];
          if (items.length > 0) {
            setArticles(items);
          }
        }
      } catch {
        // Fallback sudah aktif
      }
    }
    fetchArticles();
  }, []);

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

  // Helper untuk mengekstrak gambar pertama dari inline markdown konten
  const extractCoverImage = (content?: string, images?: { image_path: string }[]) => {
    if (images && images.length > 0 && images[0].image_path) {
      const p = images[0].image_path;
      return p.startsWith("http") ? p : `${API_BASE_URL}/api/storage/${p}`;
    }
    if (!content) return null;
    const match = content.match(/!\[.*?\]\s*\((https?:\/\/[^\s)]+)\)/);
    return match ? match[1] : null;
  };

  // Helper untuk membersihkan raw markdown/image tag dari summary card
  const cleanExcerpt = (text?: string) => {
    if (!text) return "";
    return text
      .replace(/!\[.*?\]\s*\(.*?\)/g, "")
      .replace(/##+/g, "")
      .replace(/[*_`#]/g, "")
      .trim();
  };

  return (
    <section id="news" className="relative py-24 sm:py-32 overflow-hidden bg-background/50">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[160px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header with SEO emphasis */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-tertiary/40 bg-tertiary/10 px-4 py-1.5 text-xs font-semibold text-foreground mb-4">
            <FileText className="size-3.5 text-accent" />
            <span>NEWS & INSIGHTS</span>
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Wawasan Teknologi &{" "}
            <span className="bg-gradient-to-r from-accent via-cyan-300 to-tertiary bg-clip-text text-transparent">
              Berita Switch Code
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Artikel teknologi, studi kasus arsitektur perangkat lunak, dan wawasan industri digital
            terkini dari tim engineer Switch Code.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, idx) => {
            const coverImg = extractCoverImage(article.content, article.images);

            return (
              <article
                key={article.id || idx}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-card/60 shadow-xl backdrop-blur-md transition-all hover:border-accent/50 hover:bg-card/90 hover:-translate-y-1.5 duration-300"
              >
                <div>
                  {/* Cover Image jika artikel memiliki gambar */}
                  {coverImg && (
                    <div className="relative h-48 w-full overflow-hidden bg-muted/40 border-b border-border/50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverImg}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 rounded-full bg-background/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-mono font-medium text-accent border border-border/60">
                        News
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Meta info header */}
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pb-4 border-b border-border/40">
                      <div className="flex items-center gap-1.5 font-mono">
                        <Calendar className="size-3 text-accent" />
                        <span>{formatDate(article.published_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="size-3 text-muted-foreground" />
                        <span>{article.author?.name || "Switch Code"}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-lg font-bold text-foreground mt-4 line-clamp-2 leading-snug group-hover:text-accent transition-colors">
                      <Link href={`/news/${article.slug}/`}>
                        {article.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="mt-3 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {cleanExcerpt(article.summary || article.content)}
                    </p>
                  </div>
                </div>

                {/* Read button */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-border/30">
                  <Link
                    href={`/news/${article.slug}/`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:gap-2.5 transition-all"
                  >
                    <span>Baca Selengkapnya</span>
                    <ChevronRight className="size-3.5" />
                  </Link>
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-mono text-accent">
                    Tech Insight
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
