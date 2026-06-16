import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "./Eyebrow";

export default function CtaBand() {
  return (
    <section className="bg-black pb-20 pt-4 md:pb-28">
      <Container>
        <div className="rounded-3xl border border-white/10 bg-charcoal px-8 py-14 text-center md:px-16 md:py-20">
          <Eyebrow className="!text-brass">Ready when you are</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Give your team ninety minutes they&rsquo;ll still be arguing about
            next week.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-grey-light">
            Tell us about your team and we&rsquo;ll come back within one working
            day with dates and a quote.
          </p>
          <div className="mt-8">
            <Button href="#enquire" variant="primary-on-dark" size="lg">
              Get a quote
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
