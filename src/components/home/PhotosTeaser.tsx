import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { photos } from "@/data/photos";

export default function PhotosTeaser() {
  const teaserPhotos = photos.slice(0, 3);

  return (
    <section className="bg-charcoal py-16 md:py-20">
      <Container>
        <SectionHeading
          title="From Our Events"
          subtitle="See what a Mafia Kilty night looks like"
          dark
        />
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {teaserPhotos.map((photo) => (
            <div
              key={photo.src}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            href="/photos"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/20 hover:text-white"
          >
            See All Photos
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
