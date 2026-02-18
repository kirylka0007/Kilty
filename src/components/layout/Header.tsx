"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/photos", label: "Photos" },
];

/** Pages that have a full-screen dark hero behind the header */
const HERO_PAGES = ["/"];

export default function Header() {
  const pathname = usePathname();
  const hasHero = HERO_PAGES.includes(pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* On pages without a dark hero, always show the dark header background */
  const showDarkBg = scrolled || !hasHero;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showDarkBg
          ? "bg-black/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-8 py-4 sm:px-12 lg:px-16">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpeg"
            alt="Mafia Kilty"
            width={40}
            height={40}
            className="rounded-sm"
            priority
          />
          <span className="font-heading text-lg font-bold tracking-tight text-white">
            Mafia Kilty
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 text-sm font-semibold text-white transition-colors hover:text-white/70"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/signup"
            className="shrink-0 whitespace-nowrap rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-transparent hover:text-white hover:ring-2 hover:ring-white"
          >
            Join the Next Game
          </Link>
        </div>

        <MobileNav />
      </nav>
    </header>
  );
}
