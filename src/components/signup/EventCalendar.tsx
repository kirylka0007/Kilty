"use client";

import { useState, useMemo } from "react";
import type { EventWithAvailability } from "@/types";
import SpotsBadge from "./SpotsBadge";

interface EventCalendarProps {
  events: EventWithAvailability[];
  onSelectEvent: (event: EventWithAvailability) => void;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getMonthData(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  // getDay() returns 0=Sun, convert to 0=Mon
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();
  return { startOffset, daysInMonth };
}

function formatMonthYear(year: number, month: number) {
  return new Date(year, month, 1).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

function toDateString(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function EventCalendar({
  events,
  onSelectEvent,
}: EventCalendarProps) {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventWithAvailability>();
    for (const event of events) {
      map.set(event.date, event);
    }
    return map;
  }, [events]);

  const { startOffset, daysInMonth } = getMonthData(viewYear, viewMonth);

  const selectedEvent = selectedDate ? eventsByDate.get(selectedDate) : null;

  function handlePrevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
    setSelectedDate(null);
  }

  function handleNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
    setSelectedDate(null);
  }

  function handleDayClick(dateStr: string) {
    if (eventsByDate.has(dateStr)) {
      setSelectedDate(dateStr === selectedDate ? null : dateStr);
    }
  }

  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  return (
    <div>
      {/* Month navigation */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="rounded-lg p-2 text-grey-dark transition-colors hover:bg-off-white hover:text-black"
          aria-label="Previous month"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h3 className="font-heading text-lg font-semibold text-black">
          {formatMonthYear(viewYear, viewMonth)}
        </h3>
        <button
          type="button"
          onClick={handleNextMonth}
          className="rounded-lg p-2 text-grey-dark transition-colors hover:bg-off-white hover:text-black"
          aria-label="Next month"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="mb-1 grid grid-cols-7 text-center">
        {DAYS.map((day) => (
          <div key={day} className="py-2 text-xs font-semibold text-grey-mid">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {/* Empty cells for offset */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = toDateString(viewYear, viewMonth, day);
          const hasEvent = eventsByDate.has(dateStr);
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === todayStr;
          const isPast = dateStr < todayStr;

          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDayClick(dateStr)}
              disabled={!hasEvent || isPast}
              className={`relative mx-auto flex aspect-square w-full max-w-[44px] items-center justify-center rounded-xl text-sm transition-all duration-150 ${
                isSelected
                  ? "bg-black font-semibold text-white"
                  : hasEvent && !isPast
                    ? "cursor-pointer font-semibold text-black hover:bg-off-white"
                    : isPast
                      ? "text-grey-light"
                      : "text-grey-mid"
              } ${isToday && !isSelected ? "ring-2 ring-grey-light" : ""}`}
            >
              {day}
              {hasEvent && !isPast && (
                <span
                  className={`absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${
                    isSelected ? "bg-white" : "bg-black"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Event detail panel */}
      {selectedEvent && (
        <div className="mt-6 rounded-2xl border border-grey-light bg-off-white p-5">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <p className="font-heading text-lg font-semibold text-black">
                {new Date(selectedEvent.date + "T00:00:00").toLocaleDateString(
                  "en-GB",
                  { weekday: "long", day: "numeric", month: "long" }
                )}
              </p>
              <p className="mt-0.5 text-sm text-grey-dark">
                {selectedEvent.time.slice(0, 5)} &middot;{" "}
                {selectedEvent.venue}
              </p>
            </div>
            <SpotsBadge
              spotsRemaining={selectedEvent.spotsRemaining}
              totalSpots={selectedEvent.totalSpots}
            />
          </div>

          {selectedEvent.description && (
            <p className="mb-4 text-sm leading-relaxed text-grey-dark">
              {selectedEvent.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <p className="font-heading text-xl font-bold text-black">
              &pound;{(selectedEvent.pricePence / 100).toFixed(2)}
            </p>
            <button
              type="button"
              onClick={() => onSelectEvent(selectedEvent)}
              disabled={selectedEvent.spotsRemaining <= 0}
              className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white hover:text-black hover:ring-2 hover:ring-black disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-white disabled:hover:ring-0"
            >
              Book This Date
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
