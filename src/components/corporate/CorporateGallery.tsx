import Container from "@/components/layout/Container";
import Gallery from "@/components/photos/Gallery";
import Eyebrow from "./Eyebrow";
import { corporatePhotos } from "@/data/corporate";

export default function CorporateGallery() {
  return (
    <section className="bg-black py-16 md:py-24">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <Eyebrow>In the room</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What it actually looks like.
          </h2>
          <p className="mt-4 text-lg text-grey-light">
            Real people, real games — no stock photos, no staged smiles.
          </p>
        </div>
        <Gallery photos={corporatePhotos} />
      </Container>
    </section>
  );
}
