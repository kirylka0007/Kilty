import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "./Eyebrow";
import { included } from "@/data/corporate";

export default function Included() {
  return (
    <section className="bg-black py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>What&rsquo;s included</Eyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything but the room.
            </h2>
            <p className="mt-4 text-lg text-grey-light">
              You pick the people and the place. We bring the rest and run the
              whole thing — so on the day, you get to actually play.
            </p>
            <div className="mt-8">
              <Button href="#enquire" variant="primary-on-dark" size="md">
                Get a quote
              </Button>
            </div>
          </div>
          <ul className="space-y-4">
            {included.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-charcoal p-5"
              >
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-brass"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="leading-relaxed text-grey-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
