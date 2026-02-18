"use client";

import { useState, useMemo } from "react";
import type { EventWithAvailability } from "@/types";
import CityTabs from "./CityTabs";
import EventCalendar from "./EventCalendar";
import RegistrationForm from "./RegistrationForm";

interface SignupFlowProps {
  events: EventWithAvailability[];
  cancelled?: boolean;
}

type Step = "calendar" | "form";

export default function SignupFlow({ events, cancelled }: SignupFlowProps) {
  const cities = useMemo(() => {
    const set = new Set(events.map((e) => e.city));
    return Array.from(set).sort();
  }, [events]);

  const [activeCity, setActiveCity] = useState<string>(cities[0] || "Edinburgh");
  const [step, setStep] = useState<Step>("calendar");
  const [selectedEvent, setSelectedEvent] =
    useState<EventWithAvailability | null>(null);

  const filteredEvents = useMemo(
    () => events.filter((e) => e.city === activeCity),
    [events, activeCity]
  );

  function handleSelectEvent(event: EventWithAvailability) {
    setSelectedEvent(event);
    setStep("form");
  }

  function handleBack() {
    setStep("calendar");
    setSelectedEvent(null);
  }

  function handleCityChange(city: string) {
    setActiveCity(city);
    setStep("calendar");
    setSelectedEvent(null);
  }

  return (
    <div>
      {cancelled && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Payment was cancelled. You can try again by selecting a date below.
        </div>
      )}

      {step === "calendar" && (
        <>
          <div className="mb-6">
            <CityTabs
              cities={cities}
              activeCity={activeCity}
              onCityChange={handleCityChange}
            />
          </div>

          {filteredEvents.length === 0 ? (
            <div className="rounded-2xl border border-grey-light bg-off-white p-8 text-center">
              <p className="text-grey-dark">
                No upcoming events in {activeCity} yet. Check back soon!
              </p>
            </div>
          ) : (
            <EventCalendar
              events={filteredEvents}
              onSelectEvent={handleSelectEvent}
            />
          )}
        </>
      )}

      {step === "form" && selectedEvent && (
        <RegistrationForm event={selectedEvent} onBack={handleBack} />
      )}
    </div>
  );
}
