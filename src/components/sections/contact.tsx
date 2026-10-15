"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageCircle, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-tertiary/20 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-mono text-sm text-accent">{"// KONTAK"}</p>
          <h2 className="mt-2 font-heading text-3xl font-bold sm:text-5xl">
            Siap Bawa Bisnis Anda ke{" "}
            <span className="bg-gradient-to-r from-accent to-tertiary bg-clip-text text-transparent">
              Level Berikutnya?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Konsultasi gratis, tanpa komitmen. Ceritakan kebutuhan Anda — kami beri solusi terbaik.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/6285156670490?text=Halo%20Switch%20Code,%20saya%20ingin%20konsultasi%20gratis."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-tertiary px-8 py-4 font-semibold text-white shadow-lg shadow-accent/25 transition-transform hover:scale-105"
            >
              <MessageCircle className="size-5" />
              Konsultasi Gratis Sekarang
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:switchcode@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 font-semibold transition-colors hover:bg-muted"
            >
              <Mail className="size-5" />
              switchcode@gmail.com
            </a>
          </div>
          <p className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" /> Tangerang, Banten, Indonesia — melayani seluruh Indonesia
          </p>
        </motion.div>
      </div>
    </section>
  );
}