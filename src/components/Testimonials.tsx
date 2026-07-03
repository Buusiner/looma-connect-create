"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Lucas Mendes",
    role: "Youtuber \u00b7 500k inscritos",
    initials: "LM",
    text: "Encontrar um editor de video bom era um pesadelo. Com a Looma, achei o parceiro ideal em menos de uma semana. A qualidade do meu canal subiu demais.",
  },
  {
    name: "Camila Rocha",
    role: "Designer Freelancer",
    initials: "CR",
    text: "Antes eu dependia de indicacoes. Agora tenho um fluxo constante de clientes que realmente valorizam meu trabalho. A Looma mudou minha carreira.",
  },
  {
    name: "Rafael Torres",
    role: "CTO \u00b7 Startup SaaS",
    initials: "RT",
    text: "Precisavamos de devs freelancers para um sprint urgente. O matching da Looma nos conectou com profissionais incriveis em tempo recorde.",
  },
  {
    name: "Juliana Alves",
    role: "Editora de Video",
    initials: "JA",
    text: "A Looma me deu visibilidade que eu nunca teria sozinha. Meu portfolio integrado na plataforma fala por si. Ja fechei 12 projetos em 3 meses.",
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

export default function Testimonials() {
  return (
    <section id="depoimentos" className="px-6 py-[120px] md:py-[160px]">
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
            O que dizem sobre a Looma
          </h2>
          <p
            className="mx-auto mt-5 max-w-[640px] text-text-secondary"
            style={{ lineHeight: 1.7 }}
          >
            Profissionais que ja estao transformando suas carreiras
          </p>
        </motion.div>

        <motion.div
          className="mt-20 grid gap-5 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              className="rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-0.5"
              variants={itemVariants}
            >
              <Quote size={20} className="mb-4 text-brand/30" />
              <p
                className="text-sm text-text-secondary"
                style={{ lineHeight: 1.7 }}
              >
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/15">
                  <span className="text-xs font-bold text-brand">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {t.name}
                  </p>
                  <p className="text-xs text-text-tertiary">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
