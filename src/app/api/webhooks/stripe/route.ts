import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/server";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
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

      try {
        const { error } = await supabaseAdmin.from("registrations").insert({
          event_id: meta.event_id,
          full_name: meta.full_name,
          email: meta.email,
          telegram: meta.telegram || null,
          instagram: meta.instagram || null,
          telephone: meta.telephone || null,
          payment_status: "paid",
          stripe_session_id: session.id,
        });

        if (error) {
          if (error.code === "23505") {
            console.log("Duplicate webhook event, already processed:", session.id);
          } else {
            console.error("Supabase insert error:", error);
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
