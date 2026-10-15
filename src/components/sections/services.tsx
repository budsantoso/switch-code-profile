"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, ShoppingCart, LayoutDashboard, Plug, Wrench, Building2, Laptop, Phone, Server, ArrowUpRight } from "lucide-react";

const serviceCategories = [
  {
    category: "Website",
    icon: Globe,
    items: [
      { title: "Company Profile", desc: "Website profesional yang membangun kredibilitas dan mengubah pengunjung menjadi pelanggan." },
      { title: "Landing Page", desc: "Halaman arahan konversi tinggi untuk kampanye iklan dan peluncuran produk." },
      { title: "Toko Online", desc: "Katalog, keranjang, pembayaran digital, ongkir otomatis, dashboard penjualan." },
      { title: "Portal", desc: "Sistem multi-user dengan hak akses terpisah untuk pelanggan, mitra, dan admin." },
    ],
  },
  {
    category: "Aplikasi Mobile",
    icon: Smartphone,
    items: [
      { title: "Android & iOS", desc: "Aplikasi native/hybrid cepat, aman, mudah digunakan pelanggan Anda." },
      { title: "Aplikasi Reservasi", desc: "Booking jadwal, pengingat otomatis, panel admin untuk salon/klinik/studio." },
      { title: "Aplikasi POS/Kasir", desc: "Transaksi offline-first, sinkron cloud, laporan penjualan real-time." },
      { title: "MVP Startup", desc: "Versi awal fitur inti saja, fondasi yang bisa diperluas bertahap." },
    ],
  },
  {
    category: "Sistem & Aplikasi Khusus",
    icon: LayoutDashboard,
    items: [
      { title: "Dasbor Operasional", desc: "Laporan otomatis terpusat, terhubung ke sistem yang sudah ada." },
      { title: "Manajemen Pesanan", desc: "Alur order-to-cash terintegrasi, cek stok real-time." },
      { title: "Sistem Internal", desc: "HR, keuangan, inventory — dibangun mengikuti SOP perusahaan." },
      { title: "Integrasi API", desc: "Payment gateway, logistik, ERP, CRM — two-way sync, webhook ready." },
    ],
  },
  {
    category: "Layanan Pendukung",
    icon: Wrench,
    items: [
      { title: "Domain & Hosting", desc: "Pendaftaran, renew, SSL, migrasi, cloud server (VPS/K8s)." },
      { title: "SEO Teknis & Konten", desc: "Struktur data, kecepatan, schema markup, blog strategy." },
      { title: "Maintenance & Support", desc: "Monitoring uptime, patch keamanan, backup, SLA respons." },
      { title: "Pelatihan & Serah Terima", desc: "Dokumentasi, video tutorial, sesi live untuk tim Anda." },
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-mono text-sm text-accent">{"// LAYANAN"}</p>
          <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            Apa Yang Kami Kerjakan
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dari website hingga aplikasi enterprise — satu partner untuk seluruh kebutuhan digital Anda.
          </p>
        </motion.div>

        <div className="mt-12 space-y-16">
          {serviceCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="inline-flex rounded-xl bg-gradient-to-br from-tertiary to-accent p-3 text-white">
                  <cat.icon className="size-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold">{cat.category}</h3>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {cat.items.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/5"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-heading font-semibold text-foreground group-hover:text-accent transition-colors">
                          {item.title}
                        </h4>
                        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}