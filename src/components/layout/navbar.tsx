"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

export const navItems = [
  { href: "#hero", label: "Beranda" },
  { href: "#about", label: "Tentang" },
  { href: "#services", label: "Layanan" },
  { href: "#process", label: "Alur Kerja" },
  { href: "#portfolio", label: "Portofolio Konsep" },
  { href: "#contact", label: "Kontak" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      let closest = "#hero";
      let closestTop = -Infinity;

      navItems.forEach((item) => {
        const id = item.href.replace("#", "");
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const pageTop = rect.top + window.scrollY;
        if (pageTop <= scrollPos && pageTop > closestTop) {
          closestTop = pageTop;
          closest = item.href;
        }
      });

      setActiveSection(closest);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-foreground font-heading font-bold text-xl tracking-tight transition-transform hover:scale-[1.02]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-icon.svg"
            alt="Switch Code"
            className="h-7 w-auto object-contain"
          />
          <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text">
            SWITCH CODE
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors hover:text-accent ${
                  isActive ? "text-accent font-semibold" : "text-muted-foreground"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-tertiary px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-accent/20 transition-all hover:scale-105 hover:shadow-accent/40"
          >
            <span>Konsultasi</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex lg:hidden items-center justify-center rounded-xl border border-border/80 bg-card/80 p-2.5 text-foreground backdrop-blur-md transition-all hover:border-accent/60 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          {isMenuOpen ? (
            <X className="size-6 text-accent" />
          ) : (
            <Menu className="size-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 top-20 z-40 bg-background/80 backdrop-blur-md lg:hidden"
            />

            {/* Slide-down Menu Container */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-20 left-0 right-0 z-50 max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-border/80 bg-card/95 px-6 py-6 shadow-2xl backdrop-blur-2xl lg:hidden"
            >
              <div className="flex flex-col gap-2">
                <p className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  NAVIGASI UTAMA
                </p>

                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all ${
                          isActive
                            ? "border border-accent/40 bg-accent/10 text-accent font-semibold"
                            : "text-foreground hover:bg-muted/60 hover:text-accent"
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="size-2 rounded-full bg-accent animate-pulse" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile Menu CTA */}
                <div className="mt-6 border-t border-border/60 pt-5">
                  <a
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-tertiary px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-transform active:scale-95"
                  >
                    <span>Konsultasi Gratis Sekarang</span>
                    <ArrowRight className="size-4" />
                  </a>

                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    Respons cepat via WhatsApp & Email
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}