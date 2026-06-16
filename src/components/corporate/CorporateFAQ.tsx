import Container from "@/components/layout/Container";
import { corporateFaq } from "@/data/corporate";

export default function CorporateFAQ() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Questions, answered
            </h2>
          </div>
          <div className="divide-y divide-grey-light">
            {corporateFaq.map((item) => (
              <details key={item.question} className="group py-7 first:pt-0">
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-heading text-lg font-semibold text-black">
                  <span className="min-w-0 flex-1 text-left">
                    {item.question}
                  </span>
                  <svg
                    className="mt-1 h-5 w-5 shrink-0 text-grey-mid transition-transform duration-200 group-open:rotate-45"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </summary>
                <p className="mt-4 leading-loose text-grey-dark">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
