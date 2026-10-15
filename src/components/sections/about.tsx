"use client";

import { motion } from "framer-motion";
import { Target, Shield, Code2, Globe, CheckCircle2 } from "lucide-react";

const misi = [
  { no: "1", title: "Memahami kebutuhan bisnis klien sebelum menentukan solusi teknis." },
  { no: "2", title: "Membangun produk yang cepat, aman, dan mudah dikembangkan." },
  { no: "3", title: "Bekerja dengan lingkup, jadwal, dan biaya yang jelas dan tertulis." },
  { no: "4", title: "Mendampingi klien setelah produk diluncurkan." },
];

const visi = "Menjadi mitra pengembangan digital yang dipercaya bisnis Indonesia untuk membangun website dan aplikasi yang benar-benar dipakai dan memberi hasil.";

// DI SETIAP PROYEK - Nilai yang kami jaga (3 items from PDF Page 3)
const values = [
  {
    title: "Desain kustom dan responsif",
    desc: "Tampilan dirancang untuk merek dan pengguna Anda, dan berfungsi baik di laptop maupun ponsel."
  },
  {
    title: "Performa optimal",
    desc: "Website dan aplikasi dibangun agar cepat dimuat dan stabil saat dipakai."
  },
  {
    title: "Selaras dengan bisnis",
    desc: "Fitur dipilih dari kebutuhan operasional Anda, bukan dari daftar fitur standar. Keamanan data dan kemudahan pengembangan lanjutan adalah bagian dari pengerjaan, bukan tambahan."
  },
];

// UNTUK SIAPA - Klien yang kami layani (4 items from PDF Page 3)
const targetClients = [
  { icon: Target, title: "Individu dan profesional", desc: "Website pribadi atau portofolio, halaman pemesanan." },
  { icon: Shield, title: "UMKM", desc: "Kehadiran online, toko online, pencatatan pesanan." },
  { icon: Code2, title: "Startup", desc: "Pengembangan produk awal (MVP) yang bisa diperluas." },
  { icon: Globe, title: "Perusahaan", desc: "Sistem internal, dasbor, integrasi dengan sistem yang sudah ada." },
];

export function About() {
  return (
    <section id="about" className="relative border-y border-border bg-card/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Kolom Kiri: Tentang & Visi Misi */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
          >
            <p className="font-mono text-sm text-accent">{"// SIAPA KAMI"}</p>
            <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
              Tentang Switch Code
            </h2>
            <p className="mt-4 text-lg font-medium text-foreground">
              Kami membantu bisnis beralih dari proses manual ke sistem digital yang bekerja dengan baik.
            </p>
            <p className="mt-3 text-muted-foreground">
              <strong className="text-foreground">Switch Code</strong> adalah penyedia jasa pengembangan website dan aplikasi yang membantu bisnis
              memperoleh solusi digital yang profesional, aman, dan sesuai kebutuhan operasional mereka. Kami melayani individu, UMKM, startup, dan perusahaan.
            </p>
            <p className="mt-3 text-muted-foreground">
              Setiap proyek kami mulai dari kebutuhan bisnis klien, bukan dari teknologi yang sedang tren.
              Teknologi dipilih setelah tujuan, pengguna, dan batasan proyek jelas.
            </p>

            {/* Misi & Visi */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="font-heading font-semibold text-accent">MISI</p>
                <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {misi.map((m) => (
                    <li key={m.no} className="flex gap-2">
                      <span className="font-mono font-bold text-accent shrink-0">{m.no}.</span>
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
          </motion.div>

          {/* Kolom Kanan: Nilai yang Kami Jaga & Klien yang Kami Layani */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="space-y-10"
          >
            {/* Nilai yang kami jaga */}
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-accent">{"// DI SETIAP PROYEK"}</p>
              <h3 className="mt-1 font-heading text-xl font-bold">Nilai yang Kami Jaga</h3>
              <div className="mt-4 space-y-3">
                {values.map((v) => (
                  <div key={v.title} className="rounded-xl border border-border bg-card/60 p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-accent" />
                      <h4 className="font-heading font-semibold text-foreground text-sm">{v.title}</h4>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground pl-6">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Untuk Siapa / Klien yang kami layani */}
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-accent">{"// UNTUK SIAPA"}</p>
              <h3 className="mt-1 font-heading text-xl font-bold">Klien yang Kami Layani</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {targetClients.map((t) => (
                  <div key={t.title} className="rounded-xl border border-border bg-card/60 p-4">
                    <t.icon className="size-5 text-accent" />
                    <h4 className="mt-2 font-heading font-semibold text-sm">{t.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}