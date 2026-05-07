import { NextResponse } from "next/server";

export function stripeConfigurationErrorResponse() {
  return NextResponse.json(
    { error: "Stripe is not configured for this environment." },
    { status: 503 },
  );
}
