"use client";

import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Para Quem É",   href: "#para-quem-e"   },
  { label: "Depoimentos",   href: "#depoimentos"    },
  { label: "FAQ",           href: "#faq"            },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ─── Desktop navbar ─────────────────────────────────────────────────────
          Transparent structural wrapper — no background, border, or shadow.
          Three independent elements: logo / pill / cta
      ──────────────────────────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-10 pt-3 pb-4">

        {/* LEFT — logo, no container styling */}
        <div className="flex flex-1 items-center">
          <a href="#waitlist" aria-label="Looma — início" className="flex items-center">
            <span className="relative block h-10 w-10 shrink-0">
              <Image
                src="/looma-logo.png"
                alt="Looma"
                fill
                priority
                sizes="40px"
                className="object-contain"
              />
            </span>
          </a>
        </div>

        {/* CENTER — nav pill: glassmorphism only, no solid fill */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 rounded-full border px-6 py-[13px]"
          style={{
            backgroundColor: "rgba(20, 20, 20, 0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] font-[400] leading-none whitespace-nowrap transition-colors duration-150"
              style={{ color: "#A0A0A0" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#A0A0A0";
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* RIGHT — CTA: its own independent element with border + shadow */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <a
            href="#waitlist"
            className="hidden md:inline-flex items-center rounded-full border px-5 py-[13px] text-[14px] font-[500] text-white leading-none transition-colors duration-150 whitespace-nowrap"
            style={{
              background: "#FF6452",
              borderColor: "rgba(255,255,255,0.08)",
              boxShadow: "0px 4px 16px rgba(0,0,0,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#FF6452";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#FF6452";
            }}
          >
            Experimente a Looma
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-full border"
            style={{ background: "#1A1A1A", borderColor: "rgba(255,255,255,0.08)" }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            <span
              className="block h-px w-4 bg-white transition-transform duration-200"
              style={{ transform: menuOpen ? "translateY(5px) rotate(45deg)" : undefined }}
            />
            <span
              className="block h-px w-4 bg-white transition-opacity duration-200"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-px w-4 bg-white transition-transform duration-200"
              style={{ transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : undefined }}
            />
          </button>
        </div>
      </header>

      {/* ─── Mobile dropdown ──────────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="fixed inset-x-0 top-[80px] z-40 flex flex-col gap-1 px-4 py-3 md:hidden"
          style={{ background: "#0D0D0D", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-3 text-[14px] font-[400] transition-colors duration-150"
              style={{ color: "#A0A0A0" }}
              onClick={() => setMenuOpen(false)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#A0A0A0";
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="mt-2 rounded-full border px-5 py-3 text-center text-[14px] font-[500] text-white"
            style={{ background: "#1A1A1A", borderColor: "rgba(255,255,255,0.08)" }}
            onClick={() => setMenuOpen(false)}
          >
            Experimente a Looma
          </a>
        </div>
      )}
    </>
  );
}
