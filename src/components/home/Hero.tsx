import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative flex h-screen min-h-[600px] items-center justify-center">
      <Image
        src="/photos/DS706457.jpg"
        alt="Mafia Kilty event — group of players with masks"
        fill
        className="object-cover"
        priority
        quality={85}
      />
      {/* Stronger overlay so text and CTA stay readable on any photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/40" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-8 text-center sm:px-12 lg:px-16">
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl">
          Live Mafia &amp; Traitors-style
          <br />
          social deduction nights
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg text-white/90 sm:text-xl">
          Bluff. Deduce. Laugh. Repeat.
        </p>
        <div className="mt-12">
          <Button
            href="/signup"
            variant="primary-on-dark"
            size="lg"
            className="shadow-xl shadow-black/40 ring-2 ring-white/20"
          >
            Join the Next Game
          </Button>
        </div>
      </div>
    </section>
  );
}
