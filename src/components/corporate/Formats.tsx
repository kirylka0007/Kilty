"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Container from "@/components/layout/Container";
import { formats } from "@/data/corporate";

export default function Formats() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const active = formats[selected];

  return (
    <section className="bg-off-white py-20 md:py-28">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-black sm:text-4xl">
            One game, shaped to your day
          </h2>
          <p className="mt-4 text-lg text-grey-mid">
            Pick a format to explore it. Up to 25 per game, with two games side
            by side for bigger groups, so up to 50 can play at once.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:gap-8">
          {/* Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-2.5 lg:overflow-visible lg:pb-0">
            {formats.map((format, i) => {
              const isActive = i === selected;
              return (
                <button
                  key={format.title}
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-pressed={isActive}
                  className={`shrink-0 rounded-xl border px-4 py-3 text-left transition-colors lg:shrink ${
                    isActive
                      ? "border-black bg-black text-white"
                      : "border-grey-light bg-white text-black hover:border-black"
                  }`}
                >
                  <span
                    className={`block text-[11px] font-semibold uppercase tracking-widest ${
                      isActive ? "text-brass" : "text-grey-mid"
                    }`}
                  >
                    {format.tag}
                  </span>
                  <span className="mt-0.5 block whitespace-nowrap font-heading text-base font-bold lg:whitespace-normal">
                    {format.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <div className="overflow-hidden rounded-2xl border border-grey-light bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={active.image}
                    alt={`${active.title}, a Mafia Kilty corporate game`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-black">
                    {active.tag}
                  </span>
                </div>
                <div className="p-7 sm:p-8">
                  <h3 className="font-heading text-2xl font-bold text-black">
                    {active.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-grey-dark">
                    {active.description}
                  </p>
                  <p className="mt-5 border-t border-grey-light pt-4 text-sm font-semibold text-black">
                    {active.spec}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
