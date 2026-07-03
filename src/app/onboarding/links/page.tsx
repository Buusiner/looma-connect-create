"use client";

import Image from "next/image";
import { useState } from "react";

const NEXT_ROUTE = "/onboarding/perfil";

/* ─── Shared input style ───────────────────────────────────────────────────── */
const inputClass =
  "flex-1 bg-transparent text-[14px] outline-none placeholder:text-[#555]";

/* ─── Social icons (inline SVG, no external deps) ─────────────────────────── */
function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#A3A3A3" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.25 2.25h6.917l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A3A3A3" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="#A3A3A3" stroke="none" />
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg width="20" height="14" viewBox="0 0 24 17" fill="#A3A3A3" aria-hidden="true">
      <path d="M23.495 2.656a3.016 3.016 0 0 0-2.122-2.136C19.505 0 12 0 12 0S4.495 0 2.627.52A3.016 3.016 0 0 0 .505 2.656C0 4.537 0 8.5 0 8.5s0 3.963.505 5.844a3.016 3.016 0 0 0 2.122 2.136C4.495 17 12 17 12 17s7.505 0 9.373-.52a3.016 3.016 0 0 0 2.122-2.136C24 12.463 24 8.5 24 8.5s0-3.963-.505-5.844zM9.545 12.07V4.93L15.818 8.5l-6.273 3.57z" />
    </svg>
  );
}

/* ─── Input row with social icon ───────────────────────────────────────────── */
function SocialInput({
  id,
  icon,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className="flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors"
      style={{
        background: "#1A1A1A",
        borderColor: focused ? "#FF6452" : "#2A2A2A",
      }}
    >
      <span className="shrink-0 flex items-center">{icon}</span>
      <input
        id={id}
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
        style={{ color: "#F0F0F0" }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

export default function OnboardingLinksPage() {
  const [linkX, setLinkX] = useState("");
  const [linkInstagram, setLinkInstagram] = useState("");
  const [linkYoutube, setLinkYoutube] = useState("");

  function handleContinue() {
    // TODO: salvar link_x, link_instagram, link_youtube na tabela profiles do Supabase
    // supabase.from('profiles').update({ link_x: linkX, link_instagram: linkInstagram, link_youtube: linkYoutube }).eq('id', userId)
    // Colunas necessárias na tabela profiles: link_x text, link_instagram text, link_youtube text
    window.location.href = NEXT_ROUTE;
  }

  function handleSkip() {
    window.location.href = NEXT_ROUTE;
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div
        className="w-full"
        style={{
          maxWidth: "400px",
          background: "#111111",
          border: "1px solid #222",
          borderRadius: "16px",
          padding: "40px",
        }}
      >
        {/* Logo */}
        <div className="mb-6 flex w-full items-center justify-center gap-2">
          <Image src="/looma-logo.png" alt="Looma" width={32} height={32} className="object-contain" />
          <span className="font-bold leading-none" style={{ color: "#FF6452", fontSize: "20px" }}>
            looma
          </span>
        </div>

        {/* Title */}
        <h1
          className="mb-2 text-center text-xl font-bold"
          style={{ color: "#F5F5F5", letterSpacing: "-0.02em" }}
        >
          Seus links
        </h1>

        {/* Subtitle */}
        <p
          className="mb-8 text-center"
          style={{ color: "#A3A3A3", fontSize: "13px", lineHeight: 1.6 }}
        >
          Adicione suas redes sociais para que outros possam te encontrar.
        </p>

        {/* Social inputs */}
        <div className="flex flex-col gap-4 mb-8">
          <SocialInput
            id="link-x"
            icon={<IconX />}
            placeholder="x.com/seuusuário"
            value={linkX}
            onChange={setLinkX}
          />
          <SocialInput
            id="link-instagram"
            icon={<IconInstagram />}
            placeholder="instagram.com/seuusuário"
            value={linkInstagram}
            onChange={setLinkInstagram}
          />
          <SocialInput
            id="link-youtube"
            icon={<IconYouTube />}
            placeholder="youtube.com/@seucanal"
            value={linkYoutube}
            onChange={setLinkYoutube}
          />
        </div>

        {/* Continue button */}
        <button
          type="button"
          onClick={handleContinue}
          className="w-full rounded-full py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-75"
          style={{ background: "#FF6452" }}
        >
          Continuar
        </button>

        {/* Skip */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleSkip}
            className="transition-colors hover:text-white"
            style={{
              color: "#A3A3A3",
              fontSize: "13px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Pular por agora
          </button>
        </div>
      </div>
    </div>
  );
}
