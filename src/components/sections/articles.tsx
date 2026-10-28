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

export const FALLBACK_ARTICLES: Article[] = [
  {
    id: 1,
    title: "Peluncuran Ekosistem Digital Switch Code 2026: Solusi Software Masa Depan",
    slug: "peluncuran-ekosistem-switch-code-2026",
    summary:
      "Switch Code resmi memperkenalkan solusi rekayasa perangkat lunak modern untuk akselerasi bisnis di Indonesia dengan arsitektur cloud scalable dan headless Next.js.",
    content: `Di era transformasi digital yang serba cepat, kecepatan dan stabilitas teknologi menjadi fondasi keberhasilan setiap bisnis modern. Switch Code hadir sebagai mitra teknologi strategis yang menyediakan solusi rekayasa software terpadu: mulai dari arsitektur cloud terdistribusi, portal web generasi terbaru, sistem informasi kustom, hingga integrasi otomatisasi workflow bisnis.

Mengapa Memilih Pendekatan Modular?
Banyak bisnis terbebani oleh sistem monolitik warisan (legacy) yang lambat beradaptasi dan membutuhkan biaya pemeliharaan tinggi. Dengan standar teknologi modern seperti Next.js 16, Laravel 13, dan REST/GraphQL API, Switch Code memungkinkan setiap klien memilih modul yang relevan saja tanpa overhead biaya yang sia-sia.

Keamanan, Skalabilitas, dan Dukungan Teknis Penuh
Semua produk rekayasa kami dibangun dengan standar keamanan ISO 27001 dan best-practice CI/CD deployment otomatis, memastikan downtime seminimal mungkin saat melakukan rilis fitur terbaru.`,
    is_published: true,
    published_at: "2026-10-28T08:00:00Z",
    author: {
      id: 1,
      name: "Tim Engineering Switch Code",
    },
  },
  {
    id: 2,
    title: "Panduan Memilih Arsitektur Headless Web untuk Akselerasi SEO Bisnis 2026",
    slug: "panduan-arsitektur-headless-web-seo",
    summary:
      "Bagaimana kombinasi Static Site Generation (SSG) dan API headless meningkatkan skor Core Web Vitals, waktu muat halaman sub-detik, dan peringkat Google bisnis Anda.",
    content: `Algoritma mesin pencari Google saat ini memberikan prioritas tertinggi pada pengalaman pengguna (Core Web Vitals): Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), dan Interaction to Next Paint (INP).

Pendekatan Tradisional vs Headless Modern
Website konvensional seringkali membebani server database setiap kali ada pengunjung baru yang mengakses halaman. Pada arsitektur headless modern (seperti yang diterapkan di Switch Code), konten di-prerender menjadi static assets super cepat dan didistribusikan melalui Content Delivery Network (CDN) global.

Hasil Nyata untuk Bisnis:
1. Skor Lighthouse Performance konsisten di atas 95+.
2. Waktu loading halaman rata-rata di bawah 800ms.
3. Struktur metadata OpenGraph, Schema.org JSON-LD, dan robots.txt terintegrasi otomatis.
4. Rasio konversi pengunjung menjadi prospek penjualan meningkat signifikan.`,
    is_published: true,
    published_at: "2026-10-25T10:00:00Z",
    author: {
      id: 1,
      name: "Budi Agung Santoso",
    },
  },
  {
    id: 3,
    title: "Otomatisasi Alur Kerja Internal: Kunci Efisiensi Operasional Perusahaan Modern",
    slug: "otomatisasi-alur-kerja-internal-perusahaan",
    summary:
      "Studi kasus pengurangan waktu administrasi manual hingga 70% menggunakan modul integrasi sistem informasi dan bot notifikasi real-time.",
    content: `Birokrasi manual dan input data berulang adalah salah satu pos inefisiensi terbesar di banyak organisasi. Dari persetujuan pengadaan barang hingga rekonsiliasi pembayaran, transisi menuju sistem otomasi bukan lagi sekadar opsi, melainkan keharusan kompetitif.

Modul Kustom yang Sesuai SOP
Tidak ada satu sistem off-the-shelf yang 100% cocok dengan dinamika SOP internal perusahaan. Itulah mengapa Switch Code mengedepankan pendekatan 'Custom Modules': perusahaan hanya mengadopsi modul yang cocok dengan bisnisnya, mulai dari approval matrix bertingkat, pembuatan invoice digital otomatis, hingga notifikasi langsung ke WhatsApp group manajemen.`,
    is_published: true,
    published_at: "2026-10-20T09:30:00Z",
    author: {
      id: 1,
      name: "Tim Switch Code",
    },
  },
];

export function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>(FALLBACK_ARTICLES);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/articles`);
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
