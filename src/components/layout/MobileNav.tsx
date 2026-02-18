"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/photos", label: "Photos" },
  { href: "/signup", label: "Join the Next Game" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  /* Wait for client mount so createPortal has a target */
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      /* Lock body scroll while menu is open */
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  /* The overlay is portaled to document.body so it sits outside the
     header's stacking context and truly covers the entire viewport. */
  const overlay =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black"
            onClick={close}
            onTouchMove={(e) => e.preventDefault()}
          >
            {/* Close button pinned to top-right */}
            <button
              onClick={close}
              className="absolute right-8 top-4 flex h-10 w-10 items-center justify-center text-white sm:right-12"
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <nav
              className="flex h-full flex-col items-center justify-center gap-10"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="font-heading text-3xl font-bold text-white transition-colors hover:text-grey-light"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>,
          document.body
        )
      : null;

  return (
    <div className="md:hidden">
      {/* Hamburger button in header */}
      <button
        onClick={() => setOpen(!open)}
        className="relative z-[60] flex h-10 w-10 items-center justify-center text-white"
        aria-label="Open menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {overlay}
    </div>
  );
}
