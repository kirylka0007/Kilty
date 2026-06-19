"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { occasions, locations } from "@/data/corporate";

interface EventConfiguratorProps {
  groupSize: number;
  occasionValue: string;
  location: string;
  onGroupSize: (value: number) => void;
  onOccasion: (value: string) => void;
  onLocation: (value: string) => void;
  tableSplit: string;
  formatLabel: string;
  duration: string;
  onApply: () => void;
}

function Pills({
  value,
  options,
  onChange,
  label,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <div>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-grey-mid">
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
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-black text-white"
                  : "bg-white text-grey-dark ring-1 ring-grey-light hover:ring-black"
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
  onGroupSize,
  onOccasion,
  onLocation,
  tableSplit,
  formatLabel,
  duration,
  onApply,
}: EventConfiguratorProps) {
  const reduce = useReducedMotion();

  return (
    <div className="rounded-2xl border border-grey-light bg-white p-6 sm:p-7">
      <h3 className="font-heading text-lg font-bold text-black">
        Build a rough shape
      </h3>
      <p className="mt-1 text-sm text-grey-mid">
        Two taps and a drag, and we&rsquo;ll suggest a format and pre-fill the form.
      </p>

      <div className="mt-6 space-y-6">
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-grey-mid">
              Group size
            </span>
            <span className="font-heading text-base font-bold text-black">
              {groupSize}
              {groupSize >= 50 ? "+" : ""} people
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
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-grey-light"
            style={{ accentColor: "#0A0A0A" }}
          />
        </div>

        <Pills
          label="Occasion"
          value={occasionValue}
          options={occasions.map((o) => ({ value: o.value, label: o.label }))}
          onChange={onOccasion}
        />
        <Pills
          label="Location"
          value={location}
          options={locations.map((l) => ({ value: l, label: l }))}
          onChange={onLocation}
        />
      </div>

      {/* Recommendation */}
      <div className="mt-6 rounded-xl bg-black p-5 text-white">
        <span className="text-xs font-semibold uppercase tracking-widest text-brass">
          We&rsquo;d suggest
        </span>
        <AnimatePresence mode="wait">
          <motion.p
            key={`${tableSplit}-${formatLabel}`}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mt-2 font-heading text-base font-bold leading-snug"
          >
            {tableSplit} · {formatLabel} · {duration}
          </motion.p>
        </AnimatePresence>
        <button
          type="button"
          onClick={onApply}
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brass px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-white"
        >
          Use this in the form →
        </button>
      </div>
    </div>
  );
}
