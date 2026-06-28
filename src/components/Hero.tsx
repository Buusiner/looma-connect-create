"use client";

import { motion } from "framer-motion";
import { useState } from "react";

/* ─── Ease curve shared across all entrance animations ─────────────────────── */
const ease = [0.25, 0.1, 0.25, 1] as const;

/*
 * CTA lime-green: #DFFF4F
 * Derived by pixel-picking the reference image.
 * Used on the submit button background and its glow shadow.
 */
const LIME = "#DFFF4F";
const LIME_GLOW = "rgba(223,255,79,0.35)";

export default function Hero() {
  const [email, setEmail] = useState("");

  return (
    <section
      id="waitlist"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
      /*
       * Navbar is fixed at ~80px tall (pt-6 + 56px pill).
       * Adding equal bottom padding keeps the content visually centred
       * even though the flex container starts at the viewport top.
       */
      style={{ paddingTop: "80px", paddingBottom: "80px" }}
    >
      <div className="mx-auto w-full max-w-3xl text-center">

        {/* ── H1: two lines, two colours ─────────────────────────────────────── */}
        <motion.h1
          className="font-sans font-extrabold leading-[1.08] tracking-[-0.03em]"
          /*
           * Desktop target: 60px.  clamp keeps it readable on smaller screens.
           * Range: 2.5 rem (40px) → 3.75 rem (60px), scaling with viewport.
           */
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 3.75rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
        >
          {/* Line 1 — near-white, high contrast */}
          <span
            className="block"
            style={{ color: "#F5F5F5" }}
          >
            O marketplace dos criadores
          </span>
          {/* Line 2 — muted grey, recedes visually */}
          <span
            className="block"
            style={{ color: "#6B6B6B" }}
          >
            de conteúdo digital.
          </span>
        </motion.h1>

        {/* ── Subtitle ───────────────────────────────────────────────────────── */}
        <motion.p
          className="mx-auto font-normal leading-relaxed"
          style={{
            fontSize: "1rem",          /* 16px */
            color: "#9A9A9A",
            maxWidth: "520px",
            marginTop: "28px",         /* ~24–32px gap from h1 */
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          Se conectar nunca foi tão simples. A Looma abre a porta para você
          entrar nesse mercado. Youtubers, influenciadores, editores, designers
          e devs encontram aqui a próxima grande oportunidade de colaboração.
        </motion.p>

        {/* ── Email CTA — pill wrapping input + glowing button ───────────────── */}
        <motion.div
          className="mx-auto flex items-center rounded-full border px-2 py-2"
          style={{
            maxWidth: "440px",
            marginTop: "36px",           /* ~32–40px gap from subtitle */
            /*
             * Match the navbar pill aesthetic exactly:
             * same background (#1A1A1A) and same subtle border opacity.
             */
            background: "#1A1A1A",
            borderColor: "rgba(255,255,255,0.08)",
            boxShadow: "0px 4px 16px rgba(0,0,0,0.4)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.32, ease }}
        >
          {/* Email input — transparent, stretches to fill remaining space */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="flex-1 bg-transparent pl-4 pr-2 text-[14px] font-normal outline-none placeholder:text-[#555]"
            style={{ color: "#D0D0D0" }}
            aria-label="Seu endereço de e-mail"
          />

          {/* Submit button — lime-green with coloured glow */}
          <button
            type="button"
            className="shrink-0 rounded-full px-5 py-[11px] text-[14px] font-semibold transition-transform duration-150 hover:-translate-y-px active:translate-y-0"
            style={{
              background: LIME,
              color: "#0A0A0A",
              /*
               * Glow: same hue as the button, spreads outside the pill boundary.
               * Opacity 0.35 is calibrated for the dark page background.
               */
              boxShadow: `0px 0px 28px ${LIME_GLOW}`,
            }}
            onClick={() => {
              if (email) {
                alert(`Obrigado! Entraremos em contato em breve: ${email}`);
                setEmail("");
              }
            }}
          >
            Entrar na lista
          </button>
        </motion.div>

      </div>
    </section>
  );
}
