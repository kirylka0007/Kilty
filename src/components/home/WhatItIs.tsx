import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function WhatItIs() {
  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading title="What is Mafia Kilty?" />
          <p className="text-lg leading-loose text-grey-dark">
            Mafia Kilty is a live social deduction game — think Mafia, Werewolf,
            or The Traitors, but in person. You&apos;ll be assigned a secret role
            and have to bluff, deduce, and persuade your way through the night. No
            experience needed, just bring yourself and get ready for a brilliant
            evening of laughs, strategy, and new connections.
          </p>
        </div>
      </Container>
    </section>
  );
}
