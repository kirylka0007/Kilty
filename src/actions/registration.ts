"use server";

import { supabaseAdmin } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { validateRegistration, hasErrors } from "@/lib/validators";
import type { RegistrationFormData } from "@/types";

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
  const { data: event, error: eventError } = await supabaseAdmin
    .from("event_availability")
    .select("*")
    .eq("id", eventId)
    .single();

  if (eventError || !event) {
    return { success: false, error: "Event not found." };
  }

  if (event.spots_remaining <= 0) {
    return { success: false, error: "Sorry, this event is sold out." };
  }

  // Check for duplicate registration
  const { data: existing } = await supabaseAdmin
    .from("registrations")
    .select("id")
    .eq("event_id", eventId)
    .eq("email", email)
    .in("payment_status", ["pending", "paid"])
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

  const session = await stripe.checkout.sessions.create({
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
        quantity: 1,
      },
    ],
    customer_email: email,
    success_url: `${baseUrl}/signup/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/signup?cancelled=true`,
    metadata: {
      event_id: eventId,
      full_name: formData.fullName.trim(),
      email,
    },
  });

  // Insert registration with pending status
  const { error: insertError } = await supabaseAdmin
    .from("registrations")
    .insert({
      event_id: eventId,
      full_name: formData.fullName.trim(),
      email,
      telegram: formData.telegram.trim() || null,
      instagram: formData.instagram.trim() || null,
      telephone: formData.telephone.trim() || null,
      payment_status: "pending",
      stripe_session_id: session.id,
    });

  if (insertError) {
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true, checkoutUrl: session.url! };
}
