"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { createBrowserSupabase } from "@/lib/supabase/browser";

export default function AuthButton() {
  const { user, profile, isLoading, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (isLoading) {
    return <div className="w-16" />;
  }

  // Logged in state
  if (user) {
    const displayName = profile?.fullName
      ? profile.fullName.split(" ")[0]
      : user.email?.split("@")[0];

    return (
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
            {(displayName ?? "U")[0].toUpperCase()}
          </span>
          {displayName}
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-grey-light bg-white p-2 shadow-lg">
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-black transition-colors hover:bg-off-white"
            >
              My Account
            </Link>
            <button
              type="button"
              onClick={async () => {
                await signOut();
                setOpen(false);
              }}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm text-grey-dark transition-colors hover:bg-off-white hover:text-black"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  // Logged out state
  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-lg px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
      >
        Sign In
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-grey-light bg-white p-5 shadow-lg">
          {sent ? (
            <div>
              <p className="text-sm font-semibold text-black">
                Check your email
              </p>
              <p className="mt-1 text-xs text-grey-dark">
                We sent a magic link to <strong>{email}</strong>. Click the link
                to sign in.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setEmail("");
                  setOpen(false);
                }}
                className="mt-3 text-xs font-semibold text-black underline underline-offset-2"
              >
                Close
              </button>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError("");
                setSending(true);
                const supabase = createBrowserSupabase();
                const { error: authError } = await supabase.auth.signInWithOtp({
                  email: email.trim().toLowerCase(),
                  options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                  },
                });
                setSending(false);
                if (authError) {
                  setError(authError.message);
                } else {
                  setSent(true);
                }
              }}
            >
              <p className="mb-3 text-sm font-semibold text-black">
                Sign in with magic link
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-grey-light bg-white px-3 py-2 text-sm text-black outline-none placeholder:text-grey-mid focus:border-black focus:ring-1 focus:ring-black"
              />
              {error && (
                <p className="mt-1.5 text-xs text-red-500">{error}</p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="mt-3 w-full rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-charcoal disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send magic link"}
              </button>
              <p className="mt-2 text-center text-xs text-grey-mid">
                No account? We&apos;ll create one for you.
              </p>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
