import { NextResponse } from "next/server";
import { getServerStripeClient } from "@/lib/server/stripe";
import { stripeConfigurationErrorResponse } from "@/lib/server/stripe-error";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  try {
    const stripe = getServerStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const transactionId = session.payment_intent;

    return NextResponse.json({ transaction_id: transactionId });
  } catch (error) {
    if (error instanceof Error && error.message === "STRIPE_SECRET_KEY is not configured.") {
      return stripeConfigurationErrorResponse();
    }

    return NextResponse.json(
      { error: "Failed to retrieve payment details" },
      { status: 500 }
    );
  }
}
