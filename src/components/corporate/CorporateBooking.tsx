"use client";

import { useState, useRef, useMemo } from "react";
import Container from "@/components/layout/Container";
import EventConfigurator from "./EventConfigurator";
import CorporateEnquiryForm from "./CorporateEnquiryForm";
import { occasions, locations, dateWindows } from "@/data/corporate";

export default function CorporateBooking() {
  const [groupSize, setGroupSize] = useState(24);
  const [occasionValue, setOccasionValue] = useState(occasions[0].value);
  const [location, setLocation] = useState(locations[0]);
  const [dateWindow, setDateWindow] = useState(dateWindows[3]);
  const [applyKey, setApplyKey] = useState(0);

  const formRef = useRef<HTMLDivElement>(null);

  const occasion =
    occasions.find((o) => o.value === occasionValue) ?? occasions[0];

  const tableSplit = useMemo(
    () =>
      groupSize <= 25
        ? `One table of ${groupSize}`
        : `Two parallel tables of ~${Math.ceil(groupSize / 2)}`,
    [groupSize]
  );

  const recommendation = `${groupSize} people · ${occasion.label} · ${location} → ${tableSplit} · ${occasion.duration} · ${occasion.format}`;

  const prefill = {
    groupSize: String(groupSize),
    city: location,
    format: occasion.format,
    preferredDate: dateWindow,
  };

  function handleApply() {
    setApplyKey((k) => k + 1);
    // Let the prefill propagate, then scroll the form into view.
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  return (
    <section id="enquire" className="scroll-mt-24 bg-black py-16 md:py-24">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-brass">
            — Get a quote
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Build it, then send it over
          </h2>
          <p className="mt-4 text-lg text-grey-light">
            Configure a rough shape for your event, then tell us about your team.
            We&rsquo;ll come back within one working day with dates and a firm
            quote.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <EventConfigurator
            groupSize={groupSize}
            occasionValue={occasionValue}
            location={location}
            dateWindow={dateWindow}
            onGroupSize={setGroupSize}
            onOccasion={setOccasionValue}
            onLocation={setLocation}
            onDateWindow={setDateWindow}
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
