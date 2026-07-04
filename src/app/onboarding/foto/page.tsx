"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/context/OnboardingContext";

/* ─── Camera icon ──────────────────────────────────────────────────────────── */
function CameraIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#A3A3A3"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export default function OnboardingFotoPage() {
  const { setOnboardingData } = useOnboarding();
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleContinue() {
    setOnboardingData({ fotoFile: selectedFile });
    router.push("/onboarding/links");
  }

  function handleSkip() {
    setOnboardingData({ fotoFile: null });
    router.push("/onboarding/links");
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ backgroundColor: "#050505" }}
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
          <Image
            src="/looma-logo.png"
            alt="Looma"
            width={32}
            height={32}
            className="object-contain"
          />
          <span
            className="font-bold leading-none"
            style={{ color: "#FF6452", fontSize: "20px" }}
          >
            looma
          </span>
        </div>

        {/* Title */}
        <h1
          className="mb-2 text-center text-xl font-bold"
          style={{ color: "#F5F5F5", letterSpacing: "-0.02em" }}
        >
          Adicione uma foto de perfil
        </h1>

        {/* Subtitle */}
        <p
          className="mb-8 text-center"
          style={{ color: "#A3A3A3", fontSize: "13px", lineHeight: 1.6 }}
        >
          Isso ajuda outras pessoas a te reconhecerem na Looma.
        </p>

        {/* Avatar upload area */}
        <div className="mb-8 flex justify-center">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center overflow-hidden transition-opacity hover:opacity-80"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "#1E1E1E",
              border: "2px dashed #333",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label="Selecionar foto de perfil"
          >
            {preview ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={preview}
                alt="Preview da foto de perfil"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <CameraIcon />
            )}
          </button>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            aria-hidden="true"
          />
        </div>

        {/* Continue button */}
        <button
          type="button"
          disabled={!preview}
          onClick={handleContinue}
          className="w-full rounded-full py-3 text-[14px] font-semibold text-white transition-opacity"
          style={{
            background: "#FF6452",
            opacity: preview ? 1 : 0.5,
            cursor: preview ? "pointer" : "not-allowed",
          }}
        >
          Continuar
        </button>

        {/* Skip link */}
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
            Pular por enquanto
          </button>
        </div>
      </div>
    </div>
  );
}
