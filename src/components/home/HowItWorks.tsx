import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Book Your Spot",
    description:
      "Sign up, pick your city and preferred date. We'll send you everything you need to know before the night.",
  },
  {
    number: "02",
    title: "Play the Game",
    description:
      "Get a secret role, then bluff and deduce your way through rounds of social deduction with a room full of players.",
  },
  {
    number: "03",
    title: "Have a Brilliant Night",
    description:
      "Expect laughs, unexpected twists, new friends, and plenty of bragging rights — win or lose.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-charcoal py-16 md:py-20">
      <Container>
        <SectionHeading
          title="How It Works"
          subtitle="Three steps to a great night out"
          dark
        />
        <div className="grid gap-12 md:grid-cols-3 md:gap-14">
          {steps.map((step) => (
            <div
              key={step.number}
              className="min-w-0 rounded-2xl border border-grey-dark p-8 text-center sm:p-10"
            >
              <span className="font-heading text-4xl font-bold text-grey-mid">
                {step.number}
              </span>
              <h3 className="mt-6 font-heading text-xl font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-4 leading-relaxed text-grey-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
