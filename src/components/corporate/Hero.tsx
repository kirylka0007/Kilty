"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Button from "@/components/ui/Button";
import { trustPoints } from "@/data/corporate";

export default function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };
  const item: Variants = {
    hidden: reduce ? {} : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden pt-28 pb-20">
      <Image
        src="/photos/DS706448.jpg"
        alt="A team mid-game at a Mafia Kilty social deduction session"
        fill
        className="object-cover"
        priority
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/55" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-[1000px] px-8 text-center sm:px-12 lg:px-16"
      >
        <motion.p
          variants={item}
          className="text-sm font-semibold uppercase tracking-[0.25em] text-brass"
        >
          Corporate &amp; team events
        </motion.p>

        <motion.h1
          variants={item}
          className="mx-auto mt-6 max-w-4xl font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Your team talks to machines all year.
          <br className="hidden sm:block" /> Give them ninety minutes of{" "}
          <span className="redact text-brass">
            <span className="bar" aria-hidden="true" />
            reading people
          </span>
          .
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-7 max-w-2xl text-lg text-grey-light sm:text-xl"
        >
          A live, screen-free social deduction game for teams. Bluffing,
          persuasion and figuring out who&rsquo;s lying — no laptops, no app, no
          awkward icebreakers.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="#enquire" variant="primary-on-dark" size="lg" className="shadow-xl shadow-black/40">
            Get a quote
          </Button>
          <Button href="#why" variant="ghost" size="lg">
            Why it works
          </Button>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-grey-light"
        >
          {trustPoints.map((point, i) => (
            <span key={point} className="flex items-center gap-3">
              {i > 0 && <span className="text-brass/70" aria-hidden>&middot;</span>}
              {point}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
