"use client";

import { occasions, locations, dateWindows } from "@/data/corporate";

interface EventConfiguratorProps {
  groupSize: number;
  occasionValue: string;
  location: string;
  dateWindow: string;
  onGroupSize: (value: number) => void;
  onOccasion: (value: string) => void;
  onLocation: (value: string) => void;
  onDateWindow: (value: string) => void;
  /** Pre-computed recommendation lines from the wrapper. */
  tableSplit: string;
  formatLabel: string;
  duration: string;
  onApply: () => void;
}

function Segmented({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-brass">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={active}
              className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-white text-black"
                  : "bg-white/5 text-grey-light ring-1 ring-white/15 hover:bg-white/10 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function EventConfigurator({
  groupSize,
  occasionValue,
  location,
  dateWindow,
  onGroupSize,
  onOccasion,
  onLocation,
  onDateWindow,
  tableSplit,
  formatLabel,
  duration,
  onApply,
}: EventConfiguratorProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-charcoal p-7 sm:p-9">
      <p className="font-mono text-xs uppercase tracking-widest text-brass">
        — Build your event
      </p>
      <h3 className="mt-3 font-heading text-2xl font-bold text-white">
        Shape it to your team
      </h3>
      <p className="mt-2 text-sm text-grey-light">
        Set the basics and we&rsquo;ll suggest a format. No price, no commitment —
        it just pre-fills the enquiry.
      </p>

      <div className="mt-8 space-y-7">
        {/* Group size slider */}
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-brass">
              Group size
            </span>
            <span className="font-heading text-lg font-bold text-white">
              {groupSize}
              <span className="ml-1 text-sm font-normal text-grey-mid">
                {groupSize >= 50 ? "+" : ""} people
              </span>
            </span>
          </div>
          <input
            type="range"
            min={12}
            max={50}
            step={1}
            value={groupSize}
            onChange={(e) => onGroupSize(Number(e.target.value))}
            aria-label="Group size"
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15"
            style={{ accentColor: "#C9A24B" }}
          />
          <div className="mt-1 flex justify-between font-mono text-[11px] text-grey-mid">
            <span>12</span>
            <span>50</span>
          </div>
        </div>

        <Segmented
          label="Occasion"
          value={occasionValue}
          options={occasions.map((o) => ({ value: o.value, label: o.label }))}
          onChange={onOccasion}
        />

        <Segmented
          label="Location"
          value={location}
          options={locations.map((l) => ({ value: l, label: l }))}
          onChange={onLocation}
        />

        <Segmented
          label="When"
          value={dateWindow}
          options={dateWindows.map((d) => ({ value: d, label: d }))}
          onChange={onDateWindow}
        />
      </div>

      {/* Recommendation card */}
      <div className="mt-8 rounded-xl border border-brass/40 bg-black p-5">
        <p className="font-mono text-xs uppercase tracking-widest text-brass">
          — Our recommendation
        </p>
        <p className="mt-3 font-heading text-lg font-bold leading-snug text-white">
          {tableSplit}
        </p>
        <p className="mt-1.5 text-sm text-grey-light">
          {formatLabel} · {duration} · {location}
        </p>
        <button
          type="button"
          onClick={onApply}
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-brass px-6 py-3.5 text-sm font-semibold text-black transition-all duration-200 hover:bg-white"
        >
          Request a quote for this →
        </button>
      </div>
    </div>
  );
}
