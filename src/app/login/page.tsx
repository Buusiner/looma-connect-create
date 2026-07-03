"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") ?? "";

  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Step 1 — background fades in over 800ms (ease-in-out)
    if (wrapperRef.current) {
      wrapperRef.current.style.backgroundColor = "#050505";
    }

    // Step 2 — card appears only after 850ms (400ms ease-out)
    const timer = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.style.visibility = "visible";
        cardRef.current.style.opacity = "1";
        cardRef.current.style.transform = "translateY(0px)";
      }
    }, 850);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="flex min-h-screen items-center justify-center px-4"
      style={{
        /* starts transparent, transitions to #050505 over 800ms */
        backgroundColor: "transparent",
        transition: "background-color 800ms ease-in-out",
      }}
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
          /* hidden and shifted down — visibility:hidden guarantees
             it won't flash before step 2 */
          opacity: 0,
          visibility: "hidden",
          transform: "translateY(20px)",
          transition: "opacity 400ms ease-out, transform 400ms ease-out",
        }}
      >
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <Image
            src="/looma-logo.png"
            alt="Looma"
            width={32}
            height={32}
            className="object-contain"
          />
          <span
            className="text-lg font-semibold"
            style={{ color: "#FF6452" }}
          >
            looma
          </span>
        </div>

        {/* Title */}
        <h1
          className="mb-6 text-center text-xl font-bold"
          style={{ color: "#F5F5F5", letterSpacing: "-0.02em" }}
        >
          Entrar na sua conta
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-[13px] font-medium"
              style={{ color: "#A3A3A3" }}
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              defaultValue={emailParam}
              placeholder="seu@email.com"
              className="w-full rounded-lg border bg-transparent px-4 py-3 text-[14px] outline-none transition-colors"
              style={{
                background: "#1A1A1A",
                borderColor: "#2A2A2A",
                color: "#F0F0F0",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#FF6452")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#2A2A2A")}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-[13px] font-medium"
              style={{ color: "#A3A3A3" }}
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border bg-transparent px-4 py-3 text-[14px] outline-none transition-colors"
              style={{
                background: "#1A1A1A",
                borderColor: "#2A2A2A",
                color: "#F0F0F0",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#FF6452")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#2A2A2A")}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 w-full rounded-full py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-75"
            style={{ background: "#FF6452" }}
          >
            Entrar
          </button>
        </form>

        {/* Sign up link */}
        <p
          className="mt-5 text-center text-[13px]"
          style={{ color: "#A3A3A3" }}
        >
          Não tem conta?{" "}
          <a
            href="/cadastro"
            className="transition-colors hover:text-white"
            style={{ color: "#A3A3A3" }}
          >
            Cadastre-se
          </a>
        </p>
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
