"use client";

import Image from "next/image";
import { useState } from "react";
import { useOnboarding } from "@/context/OnboardingContext";

/* ─── Role options ─────────────────────────────────────────────────────────── */
const ROLES = [
  {
    id: "influencer",
    label: "Influenciador",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "creator",
    label: "Criador de Conteúdo Digital",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    id: "editor",
    label: "Editor de Vídeo",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
  },
  {
    id: "designer",
    label: "Designer",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      </svg>
    ),
  },
  {
    id: "developer",
    label: "Desenvolvedor",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "investor",
    label: "Investidor",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: "beginner",
    label: "Iniciante",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
] as const;

type RoleId = typeof ROLES[number]["id"];

export default function OnboardingPerfilPage() {
  const { setOnboardingData, submitOnboarding } = useOnboarding();
  const [selected, setSelected] = useState<RoleId[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function toggle(id: RoleId) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  }

  async function handleConcluir() {
    console.log("CLICK: iniciou submissão", { selectedRoles: selected });
    if (selected.length === 0) return;
    setLoading(true);
    setSubmitError(null);
    setOnboardingData({ tipos: selected as string[] });
    try {
      const { error } = await submitOnboarding();
      if (error) setSubmitError(error);
      // On success, submitOnboarding() navigates to /dashboard — component unmounts.
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-12"
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
          O que você faz?
        </h1>

        {/* Subtitle */}
        <p
          className="mb-7 text-center"
          style={{ color: "#A3A3A3", fontSize: "13px", lineHeight: 1.6 }}
        >
          Selecione tudo que se aplica a você.
        </p>

        {/* Role cards */}
        <div className="mb-7 flex flex-col gap-2">
          {ROLES.map((role) => {
            const isSelected = selected.includes(role.id);
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => toggle(role.id)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-150"
                style={{
                  background: isSelected ? "rgba(255,100,82,0.1)" : "transparent",
                  border: `1px solid ${isSelected ? "#FF6452" : "#2A2A2A"}`,
                  color: isSelected ? "#F5F5F5" : "#A3A3A3",
                  cursor: "pointer",
                }}
              >
                <span className="shrink-0" style={{ color: isSelected ? "#FF6452" : "#555" }}>
                  {role.icon}
                </span>
                <span className="text-[14px] font-medium">{role.label}</span>
              </button>
            );
          })}
        </div>

        {/* Inline error */}
        {submitError && (
          <p
            className="mb-4 text-center"
            style={{ color: "#FF6452", fontSize: "13px" }}
          >
            {submitError}
          </p>
        )}

        {/* Conclude button */}
        {console.log("DISABLED STATE:", selected.length === 0 || loading)}
        <button
          type="button"
          disabled={selected.length === 0 || loading}
          onClick={handleConcluir}
          className="w-full rounded-full py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-75"
          style={{
            background: "#FF6452",
            opacity: selected.length > 0 && !loading ? 1 : 0.5,
            cursor: selected.length > 0 && !loading ? "pointer" : "not-allowed",
          }}
        >
          {loading ? "Salvando..." : "Concluir cadastro"}
        </button>
      </div>
    </div>
  );
}
