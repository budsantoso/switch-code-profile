"use client";

import { useEffect, useState, useId } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Package,
  FileText,
  Plus,
  Trash2,
  LogOut,
  Edit2,
  CheckCircle2,
  XCircle,
  Upload,
  Layers,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { getUser, clearAuth, fetchWithAuth } from "@/lib/api";
import { Product, Article, ProductModule, User } from "@/lib/types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<"products" | "articles">("products");

  // State data
  const [products, setProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form states - Products
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [prodName, setProdName] = useState("");
  const [prodSummary, setProdSummary] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodBasePrice, setProdBasePrice] = useState("");
  const [prodModules, setProdModules] = useState<ProductModule[]>([]);
  const [savingProduct, setSavingProduct] = useState(false);

  // Form states - Articles
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);
  const [artTitle, setArtTitle] = useState("");
  const [artSummary, setArtSummary] = useState("");
  const [artContent, setArtContent] = useState("");
  const [artIsPublished, setArtIsPublished] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [savingArticle, setSavingArticle] = useState(false);

  const fileInputId = useId();

  useEffect(() => {
    const curUser = getUser();
    if (!curUser || curUser.role !== "admin") {
      router.push("/login");
      return;
    }
    setUser(curUser);
    loadData();
  }, [router]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [prodRes, artRes] = await Promise.all([
        fetchWithAuth("/api/admin/products"),
        fetchWithAuth("/api/admin/articles"),
      ]);

      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData?.data?.data || prodData?.data || []);
      }
      if (artRes.ok) {
        const artData = await artRes.json();
        setArticles(artData?.data?.data || artData?.data || []);
      }
    } catch {
      setError("Gagal memuat data dari server backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  // --- Handlers: Product ---
  const handleOpenProductCreate = () => {
    setEditingProductId(null);
    setProdName("");
    setProdSummary("");
    setProdDesc("");
    setProdBasePrice("");
    setProdModules([
      { name: "", description: "", price: 0, is_required: false },
    ]);
    setShowProductModal(true);
  };

  const handleOpenProductEdit = (p: Product) => {
    setEditingProductId(p.id);
    setProdName(p.name);
    setProdSummary(p.summary || "");
    setProdDesc(p.description || "");
    setProdBasePrice(String(p.base_price));
    setProdModules(
      p.modules && p.modules.length > 0
        ? p.modules.map((m) => ({ ...m }))
        : [{ name: "", description: "", price: 0, is_required: false }]
    );
    setShowProductModal(true);
  };

  const handleAddModuleRow = () => {
    setProdModules([
      ...prodModules,
      { name: "", description: "", price: 0, is_required: false },
    ]);
  };

  const handleRemoveModuleRow = (idx: number) => {
    setProdModules(prodModules.filter((_, i) => i !== idx));
  };

  const handleModuleChange = (
    idx: number,
    field: keyof ProductModule,
    val: string | number | boolean
  ) => {
    const next = [...prodModules];
    next[idx] = { ...next[idx], [field]: val };
    setProdModules(next);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProduct(true);
    setNotice(null);
    setError(null);

    const payload = {
      name: prodName,
      summary: prodSummary,
      description: prodDesc,
      base_price: Number(prodBasePrice) || 0,
      is_active: true,
      modules: prodModules.filter((m) => m.name.trim().length > 0),
    };

    try {
      const url = editingProductId
        ? `/api/admin/products/${editingProductId}`
        : `/api/admin/products`;
      const res = await fetchWithAuth(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || "Gagal menyimpan produk.");

      setNotice(editingProductId ? "Produk diperbarui!" : "Produk baru berhasil ditambah!");
      setShowProductModal(false);
      loadData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error simpan produk");
    } finally {
      setSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Yakin ingin menghapus produk ini beserta seluruh modulnya?")) return;
    try {
      const res = await fetchWithAuth(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setNotice("Produk berhasil dihapus.");
        loadData();
      }
    } catch {
      setError("Gagal menghapus produk.");
    }
  };

  // --- Handlers: Articles ---
  const handleOpenArticleCreate = () => {
    setEditingArticleId(null);
    setArtTitle("");
    setArtSummary("");
    setArtContent("");
    setArtIsPublished(true);
    setSelectedFiles(null);
    setShowArticleModal(true);
  };

  const handleOpenArticleEdit = (a: Article) => {
    setEditingArticleId(a.id);
    setArtTitle(a.title);
    setArtSummary(a.summary || "");
    setArtContent(a.content);
    setArtIsPublished(a.is_published);
    setSelectedFiles(null);
    setShowArticleModal(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingArticle(true);
    setNotice(null);
    setError(null);

    const formData = new FormData();
    formData.append("title", artTitle);
    formData.append("summary", artSummary);
    formData.append("content", artContent);
    formData.append("is_published", artIsPublished ? "1" : "0");

    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images[]", selectedFiles[i]);
      }
    }

    try {
      const url = editingArticleId
        ? `/api/admin/articles/${editingArticleId}`
        : `/api/admin/articles`;
      const res = await fetchWithAuth(url, {
        method: "POST",
        body: formData,
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || "Gagal menyimpan artikel.");

      setNotice(editingArticleId ? "Artikel diperbarui!" : "Artikel baru dipublikasikan!");
      setShowArticleModal(false);
      loadData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error simpan artikel");
    } finally {
      setSavingArticle(false);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    if (!confirm("Yakin ingin menghapus berita ini?")) return;
    try {
      const res = await fetchWithAuth(`/api/admin/articles/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setNotice("Berita berhasil dihapus.");
        loadData();
      }
    } catch {
      setError("Gagal menghapus berita.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft className="size-4" />
              <span>Kembali ke Website</span>
            </Link>
            <span className="text-border">|</span>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm tracking-tight text-foreground">
                SWITCH CODE ADMIN
              </span>
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-mono font-bold text-accent">
                CMS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs text-muted-foreground">
              Masuk sebagai: <strong className="text-foreground">{user.email}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="size-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-6 pt-8">
        {/* Alerts */}
        {notice && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-400">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{notice}</span>
          </div>
        )}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-xs text-destructive">
            <AlertCircle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Tab Selector & Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="inline-flex rounded-2xl border border-border bg-card/60 p-1">
            <button
              onClick={() => setActiveTab("products")}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold transition-all ${
                activeTab === "products"
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Package className="size-4" />
              <span>Produk & Modul ({products.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("articles")}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold transition-all ${
                activeTab === "articles"
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="size-4" />
              <span>Berita & Artikel ({articles.length})</span>
            </button>
          </div>

          <div>
            {activeTab === "products" ? (
              <button
                onClick={handleOpenProductCreate}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-tertiary px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-accent/20 hover:scale-105 transition-all"
              >
                <Plus className="size-4" />
                <span>Tambah Produk & Modul</span>
              </button>
            ) : (
              <button
                onClick={handleOpenArticleCreate}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-tertiary px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-accent/20 hover:scale-105 transition-all"
              >
                <Plus className="size-4" />
                <span>Tulis Berita Baru</span>
              </button>
            )}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="size-8 animate-spin text-accent" />
          </div>
        )}

        {/* TAB 1: PRODUCTS */}
        {!loading && activeTab === "products" && (
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl border border-border/80 bg-card/80 p-6 shadow-xl backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground">
                        {p.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Slug: <code className="text-accent">{p.slug}</code>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-mono text-muted-foreground block">
                        Base Price
                      </span>
                      <span className="font-mono font-bold text-sm text-foreground">
                        Rp {Number(p.base_price).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-muted-foreground line-clamp-2">
                    {p.summary || p.description || "Tidak ada deskripsi"}
                  </p>

                  {/* Modules List */}
                  <div className="mt-5 border-t border-border/60 pt-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-3">
                      <Layers className="size-3.5 text-accent" />
                      <span>Modul / Toping Tambahan ({p.modules?.length || 0})</span>
                    </div>

                    <div className="space-y-2">
                      {p.modules && p.modules.length > 0 ? (
                        p.modules.map((m, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between rounded-xl bg-background/50 px-3 py-2 text-xs border border-border/40"
                          >
                            <div className="flex items-center gap-2">
                              <span className="size-1.5 rounded-full bg-accent" />
                              <span className="font-medium text-foreground">
                                {m.name}
                              </span>
                              {m.is_required && (
                                <span className="rounded bg-accent/20 px-1 py-0.5 text-[9px] font-bold text-accent">
                                  Wajib
                                </span>
                              )}
                            </div>
                            <span className="font-mono text-muted-foreground font-semibold">
                              + Rp {Number(m.price).toLocaleString("id-ID")}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs italic text-muted-foreground">
                          Belum ada modul tambahan.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-2 border-t border-border/60 pt-4">
                  <button
                    onClick={() => handleOpenProductEdit(p)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <Edit2 className="size-3.5" />
                    <span>Ubah</span>
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(p.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: ARTICLES */}
        {!loading && activeTab === "articles" && (
          <div className="space-y-4">
            {articles.map((a) => (
              <div
                key={a.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card/80 p-5 shadow-lg backdrop-blur-sm"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-base text-foreground">
                      {a.title}
                    </h3>
                    {a.is_published ? (
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                        Published
                      </span>
                    ) : (
                      <span className="rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-yellow-400 border border-yellow-500/20">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 max-w-2xl">
                    {a.summary || a.content}
                  </p>
                  <div className="flex items-center gap-4 text-[11px] text-muted-foreground pt-1">
                    <span>
                      Gambar: <strong>{a.images?.length || 0} file</strong>
                    </span>
                    <span>
                      Penulis: <strong>{a.author?.name || "Admin"}</strong>
                    </span>
                    <span>
                      Slug: <code className="text-accent">{a.slug}</code>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenArticleEdit(a)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <Edit2 className="size-3.5" />
                    <span>Ubah</span>
                  </button>
                  <button
                    onClick={() => handleDeleteArticle(a.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* MODAL 1: PRODUCT FORM */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="font-heading text-xl font-bold text-foreground mb-1">
              {editingProductId ? "Ubah Produk & Modul" : "Tambah Produk Baru"}
            </h2>
            <p className="text-xs text-muted-foreground mb-6">
              Kelola harga paket produk dan modul custom tambahan
            </p>

            <form onSubmit={handleSaveProduct} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="Contoh: Web Portal Pro"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Base Price (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={prodBasePrice}
                    onChange={(e) => setProdBasePrice(e.target.value)}
                    placeholder="2500000"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Ringkasan Singkat (Summary)
                </label>
                <input
                  type="text"
                  value={prodSummary}
                  onChange={(e) => setProdSummary(e.target.value)}
                  placeholder="Deskripsi satu kalimat untuk kartu katalog"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Deskripsi Lengkap
                </label>
                <textarea
                  rows={3}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  placeholder="Detail fitur utama yang sudah termasuk dalam paket dasar"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              {/* Dynamic Modul / Toping Section */}
              <div className="border-t border-border/80 pt-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-xs font-bold text-foreground">
                      List Toping / Modul Tambahan
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      Customer bisa memilih modul-modul ini secara fleksibel
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddModuleRow}
                    className="inline-flex items-center gap-1 rounded-lg border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent hover:bg-accent/20"
                  >
                    <Plus className="size-3" />
                    <span>Tambah Baris</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {prodModules.map((m, idx) => (
                    <div
                      key={idx}
                      className="grid gap-2 sm:grid-cols-12 items-center rounded-xl bg-background/60 p-3 border border-border/50"
                    >
                      <div className="sm:col-span-5">
                        <input
                          type="text"
                          required
                          value={m.name}
                          onChange={(e) =>
                            handleModuleChange(idx, "name", e.target.value)
                          }
                          placeholder="Nama Modul (contoh: Multi-Language)"
                          className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:border-accent focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <input
                          type="number"
                          required
                          min="0"
                          value={m.price}
                          onChange={(e) =>
                            handleModuleChange(idx, "price", Number(e.target.value))
                          }
                          placeholder="Harga (Rp)"
                          className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:border-accent focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2 flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          id={`req-${idx}`}
                          checked={m.is_required}
                          onChange={(e) =>
                            handleModuleChange(idx, "is_required", e.target.checked)
                          }
                          className="rounded border-border text-accent focus:ring-accent"
                        />
                        <label
                          htmlFor={`req-${idx}`}
                          className="text-[11px] text-muted-foreground cursor-pointer"
                        >
                          Wajib
                        </label>
                      </div>
                      <div className="sm:col-span-1 text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveModuleRow(idx)}
                          className="text-destructive hover:opacity-80 p-1"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={savingProduct}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-tertiary px-6 py-2.5 text-xs font-semibold text-white shadow-md disabled:opacity-50"
                >
                  {savingProduct && <Loader2 className="size-3.5 animate-spin" />}
                  <span>Simpan Produk</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ARTICLE FORM */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="font-heading text-xl font-bold text-foreground mb-1">
              {editingArticleId ? "Ubah Berita" : "Tulis Berita Baru"}
            </h2>
            <p className="text-xs text-muted-foreground mb-6">
              Publikasikan update teknologi dan berita seputar Switch Code
            </p>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Judul Berita
                </label>
                <input
                  type="text"
                  required
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  placeholder="Judul artikel utama"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Ringkasan (Summary)
                </label>
                <input
                  type="text"
                  value={artSummary}
                  onChange={(e) => setArtSummary(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Konten Berita Lengkap
                </label>
                <textarea
                  rows={6}
                  required
                  value={artContent}
                  onChange={(e) => setArtContent(e.target.value)}
                  placeholder="Tuliskan isi berita di sini..."
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor={fileInputId}
                  className="block text-xs font-medium text-foreground mb-1"
                >
                  Unggah Gambar (Bisa pilih beberapa sekaligus)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id={fileInputId}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setSelectedFiles(e.target.files)}
                    className="w-full rounded-xl border border-dashed border-border bg-background/50 px-3.5 py-2.5 text-xs text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-accent/20 file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-accent cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="art-pub"
                  checked={artIsPublished}
                  onChange={(e) => setArtIsPublished(e.target.checked)}
                  className="rounded border-border text-accent focus:ring-accent"
                />
                <label htmlFor="art-pub" className="text-xs text-foreground cursor-pointer">
                  Langsung publikasikan berita ini ke website (Published)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowArticleModal(false)}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={savingArticle}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-tertiary px-6 py-2.5 text-xs font-semibold text-white shadow-md disabled:opacity-50"
                >
                  {savingArticle && <Loader2 className="size-3.5 animate-spin" />}
                  <span>Simpan Berita</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
