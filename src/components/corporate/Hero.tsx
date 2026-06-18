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
    <section className="relative flex min-h-[86vh] items-center overflow-hidden pt-28 pb-20">
      <Image
        src="/photos/corporate/corporate-2.jpg"
        alt="A corporate team mid-game around the table at a Mafia Kilty session"
        fill
        className="object-cover object-center"
        priority
        quality={85}
      />
      {/* Base scrim for mobile legibility + left-to-right gradient so the
          photo's energy shows on the right. */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-8 sm:px-12 lg:px-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl text-left"
        >
          <motion.p
            variants={item}
            className="text-sm font-semibold uppercase tracking-[0.25em] text-brass"
          >
            Corporate &amp; team events
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-5 font-heading text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Your team talks to machines all year. Give them ninety minutes of{" "}
            <span className="redact text-brass">
              <span className="bar" aria-hidden="true" />
              reading people
            </span>
            .
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg text-grey-light"
          >
            A live, screen-free social deduction game for teams. Bluffing,
            persuasion and figuring out who&rsquo;s lying — no laptops, no app, no
            awkward icebreakers.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
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
            className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-grey-light"
          >
            {trustPoints.map((point, i) => (
              <span key={point} className="flex items-center gap-3">
                {i > 0 && <span className="text-brass/70" aria-hidden>&middot;</span>}
                {point}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
