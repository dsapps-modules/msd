import { Routes } from "@/config/routes";
import { NextResponse } from "next/server";
import { getServerStripeClient } from "@/lib/server/stripe";
import { stripeConfigurationErrorResponse } from "@/lib/server/stripe-error";

export async function POST(req: Request) {
  try {
    const stripe = getServerStripeClient();
    const { items } = await req.json();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_ADMIN_FRONT_URL}/${Routes.storeList}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_ADMIN_FRONT_URL}/${Routes.dashboard}`,
    });

    return NextResponse.json({ url: session.url }); 
  } catch (error) {
    if (error instanceof Error && error.message === "STRIPE_SECRET_KEY is not configured.") {
      return stripeConfigurationErrorResponse();
    }

    return NextResponse.json(
      { error: "Failed to create Stripe session" },
      { status: 500 }
    );
  }
}
