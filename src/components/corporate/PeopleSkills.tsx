import Container from "@/components/layout/Container";
import Eyebrow from "./Eyebrow";
import { peopleSkills } from "@/data/corporate";

export default function PeopleSkills() {
  return (
    <section className="bg-charcoal py-16 md:py-24">
      <Container>
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <Eyebrow>The people-skills workout</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A party game on the surface. A people-skills workout underneath.
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {peopleSkills.map((skill) => (
            <div
              key={skill.number}
              className="min-w-0 rounded-2xl border border-white/10 bg-black/40 p-8 sm:p-10"
            >
              <span className="font-mono text-sm font-bold text-brass">
                {skill.number}
              </span>
              <h3 className="mt-4 font-heading text-xl font-bold text-white">
                {skill.title}
              </h3>
              <p className="mt-3 leading-relaxed text-grey-light">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
