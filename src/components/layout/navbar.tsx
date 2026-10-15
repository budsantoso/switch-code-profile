"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Sun, Moon, LogOut, X } from "lucide-react";

export const navItems = [
  { href: "#hero", label: "Beranda" },
  { href: "#about", label: "Tentang" },
  { href: "#services", label: "Layanan" },
  { href: "#contact", label: "Kontak" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[color:var(--background)]/80 backdrop-blur-md border-b border-[color:var(--border)]/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-foreground font-heading font-bold text-xl tracking-tight"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-icon.svg"
              alt="Switch Code"
              className="h-7 w-auto object-contain"
            />
            SWITCH CODE
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-[color:var(--foreground)] hover:text-[color:var(--accent)] transition-colors ${
                activeSection === item.href
                  ? "after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-full after:rounded-full after:bg-[color:var(--accent)]"
                  : ""
            }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden flex items-center gap-2 rounded-full p-2 hover:bg-[color:var(--muted)] transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M3 12l2-2m6 8l2-2m6 2l2-2m-6-4l2 2m6-2l2 2m-6-8l2 2" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[color:var(--background)]/95 backdrop-blur-md">
          <div className="flex flex-col h-full p-8 gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 text-2xl font-medium text-[color:var(--foreground)] hover:text-[color:var(--accent)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              className="mt-auto w-full rounded-full p-2 text-left hover:bg-[color:var(--muted)] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="size-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M3 12l2-2m6 8l2-2m6 2l2-2m-6-4l2 2m6-2l2 2m-6-8l2 2" />
              </svg>
              Tutup
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}