import { redirect } from "next/navigation";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { stripe } from "@/lib/stripe";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "You're In!",
  description: "Your booking for Mafia Kilty has been confirmed.",
};

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/signup");
  }

  let customerEmail = "";
  let eventDescription = "";

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    customerEmail = session.customer_email || "";
    // The line_items description contains the event details
    const lineItems = await stripe.checkout.sessions.listLineItems(session_id, {
      limit: 1,
    });
    eventDescription = lineItems.data[0]?.description || "";
  } catch {
    // If session retrieval fails, show generic confirmation
  }

  return (
    <section className="bg-off-white pt-32 pb-20 md:pb-28">
      <Container className="max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="text-emerald-600"
          >
            <path
              d="M20 6L9 17L4 12"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="font-heading text-4xl font-bold tracking-tight text-black sm:text-5xl">
          You&apos;re In!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-grey-dark">
          Your spot has been booked. We&apos;ve sent a confirmation to{" "}
          {customerEmail ? (
            <strong className="text-black">{customerEmail}</strong>
          ) : (
            "your email"
          )}
          .
        </p>

        {eventDescription && (
          <p className="mt-2 text-sm text-grey-mid">{eventDescription}</p>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href="/" variant="primary" size="sm">
            Back to Home
          </Button>
          <Button
            href={siteConfig.social.telegram}
            variant="ghost"
            size="sm"
            className="!text-grey-dark !ring-grey-light hover:!bg-black hover:!text-white hover:!ring-black"
          >
            Join Telegram Group
          </Button>
        </div>
      </Container>
    </section>
  );
}
