"use client";

interface CityTabsProps {
  cities: string[];
  activeCity: string;
  onCityChange: (city: string) => void;
}

export default function CityTabs({
  cities,
  activeCity,
  onCityChange,
}: CityTabsProps) {
  return (
    <div className="flex gap-2">
      {cities.map((city) => (
        <button
          key={city}
          type="button"
          onClick={() => onCityChange(city)}
          className={`rounded-xl px-6 py-3 font-heading text-sm font-semibold transition-all duration-200 ${
            activeCity === city
              ? "bg-black text-white"
              : "bg-off-white text-grey-dark hover:bg-grey-light hover:text-black"
          }`}
        >
          {city}
        </button>
      ))}
    </div>
  );
}
