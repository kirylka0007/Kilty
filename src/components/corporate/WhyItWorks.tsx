import Container from "@/components/layout/Container";
import Reveal from "./Reveal";
import { scienceFacts } from "@/data/corporate";

export default function WhyItWorks() {
  return (
    <section id="why" className="scroll-mt-24 bg-off-white py-20 md:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl">
            It&rsquo;s not just a laugh.
            <br />
            <span className="text-grey-mid">(Though it&rsquo;s definitely that too.)</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-grey-dark">
            Social deduction quietly trains the things that actually make teams
            work — connection, trust, and the confidence to speak up. The
            research backs it.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-20 md:gap-6">
          {scienceFacts.map((fact, i) => (
            <Reveal key={fact.value} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-grey-light bg-white p-7 sm:p-8">
                <p className="font-heading text-4xl font-bold leading-none text-black sm:text-5xl">
                  {fact.value}
                </p>
                <p className="mt-3 font-heading text-lg font-semibold text-black">
                  {fact.claim}
                </p>
                <p className="mt-3 flex-1 leading-relaxed text-grey-dark">
                  {fact.tieIn}
                </p>
                <a
                  href={fact.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 text-xs font-medium text-grey-mid underline-offset-2 transition-colors hover:text-black hover:underline"
                >
                  {fact.source}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
