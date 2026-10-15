"use client";

import { motion } from "framer-motion";
import { FileText, Tag, GitBranch } from "lucide-react";

const commitments = [
  {
    icon: FileText,
    title: "Lingkup Tertulis",
    desc: "Fitur, jadwal, dan biaya dituangkan dalam dokumen yang disetujui sebelum pengerjaan.",
  },
  {
    icon: Tag,
    title: "Biaya Transparan",
    desc: "Biaya pengembangan sekali bayar dipisahkan dari biaya berulang seperti hosting, domain, dan maintenance.",
  },
  {
    icon: GitBranch,
    title: "Perubahan Terkelola",
    desc: "Permintaan di luar lingkup dibahas dan disepakati dulu sebelum dikerjakan.",
  },
];

export function Commitment() {
  return (
    <section id="commitment" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-mono text-sm text-accent">{"// KOMITMEN KERJA"}</p>
          <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            Yang Bisa Anda Harapkan
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {commitments.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="inline-flex rounded-xl bg-gradient-to-br from-tertiary to-accent p-3 text-white mb-4">
                <c.icon className="size-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">Mari diskusikan kebutuhan digital bisnis Anda.</p>
          <p className="mt-2 font-medium">Konsultasi awal gratis. Ceritakan tujuan Anda, dan kami bantu menentukan langkah yang paling masuk akal.</p>
        </motion.div>
      </div>
    </section>
  );
}