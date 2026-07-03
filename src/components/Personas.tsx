"use client";

import { motion } from "framer-motion";
import {
  Play,
  Video,
  Palette,
  Code2,
  Megaphone,
  Sparkles,
} from "lucide-react";

const personas = [
  {
    icon: Play,
    title: "Youtubers",
    description:
      "Encontre editores, designers de thumbnail e gestores de canal para escalar seu conteudo.",
  },
  {
    icon: Video,
    title: "Editores de Video",
    description:
      "Conecte-se com criadores que precisam do seu talento para transformar conteudo bruto em arte.",
  },
  {
    icon: Palette,
    title: "Designers",
    description:
      "De thumbnails a identidades visuais completas. Mostre seu portfolio e atraia clientes.",
  },
  {
    icon: Code2,
    title: "Desenvolvedores",
    description:
      "Projetos web, apps e automacoes. Encontre empresas e criadores que precisam de tecnologia.",
  },
  {
    icon: Megaphone,
    title: "Influenciadores",
    description:
      "Conecte-se com marcas e equipes que buscam alguém com a sua audiência e influência.",
  },
  {
    icon: Sparkles,
    title: "Iniciantes",
    description:
      "Está começando agora? Encontre seus primeiros projetos e construa seu portfólio na prática.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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

export default function Personas() {
  return (
    <section id="para-quem-e" className="px-6 py-[120px] md:py-[160px]">
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
            Para quem é a Looma
          </h2>
          <p
            className="mx-auto mt-5 max-w-[640px] text-text-secondary"
            style={{ lineHeight: 1.7 }}
          >
            Seja você criador de conteúdo, desenvolvedor ou influenciador, a Looma foi feita para você
          </p>
        </motion.div>

        <motion.div
          className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {personas.map((persona) => (
            <motion.div
              key={persona.title}
              className="group rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-0.5"
              variants={itemVariants}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border">
                <persona.icon size={20} className="text-brand" />
              </div>
              <h3
                className="text-base font-semibold text-text-primary"
                style={{ letterSpacing: "-0.02em" }}
              >
                {persona.title}
              </h3>
              <p
                className="mt-2 text-sm text-text-secondary"
                style={{ lineHeight: 1.7 }}
              >
                {persona.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
