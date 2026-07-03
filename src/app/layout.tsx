import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist } from "next/font/google";
import "./globals.css";
import PageTransitionOverlay from "@/components/PageTransitionOverlay";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Looma — Conecte-se com os melhores profissionais digitais",
  description:
    "Looma é o marketplace que conecta youtubers, editores, designers, devs e freelancers. Entre na lista de espera e seja um dos primeiros.",
  icons: {
    icon: "/looma-logo.png",
    shortcut: "/looma-logo.png",
    apple: "/looma-logo.png",
  },
  openGraph: {
    title: "Looma — Marketplace para Profissionais Digitais",
    description:
      "Conecte-se com os melhores profissionais digitais. Youtubers, editores, designers, devs e freelancers em um só lugar.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${geistSans.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <PageTransitionOverlay />
        {children}
      </body>
    </html>
  );
}
