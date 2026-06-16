import Container from "@/components/layout/Container";
import { stats } from "@/data/corporate";

export default function Stats() {
  return (
    <section className="bg-charcoal py-14 md:py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-4xl font-bold text-white sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-snug text-grey-mid">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
