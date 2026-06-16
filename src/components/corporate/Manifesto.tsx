import Container from "@/components/layout/Container";
import Eyebrow from "./Eyebrow";

export default function Manifesto() {
  return (
    <section id="manifesto" className="scroll-mt-24 bg-off-white py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>The case for going analogue</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl md:text-5xl">
            Everyone&rsquo;s automating the easy parts. The edge that&rsquo;s
            left is human — reading a room, earning trust fast, spotting the
            bluff.
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-grey-dark">
            Mafia Kilty is the rare team event with no screen in sight. For
            ninety minutes your team negotiates, persuades, accuses and defends —
            the exact instincts no tool can do for them. It&rsquo;s the antidote
            to a year of video calls and dashboards, disguised as the best laugh
            they&rsquo;ll have all quarter.
          </p>
        </div>
      </Container>
    </section>
  );
}
