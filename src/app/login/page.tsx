"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { API_BASE_URL } from "@/lib/types";
import { setAuth } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Email atau password salah.");
      }

      setAuth(data.data.token, data.data.user);

      if (data.data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan sistem saat login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-background overflow-hidden">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 h-[450px] w-[450px] rounded-full bg-accent/10 blur-[130px]" />
        <div className="absolute bottom-1/4 -right-32 h-[500px] w-[500px] rounded-full bg-tertiary/20 blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-3xl border border-border/80 bg-card/90 p-8 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4 font-heading font-bold text-xl text-foreground"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-icon.svg" alt="Switch Code" className="h-6 w-auto" />
              <span>SWITCH CODE</span>
            </Link>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Portal Masuk
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Masuk sebagai Admin atau Customer untuk mengelola layanan
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-xs text-destructive"
            >
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@switchcode.id"
                  className="w-full rounded-xl border border-border bg-background/60 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-foreground">
                  Kata Sandi
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-border bg-background/60 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-tertiary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Akun</span>
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Admin Tip */}
          <div className="mt-6 pt-5 border-t border-border/60 text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="size-3.5 text-accent" />
              <span>Admin default: <code className="text-foreground">admin@switchcode.id</code></span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
