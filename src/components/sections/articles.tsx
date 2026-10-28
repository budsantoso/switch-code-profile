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

const FALLBACK_ARTICLES: Article[] = [
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

  return (
    <section id="articles" className="relative py-24 sm:py-32 overflow-hidden bg-background/50">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[160px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header with SEO emphasis */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-tertiary/40 bg-tertiary/10 px-4 py-1.5 text-xs font-semibold text-foreground mb-4">
            <FileText className="size-3.5 text-accent" />
            <span>INSIGHTS, BLOG & TECH NEWS</span>
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Wawasan Teknologi &{" "}
            <span className="bg-gradient-to-r from-accent via-cyan-300 to-tertiary bg-clip-text text-transparent">
              Strategi Digital Terbaru
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Artikel teknis, panduan arsitektur software, dan tren digital terkini yang dirancang untuk
            mengoptimalkan visibilitas online dan performa bisnis Anda di mesin pencari.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, idx) => (
            <article
              key={article.id || idx}
              className="group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-card/60 p-6 shadow-xl backdrop-blur-md transition-all hover:border-accent/50 hover:bg-card/90 hover:-translate-y-1 duration-300"
            >
              <div>
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
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-3 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {article.summary || article.content}
                </p>
              </div>

              {/* Read button */}
              <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:gap-2.5 transition-all"
                >
                  <span>Baca Selengkapnya</span>
                  <ChevronRight className="size-3.5" />
                </button>
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-mono text-accent">
                  Tech Insight
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-2xl max-h-[88vh] overflow-y-auto"
            >
              <button
                type="button"
                aria-label="Tutup"
                onClick={() => setActiveArticle(null)}
                className="absolute top-6 right-6 rounded-full border border-border/80 bg-background/60 p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-5" />
              </button>

              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4 font-mono">
                <span className="rounded-full bg-accent/15 px-3 py-1 text-accent font-semibold">
                  Artikel Switch Code
                </span>
                <span>•</span>
                <span>{formatDate(activeArticle.published_at)}</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-4">
                {activeArticle.title}
              </h2>

              <div className="flex items-center gap-2 text-xs text-muted-foreground pb-6 border-b border-border/60 mb-6">
                <User className="size-3.5 text-accent" />
                <span>
                  Oleh <strong>{activeArticle.author?.name || "Tim Switch Code"}</strong>
                </span>
              </div>

              {activeArticle.summary && (
                <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4 text-xs sm:text-sm text-foreground/90 italic mb-6 leading-relaxed">
                  &ldquo;{activeArticle.summary}&rdquo;
                </div>
              )}

              <div className="text-xs sm:text-sm text-muted-foreground space-y-4 leading-relaxed whitespace-pre-line">
                {activeArticle.content}
              </div>

              <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-muted-foreground">
                  Ingin berkonsultasi seputar implementasi teknologi ini?
                </div>
                <a
                  href="#contact"
                  onClick={() => setActiveArticle(null)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-tertiary px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-accent/20 hover:scale-105 transition-all"
                >
                  <span>Hubungi Tim Switch Code</span>
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
