import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Gallery from "@/components/photos/Gallery";
import { photos } from "@/data/photos";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "Photos from Mafia Kilty social deduction events in Edinburgh and Glasgow.",
};

export default function PhotosPage() {
  return (
    <section className="bg-black pt-32 pb-20 md:pb-28">
      <Container>
        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Event Photos
          </h1>
          <p className="mt-4 text-lg text-grey-light">
            Highlights from our recent Mafia Kilty nights
          </p>
        </div>
        <Gallery photos={photos} />
      </Container>
    </section>
  );
}
