"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Zap, Lock, Users, Target, Shield, Code2, Globe } from "lucide-react";

const misi = [
  { no: "1", title: "Memahami kebutuhan bisnis klien sebelum menentukan solusi teknis." },
  { no: "2", title: "Membangun produk yang cepat, aman, dan mudah dikembangkan." },
  { no: "3", title: "Bekerja dengan lingkup, jadwal, dan biaya yang jelas dan tertulis." },
  { no: "4", title: "Mendampingi klien setelah produk diluncurkan." },
];

const visi = "Menjadi mitra pengembangan digital yang dipercaya bisnis Indonesia untuk membangun website dan aplikasi yang benar-benar dipakai dan memberi hasil.";

const stats = [
  { value: "15+", label: "Tahun Pengalaman Bisnis" },
  { value: "120+", label: "Proyek Selesai" },
  { value: "98%", label: "Klien Puas" },
  { value: "24/7", label: "Support Siaga" },
];

const points = [
  { icon: BadgeCheck, title: "Desain Kustom & Responsif", desc: "Tampil sempurna di semua perangkat — desktop, tablet, dan smartphone." },
  { icon: Zap, title: "Performa Optimal", desc: "Loading cepat, skor Lighthouse tinggi, SEO-friendly sejak hari pertama." },
  { icon: Lock, title: "Keamanan Prioritas", desc: "SSL, proteksi data, dan best-practice keamanan di setiap lapisan." },
  { icon: Users, title: "Pengalaman Pengguna Optimal", desc: "Alur yang intuitif, dirancang dari riset perilaku pengguna nyata." },
];

const targetClients = [
  { icon: Target, title: "Individu & Profesional", desc: "Website pribadi atau portofolio, halaman pemesanan." },
  { icon: Shield, title: "UMKM", desc: "Kehadiran online, toko online, pencatatan pesanan." },
  { icon: Code2, title: "Startup", desc: "Pengembangan produk awal (MVP) yang bisa diperluas." },
  { icon: Globe, title: "Perusahaan", desc: "Sistem internal, dasbor, integrasi dengan sistem yang sudah ada." },
];

export function About() {
  return (
    <section id="about" className="relative border-y border-border bg-card/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
          >
            <p className="font-mono text-sm text-accent">{"// TENTANG KAMI"}</p>
            <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
              Partner Digital Terpercaya Sejak Lebih dari 15 Tahun
            </h2>
            <p className="mt-4 text-muted-foreground">
              <strong className="text-foreground">Switch Code</strong> adalah software house yang
              membantu bisnis beralih dari proses manual ke sistem digital yang bekerja
              dengan baik.
            </p>
            <p className="mt-2 text-muted-foreground">
              Kami membantu bisnis memperoleh solusi digital yang profesional, aman, dan sesuai kebutuhan operasional mereka. Kami
              melayani individu, UMKM, startup, dan perusahaan.
            </p>
            <p className="mt-2 text-muted-foreground">
              Setiap proyek kami mulai dari kebutuhan bisnis klien, bukan dari teknologi yang sedang tren.
              Teknologi dipilih setelah tujuan, pengguna, dan batasan proyek jelas.
            </p>

            {/* Misi & Visi */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="font-heading font-semibold text-accent">MISI</p>
                <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {misi.map((m) => (
                    <li key={m.no} className="flex gap-2">
                      <span className="font-mono font-bold text-tertiary shrink-0">{m.no}.</span>
                      <span>{m.title}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="font-heading font-semibold text-accent">VISI</p>
                <p className="mt-3 text-sm text-muted-foreground">{visi}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="bg-gradient-to-r from-accent to-tertiary bg-clip-text font-heading text-3xl font-bold text-transparent">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Values */}
            {points.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <p.icon className="size-6 text-accent" />
                <h3 className="mt-3 font-heading font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}

            {/* Target Clients */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
              className="col-span-1 sm:col-span-2 mt-4"
            >
              <p className="font-mono text-sm text-accent">{"// UNTUK SIAPA"}</p>
              <h3 className="mt-2 font-heading text-xl font-bold">Klien yang Kami Layani</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {targetClients.map((t, i) => (
                  <motion.div
                    key={t.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <t.icon className="size-6 text-accent" />
                    <h4 className="mt-3 font-heading font-semibold">{t.title}</h4>
                    <p className="mt-1.5 text-sm text-muted-foreground">{t.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}