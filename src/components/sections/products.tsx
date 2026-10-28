"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Layers,
  Check,
  Plus,
  MessageCircle,
  Sparkles,
  Info,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { API_BASE_URL, Product, ProductModule } from "@/lib/types";

// Fallback data jika backend offline / initial render
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Company Profile Pro",
    slug: "company-profile-pro",
    summary:
      "Website profesional modern untuk branding perusahaan & instansi dengan performa tinggi dan SEO optimal.",
    description:
      "Paket website korporat lengkap berbasis Next.js dan Tailwind CSS, mobile-first, load speed cepat, dan terintegrasi CMS admin.",
    base_price: 2500000,
    is_active: true,
    modules: [
      {
        name: "Multi-Language (ID / EN)",
        description: "Fitur alih bahasa bilingual otomatis dan manual translation",
        price: 500000,
        is_required: false,
      },
      {
        name: "WhatsApp Floating Chatbot",
        description: "Widget interaktif WhatsApp dengan greeting pesan otomatis",
        price: 250000,
        is_required: false,
      },
      {
        name: "Custom CMS Portal Berita & Artikel",
        description: "Dashboard admin upload berita, galeri, dan dokumentasi",
        price: 1200000,
        is_required: false,
      },
      {
        name: "SSL & Domain Setup (.id / .com)",
        description: "Konfigurasi domain dan sertifikat keamanan SSL 1 tahun",
        price: 350000,
        is_required: true,
      },
    ],
  },
  {
    id: 2,
    name: "Sistem Informasi & ERP Lite",
    slug: "sistem-informasi-kustom",
    summary:
      "Aplikasi internal custom untuk pencatatan inventaris, transaksi operasional, dan pelaporan otomatis.",
    description:
      "Solusi digitalisasi alur kerja perusahaan berbasis web. Modular, aman, dan dapat disesuaikan dengan SOP internal.",
    base_price: 5000000,
    is_active: true,
    modules: [
      {
        name: "Modul Multi-Role & Permissions (RBAC)",
        description: "Hak akses bertingkat untuk Superadmin, Manager, Staff, dan Keuangan",
        price: 1500000,
        is_required: true,
      },
      {
        name: "Modul Export Laporan PDF & Excel",
        description: "Generate laporan rekap berkala dengan format rapi",
        price: 750000,
        is_required: false,
      },
      {
        name: "Integrasi Payment Gateway (DOKU / Midtrans)",
        description: "Pembayaran otomatis via Virtual Account, QRIS, dan Kartu Kredit",
        price: 2000000,
        is_required: false,
      },
      {
        name: "Modul Notifikasi Telegram / WhatsApp Bot",
        description: "Notifikasi real-time transaksi & status persetujuan ke chat group",
        price: 850000,
        is_required: false,
      },
    ],
  },
];

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  // State pilihan modul: { [productId]: Set of selected module names }
  const [selectedModules, setSelectedModules] = useState<{
    [productId: number]: string[];
  }>({});

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/products`);
        if (res.ok) {
          const json = await res.json();
          const items: Product[] = json?.data?.data || json?.data || [];
          if (items.length > 0) {
            setProducts(items);
          }
        }
      } catch {
        // Fallback sudah aktif
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Inisialisasi modul yang is_required = true
  useEffect(() => {
    const initial: { [key: number]: string[] } = {};
    products.forEach((p) => {
      const requiredNames = (p.modules || [])
        .filter((m) => m.is_required)
        .map((m) => m.name);
      initial[p.id] = requiredNames;
    });
    setSelectedModules(initial);
  }, [products]);

  const toggleModule = (productId: number, moduleName: string, isRequired: boolean) => {
    if (isRequired) return; // Modul wajib tidak bisa dicopot
    setSelectedModules((prev) => {
      const current = prev[productId] || [];
      const exists = current.includes(moduleName);
      const updated = exists
        ? current.filter((n) => n !== moduleName)
        : [...current, moduleName];
      return { ...prev, [productId]: updated };
    });
  };

  const calculateTotal = (product: Product): number => {
    const base = Number(product.base_price) || 0;
    const chosen = selectedModules[product.id] || [];
    const moduleTotal = (product.modules || [])
      .filter((m) => chosen.includes(m.name))
      .reduce((sum, m) => sum + (Number(m.price) || 0), 0);
    return base + moduleTotal;
  };

  const buildWhatsAppUrl = (product: Product): string => {
    const total = calculateTotal(product);
    const chosen = selectedModules[product.id] || [];
    const chosenModulesText =
      chosen.length > 0
        ? chosen.map((name) => `  - ${name}`).join("%0A")
        : "  (Paket Standar Tanpa Add-on Tambahan)";

    const message = `Halo Switch Code, saya tertarik untuk memesan solusi perangkat lunak:%0A%0A*Produk:* ${encodeURIComponent(
      product.name
    )}%0A*Base Price:* Rp ${Number(product.base_price).toLocaleString(
      "id-ID"
    )}%0A%0A*Modul / Fitur Pilihan:*%0A${chosenModulesText}%0A%0A*Estimasi Total:* Rp ${total.toLocaleString(
      "id-ID"
    )}%0A%0AMohon info jadwal konsultasi dan alur kerja selanjutnya. Terima kasih!`;

    return `https://wa.me/6281283626388?text=${message}`;
  };

  return (
    <section id="products" className="relative py-24 sm:py-32 overflow-hidden bg-background">
      {/* Background radial gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-48 h-96 w-96 rounded-full bg-accent/10 blur-[140px]" />
        <div className="absolute bottom-1/3 -right-48 h-96 w-96 rounded-full bg-tertiary/15 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent mb-4">
            <Package className="size-3.5" />
            <span>SOLUSI & PAKET PRODUK</span>
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Pilih Paket,{" "}
            <span className="bg-gradient-to-r from-accent via-cyan-300 to-tertiary bg-clip-text text-transparent">
              Custom Fitur Sesuai Budget
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Transparansi penuh tanpa biaya tersembunyi. Pilih produk dasar, tambahkan modul/toping yang
            hanya Anda butuhkan, dan dapatkan estimasi harga instan secara real-time.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {products.map((product) => {
            const currentSelected = selectedModules[product.id] || [];
            const total = calculateTotal(product);

            return (
              <div
                key={product.id}
                className="relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card/70 p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all hover:border-accent/50"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4 pb-6 border-b border-border/60">
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-accent font-semibold">
                        <Sparkles className="size-3" />
                        Software Package
                      </span>
                      <h3 className="font-heading text-2xl font-bold text-foreground mt-1">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        {product.summary || product.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing Overview */}
                  <div className="my-6 rounded-2xl border border-border/60 bg-background/50 p-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-muted-foreground font-medium">
                        Harga Dasar (Base Package):
                      </span>
                      <span className="font-mono text-base font-bold text-foreground">
                        Rp {Number(product.base_price).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  {/* Module Customizer / Topping Selector */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground font-mono">
                        <Layers className="size-3.5 text-accent" />
                        Pilihan Modul & Toping Tambahan:
                      </h4>
                      <span className="text-[11px] text-muted-foreground">
                        {currentSelected.length} dipilih
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {product.modules && product.modules.length > 0 ? (
                        product.modules.map((m, idx) => {
                          const isChecked = currentSelected.includes(m.name);
                          const isReq = m.is_required;

                          return (
                            <button
                              type="button"
                              key={idx}
                              onClick={() => toggleModule(product.id, m.name, isReq)}
                              className={`group w-full flex items-center justify-between text-left rounded-2xl border p-3.5 transition-all ${
                                isChecked
                                  ? "border-accent/60 bg-accent/10 shadow-sm shadow-accent/5"
                                  : "border-border/60 bg-background/40 hover:border-border hover:bg-background/70"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-lg border transition-all ${
                                    isChecked
                                      ? "border-accent bg-accent text-accent-foreground"
                                      : "border-border bg-card group-hover:border-muted-foreground"
                                  }`}
                                >
                                  {isChecked ? (
                                    <Check className="size-3.5 stroke-[3]" />
                                  ) : (
                                    <Plus className="size-3 text-muted-foreground opacity-60" />
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`text-xs font-semibold ${
                                        isChecked ? "text-foreground" : "text-foreground/90"
                                      }`}
                                    >
                                      {m.name}
                                    </span>
                                    {isReq && (
                                      <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[9px] font-mono font-bold text-accent">
                                        Wajib
                                      </span>
                                    )}
                                  </div>
                                  {m.description && (
                                    <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-1">
                                      {m.description}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="text-right shrink-0 pl-3">
                                <span
                                  className={`font-mono text-xs font-bold ${
                                    isChecked ? "text-accent" : "text-muted-foreground"
                                  }`}
                                >
                                  + Rp {Number(m.price).toLocaleString("id-ID")}
                                </span>
                              </div>
                            </button>
                          );
                        })
                      ) : (
                        <p className="text-xs italic text-muted-foreground">
                          Modul kustom dapat didiskusikan langsung bersama tim engineer kami.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Real-time Total & Action */}
                <div className="mt-8 pt-6 border-t border-border/80">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                        Estimasi Investasi
                      </span>
                      <span className="font-heading text-2xl sm:text-3xl font-bold bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">
                        Rp {total.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1 text-[10px] font-mono text-muted-foreground border border-border/60">
                      <Info className="size-3 text-accent" />
                      Estimasi Siap Pakai
                    </span>
                  </div>

                  <a
                    href={buildWhatsAppUrl(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent to-tertiary px-6 py-4 text-xs sm:text-sm font-semibold text-white shadow-xl shadow-accent/20 transition-all hover:scale-[1.02] hover:shadow-accent/40 active:scale-[0.98]"
                  >
                    <MessageCircle className="size-4" />
                    <span>Konsultasikan Paket Ini via WhatsApp</span>
                    <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
