"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Crie seu perfil",
    description:
      "Cadastre suas habilidades, portfolio e experiencia. Mostre ao mundo o que voce sabe fazer.",
  },
  {
    icon: Search,
    number: "02",
    title: "Encontre o match perfeito",
    description:
      "Nosso algoritmo conecta voce com profissionais ideais para o seu projeto ou necessidade.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Colabore e cresca",
    description:
      "Trabalhe junto, entregue resultados incriveis e construa sua reputacao na plataforma.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="px-6 py-[120px] md:py-[160px]">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2
            className="font-sans text-3xl font-bold text-text-primary sm:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Como funciona
          </h2>
          <p
            className="mx-auto mt-5 max-w-[600px] text-text-secondary"
            style={{ lineHeight: 1.7 }}
          >
            Tres passos simples para encontrar o profissional ideal
          </p>
        </motion.div>

        <motion.div
          className="relative mt-20 grid gap-8 md:grid-cols-3 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Connector line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

          {steps.map((step) => (
            <motion.div
              key={step.number}
              className="relative flex flex-col items-center text-center"
              variants={itemVariants}
            >
              {/* Number badge */}
              <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface">
                <step.icon size={24} className="text-brand" />
              </div>
              <span className="mb-2 text-xs font-medium tracking-widest text-brand uppercase">
                Passo {step.number}
              </span>
              <h3
                className="text-lg font-semibold text-text-primary"
                style={{ letterSpacing: "-0.02em" }}
              >
                {step.title}
              </h3>
              <p
                className="mt-2 max-w-xs text-sm text-text-secondary"
                style={{ lineHeight: 1.7 }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
