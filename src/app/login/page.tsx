"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

/* ─── Shared input style helpers ──────────────────────────────────────────── */
const inputBase: React.CSSProperties = {
  background: "#1A1A1A",
  borderColor: "#2A2A2A",
  color: "#F0F0F0",
};
const inputClass =
  "w-full rounded-lg border bg-transparent px-4 py-3 text-[14px] outline-none transition-colors";

function onFocus(e: React.FocusEvent<HTMLInputElement>) {
  e.currentTarget.style.borderColor = "#FF6452";
}
function onBlur(e: React.FocusEvent<HTMLInputElement>) {
  e.currentTarget.style.borderColor = "#2A2A2A";
}

/* ─── Inline error ─────────────────────────────────────────────────────────── */
function FieldError({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <p style={{ color: "#FF6452", fontSize: "12px", marginTop: "4px" }}>
      {msg}
    </p>
  );
}

/* ─── Tab types ────────────────────────────────────────────────────────────── */
type Tab = "login" | "register";

/* ─── Login tab ────────────────────────────────────────────────────────────── */
function LoginTab({
  emailParam,
  onSwitchTab,
}: {
  emailParam: string;
  onSwitchTab: () => void;
}) {
  const [email, setEmail] = useState(emailParam);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  function validate() {
    const e: typeof errors = {};
    if (!email) e.email = "Digite seu e-mail.";
    else if (email.indexOf("@") < 1 || email.indexOf(".", email.indexOf("@")) < email.indexOf("@") + 2)
      e.email = "Digite um e-mail válido.";
    if (!password) e.password = "Digite sua senha.";
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      // TODO: integrate Supabase auth
    }
  }

  return (
    <>
      <h1
        className="mb-6 text-center text-xl font-bold"
        style={{ color: "#F5F5F5", letterSpacing: "-0.02em" }}
      >
        Entrar na sua conta
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="login-email" className="text-[13px] font-medium" style={{ color: "#A3A3A3" }}>
            E-mail
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
            placeholder="seu@email.com"
            className={inputClass}
            style={inputBase}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <FieldError msg={errors.email ?? ""} />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="login-password" className="text-[13px] font-medium" style={{ color: "#A3A3A3" }}>
            Senha
          </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
            placeholder="••••••••"
            className={inputClass}
            style={inputBase}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <FieldError msg={errors.password ?? ""} />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-full py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-75"
          style={{ background: "#FF6452" }}
        >
          Entrar
        </button>
      </form>

      <p className="mt-5 text-center text-[13px]" style={{ color: "#A3A3A3" }}>
        Não tem conta?{" "}
        <button
          type="button"
          className="transition-colors hover:text-white underline-offset-2"
          style={{ color: "#A3A3A3", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          onClick={onSwitchTab}
        >
          Cadastre-se
        </button>
      </p>
    </>
  );
}

/* ─── Register tab ─────────────────────────────────────────────────────────── */
function RegisterTab({ onSwitchTab }: { onSwitchTab: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirm?: string;
  }>({});

  function validate() {
    const e: typeof errors = {};
    if (!name) e.name = "Digite seu nome.";
    if (!email) e.email = "Digite seu e-mail.";
    else if (email.indexOf("@") < 1 || email.indexOf(".", email.indexOf("@")) < email.indexOf("@") + 2)
      e.email = "Digite um e-mail válido.";
    if (!password) e.password = "Digite uma senha.";
    else if (password.length < 8) e.password = "A senha deve ter no mínimo 8 caracteres.";
    if (!confirm) e.confirm = "Confirme sua senha.";
    else if (confirm !== password) e.confirm = "As senhas não coincidem.";
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      // TODO: integrate Supabase auth — createUser(email, password, name)
      window.location.href = "/onboarding/foto";
    }
  }

  return (
    <>
      <h1
        className="mb-6 text-center text-xl font-bold"
        style={{ color: "#F5F5F5", letterSpacing: "-0.02em" }}
      >
        Criar sua conta
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="reg-name" className="text-[13px] font-medium" style={{ color: "#A3A3A3" }}>
            Como vamos te chamar?
          </label>
          <input
            id="reg-name"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
            placeholder="Seu nome"
            className={inputClass}
            style={inputBase}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <FieldError msg={errors.name ?? ""} />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="reg-email" className="text-[13px] font-medium" style={{ color: "#A3A3A3" }}>
            E-mail
          </label>
          <input
            id="reg-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
            placeholder="seu@email.com"
            className={inputClass}
            style={inputBase}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <FieldError msg={errors.email ?? ""} />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="reg-password" className="text-[13px] font-medium" style={{ color: "#A3A3A3" }}>
            Senha
          </label>
          <input
            id="reg-password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined, confirm: undefined })); }}
            placeholder="Mínimo 8 caracteres"
            className={inputClass}
            style={inputBase}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <FieldError msg={errors.password ?? ""} />
        </div>

        {/* Confirm password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="reg-confirm" className="text-[13px] font-medium" style={{ color: "#A3A3A3" }}>
            Confirmar senha
          </label>
          <input
            id="reg-confirm"
            type="password"
            value={confirm}
            onChange={(e) => { setConfirm(e.target.value); setErrors((p) => ({ ...p, confirm: undefined })); }}
            placeholder="••••••••"
            className={inputClass}
            style={inputBase}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <FieldError msg={errors.confirm ?? ""} />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-full py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-75"
          style={{ background: "#FF6452" }}
        >
          Criar conta
        </button>
      </form>

      <p className="mt-5 text-center text-[13px]" style={{ color: "#A3A3A3" }}>
        Já tem conta?{" "}
        <button
          type="button"
          className="transition-colors hover:text-white"
          style={{ color: "#A3A3A3", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          onClick={onSwitchTab}
        >
          Entrar
        </button>
      </p>
    </>
  );
}

/* ─── Main LoginForm component ─────────────────────────────────────────────── */
function LoginForm() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") ?? "";

  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<Tab>("login");
  const [animating, setAnimating] = useState(false);

  /* ── Card entrance animation on mount ──────────────────────────────────── */
  useEffect(() => {
    // Zero overlay instantly — screen already black from transition
    const overlay = document.getElementById("page-transition-overlay");
    if (overlay) {
      overlay.style.transition = "none";
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      requestAnimationFrame(() => {
        overlay.style.transition = "opacity 900ms ease-in-out";
      });
    }

    // Card slides up after 850ms
    const timer = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.style.visibility = "visible";
        cardRef.current.style.opacity = "1";
        cardRef.current.style.transform = "translateY(0px)";
      }
    }, 850);

    return () => clearTimeout(timer);
  }, []);

  /* ── Tab switch animation ───────────────────────────────────────────────── */
  function switchTab(next: Tab) {
    if (next === activeTab || animating) return;
    const el = contentRef.current;
    if (!el) { setActiveTab(next); return; }

    const direction = next === "register" ? 1 : -1; // register comes from right
    setAnimating(true);

    // Fade + slide out
    el.style.transition = "opacity 150ms ease-in, transform 150ms ease-in";
    el.style.opacity = "0";
    el.style.transform = `translateX(${direction * 12}px)`;

    setTimeout(() => {
      setActiveTab(next);
      // Reset position to opposite side, then animate in
      el.style.transition = "none";
      el.style.transform = `translateX(${-direction * 12}px)`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = "opacity 200ms ease-out, transform 200ms ease-out";
          el.style.opacity = "1";
          el.style.transform = "translateX(0px)";
          setTimeout(() => setAnimating(false), 200);
        });
      });
    }, 150);
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ backgroundColor: "#050505" }}
    >
      <div
        ref={cardRef}
        className="w-full"
        style={{
          maxWidth: "400px",
          background: "#111111",
          border: "1px solid #222",
          borderRadius: "16px",
          padding: "40px",
          opacity: 0,
          visibility: "hidden",
          transform: "translateY(20px)",
          transition: "opacity 400ms ease-out, transform 400ms ease-out",
        }}
      >
        {/* Logo */}
        <div className="mb-6 flex w-full items-center justify-center gap-2">
          <Image src="/looma-logo.png" alt="Looma" width={32} height={32} className="object-contain" />
          <span className="font-bold leading-none" style={{ color: "#FF6452", fontSize: "20px" }}>
            looma
          </span>
        </div>

        {/* Tab switcher */}
        <div
          className="mb-6 flex w-full rounded-full p-1"
          style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}
        >
          {(["login", "register"] as Tab[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => switchTab(tab)}
                className="flex-1 rounded-full py-2 text-[13px] transition-all duration-200"
                style={{
                  background: isActive ? "#FF6452" : "transparent",
                  color: isActive ? "#FFFFFF" : "#A3A3A3",
                  fontWeight: isActive ? 600 : 400,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {tab === "login" ? "Entrar" : "Cadastre-se"}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div ref={contentRef} style={{ opacity: 1, transform: "translateX(0px)" }}>
          {activeTab === "login" ? (
            <LoginTab emailParam={emailParam} onSwitchTab={() => switchTab("register")} />
          ) : (
            <RegisterTab onSwitchTab={() => switchTab("login")} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
