"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const [emailError, setEmailError] = useState("");
  const formControls = useAnimation();
  const router = useRouter();

  /* Basic e-mail validation: must contain "@" and "." after the "@" */
  function isValidEmail(value: string) {
    const at = value.indexOf("@");
    return at > 0 && value.indexOf(".", at) > at + 1;
  }

  function handleSubmit() {
    if (!isValidEmail(email)) {
      setEmailError("Digite um e-mail válido.");
      return;
    }
    setEmailError("");
    router.push(`/login?email=${encodeURIComponent(email)}`);
  }

  useEffect(() => {
    formControls.set({ opacity: 0, y: 24, scale: 1 });
    formControls.start({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, delay: 0.32, ease },
    });

    const handlePulse = () => {
      formControls.start({
        scale: [1, 1.04, 1],
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    };

    window.addEventListener("looma:pulse-hero-form", handlePulse);

    return () => {
      window.removeEventListener("looma:pulse-hero-form", handlePulse);
    };
  }, [formControls]);

  return (
    <section
      id="waitlist"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
      /*
       * Fixed navbar needs extra clearance so the hero headline does not sit
       * underneath it.
       */
      style={{ paddingTop: "120px", paddingBottom: "80px" }}
    >
      <div className="mx-auto w-full max-w-4xl text-center">

        {/* ── H1: two lines ──────────────────────────────────────────────────── */}
        <motion.h1
          className="font-sans font-extrabold leading-[1.08] tracking-[-0.03em]"
          /*
           * Desktop target: 60px.  clamp keeps it readable on smaller screens.
           * Range: 2.5 rem (40px) → 3.75 rem (60px), scaling with viewport.
           */
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 3.75rem)", color: "#FFFFFF" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
        >
          <span className="block">
            O marketplace dos criadores
          </span>
          <span className="block">
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
          Encontre criadores de conteúdo digital, editores, designers,
          desenvolvedores e muito mais, tudo em um único lugar. Conecte-se.
        </motion.p>

        <p className="mt-4 text-xs text-text-tertiary">
          We are building connections.
        </p>

        {/* ── Email CTA — pill wrapping input + glowing button ───────────────── */}
        <motion.div
          className="mx-auto"
          style={{ maxWidth: "440px", marginTop: "36px" }}
          animate={formControls}
        >
          <div
            className="flex items-center rounded-full border px-2 py-2"
            style={{
              background: "#1A1A1A",
              borderColor: emailError ? "#FF6452" : "rgba(255,255,255,0.08)",
              boxShadow: "0px 4px 16px rgba(0,0,0,0.4)",
            }}
          >
            {/* Email input — transparent, stretches to fill remaining space */}
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="seu@email.com"
              className="flex-1 bg-transparent pl-4 pr-2 text-[14px] font-normal outline-none placeholder:text-[#555]"
              style={{ color: "#D0D0D0" }}
              aria-label="Seu endereço de e-mail"
            />

            {/* Submit button — solid brand color */}
            <button
              type="button"
              className="shrink-0 rounded-full px-5 py-[11px] text-[14px] font-semibold transition-transform duration-150 hover:-translate-y-px active:translate-y-0"
              style={{ background: "#FF6452", color: "#FFFFFF" }}
              onClick={handleSubmit}
            >
              Comece agora
            </button>
          </div>

          {/* Inline error message */}
          {emailError && (
            <p
              className="mt-2 pl-4 text-left"
              style={{ fontSize: "13px", color: "#FF6452" }}
            >
              {emailError}
            </p>
          )}
        </motion.div>

      </div>
    </section>
  );
}
