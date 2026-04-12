"use server";

import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";
import { validateRegistration, hasErrors } from "@/lib/validators";
import type { RegistrationFormData } from "@/types";
import type { DbEventAvailability } from "@/types/database";

interface RegistrationResult {
  success: boolean;
  checkoutUrl?: string;
  error?: string;
}

export async function createRegistration(
  eventId: string,
  formData: RegistrationFormData
): Promise<RegistrationResult> {
  // Server-side validation
  const errors = validateRegistration(formData);
  if (hasErrors(errors)) {
    return { success: false, error: "Please fix the form errors and try again." };
  }

  const email = formData.email.trim().toLowerCase();

  // Fetch event details and check availability
  const { data, error: eventError } = await getSupabaseAdmin()
    .from("event_availability")
    .select("*")
    .eq("id", eventId)
    .single();

  if (eventError || !data) {
    return { success: false, error: "Event not found." };
  }

  const event = data as unknown as DbEventAvailability;

  const ticketQuantity = formData.ticketQuantity ?? 1;

  if (event.spots_remaining < ticketQuantity) {
    return {
      success: false,
      error:
        ticketQuantity > 1
          ? `Sorry, there are not enough spots remaining for ${ticketQuantity} tickets.`
          : "Sorry, this event is sold out.",
    };
  }

  // Check for duplicate registration (only paid registrations exist now)
  const { data: existing } = await getSupabaseAdmin()
    .from("registrations")
    .select("id")
    .eq("event_id", eventId)
    .eq("email", email)
    .eq("payment_status", "paid")
    .maybeSingle();

  if (existing) {
    return {
      success: false,
      error: "You're already registered for this event.",
    };
  }

  // Create Stripe Checkout session
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const priceInPence = event.price_pence as number;
  const eventDate = new Date(event.date as string).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "gbp",
          unit_amount: priceInPence,
          product_data: {
            name: `Mafia Kilty — ${event.city}`,
            description: `${eventDate} at ${event.venue}`,
          },
        },
        quantity: ticketQuantity,
      },
    ],
    customer_email: email,
    success_url: `${baseUrl}/signup/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/signup?cancelled=true`,
    metadata: {
      event_id: eventId,
      full_name: formData.fullName.trim(),
      email,
      telegram: formData.telegram.trim() || "",
      instagram: formData.instagram.trim() || "",
      telephone: formData.telephone.trim() || "",
      ticket_quantity: String(ticketQuantity),
      guest_names: JSON.stringify(formData.guestNames ?? []),
    },
  });

  return { success: true, checkoutUrl: session.url! };
}
