"use client";

import { motion } from "framer-motion";
import { ArrowRight, MonitorSmartphone, Gauge, ShieldCheck } from "lucide-react";

const features = [
  { icon: MonitorSmartphone, label: "Desain Kustom & Responsif" },
  { icon: Gauge, label: "Performa Optimal" },
  { icon: ShieldCheck, label: "Solusi Selaras dengan Bisnis" },
];

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-20 min-h-screen flex items-center">
      {/* bg glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-tertiary/30 animate-glow-pulse" />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-accent/10 animate-glow-pulse" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[500px] rounded-full bg-tertiary/20 blur-3xl" />
        {/* diagonal light streaks */}
        <div className="absolute inset-0 opacity-20 [background:linear-gradient(115deg,transparent_40%,rgba(6,182,212,0.15)_45%,transparent_50%,transparent_60%,rgba(75,38,93,0.25)_65%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5 font-mono text-xs">
              <span className="text-accent">{'<>'}</span> SOFTWARE DEVELOPMENT SOLUTIONS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Bawa Bisnis Anda ke Level Berikutnya dengan{" "}
            <span className="bg-gradient-to-r from-accent to-tertiary bg-clip-text text-transparent">
              Website & Aplikasi Profesional.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            Website, aplikasi mobile, dan sistem khusus untuk bisnis yang ingin bertumbuh.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3"
          >
            {features.map((f) => (
              <div
                key={f.label}
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-foreground backdrop-blur-sm"
              >
                <f.icon className="size-4 shrink-0 text-accent" />
                <span>{f.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-tertiary px-8 py-4 font-semibold text-white shadow-lg shadow-accent/25 transition-transform hover:scale-105"
            >
              Konsultasi Gratis Sekarang
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* Device mockups: laptop + phone, pure CSS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative mx-auto w-full max-w-lg animate-float-medium"
        >
          {/* laptop */}
          <div className="rounded-xl border border-border bg-card shadow-2xl shadow-tertiary/20">
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-red-500/70" />
              <span className="size-2.5 rounded-full bg-yellow-500/70" />
              <span className="size-2.5 rounded-full bg-green-500/70" />
            </div>
            <div className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-heading text-sm font-bold">YourBrand</span>
                <div className="hidden gap-3 text-[10px] text-muted-foreground sm:flex">
                  <span>Home</span><span>About</span><span>Services</span>
                  <span className="rounded-full bg-tertiary px-2 py-0.5 text-white">Get Started</span>
                </div>
              </div>
              <p className="font-heading text-xl font-bold">Build Your Digital Future</p>
              <p className="mt-1 text-[11px] text-muted-foreground">Modern solutions for a smarter, faster, more connected business.</p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-md bg-accent px-3 py-1 text-[10px] font-semibold text-black">Learn More</span>
                <span className="rounded-md border border-border px-3 py-1 text-[10px]">Our Services →</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {["Scalable Solution", "Secure & Reliable", "Better Experience"].map((c) => (
                  <div key={c} className="rounded-lg border border-border bg-muted/50 p-2 text-center text-[10px] font-medium">{c}</div>
                ))}
              </div>
            </div>
          </div>
          {/* laptop base */}
          <div className="mx-auto h-2 w-[110%] -translate-x-[4.5%] rounded-b-xl bg-gradient-to-b from-muted to-border" />

          {/* phone */}
          <div className="absolute -bottom-10 -right-2 w-40 rounded-2xl border border-border bg-card p-3 shadow-xl sm:-right-6 sm:w-48">
            <p className="text-[9px] text-muted-foreground">9:41</p>
            <p className="mt-1 text-[11px] font-semibold">Good Morning, John Doe</p>
            <div className="mt-2 rounded-xl bg-gradient-to-br from-tertiary to-accent p-2.5 text-white">
              <p className="text-[9px] opacity-80">Total Revenue</p>
              <p className="font-mono text-sm font-bold">Rp 125.000.000</p>
              <p className="text-[10px]">↑ 12.5%</p>
              <svg viewBox="0 0 100 24" className="mt-1 h-5 w-full" fill="none" stroke="white" strokeWidth="2">
                <path d="M0 20 L15 16 L30 17 L45 10 L60 12 L75 5 L100 7" />
              </svg>
            </div>
            <p className="mt-2 text-[10px] font-semibold">Recent Activity</p>
            {["New Order", "Payment Received", "Customer Message"].map((a) => (
              <p key={a} className="mt-1 rounded-md bg-muted/60 px-2 py-1 text-[9px]">{a}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}