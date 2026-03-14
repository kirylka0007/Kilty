"use client";

import { useState } from "react";
import Link from "next/link";
import type { EventWithAvailability, RegistrationFormData } from "@/types";
import { validateRegistration, hasErrors } from "@/lib/validators";
import type { ValidationErrors } from "@/lib/validators";
import { createRegistration } from "@/actions/registration";

interface RegistrationFormProps {
  event: EventWithAvailability;
  onBack: () => void;
}

export default function RegistrationForm({
  event,
  onBack,
}: RegistrationFormProps) {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: "",
    email: "",
    telegram: "",
    instagram: "",
    telephone: "",
    ticketQuantity: 1,
    guestNames: [],
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [guestErrors, setGuestErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);

  function handleChange(field: keyof RegistrationFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof ValidationErrors];
        return next;
      });
    }
  }

  function handleQuantityChange(delta: number) {
    setFormData((prev) => {
      const next = Math.min(4, Math.max(1, prev.ticketQuantity + delta));
      const guests = prev.guestNames.slice(0, next - 1);
      while (guests.length < next - 1) guests.push("");
      return { ...prev, ticketQuantity: next, guestNames: guests };
    });
    setGuestErrors([]);
  }

  function handleGuestChange(index: number, value: string) {
    setFormData((prev) => {
      const guests = [...prev.guestNames];
      guests[index] = value;
      return { ...prev, guestNames: guests };
    });
    setGuestErrors((prev) => {
      const next = [...prev];
      next[index] = "";
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    if (!termsAccepted) {
      setTermsError(true);
      return;
    }

    const validationErrors = validateRegistration(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    // Validate guest names
    const newGuestErrors = formData.guestNames.map((name) =>
      name.trim() === "" ? "Guest name is required" : ""
    );
    if (newGuestErrors.some((e) => e !== "")) {
      setGuestErrors(newGuestErrors);
      return;
    }

    setSubmitting(true);
    try {
      const result = await createRegistration(event.id, formData);
      if (result.success && result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        setServerError(result.error || "Something went wrong.");
        setSubmitting(false);
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  const eventDate = new Date(event.date + "T00:00:00").toLocaleDateString(
    "en-GB",
    { weekday: "long", day: "numeric", month: "long" }
  );

  const totalPrice = (event.pricePence * formData.ticketQuantity) / 100;

  return (
    <div>
      {/* Event summary */}
      <div className="mb-6 rounded-xl border border-grey-light bg-off-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-heading font-semibold text-black">
              {event.city} &middot; {eventDate}
            </p>
            <p className="mt-0.5 text-sm text-grey-dark">
              {event.time.slice(0, 5)} &middot; {event.venue}
            </p>
          </div>
          <p className="font-heading text-lg font-bold text-black">
            &pound;{(event.pricePence / 100).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Ticket quantity stepper */}
      <div className="mb-6">
        <label className="mb-1.5 block text-sm font-semibold text-black">
          Number of Tickets
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-xl border border-grey-light bg-white">
            <button
              type="button"
              onClick={() => handleQuantityChange(-1)}
              disabled={formData.ticketQuantity <= 1}
              className="flex h-11 w-11 items-center justify-center rounded-l-xl text-lg font-semibold text-black transition-colors hover:bg-off-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              −
            </button>
            <span className="w-10 text-center text-sm font-semibold text-black">
              {formData.ticketQuantity}
            </span>
            <button
              type="button"
              onClick={() => handleQuantityChange(1)}
              disabled={formData.ticketQuantity >= 4}
              className="flex h-11 w-11 items-center justify-center rounded-r-xl text-lg font-semibold text-black transition-colors hover:bg-off-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              +
            </button>
          </div>
          <p className="text-sm text-grey-mid">Max 4 tickets per booking</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          {/* Full Name */}
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
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-grey-mid focus:border-black focus:ring-1 focus:ring-black ${
                errors.fullName ? "border-red-400" : "border-grey-light"
              }`}
              placeholder="Your full name"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Guest Name fields */}
          {formData.ticketQuantity > 1 &&
            Array.from({ length: formData.ticketQuantity - 1 }, (_, i) => (
              <div key={i}>
                <label
                  htmlFor={`guest-${i}`}
                  className="mb-1.5 block text-sm font-semibold text-black"
                >
                  Guest {i + 2} Name <span className="text-red-500">*</span>
                </label>
                <input
                  id={`guest-${i}`}
                  type="text"
                  value={formData.guestNames[i] ?? ""}
                  onChange={(e) => handleGuestChange(i, e.target.value)}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-grey-mid focus:border-black focus:ring-1 focus:ring-black ${
                    guestErrors[i] ? "border-red-400" : "border-grey-light"
                  }`}
                  placeholder={`Guest ${i + 2} full name`}
                />
                {guestErrors[i] && (
                  <p className="mt-1 text-xs text-red-500">{guestErrors[i]}</p>
                )}
              </div>
            ))}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold text-black"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-grey-mid focus:border-black focus:ring-1 focus:ring-black ${
                errors.email ? "border-red-400" : "border-grey-light"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Telegram */}
          <div>
            <label
              htmlFor="telegram"
              className="mb-1.5 block text-sm font-semibold text-grey-dark"
            >
              Telegram Username
            </label>
            <input
              id="telegram"
              type="text"
              value={formData.telegram}
              onChange={(e) => handleChange("telegram", e.target.value)}
              className="w-full rounded-xl border border-grey-light bg-white px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-grey-mid focus:border-black focus:ring-1 focus:ring-black"
              placeholder="@username"
            />
          </div>

          {/* Instagram */}
          <div>
            <label
              htmlFor="instagram"
              className="mb-1.5 block text-sm font-semibold text-grey-dark"
            >
              Instagram
            </label>
            <input
              id="instagram"
              type="text"
              value={formData.instagram}
              onChange={(e) => handleChange("instagram", e.target.value)}
              className="w-full rounded-xl border border-grey-light bg-white px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-grey-mid focus:border-black focus:ring-1 focus:ring-black"
              placeholder="@handle"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="telephone"
              className="mb-1.5 block text-sm font-semibold text-grey-dark"
            >
              Phone Number
            </label>
            <input
              id="telephone"
              type="tel"
              value={formData.telephone}
              onChange={(e) => handleChange("telephone", e.target.value)}
              className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-grey-mid focus:border-black focus:ring-1 focus:ring-black ${
                errors.telephone ? "border-red-400" : "border-grey-light"
              }`}
              placeholder="+44 7xxx xxx xxx"
            />
            {errors.telephone && (
              <p className="mt-1 text-xs text-red-500">{errors.telephone}</p>
            )}
          </div>
        </div>

        {/* T&Cs checkbox */}
        <div className="mt-5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                if (e.target.checked) setTermsError(false);
              }}
              className="mt-0.5 h-4 w-4 shrink-0 accent-black"
            />
            <span className="text-sm text-grey-dark">
              I have read and agree to the{" "}
              <Link
                href="/terms"
                target="_blank"
                className="font-semibold text-black underline underline-offset-2 hover:opacity-70"
              >
                Terms &amp; Conditions
              </Link>
            </span>
          </label>
          {termsError && (
            <p className="mt-1.5 text-xs text-red-500">
              You must accept the Terms &amp; Conditions to continue.
            </p>
          )}
        </div>

        {serverError && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-xl bg-transparent px-6 py-3 text-sm font-semibold text-grey-dark ring-2 ring-grey-light transition-all duration-200 hover:bg-off-white hover:text-black"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white hover:text-black hover:ring-2 hover:ring-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? (
              <>
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    fill="currentColor"
                    className="opacity-75"
                  />
                </svg>
                Processing...
              </>
            ) : (
              `Pay £${totalPrice.toFixed(2)}${formData.ticketQuantity > 1 ? ` (${formData.ticketQuantity} tickets)` : ""}`
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
