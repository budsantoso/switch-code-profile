"use client";

import { motion } from "framer-motion";
import { MessagesSquare, FileText, PenTool, Code2, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: MessagesSquare,
    no: "01",
    title: "Konsultasi & Discovery",
    desc: "Memahami tujuan bisnis, pengguna, dan batasan. Hasilnya berupa formulir kebutuhan klien.",
    deliverable: "Formulir Kebutuhan & SRS",
  },
  {
    icon: FileText,
    no: "02",
    title: "Penawaran & Kesepakatan",
    desc: "Ruang lingkup, jadwal, biaya, dan termin pembayaran disepakati tertulis sebelum pengerjaan.",
    deliverable: "Proposal & MoU Tertulis",
  },
  {
    icon: PenTool,
    no: "03",
    title: "Desain UI/UX",
    desc: "Rancangan tampilan dan alur untuk Anda setujui sebelum pemrograman dimulai.",
    deliverable: "Figma Prototype Interaktif",
  },
  {
    icon: Code2,
    no: "04",
    title: "Pengembangan & Uji",
    desc: "Pengerjaan per milestone, dengan peninjauan Anda di setiap milestone.",
    deliverable: "Staging Test & Code Review",
  },
  {
    icon: Rocket,
    no: "05",
    title: "Peluncuran & Support",
    desc: "Serah terima, pelatihan singkat, dan masa dukungan sesuai paket.",
    deliverable: "Production Deploy & Garansi",
  },
];

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-24">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-mono text-accent">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            <span>ALUR KERJA TERSTRUKTUR</span>
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
            Dari Ide Hingga Sistem Beroperasi
          </h2>
          <p className="mt-4 text-muted-foreground">
            Transparan, bertahap, dan tanpa biaya tersembunyi di setiap langkah.
          </p>
        </motion.div>

        {/* Steps Grid with connected timeline */}
        <div className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card/70 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/5"
            >
              {/* Step indicator top bar */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-extrabold text-foreground/20 group-hover:text-accent transition-colors">
                    {s.no}
                  </span>
                  <div className="rounded-xl border border-border/70 bg-muted/60 p-2.5 text-accent group-hover:bg-accent group-hover:text-background transition-colors">
                    <s.icon className="size-5" />
                  </div>
                </div>

                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>

              {/* Deliverable badge */}
              <div className="mt-6 border-t border-border/50 pt-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Output:</span>
                <p className="mt-0.5 text-xs font-semibold text-accent/90">{s.deliverable}</p>
              </div>

              {/* Connecting arrow indicator for large screens */}
              {i < steps.length - 1 && (
                <div className="hidden xl:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-border group-hover:text-accent transition-colors">
                  <ArrowRight className="size-4" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}