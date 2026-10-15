"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, ArrowRight, Zap, RefreshCw, XCircle, TrendingDown, TrendingUp, Clock, ShieldAlert, ShieldCheck } from "lucide-react";

export function TransformationSection() {
  // false = Sebelum Switch Code (Manual), true = Setelah Switch Code (Otomatis)
  const [isSwitched, setIsSwitched] = useState(true);

  return (
    <section className="relative overflow-hidden border-y border-border bg-gradient-to-b from-background via-card/20 to-background py-24">
      {/* Dynamic ambient glow based on state */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full blur-[140px] transition-all duration-700 ${
            isSwitched ? "bg-accent/15" : "bg-red-500/10"
          }`}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-mono text-accent">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            <span>THE SWITCH EFFECT</span>
          </div>

          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
            Bandingkan: Bisnis Anda Sebelum & Sesudah Switch Code
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Klik toggle switch di bawah untuk melihat perbedaan nyata saat operasional beralih dari cara manual ke sistem digital otomatis.
          </p>

          {/* Interactive Toggle Switch Styled like the Logo */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsSwitched(!isSwitched)}
              aria-label="Toggle perbandingan sistem"
              className="group relative flex h-14 w-32 cursor-pointer items-center rounded-full border-2 border-border/80 bg-[#1E293B] p-1.5 shadow-2xl transition-all duration-300 hover:scale-105 hover:border-accent/80 active:scale-95"
            >
              {/* Sliding knob matching Switch Code purple pill with <> brackets */}
              <motion.div
                animate={{
                  x: isSwitched ? 62 : 0,
                  backgroundColor: isSwitched ? "#4B265D" : "#334155",
                }}
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
                className="flex h-10 w-12 items-center justify-center rounded-full border border-white/20 shadow-lg text-white font-mono text-xs font-bold"
              >
                {"< >"}
              </motion.div>

              {/* Label inside track */}
              <span
                className={`absolute font-mono text-[10px] font-bold tracking-wider transition-opacity duration-200 ${
                  isSwitched ? "left-3 text-accent opacity-90" : "right-3 text-red-400 opacity-90"
                }`}
              >
                {isSwitched ? "ON" : "OFF"}
              </span>
            </button>

            <span className="text-xs font-mono text-muted-foreground">
              Mode saat ini:{" "}
              <strong className={isSwitched ? "text-accent" : "text-red-400"}>
                {isSwitched ? "Sistem Digital Terintegrasi (Otomatis)" : "Proses Konvensional (Manual)"}
              </strong>{" "}
              — <span className="underline decoration-dotted cursor-pointer" onClick={() => setIsSwitched(!isSwitched)}>klik switch untuk beralih</span>
            </span>
          </div>
        </motion.div>

        {/* Dynamic Comparison Cards */}
        <div className="mt-14">
          <AnimatePresence mode="wait">
            {!isSwitched ? (
              /* BEFORE: Proses Manual (OFF) */
              <motion.div
                key="before"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="grid gap-6 lg:grid-cols-3"
              >
                {/* Problem 1 */}
                <div className="rounded-2xl border border-red-500/30 bg-red-950/10 p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2.5 text-red-400">
                    <XCircle className="size-5 shrink-0" />
                    <h3 className="font-heading text-lg font-bold">Leads & Pesanan Tercecer</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Pesanan dicatat manual di chat WhatsApp atau DM Instagram. Saat jam sibuk, pesan lambat terbalas dan pelanggan beralih ke kompetitor.
                  </p>
                  <div className="mt-5 rounded-xl border border-red-500/20 bg-background/60 p-3">
                    <p className="font-mono text-xs text-red-400 font-semibold">Dampak Negatif:</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Kehilangan hingga <strong className="text-foreground">35-40% calon pembeli</strong> akibat respons lambat.
                    </p>
                  </div>
                </div>

                {/* Problem 2 */}
                <div className="rounded-2xl border border-red-500/30 bg-red-950/10 p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2.5 text-red-400">
                    <TrendingDown className="size-5 shrink-0" />
                    <h3 className="font-heading text-lg font-bold">Stok & Kas Sering Selisih</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Stok barang dicatat di buku atau spreadsheet yang diisi banyak orang. Sering terjadi barang habis tapi tetap terjual, atau double booking jadwal.
                  </p>
                  <div className="mt-5 rounded-xl border border-red-500/20 bg-background/60 p-3">
                    <p className="font-mono text-xs text-red-400 font-semibold">Dampak Negatif:</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Komplain pelanggan meningkat dan pembukuan bulanan butuh berhari-hari untuk dicocokkan.
                    </p>
                  </div>
                </div>

                {/* Problem 3 */}
                <div className="rounded-2xl border border-red-500/30 bg-red-950/10 p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2.5 text-red-400">
                    <ShieldAlert className="size-5 shrink-0" />
                    <h3 className="font-heading text-lg font-bold">Infrastruktur Rapuh & Rentan</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Website template murahan sering lambat dibuka (&gt;5 detik), rentan disusupi malware, dan server crash begitu ada lonjakan pengunjung promosi.
                  </p>
                  <div className="mt-5 rounded-xl border border-red-500/20 bg-background/60 p-3">
                    <p className="font-mono text-xs text-red-400 font-semibold">Dampak Negatif:</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Reputasi merek rusak dan biaya perbaikan mendadak jauh lebih mahal dari biaya awal.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* AFTER: Sistem Otomatis Switch Code (ON) */
              <motion.div
                key="after"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="grid gap-6 lg:grid-cols-3"
              >
                {/* Solution 1 */}
                <div className="rounded-2xl border border-accent/40 bg-card/80 p-6 backdrop-blur-sm shadow-xl shadow-accent/5">
                  <div className="flex items-center gap-2.5 text-accent">
                    <Zap className="size-5 shrink-0" />
                    <h3 className="font-heading text-lg font-bold text-foreground">Sistem Order & WhatsApp 24/7</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Katalog online dengan checkout otomatis, payment gateway QRIS/Virtual Account, dan konfirmasi WhatsApp terkirim dalam 3 detik tanpa staf jaga.
                  </p>
                  <div className="mt-5 rounded-xl border border-accent/30 bg-background/70 p-3">
                    <p className="font-mono text-xs text-accent font-semibold">Hasil Terukur:</p>
                    <p className="mt-1 text-xs text-foreground font-medium">
                      Konversi naik <strong className="text-accent">+240%</strong>, nol pesan terlewat, pesanan masuk kapan saja.
                    </p>
                  </div>
                </div>

                {/* Solution 2 */}
                <div className="rounded-2xl border border-tertiary/40 bg-card/80 p-6 backdrop-blur-sm shadow-xl shadow-tertiary/10">
                  <div className="flex items-center gap-2.5 text-tertiary">
                    <CheckCircle2 className="size-5 shrink-0 text-accent" />
                    <h3 className="font-heading text-lg font-bold text-foreground">Dasbor Real-time & Stok Otomatis</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Stok terpotong otomatis saat transaksi berhasil. Pemilik bisnis melihat ringkasan omzet harian, grafik laba, dan pesanan dalam satu layar ponsel.
                  </p>
                  <div className="mt-5 rounded-xl border border-tertiary/30 bg-background/70 p-3">
                    <p className="font-mono text-xs text-accent font-semibold">Hasil Terukur:</p>
                    <p className="mt-1 text-xs text-foreground font-medium">
                      Hemat <strong className="text-accent">20+ jam staf per minggu</strong>, akurasi catatan 100% tanpa selisih.
                    </p>
                  </div>
                </div>

                {/* Solution 3 */}
                <div className="rounded-2xl border border-accent/40 bg-card/80 p-6 backdrop-blur-sm shadow-xl shadow-accent/5">
                  <div className="flex items-center gap-2.5 text-accent">
                    <ShieldCheck className="size-5 shrink-0" />
                    <h3 className="font-heading text-lg font-bold text-foreground">Cloud Cepat, Aman & Auto-scale</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Dibangun dengan arsitektur modern (Next.js, Tailwind, Cloud Edge). Waktu buka &lt;1 detik, standar keamanan enkripsi SSL/HTTPS, dan SLA uptime 99.98%.
                  </p>
                  <div className="mt-5 rounded-xl border border-accent/30 bg-background/70 p-3">
                    <p className="font-mono text-xs text-accent font-semibold">Hasil Terukur:</p>
                    <p className="mt-1 text-xs text-foreground font-medium">
                      Skor performa <strong className="text-accent">98-100 Google Lighthouse</strong>, siap melayani ribuan pengunjung bersamaan.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA Banner inside Transformation */}
        <div className="mt-12 rounded-2xl border border-border/80 bg-gradient-to-r from-card via-card/80 to-card p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="font-heading font-bold text-foreground text-base sm:text-lg">
              Siap melakukan switch ke sistem digital yang bekerja otomatis?
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Konsultasikan alur operasional bisnis Anda dengan tim Switch Code hari ini.
            </p>
          </div>
          <a
            href="#contact"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-xs font-bold text-background transition-transform hover:scale-105 shrink-0"
          >
            Mulai Diskusi Proyek
            <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}