interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

/** Dossier-style mono label used above corporate section headings. */
export default function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`font-mono text-xs uppercase tracking-widest text-brass ${className}`}
    >
      — {children}
    </p>
  );
}
