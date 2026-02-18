interface SpotsBadgeProps {
  spotsRemaining: number;
  totalSpots: number;
}

export default function SpotsBadge({
  spotsRemaining,
  totalSpots,
}: SpotsBadgeProps) {
  if (spotsRemaining <= 0) {
    return (
      <span className="inline-block rounded-lg bg-grey-dark px-3 py-1 text-xs font-semibold text-white">
        Sold out
      </span>
    );
  }

  const isLow = spotsRemaining <= Math.ceil(totalSpots * 0.25);

  return (
    <span
      className={`inline-block rounded-lg px-3 py-1 text-xs font-semibold ${
        isLow
          ? "bg-amber-100 text-amber-800"
          : "bg-emerald-100 text-emerald-800"
      }`}
    >
      {spotsRemaining} {spotsRemaining === 1 ? "spot" : "spots"} left
    </span>
  );
}
