import Container from "@/components/layout/Container";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for registering and participating in Mafia Kilty events.",
};

const sections = [
  {
    heading: "Event Nature",
    body: "Mafia Kilty is a live, in-person social deduction game where participants are assigned secret roles and play rounds of discussion, deduction, and bluffing to achieve game objectives. The experience is designed to be fun, social, interactive, and beginner-friendly.",
  },
  {
    heading: "Participation Requirements",
    body: "Participation is voluntary. The game involves social interaction, strategic deduction, bluffing, and discussion with other players. No prior experience is needed — rules will be explained at the start of the event.",
  },
  {
    heading: "Age Restriction",
    body: "Mafia Kilty events are intended for adults only. By registering you confirm that you are 18 years old or older.",
  },
  {
    heading: "Conduct and Respect",
    body: "You agree to behave respectfully toward other participants, organisers, and the host team throughout the event. Unsportsmanlike, disruptive or abusive behaviour may result in removal from the event without refund.",
  },
  {
    heading: "Tickets & Refunds",
    body: "A full refund is available if requested more than 5 days before the event. No refunds are available within 5 days of the event. Transfers to a future date are at the host's discretion if requested before the event.",
  },
  {
    heading: "Game Rules & Decisions",
    body: "The game host(s) will explain rules at the start of the event. Their rulings and decisions during the game are final.",
  },
  {
    heading: "Photography & Social Media",
    body: "Photos or videos may be taken at the event for promotional use. If you do not wish to be photographed, please inform a host on the night.",
  },
  {
    heading: "Personal Responsibility",
    body: "Mafia Kilty is a social party game — no physical, legal, or serious real-world stakes are involved. You participate at your own responsibility and waive any claims against the organisers for typical game play and event participation.",
  },
];

export default function TermsPage() {
  return (
    <section className="bg-off-white pt-32 pb-20 md:pb-28">
      <Container className="max-w-2xl">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-black sm:text-5xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-4 text-grey-dark">
          By registering for a Mafia Kilty event you confirm that you have read,
          understood, and agree to the following conditions.
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-heading text-lg font-semibold text-black">
                {s.heading}
              </h2>
              <p className="mt-2 leading-relaxed text-grey-dark">{s.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
