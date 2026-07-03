"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "O que e a Looma?",
    answer:
      "A Looma e um marketplace que conecta profissionais digitais entre si. Youtubers encontram editores, designers encontram clientes, devs encontram empresas \u2014 tudo em uma unica plataforma.",
  },
  {
    question: "A Looma e gratuito?",
    answer:
      "Sim! Criar seu perfil e buscar profissionais sera gratuito. Teremos planos premium com funcionalidades avancadas como destaque no ranking, analytics e suporte prioritario.",
  },
  {
    question: "Quando a Looma sera lancado?",
    answer:
      "Estamos em fase de pre-lancamento. Entre na lista de espera para ser um dos primeiros a ter acesso e garantir beneficios exclusivos de early adopter.",
  },
  {
    question: "Como funciona o matching de profissionais?",
    answer:
      "Nosso algoritmo analisa habilidades, portfolio, avaliacoes e disponibilidade para sugerir os melhores matches para cada projeto ou necessidade.",
  },
  {
    question: "Posso usar a Looma como empresa?",
    answer:
      "Com certeza! Empresas podem criar perfis corporativos, publicar demandas e acessar uma rede curada de freelancers verificados para qualquer projeto digital.",
  },
  {
    question: "Como garantem a qualidade dos profissionais?",
    answer:
      "Todos os profissionais passam por verificacao de portfolio e identidade. Alem disso, nosso sistema de avaliacoes e reviews garante transparencia em cada colaboracao.",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        className="flex w-full items-center justify-between py-6 text-left transition-colors duration-300 hover:text-text-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className="text-sm font-medium text-text-primary sm:text-base"
          style={{ letterSpacing: "-0.02em" }}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="ml-4 shrink-0"
        >
          <ChevronDown size={18} className="text-text-tertiary" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p
              className="pb-6 text-sm text-text-secondary"
              style={{ lineHeight: 1.7 }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="px-6 py-[120px] md:py-[160px]">
      <div className="mx-auto max-w-2xl">
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
            Perguntas frequentes
          </h2>
          <p
            className="mx-auto mt-5 max-w-[600px] text-text-secondary"
            style={{ lineHeight: 1.7 }}
          >
            Tudo o que voce precisa saber sobre a Looma
          </p>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {faqs.map((faq) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
