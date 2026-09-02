import type { Metadata } from "next";
import { Geist, Geist_Mono, Baloo_2 } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baloo2 = Baloo_2({
  variable: "--font-baloo-2",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kereta Angka — Latihan Mengurutkan Angka (TK A)",
  description:
    "Lembar latihan mengurutkan angka untuk TK A. 20 soal dengan gerbong kereta yang lucu. Acak soal, tampilkan kunci jawaban, dan cetak / simpan PDF.",
  keywords: [
    "Kereta Angka",
    "Latihan Mengurutkan Angka",
    "TK A",
    "Lembar kerja anak",
    "Worksheet kindergarten",
    "Belajar angka",
  ],
  authors: [{ name: "Kereta Angka" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Kereta Angka — Latihan Mengurutkan Angka (TK A)",
    description:
      "Lembar latihan mengurutkan angka untuk TK A. 20 soal dengan gerbong kereta yang lucu.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${baloo2.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
