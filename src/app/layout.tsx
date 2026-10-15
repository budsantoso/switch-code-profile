import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const heading = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Switch Code — Software Development Solutions | Website & Aplikasi Profesional",
    template: "%s | Switch Code",
  },
  description:
    "Switch Code — Jasa pembuatan website & aplikasi profesional. Didukung pengalaman 15+ tahun. Desain kustom & responsif, performa optimal, solusi digital selaras strategi bisnis Anda.",
  keywords: [
    "Switch Code",
    "jasa pembuatan website",
    "jasa pembuatan aplikasi",
    "software house Indonesia",
    "web development",
    "mobile app development",
    "desain responsif",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Switch Code",
    title: "Switch Code — Software Development Solutions",
    description:
      "Bawa bisnis Anda ke level berikutnya dengan website & aplikasi profesional. Konsultasi gratis sekarang.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${sans.variable} ${heading.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
