"use client";

import { useState, useEffect } from "react";
import {
  validateCorporateEnquiry,
  hasCorporateErrors,
} from "@/lib/validators";
import type { CorporateValidationErrors } from "@/lib/validators";
import { submitCorporateEnquiry } from "@/actions/corporate";
import { formats, locations } from "@/data/corporate";
import type { CorporateEnquiryFormData } from "@/types";
import DateRangeField from "./DateRangeField";

interface CorporateEnquiryFormProps {
  /** Configurator-derived values copied into the form. */
  prefill: {
    groupSize: string;
    city: string;
    format: string;
  };
  /** Human-readable recommendation passed to the server action / emails. */
  recommendation: string;
  /** Increments when the user clicks "Request a quote for this" — re-syncs prefill. */
  applyKey: number;
}

const inputClass =
  "w-full rounded-xl border border-grey-light bg-white px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-grey-mid focus:border-black focus:ring-1 focus:ring-black";

const labelClass = "mb-1.5 block text-sm font-semibold text-black";
const optionalLabelClass = "mb-1.5 block text-sm font-semibold text-grey-dark";

export default function CorporateEnquiryForm({
  prefill,
  recommendation,
  applyKey,
}: CorporateEnquiryFormProps) {
  const [formData, setFormData] = useState<CorporateEnquiryFormData>({
    name: "",
    company: "",
    workEmail: "",
    role: "",
    groupSize: prefill.groupSize,
    city: prefill.city,
    format: prefill.format,
    preferredDate: "",
    budget: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<CorporateValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Re-sync the configurator-derived fields when the user applies a config.
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      groupSize: prefill.groupSize,
      city: prefill.city,
      format: prefill.format,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyKey]);

  function handleChange(field: keyof CorporateEnquiryFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof CorporateValidationErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof CorporateValidationErrors];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const validationErrors = validateCorporateEnquiry(formData);
    if (hasCorporateErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitCorporateEnquiry(formData, recommendation);
      if (result.success) {
        setSubmitted(true);
      } else {
        setServerError(result.error || "Something went wrong.");
        setSubmitting(false);
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-white p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black">
          <svg
            className="h-7 w-7 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-6 font-heading text-2xl font-bold text-black">
          Enquiry sent
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-grey-dark">
          Thanks, we&rsquo;ve got it. We&rsquo;ll come back to you within one
          working day with dates and a quote. Keep an eye on your inbox for a
          confirmation email.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-7 sm:p-9">
      <h3 className="font-heading text-2xl font-bold text-black">
        Tell us about your team
      </h3>
      <p className="mt-2 text-sm text-grey-mid">
        Send the form and we&rsquo;ll reply within one working day with dates and
        a firm quote.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-7">
        {/* Honeypot — visually hidden, must stay empty */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>
                Your name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`${inputClass} ${errors.name ? "border-red-400" : ""}`}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="company" className={labelClass}>
                Company <span className="text-red-500">*</span>
              </label>
              <input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                className={`${inputClass} ${
                  errors.company ? "border-red-400" : ""
                }`}
                placeholder="Company name"
              />
              {errors.company && (
                <p className="mt-1 text-xs text-red-500">{errors.company}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="workEmail" className={labelClass}>
                Work email <span className="text-red-500">*</span>
              </label>
              <input
                id="workEmail"
                type="email"
                value={formData.workEmail}
                onChange={(e) => handleChange("workEmail", e.target.value)}
                className={`${inputClass} ${
                  errors.workEmail ? "border-red-400" : ""
                }`}
                placeholder="you@company.com"
              />
              {errors.workEmail && (
                <p className="mt-1 text-xs text-red-500">{errors.workEmail}</p>
              )}
            </div>
            <div>
              <label htmlFor="role" className={optionalLabelClass}>
                Your role
              </label>
              <input
                id="role"
                type="text"
                value={formData.role}
                onChange={(e) => handleChange("role", e.target.value)}
                className={inputClass}
                placeholder="e.g. People & Culture"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="groupSize" className={optionalLabelClass}>
                Group size
              </label>
              <input
                id="groupSize"
                type="number"
                min={1}
                value={formData.groupSize}
                onChange={(e) => handleChange("groupSize", e.target.value)}
                className={inputClass}
                placeholder="e.g. 30"
              />
            </div>
            <div>
              <label htmlFor="city" className={optionalLabelClass}>
                City / location
              </label>
              <select
                id="city"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className={inputClass}
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="format" className={optionalLabelClass}>
                Preferred format
              </label>
              <select
                id="format"
                value={formData.format}
                onChange={(e) => handleChange("format", e.target.value)}
                className={inputClass}
              >
                <option value="">Not sure yet</option>
                {formats.map((f) => (
                  <option key={f.title} value={f.title}>
                    {f.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="preferredDate" className={optionalLabelClass}>
                Preferred date / window
              </label>
              <DateRangeField
                id="preferredDate"
                value={formData.preferredDate}
                onChange={(v) => handleChange("preferredDate", v)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="budget" className={optionalLabelClass}>
              Rough budget <span className="text-grey-mid">(optional)</span>
            </label>
            <input
              id="budget"
              type="text"
              value={formData.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
              className={inputClass}
              placeholder="Helps us tailor the proposal"
            />
          </div>

          <div>
            <label htmlFor="message" className={optionalLabelClass}>
              Anything else?
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={`${inputClass} resize-y`}
              placeholder="Tell us about the occasion, the team, or any questions."
            />
          </div>
        </div>

        {serverError && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-white hover:text-black hover:ring-2 hover:ring-black disabled:cursor-not-allowed disabled:opacity-50"
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
              Sending...
            </>
          ) : (
            "Request a quote"
          )}
        </button>
        <p className="mt-3 text-center text-xs text-grey-mid">
          We&rsquo;ll only use your details to respond to this enquiry.
        </p>
      </form>
    </div>
  );
}
