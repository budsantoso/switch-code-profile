"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface PortfolioItem {
  no: string;
  category: string;
  title: string;
  target: string;
  challenge: string;
  solution: string;
  features: string[];
  bgTheme: "purple" | "slate";
  type: "web" | "mobile" | "dashboard";
}

const portfolioConcepts: PortfolioItem[] = [
  {
    no: "01",
    category: "WEBSITE",
    title: "Website profil bisnis jasa",
    target: "Individu dan UMKM jasa",
    challenge: "Bisnis sulit ditemukan dan dipercaya karena belum punya kehadiran online yang meyakinkan.",
    solution: "Website responsif dengan halaman layanan, testimoni, dan formulir kontak yang terhubung ke WhatsApp.",
    features: ["Desain responsif", "SEO dasar", "Tombol WhatsApp"],
    bgTheme: "purple",
    type: "web",
  },
  {
    no: "02",
    category: "TOKO ONLINE",
    title: "Toko online UMKM",
    target: "UMKM produk",
    challenge: "Penjualan bergantung pada chat manual, dan pesanan serta stok sering tercatat berantakan.",
    solution: "Toko online dengan katalog, keranjang, pembayaran online, dan pencatatan pesanan otomatis.",
    features: ["Pembayaran online", "Cek ongkir", "Manajemen stok"],
    bgTheme: "slate",
    type: "web",
  },
  {
    no: "03",
    category: "APLIKASI MOBILE",
    title: "Aplikasi reservasi mobile",
    target: "Salon, klinik, studio",
    challenge: "Jadwal dikelola lewat chat sehingga rawan bentrok dan pelanggan sering lupa janji.",
    solution: "Aplikasi Android dan iOS untuk memilih layanan, memesan jadwal, dan menerima pengingat otomatis.",
    features: ["Booking jadwal", "Pengingat otomatis", "Panel admin"],
    bgTheme: "purple",
    type: "mobile",
  },
  {
    no: "04",
    category: "SISTEM KHUSUS",
    title: "Dasbor operasional perusahaan",
    target: "Perusahaan",
    challenge: "Data penjualan tersebar di banyak spreadsheet, dan laporan lambat disiapkan.",
    solution: "Dasbor web terpusat dengan laporan yang diperbarui otomatis dan terhubung ke sistem yang sudah ada.",
    features: ["Laporan otomatis", "Hak akses per peran", "Integrasi API"],
    bgTheme: "slate",
    type: "dashboard",
  },
  {
    no: "05",
    category: "APLIKASI MOBILE",
    title: "MVP aplikasi startup",
    target: "Startup",
    challenge: "Ide perlu diuji ke pengguna nyata dengan anggaran dan waktu terbatas.",
    solution: "Aplikasi versi awal dengan fitur inti saja, dibangun di atas fondasi yang bisa diperluas bertahap.",
    features: ["Fitur inti prioritas", "Login pengguna", "Siap berkembang"],
    bgTheme: "purple",
    type: "mobile",
  },
];

function CardMockup({ item }: { item: PortfolioItem }) {
  const isPurple = item.bgTheme === "purple";

  return (
    <div
      className={`relative flex h-48 w-full flex-col items-center justify-center overflow-hidden rounded-xl p-4 sm:h-auto sm:w-48 sm:shrink-0 ${
        isPurple ? "bg-[#4B265D]" : "bg-[#273951]"
      }`}
    >
      {/* Large watermark number */}
      <span className="pointer-events-none absolute left-3 top-2 font-mono text-3xl font-extrabold text-white/20">
        {item.no}
      </span>

      {/* Mini Mockup Window / Device matching PDF */}
      {item.type === "mobile" ? (
        <div className="relative mt-2 w-28 rounded-2xl border-2 border-white/20 bg-background/90 p-2 shadow-lg">
          <div className="mx-auto mb-1.5 h-1 w-6 rounded-full bg-muted-foreground/30" />
          <div className="space-y-1.5">
            <div className="h-2 w-3/4 rounded bg-accent/60" />
            <div className="h-10 rounded-lg bg-card/80 p-1.5 border border-border/40">
              <div className="h-2 w-full rounded bg-muted" />
              <div className="mt-1 h-2 w-1/2 rounded bg-tertiary/40" />
            </div>
            <div className="flex gap-1">
              <div className="h-4 flex-1 rounded bg-muted/60" />
              <div className="h-4 flex-1 rounded bg-accent/30" />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative mt-2 w-36 rounded-lg border border-white/20 bg-background/90 shadow-lg">
          {/* Top Window Bar with 3 dots */}
          <div className="flex items-center gap-1 border-b border-border/60 px-2 py-1">
            <span className="size-1.5 rounded-full bg-red-400/80" />
            <span className="size-1.5 rounded-full bg-yellow-400/80" />
            <span className="size-1.5 rounded-full bg-green-400/80" />
          </div>
          {/* Screen Content Wireframe */}
          <div className="p-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="h-1.5 w-8 rounded bg-foreground/30" />
              <div className="h-1.5 w-4 rounded bg-accent/60" />
            </div>
            <div className="h-6 rounded bg-card p-1 border border-border/40">
              <div className="h-1.5 w-3/4 rounded bg-accent/40" />
              <div className="mt-1 h-1 w-1/2 rounded bg-muted-foreground/40" />
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="h-3 rounded bg-muted/60" />
              <div className="h-3 rounded bg-muted/60" />
              <div className="h-3 rounded bg-muted/60" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function PortfolioConcepts() {
  return (
    <section id="portfolio" className="relative border-y border-border bg-card/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header matching PDF */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-mono text-sm text-accent">{"// PORTOFOLIO KONSEP"}</p>
          <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            Contoh Solusi untuk Bisnis Anda
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Lima solusi yang paling sering dibutuhkan segmen klien kami. Ini konsep ilustratif, bukan proyek klien tertentu. Proyek nyata akan kami tampilkan setelah mendapat izin klien.
          </p>
        </motion.div>

        {/* 5 Concept Cards matching PDF Page 4 layout */}
        <div className="mt-12 space-y-6">
          {portfolioConcepts.map((item, i) => (
            <motion.div
              key={item.no}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-2 sm:flex-row sm:items-stretch sm:gap-6 sm:p-4"
            >
              {/* Left Column: Mockup illustration with color theme matching PDF */}
              <CardMockup item={item} />

              {/* Right Column: Information, Tantangan & Solusi, Features */}
              <div className="flex flex-1 flex-col justify-between p-3 sm:py-2 sm:pr-4">
                {/* Title + Category Badge */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      <span className="mr-2 font-mono text-accent">{item.no}</span>
                      {item.title}
                    </h3>
                    <span className="inline-flex rounded-md border border-border/80 bg-muted/60 px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-wider text-accent uppercase">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{item.target}</p>
                </div>

                {/* Two-Column Tantangan & Solusi */}
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/40 bg-muted/20 p-3.5">
                    <p className="font-heading text-xs font-bold uppercase tracking-wider text-accent">
                      TANTANGAN
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {item.challenge}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/40 bg-muted/20 p-3.5">
                    <p className="font-heading text-xs font-bold uppercase tracking-wider text-tertiary">
                      SOLUSI
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {item.solution}
                    </p>
                  </div>
                </div>

                {/* Feature Tags / Pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.features.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-foreground"
                    >
                      <Check className="size-3 text-accent" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}