import Container from "@/components/layout/Container";
import Eyebrow from "./Eyebrow";
import { formats } from "@/data/corporate";

export default function Formats() {
  return (
    <section className="bg-off-white py-16 md:py-24">
      <Container>
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <Eyebrow>Formats</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-black sm:text-4xl">
            One game, shaped to your day.
          </h2>
          <p className="mt-4 text-lg text-grey-mid">
            Up to 25 per game, with two games running side by side for larger
            groups — so up to 50 people can play at once.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {formats.map((format) => (
            <div
              key={format.title}
              className="flex min-w-0 flex-col rounded-2xl border border-grey-light bg-white p-7 transition-colors hover:border-black"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-grey-mid">
                {format.tag}
              </span>
              <h3 className="mt-3 font-heading text-xl font-bold text-black">
                {format.title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-grey-dark">
                {format.description}
              </p>
              <p className="mt-5 border-t border-grey-light pt-4 font-mono text-xs uppercase tracking-wider text-black">
                {format.spec}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
