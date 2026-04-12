"use client";

import { useState, useEffect } from "react";
import Container from "@/components/layout/Container";
import { useAuth } from "@/components/auth/AuthProvider";
import { updateProfile } from "@/actions/profile";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { user, profile, isLoading, refreshProfile } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const isNewUser = profile && !profile.fullName;

  useEffect(() => {
    if (profile?.fullName) {
      setFullName(profile.fullName);
    }
  }, [profile]);

  if (isLoading) {
    return (
      <section className="bg-off-white pt-32 pb-20">
        <Container className="max-w-md">
          <p className="text-center text-grey-dark">Loading...</p>
        </Container>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="bg-off-white pt-32 pb-20">
        <Container className="max-w-md">
          <h1 className="font-heading text-3xl font-bold text-black">
            My Account
          </h1>
          <p className="mt-4 text-grey-dark">
            Please sign in using the button in the top navigation to access your
            account.
          </p>
        </Container>
      </section>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setSaving(true);

    const result = await updateProfile(fullName);
    setSaving(false);

    if (result.success) {
      await refreshProfile();
      if (isNewUser) {
        router.push("/signup");
      } else {
        setMessage({ type: "success", text: "Profile updated." });
      }
    } else {
      setMessage({ type: "error", text: result.error || "Something went wrong." });
    }
  }

  return (
    <section className="bg-off-white pt-32 pb-20">
      <Container className="max-w-md">
        <h1 className="font-heading text-3xl font-bold text-black">
          {isNewUser ? "Complete Your Profile" : "My Account"}
        </h1>
        {isNewUser && (
          <p className="mt-2 text-grey-dark">
            Enter your name so we can pre-fill it when you register for events.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold text-grey-dark"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email ?? ""}
              disabled
              className="w-full rounded-xl border border-grey-light bg-grey-light/30 px-4 py-3 text-sm text-grey-dark"
            />
          </div>

          <div>
            <label
              htmlFor="fullName"
              className="mb-1.5 block text-sm font-semibold text-black"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-grey-light bg-white px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-grey-mid focus:border-black focus:ring-1 focus:ring-black"
              placeholder="Your full name"
              required
              minLength={2}
            />
          </div>

          {message && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                message.type === "success"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white hover:text-black hover:ring-2 hover:ring-black disabled:opacity-50"
          >
            {saving ? "Saving..." : isNewUser ? "Save & Continue" : "Save"}
          </button>
        </form>
      </Container>
    </section>
  );
}
