import Image from "next/image";
import Button from "@/components/ui/Button";

const META = [
  "12–50 players",
  "60–120 min",
  "Your office, a venue or off-site",
  "Fully hosted — zero prep",
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden pt-28 pb-20">
      <Image
        src="/photos/DS706448.jpg"
        alt="A team mid-game at a Mafia Kilty social deduction session"
        fill
        className="object-cover"
        priority
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/55" />

      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-8 text-center sm:px-12 lg:px-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-brass">
          — Corporate social deduction
        </p>
        <h1 className="mx-auto mt-6 max-w-4xl font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
          Your team talks to machines all year.
          <br className="hidden sm:block" /> Give them ninety minutes of{" "}
          <span className="redact text-brass">
            <span className="bar" aria-hidden="true" />
            reading people
          </span>
          .
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-grey-light sm:text-xl">
          Live, screen-free social deduction games for teams — bluffing,
          persuasion, and figuring out who&rsquo;s lying. No laptops, no app, no
          awkward icebreakers. Just your people, properly switched on.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href="#enquire"
            variant="primary-on-dark"
            size="lg"
            className="shadow-xl shadow-black/40"
          >
            Get a quote
          </Button>
          <Button href="#manifesto" variant="ghost" size="lg">
            How it works
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-wider text-grey-light">
          {META.map((item, i) => (
            <span key={item} className="flex items-center gap-4">
              {i > 0 && <span className="text-brass/60">·</span>}
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
