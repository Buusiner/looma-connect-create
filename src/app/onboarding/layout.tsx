import { OnboardingProvider } from "@/context/OnboardingContext";
import type { ReactNode } from "react";

/**
 * Wraps all /onboarding/* pages with the shared OnboardingContext.
 * Data collected across steps (foto, links, tipos) is kept in memory
 * until submitOnboarding() persists it to Supabase.
 */
export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}
