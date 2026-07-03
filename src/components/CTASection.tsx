"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  const handleClick = () => {
    const heroSection = document.getElementById("waitlist");

    if (!heroSection) return;

    heroSection.scrollIntoView({ behavior: "smooth", block: "start" });

    const startedAt = performance.now();

    const triggerPulseWhenReady = () => {
      const { top } = heroSection.getBoundingClientRect();
      const heroReached = Math.abs(top) <= 80;
      const timeoutReached = performance.now() - startedAt > 2000;

      if (heroReached || timeoutReached) {
        window.setTimeout(() => {
          window.dispatchEvent(new Event("looma:pulse-hero-form"));
        }, 350);
        return;
      }

      window.requestAnimationFrame(triggerPulseWhenReady);
    };

    window.requestAnimationFrame(triggerPulseWhenReady);
  };

  return (
    <section className="relative px-6 py-[120px] md:py-[160px]">
      {/* Subtle surface differentiation */}
      <div className="pointer-events-none absolute inset-0 bg-surface/30" />

      <motion.div
        className="relative mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2
          className="font-sans text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          Pronto para encontrar seu proximo parceiro digital?
        </h2>
        <p
          className="mx-auto mt-7 max-w-[600px] text-text-secondary"
          style={{ lineHeight: 1.7 }}
        >
          Não espere por outra chance, é agora.
        </p>

        <div className="mx-auto mt-10 flex justify-center">
          <button
            className="shrink-0 rounded-full px-7 py-3.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
            style={{ background: "#FF6452", boxShadow: "none" }}
            onClick={handleClick}
          >
            Construa conexões
          </button>
        </div>
      </motion.div>
    </section>
  );
}
