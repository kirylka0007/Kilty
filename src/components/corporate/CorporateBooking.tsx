"use client";

import { useState, useRef, useMemo } from "react";
import Container from "@/components/layout/Container";
import EventConfigurator from "./EventConfigurator";
import CorporateEnquiryForm from "./CorporateEnquiryForm";
import { occasions, locations } from "@/data/corporate";

export default function CorporateBooking() {
  const [groupSize, setGroupSize] = useState(24);
  const [occasionValue, setOccasionValue] = useState(occasions[0].value);
  const [location, setLocation] = useState(locations[0]);
  const [applyKey, setApplyKey] = useState(0);

  const formRef = useRef<HTMLDivElement>(null);

  const occasion =
    occasions.find((o) => o.value === occasionValue) ?? occasions[0];

  const tableSplit = useMemo(
    () =>
      groupSize <= 25
        ? `One table of ${groupSize}`
        : `Two tables of ~${Math.ceil(groupSize / 2)}`,
    [groupSize]
  );

  const recommendation = `${groupSize} people · ${occasion.label} · ${location} → ${tableSplit} · ${occasion.duration} · ${occasion.format}`;

  const prefill = {
    groupSize: String(groupSize),
    city: location,
    format: occasion.format,
  };

  function handleApply() {
    setApplyKey((k) => k + 1);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  return (
    <section id="enquire" className="scroll-mt-24 bg-off-white py-20 md:py-28">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Let&rsquo;s get your team in a room
          </h2>
          <p className="mt-4 text-lg text-grey-mid">
            Tell us a little about your team and we&rsquo;ll come back within one
            working day with dates and a quote.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8">
          <EventConfigurator
            groupSize={groupSize}
            occasionValue={occasionValue}
            location={location}
            onGroupSize={setGroupSize}
            onOccasion={setOccasionValue}
            onLocation={setLocation}
            tableSplit={tableSplit}
            formatLabel={occasion.format}
            duration={occasion.duration}
            onApply={handleApply}
          />
          <div ref={formRef} className="scroll-mt-24">
            <CorporateEnquiryForm
              prefill={prefill}
              recommendation={recommendation}
              applyKey={applyKey}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
