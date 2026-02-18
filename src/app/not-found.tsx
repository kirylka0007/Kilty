import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-black">
      <Container className="text-center">
        <h1 className="font-heading text-8xl font-bold text-white">404</h1>
        <p className="mt-4 text-xl text-grey-light">
          This page doesn&apos;t exist — but our next game night does.
        </p>
        <div className="mt-8">
          <Button href="/" variant="primary-on-dark" size="lg">
            Back to Home
          </Button>
        </div>
      </Container>
    </section>
  );
}
