interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  dark = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-16 text-center md:mb-20 ${className}`}>
      <h2
        className={`font-heading text-3xl font-bold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg ${
            dark ? "text-grey-light" : "text-grey-mid"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
