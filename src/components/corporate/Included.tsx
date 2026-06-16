import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Reveal from "./Reveal";
import { includedFlow } from "@/data/corporate";

export default function Included() {
  return (
    <section className="bg-black py-20 md:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything but the room.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-grey-light">
            You pick the people and the place. We handle the rest — start to
            finish — so on the day, you just turn up and play.
          </p>
        </Reveal>

        <div className="relative mt-16 grid gap-10 md:mt-20 md:grid-cols-5 md:gap-5">
          {/* Connecting line behind the step nodes (desktop) */}
          <div
            className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-white/15 md:block"
            aria-hidden
          />
          {includedFlow.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="relative flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brass/50 bg-charcoal font-heading text-lg font-bold text-brass">
                  {i + 1}
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-grey-light">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 text-center" delay={0.1}>
          <Button href="#enquire" variant="primary-on-dark" size="md">
            Get a quote
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
