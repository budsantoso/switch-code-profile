"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, ShoppingCart, LayoutDashboard, Zap, Check, ArrowRight, MonitorSmartphone, ShieldCheck } from "lucide-react";

const portfolioConcepts = [
  {
    no: "01",
    category: "WEBSITE",
    title: "Website Profil Bisnis Jasa",
    target: "Individu dan UMKM Jasa",
    challenge: "Bisnis sulit ditemukan dan dipercaya karena belum punya kehadiran online yang meyakinkan.",
    solution: "Website responsif dengan halaman layanan, testimoni, dan formulir kontak yang terhubung ke WhatsApp.",
    features: ["Desain Responsif", "SEO Dasar", "Tombol WhatsApp"],
    icon: Globe,
  },
  {
    no: "02",
    category: "TOK ONLINE",
    title: "Toko Online UMKM",
    target: "UMKM Produk",
    challenge: "Penjualan bergantung pada chat manual, dan pesanan serta stok sering tercatat berantakan.",
    solution: "Toko online dengan katalog, keranjang, pembayaran online, dan pencatatan pesanan otomatis.",
    features: ["Pembayaran Online", "Cek Ongkir", "Manajemen Stok"],
    icon: ShoppingCart,
  },
  {
    no: "03",
    category: "APLIKASI MOBILE",
    title: "Aplikasi Reservasi Mobile",
    target: "Salon, Klinik, Studio",
    challenge: "Jadwal dikelola lewat chat sehingga rawan bentrok dan pelanggan sering lupa janji.",
    solution: "Aplikasi Android dan iOS untuk memilih layanan, memesan jadwal, dan menerima pengingat otomatis.",
    features: ["Booking Jadwal", "Pengingat Otomatis", "Panel Admin"],
    icon: Smartphone,
  },
  {
    no: "04",
    category: "SISTEM KHUSUS",
    title: "Dasbor Operasional Perusahaan",
    target: "Perusahaan",
    challenge: "Data penjualan tersebar di banyak spreadsheet, dan laporan lambat disiapkan.",
    solution: "Dasbor web terpusat dengan laporan yang diperbarui otomatis dan terhubung ke sistem yang sudah ada.",
    features: ["Laporan Otomatis", "Hak Akses Per Peran", "Integrasi API"],
    icon: LayoutDashboard,
  },
  {
    no: "05",
    category: "APLIKASI MOBILE",
    title: "MVP Aplikasi Startup",
    target: "Startup",
    challenge: "Ide perlu diuji ke pengguna nyata dengan anggaran dan waktu terbatas.",
    solution: "Aplikasi versi awal dengan fitur inti saja, dibangun di atas fondasi yang bisa diperluas bertahap.",
    features: ["Fitur Inti Prioritas", "Login Pengguna", "Siap Berkembang"],
    icon: Zap,
  },
];

export function PortfolioConcepts() {
  return (
    <section id="portfolio" className="relative border-y border-border bg-card/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-mono text-sm text-accent">{"// PORTOFOLIO KONSEP"}</p>
          <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            Contoh Solusi untuk Bisnis Anda
          </h2>
          <p className="mt-4 text-muted-foreground">
            Lima solusi yang paling sering dibutuhkan segmen klien kami. Ini konsep ilustratif, bukan proyek klien tertentu.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Proyek nyata akan kami tampilkan setelah mendapat izin klien.
          </p>
        </motion.div>

        <div className="mt-12 space-y-12">
          {portfolioConcepts.map((p, i) => (
            <motion.div
              key={p.no}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-3xl font-bold text-tertiary/30">{p.no}</span>
                  <div>
                    <p className="font-mono text-xs text-accent uppercase tracking-wider">{p.category}</p>
                    <h3 className="font-heading text-xl font-bold mt-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{p.target}</p>
                  </div>
                </div>
                <div className="inline-flex rounded-xl bg-gradient-to-br from-tertiary to-accent p-3 text-white">
                  <p.icon className="size-6" />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="font-heading font-semibold text-accent flex items-center gap-2">
                    <Check className="size-4" /> TANTANGAN
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">{p.challenge}</p>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-tertiary flex items-center gap-2">
                    <ArrowRight className="size-4" /> SOLUSI
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">{p.solution}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.features.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-3 py-1 text-sm font-medium"
                  >
                    <Check className="size-3.5 text-accent" />
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}