"use client";

import { useEffect, useRef, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";

interface DateRangeFieldProps {
  id?: string;
  /** Formatted string stored in the form (e.g. "12 Aug – 20 Aug 2026"). */
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

function fmt(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatRange(range: DateRange | undefined): string {
  if (!range?.from) return "";
  if (!range.to) return fmt(range.from);
  return `${fmt(range.from)} – ${fmt(range.to)}`;
}

export default function DateRangeField({
  id,
  value,
  onChange,
  className = "",
}: DateRangeFieldProps) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function handleSelect(next: DateRange | undefined) {
    setRange(next);
    onChange(formatRange(next));
  }

  function clear() {
    setRange(undefined);
    onChange("");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="relative" ref={wrapRef}>
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 text-left ${className}`}
      >
        <span className={value ? "text-black" : "text-grey-mid"}>
          {value || "Select dates"}
        </span>
        <svg
          className="h-4 w-4 shrink-0 text-grey-mid"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          className="absolute left-0 z-30 mt-2 rounded-2xl border border-grey-light bg-white p-3 shadow-xl"
          style={
            {
              "--rdp-accent-color": "#0A0A0A",
              "--rdp-accent-background-color": "#0A0A0A",
              "--rdp-range_middle-background-color": "#F5F5F7",
              "--rdp-range_middle-color": "#0A0A0A",
              "--rdp-today-color": "#0A0A0A",
            } as React.CSSProperties
          }
        >
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleSelect}
            numberOfMonths={1}
            disabled={{ before: today }}
            startMonth={today}
          />
          <div className="flex items-center justify-between border-t border-grey-light px-1 pt-2">
            <button
              type="button"
              onClick={clear}
              className="text-xs font-semibold text-grey-mid transition-colors hover:text-black"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-black px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-grey-dark"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
