import Container from "@/components/layout/Container";
import SignupFlow from "@/components/signup/SignupFlow";
import { supabase } from "@/lib/supabase/client";
import type { EventWithAvailability } from "@/types";
import type { DbEventAvailability } from "@/types/database";

export const revalidate = 60;

export const metadata = {
  title: "Sign Up",
  description:
    "Grab your spot at the next Mafia Kilty social deduction night in Edinburgh or Glasgow. From £20 per person.",
};

async function getEvents(): Promise<EventWithAvailability[]> {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("event_availability")
    .select("*")
    .eq("is_published", true)
    .gte("date", today)
    .order("date", { ascending: true });

  if (error || !data) return [];

  return (data as DbEventAvailability[]).map((row) => ({
    id: row.id,
    city: row.city,
    date: row.date,
    time: row.time,
    venue: row.venue,
    description: row.description,
    totalSpots: row.total_spots,
    pricePence: row.price_pence,
    registrationCount: row.registration_count,
    spotsRemaining: row.spots_remaining,
  }));
}

interface SignupPageProps {
  searchParams: Promise<{ cancelled?: string }>;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const [events, params] = await Promise.all([getEvents(), searchParams]);
  const cancelled = params.cancelled === "true";

  return (
    <section className="bg-off-white pt-32 pb-20 md:pb-28">
      <Container className="max-w-2xl">
        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Grab Your Spot
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-grey-dark">
            Pick your city, choose a date, and get ready for an evening of
            bluffing, deduction, and plenty of laughs. No experience needed —
            we&apos;ll teach you everything on the night.
          </p>
          <p className="mt-4 font-heading text-xl font-bold text-black">
            From &pound;20 per person
          </p>
        </div>

        <div className="min-w-0 overflow-hidden rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <blockquote className="mb-8 border-l-4 border-grey-light pl-4 italic text-grey-dark">
            &ldquo;One of the best nights out I&apos;ve had in Edinburgh.
            Genuinely didn&apos;t expect to have that much fun with a room full
            of strangers.&rdquo;
          </blockquote>
          <SignupFlow events={events} cancelled={cancelled} />
        </div>
      </Container>
    </section>
  );
}
