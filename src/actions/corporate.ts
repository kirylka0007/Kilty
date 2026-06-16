"use server";

import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  validateCorporateEnquiry,
  hasCorporateErrors,
} from "@/lib/validators";
import {
  sendCorporateEnquiryNotification,
  sendCorporateEnquiryAutoReply,
} from "@/lib/email";
import type { CorporateEnquiryFormData } from "@/types";

interface CorporateEnquiryResult {
  success: boolean;
  error?: string;
}

/**
 * Handles a corporate enquiry: anti-spam honeypot → validate → insert into
 * Supabase → fire notification + auto-reply emails. Mirrors the registration
 * action pattern. Email failures are logged but never block success.
 *
 * @param recommendation Optional human-readable summary from the configurator.
 */
export async function submitCorporateEnquiry(
  formData: CorporateEnquiryFormData,
  recommendation?: string
): Promise<CorporateEnquiryResult> {
  // Honeypot: bots fill hidden fields. Pretend success, store nothing.
  if (formData.website && formData.website.trim() !== "") {
    return { success: true };
  }

  const errors = validateCorporateEnquiry(formData);
  if (hasCorporateErrors(errors)) {
    return {
      success: false,
      error: "Please fix the form errors and try again.",
    };
  }

  const groupSizeNum = formData.groupSize
    ? parseInt(formData.groupSize, 10)
    : null;

  const row = {
    name: formData.name.trim(),
    company: formData.company.trim(),
    work_email: formData.workEmail.trim().toLowerCase(),
    role: formData.role.trim() || null,
    group_size: Number.isFinite(groupSizeNum) ? groupSizeNum : null,
    city: formData.city.trim() || null,
    format: formData.format.trim() || null,
    preferred_date: formData.preferredDate.trim() || null,
    budget: formData.budget.trim() || null,
    message: formData.message.trim() || null,
  };

  const { error: insertError } = await getSupabaseAdmin()
    .from("corporate_enquiries")
    .insert(row);

  if (insertError) {
    console.error("Corporate enquiry insert failed:", insertError);
    return {
      success: false,
      error: "Something went wrong saving your enquiry. Please try again.",
    };
  }

  // Emails are best-effort — never fail the request if they error.
  const emailParams = {
    name: row.name,
    company: row.company,
    workEmail: row.work_email,
    role: row.role ?? undefined,
    groupSize: formData.groupSize.trim() || undefined,
    city: row.city ?? undefined,
    format: row.format ?? undefined,
    preferredDate: row.preferred_date ?? undefined,
    budget: row.budget ?? undefined,
    message: row.message ?? undefined,
    recommendation,
  };

  try {
    await Promise.allSettled([
      sendCorporateEnquiryNotification(emailParams),
      sendCorporateEnquiryAutoReply(emailParams),
    ]);
  } catch (err) {
    console.error("Corporate enquiry email failed:", err);
  }

  return { success: true };
}
