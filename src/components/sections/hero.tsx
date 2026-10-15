"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MonitorSmartphone, Gauge, ShieldCheck, Monitor, Terminal, Zap, CheckCircle2, TrendingUp, Lock } from "lucide-react";

const features = [
  { icon: MonitorSmartphone, label: "Desain Kustom & Responsif" },
  { icon: Gauge, label: "Performa Optimal" },
  { icon: ShieldCheck, label: "Solusi Selaras dengan Bisnis" },
];

export function Hero() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <section id="hero" className="relative overflow-hidden pt-24 min-h-screen flex items-center">
      {/* Background ambient lighting and cyber grid */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[550px] w-[550px] rounded-full bg-tertiary/25 blur-[120px] animate-glow-pulse" />
        <div className="absolute top-1/3 -right-40 h-[650px] w-[650px] rounded-full bg-accent/15 blur-[130px] animate-glow-pulse" />
        <div className="absolute bottom-10 left-1/3 h-[350px] w-[550px] rounded-full bg-tertiary/20 blur-[100px]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        {/* Diagonal light streaks */}
        <div className="absolute inset-0 opacity-20 [background:linear-gradient(115deg,transparent_40%,rgba(6,182,212,0.15)_45%,transparent_50%,transparent_60%,rgba(75,38,93,0.25)_65%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center">
        {/* Left Column: Headline & CTA */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm text-foreground backdrop-blur-sm"
          >
            <span className="flex items-center gap-2 font-mono text-xs">
              <span className="size-2 rounded-full bg-accent animate-ping" />
              <span className="text-accent font-semibold">SWITCH CODE</span>
              <span className="text-muted-foreground">• SOFTWARE DEVELOPMENT PARTNER</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Bawa Bisnis Anda ke Level Berikutnya dengan{" "}
            <span className="bg-gradient-to-r from-accent via-cyan-300 to-tertiary bg-clip-text text-transparent">
              Website & Aplikasi Profesional.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed"
          >
            Website, aplikasi mobile, dan sistem khusus untuk bisnis yang ingin bertumbuh. Cepat, aman, dan dirancang sesuai alur kerja nyata Anda.
          </motion.p>

          {/* Responsive Feature Chips */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3"
          >
            {features.map((f) => (
              <div
                key={f.label}
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-foreground backdrop-blur-sm shadow-xs hover:border-accent/50 transition-colors"
              >
                <f.icon className="size-4 shrink-0 text-accent" />
                <span>{f.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-tertiary px-8 py-4 font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:scale-105 hover:shadow-accent/40"
            >
              Konsultasi Gratis Sekarang
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/50 px-6 py-4 font-medium text-foreground backdrop-blur-sm hover:bg-card hover:border-accent/40 transition-colors"
            >
              Lihat Portofolio Konsep
            </a>
          </motion.div>
        </div>

        {/* Right Column: Device Mockups with Floating Telemetry Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          {/* Floating Telemetry Badge 1: High Availability */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="hidden sm:flex absolute -top-5 right-4 z-20 items-center gap-2.5 rounded-xl border border-border/80 bg-background/90 px-3.5 py-2 shadow-2xl backdrop-blur-md"
          >
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-left">
              <p className="text-[10px] font-mono text-muted-foreground uppercase">High Availability</p>
              <p className="text-xs font-bold text-foreground">99.98% Cloud SLA</p>
            </div>
          </motion.div>

          {/* Floating Telemetry Badge 2: Latency */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
            className="hidden sm:flex absolute -bottom-5 -left-4 z-20 items-center gap-2.5 rounded-xl border border-border/80 bg-background/90 px-3.5 py-2 shadow-2xl backdrop-blur-md"
          >
            <Zap className="size-4 text-accent" />
            <div className="text-left">
              <p className="text-[10px] font-mono text-muted-foreground uppercase">Sub-second Speed</p>
              <p className="text-xs font-bold text-foreground">0.8s First Render</p>
            </div>
          </motion.div>

          {/* Laptop container */}
          <div className="rounded-2xl border border-border/80 bg-card/95 shadow-2xl shadow-tertiary/20 backdrop-blur-md overflow-hidden">
            {/* Laptop header with window dots & tab toggle */}
            <div className="flex items-center justify-between border-b border-border/70 bg-muted/40 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-red-500/80" />
                <span className="size-2.5 rounded-full bg-yellow-500/80" />
                <span className="size-2.5 rounded-full bg-green-500/80" />
              </div>

              {/* Mode Switcher */}
              <div className="flex items-center rounded-lg border border-border/60 bg-background/80 p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium transition-all ${
                    activeTab === "preview"
                      ? "bg-accent/20 text-accent font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Monitor className="size-3" />
                  <span>Live App</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium transition-all ${
                    activeTab === "code"
                      ? "bg-tertiary/30 text-white font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Terminal className="size-3" />
                  <span>Clean Code</span>
                </button>
              </div>
            </div>

            {/* Laptop Screen Content */}
            <div className="p-5">
              {activeTab === "preview" ? (
                <div className="space-y-4">
                  {/* Top Bar inside app */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src="/logo-icon.svg" alt="Switch Code" className="h-5 w-auto" />
                      <span className="font-heading text-xs font-bold">Klien Enterprise Portal</span>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      <CheckCircle2 className="size-3" /> Live Production
                    </span>
                  </div>

                  {/* Revenue Card with Sparkline */}
                  <div className="rounded-xl border border-border/60 bg-gradient-to-br from-tertiary/20 via-card to-accent/10 p-3.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-muted-foreground">Volume Transaksi Otomatis</p>
                        <p className="font-mono text-xl font-extrabold text-foreground">Rp 284.500.000</p>
                      </div>
                      <div className="flex items-center gap-1 rounded-md bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-400">
                        <TrendingUp className="size-3" />
                        <span>+34.2%</span>
                      </div>
                    </div>

                    {/* SVG Sparkline */}
                    <svg viewBox="0 0 300 48" className="mt-2.5 h-10 w-full" fill="none">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 38 Q 40 32, 70 18 T 140 22 T 210 8 T 300 4 L 300 48 L 0 48 Z"
                        fill="url(#chartGrad)"
                      />
                      <path
                        d="M0 38 Q 40 32, 70 18 T 140 22 T 210 8 T 300 4"
                        stroke="#06B6D4"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* 3 Metric cards */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-lg border border-border/60 bg-muted/40 p-2 text-center">
                      <p className="text-[9px] text-muted-foreground">Pesanan Masuk</p>
                      <p className="font-mono text-xs font-bold text-foreground">1.420+</p>
                    </div>
                    <div className="rounded-lg border border-border/60 bg-muted/40 p-2 text-center">
                      <p className="text-[9px] text-muted-foreground">Database Sync</p>
                      <p className="font-mono text-xs font-bold text-accent">Real-time</p>
                    </div>
                    <div className="rounded-lg border border-border/60 bg-muted/40 p-2 text-center">
                      <p className="text-[9px] text-muted-foreground">Notifikasi WA</p>
                      <p className="font-mono text-xs font-bold text-emerald-400">Otomatis</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Clean Code Snippet View */
                <div className="font-mono text-xs leading-relaxed">
                  <div className="flex items-center justify-between border-b border-border/40 pb-2 text-[10px] text-muted-foreground">
                    <span>app/api/orders/route.ts</span>
                    <span className="text-accent">TypeScript • Next.js 16</span>
                  </div>
                  <pre className="mt-3 overflow-x-auto text-[10px] text-muted-foreground">
                    <code>
                      <span className="text-accent">import</span> &#123; db &#125; <span className="text-accent">from</span> <span className="text-emerald-300">&quot;@/lib/database&quot;</span>;{"\n"}
                      <span className="text-accent">import</span> &#123; notifyWhatsApp &#125; <span className="text-accent">from</span> <span className="text-emerald-300">&quot;@/lib/wa&quot;</span>;{"\n\n"}
                      <span className="text-purple-400">export async function</span> <span className="text-yellow-300">POST</span>(req: Request) &#123;{"\n"}
                      {"  "}<span className="text-muted-foreground">// Validasi & simpan transaksi instan</span>{"\n"}
                      {"  "}<span className="text-purple-400">const</span> order = <span className="text-purple-400">await</span> db.order.<span className="text-yellow-300">create</span>(&#123;{"\n"}
                      {"    "}data: <span className="text-purple-400">await</span> req.<span className="text-yellow-300">json</span>(),{"\n"}
                      {"  "}&#125;);{"\n\n"}
                      {"  "}<span className="text-purple-400">await</span> <span className="text-yellow-300">notifyWhatsApp</span>(order.clientPhone);{"\n"}
                      {"  "}<span className="text-purple-400">return</span> Response.<span className="text-yellow-300">json</span>(&#123; status: <span className="text-emerald-300">&quot;success&quot;</span>, order &#125;);{"\n"}
                      &#125;
                    </code>
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Laptop Base Stand */}
          <div className="mx-auto h-2 w-[106%] -translate-x-[3%] rounded-b-xl bg-gradient-to-b from-muted to-border shadow-md" />

          {/* Mobile phone companion mockup */}
          <div className="absolute -bottom-8 -right-2 w-40 rounded-2xl border border-border/80 bg-card p-3 shadow-2xl backdrop-blur-md sm:-right-4 sm:w-44">
            <div className="flex items-center justify-between text-[9px] text-muted-foreground">
              <span>09:41</span>
              <div className="flex items-center gap-1">
                <Lock className="size-2.5 text-accent" />
                <span className="text-emerald-400 font-bold">●</span>
              </div>
            </div>
            <p className="mt-1 text-[10px] font-semibold">Switch POS Mobile</p>
            <div className="mt-1.5 rounded-lg bg-gradient-to-br from-tertiary to-accent p-2 text-white">
              <p className="text-[8px] opacity-80">Kasir Kas Digital</p>
              <p className="font-mono text-xs font-bold">Rp 12.850.000</p>
              <p className="text-[9px] text-cyan-200">↑ 18.2% hari ini</p>
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-[8px] font-mono uppercase text-muted-foreground">Transaksi Terakhir</p>
              <div className="flex items-center justify-between rounded bg-muted/60 px-1.5 py-0.5 text-[8px]">
                <span>Order #SC-892</span>
                <span className="text-emerald-400 font-bold">Lunas</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}