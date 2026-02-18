import Image from "next/image";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const cityDescriptions: Record<string, string> = {
  Edinburgh:
    "Join us in Scotland's capital for an evening of deception and deduction in the heart of the city.",
  Glasgow:
    "Glasgow's vibrant social scene meets social deduction — come play with us in Scotland's biggest city.",
};

export default function WhereWeRun() {
  return (
    <section className="bg-off-white py-16 md:py-20">
      <Container>
        <SectionHeading
          title="Where We Run"
          subtitle="Events in two of Scotland's finest cities"
        />
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {siteConfig.cities.map((city) => (
            <div
              key={city.name}
              className="min-w-0 overflow-hidden rounded-2xl border border-grey-light bg-white text-center shadow-sm"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={city.image}
                  alt={city.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8 sm:p-10">
                <h3 className="font-heading text-2xl font-bold text-black">
                  {city.name}
                </h3>
                <p className="mt-5 leading-relaxed text-grey-dark">
                  {cityDescriptions[city.name]}
                </p>
                <div className="mt-10 flex justify-center">
                <Button
                  href="/signup"
                  variant="primary"
                  size="lg"
                  className="w-full min-w-0 sm:w-auto"
                >
                  Sign Up — {city.name}
                </Button>
              </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
