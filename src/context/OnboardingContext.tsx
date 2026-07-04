"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/* ─── Shape of collected onboarding data ──────────────────────────────────── */
export interface OnboardingData {
  fotoFile: File | null;
  linkX: string;
  linkInstagram: string;
  linkYoutube: string;
  tipos: string[];
}

const DEFAULT: OnboardingData = {
  fotoFile: null,
  linkX: "",
  linkInstagram: "",
  linkYoutube: "",
  tipos: [],
};

/* ─── Context shape ────────────────────────────────────────────────────────── */
interface OnboardingContextValue {
  onboardingData: OnboardingData;
  setOnboardingData: (partial: Partial<OnboardingData>) => void;
  submitOnboarding: () => Promise<{ error: string | null }>;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

/* ─── Provider ─────────────────────────────────────────────────────────────── */
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardingData, setData] = useState<OnboardingData>(DEFAULT);
  const router = useRouter();

  const setOnboardingData = useCallback((partial: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const submitOnboarding = useCallback(async (): Promise<{
    error: string | null;
  }> => {
    const supabase = createClient();

    try {
      /* a) Get authenticated user */
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { error: "Algo deu errado. Tente novamente." };

      let avatarUrl: string | null = null;

      /* b) Upload photo if provided */
      if (onboardingData.fotoFile) {
        const { data: uploadData, error: uploadError } =
          await supabase.storage
            .from("avatars")
            .upload(`${user.id}/${Date.now()}`, onboardingData.fotoFile, {
              upsert: true,
              contentType: onboardingData.fotoFile.type,
            });

        if (uploadError) {
          console.error("ERRO SUPABASE:", JSON.stringify(uploadError, null, 2));
          return { error: "Algo deu errado. Tente novamente." };
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(uploadData.path);

        avatarUrl = publicUrl ?? null;
      }

      /* c) Upsert profile row */
      const { error: upsertError } = await supabase.from("profiles").upsert({
        id: user.id,
        avatar_url: avatarUrl,
        link_x: onboardingData.linkX || null,
        link_instagram: onboardingData.linkInstagram || null,
        link_youtube: onboardingData.linkYoutube || null,
        tipos: onboardingData.tipos,
      });

      if (upsertError) {
        console.error("ERRO SUPABASE:", JSON.stringify(upsertError, null, 2));
        return { error: "Algo deu errado. Tente novamente." };
      }

      /* d) Navigate to dashboard only on success */
      router.push("/dashboard");
      return { error: null };
    } catch (err) {
      console.error(err);
      return { error: "Algo deu errado. Tente novamente." };
    }
  }, [onboardingData, router]);

  return (
    <OnboardingContext.Provider
      value={{ onboardingData, setOnboardingData, submitOnboarding }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

/* ─── Hook ─────────────────────────────────────────────────────────────────── */
export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx)
    throw new Error("useOnboarding must be used inside OnboardingProvider");
  return ctx;
}
