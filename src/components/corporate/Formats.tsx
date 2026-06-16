"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Container from "@/components/layout/Container";
import { formats } from "@/data/corporate";

export default function Formats() {
  const reduce = useReducedMotion();

  const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const card: Variants = {
    hidden: reduce ? {} : { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="bg-off-white py-20 md:py-28">
      <Container>
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-black sm:text-4xl">
            One game, shaped to your day.
          </h2>
          <p className="mt-4 text-lg text-grey-mid">
            Up to 25 per game — two games side by side for bigger groups, so up
            to 50 can play at once.
          </p>
        </div>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {formats.map((format) => (
            <motion.div
              key={format.title}
              variants={card}
              whileHover={reduce ? undefined : { y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group flex min-w-0 flex-col rounded-2xl border border-grey-light bg-white p-7 shadow-sm transition-colors hover:border-black"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-brass">
                {format.tag}
              </span>
              <h3 className="mt-3 font-heading text-xl font-bold text-black">
                {format.title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-grey-dark">
                {format.description}
              </p>
              <p className="mt-5 border-t border-grey-light pt-4 text-sm font-semibold text-black">
                {format.spec}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
