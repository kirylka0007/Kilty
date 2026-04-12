import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendConfirmationEmail } from "@/lib/email";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const meta = session.metadata || {};
      const ticketQuantity = parseInt(meta.ticket_quantity || "1", 10);
      const guestNames: string[] = JSON.parse(meta.guest_names || "[]");

      try {
        const { error } = await getSupabaseAdmin().from("registrations").insert({
          event_id: meta.event_id,
          full_name: meta.full_name,
          email: meta.email,
          telegram: meta.telegram || null,
          instagram: meta.instagram || null,
          telephone: meta.telephone || null,
          payment_status: "paid",
          stripe_session_id: session.id,
          ticket_quantity: ticketQuantity,
          guest_names: guestNames.length > 0 ? guestNames : null,
        });

        if (error) {
          if (error.code === "23505") {
            console.log("Duplicate webhook event, already processed:", session.id);
          } else {
            console.error("Supabase insert error:", error);
          }
        } else {
          // Fetch event details for the confirmation email
          const { data: eventData } = await getSupabaseAdmin()
            .from("events")
            .select("city, date, time, venue, language, price_pence")
            .eq("id", meta.event_id)
            .single();

          if (eventData) {
            await sendConfirmationEmail({
              to: meta.email,
              fullName: meta.full_name,
              city: eventData.city,
              date: eventData.date,
              time: eventData.time,
              venue: eventData.venue,
              language: eventData.language,
              pricePence: eventData.price_pence,
              ticketQuantity,
              guestNames,
            }).catch((err) => {
              console.error("Failed to send confirmation email:", err);
            });
          }
        }
      } catch (err) {
        console.error("Unexpected error processing webhook:", err);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
