"use client";

import { motion } from "framer-motion";
import { MessagesSquare, FileText, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  { icon: MessagesSquare, no: "01", title: "Konsultasi & Discovery", desc: "Memahami tujuan bisnis, pengguna, dan batasan. Hasilnya berupa formulir kebutuhan klien." },
  { icon: FileText, no: "02", title: "Penawaran & Kesepakatan", desc: "Ruang lingkup, jadwal, biaya, dan termin pembayaran disepakati tertulis sebelum pengerjaan." },
  { icon: PenTool, no: "03", title: "Desain", desc: "Rancangan tampilan dan alur untuk Anda setujui sebelum pemrograman dimulai." },
  { icon: Code2, no: "04", title: "Pengembangan & Pengujian", desc: "Pengerjaan per milestone, dengan peninjauan Anda di setiap milestone." },
  { icon: Rocket, no: "05", title: "Peluncuran & Dukungan", desc: "Serah terima, pelatihan singkat, dan masa dukungan sesuai paket." },
];

export function Process() {
  return (
    <section id="process" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-mono text-sm text-accent">{"// CARA KERJA"}</p>
          <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            Alur Kerja Proyek
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.no}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl border border-border bg-card p-6"
            >
              <span className="font-mono text-4xl font-bold text-tertiary/30">{s.no}</span>
              <s.icon className="mt-4 size-6 text-accent" />
              <h3 className="mt-3 font-heading font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}