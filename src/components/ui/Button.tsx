import Link from "next/link";

type Variant = "primary" | "primary-on-dark" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  onClick?: never;
  type?: never;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-black text-white hover:bg-white hover:text-black hover:ring-2 hover:ring-black",
  "primary-on-dark":
    "bg-white text-black shadow-lg shadow-black/25 ring-2 ring-white/20 hover:bg-transparent hover:text-white hover:ring-2 hover:ring-white hover:shadow-none",
  ghost:
    "bg-transparent ring-2 ring-white text-white hover:bg-white hover:text-black",
};

/* Generous padding so text is not wrapped too closely */
const sizeStyles: Record<Size, string> = {
  sm: "px-6 py-3.5 text-sm",
  md: "px-8 py-4.5 text-sm",
  lg: "px-12 py-6 text-base min-h-[60px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { onClick, type = "button" } = props as ButtonAsButton;
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
