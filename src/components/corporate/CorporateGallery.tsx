import Container from "@/components/layout/Container";
import Gallery from "@/components/photos/Gallery";
import Reveal from "./Reveal";
import { corporatePhotos } from "@/data/corporate";

export default function CorporateGallery() {
  return (
    <section className="bg-charcoal py-20 md:py-28">
      <Container>
        <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What it actually looks like
          </h2>
          <p className="mt-4 text-lg text-grey-light">
            Real teams, real games, no stock photos and no staged smiles.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Gallery photos={corporatePhotos} />
        </Reveal>
      </Container>
    </section>
  );
}
