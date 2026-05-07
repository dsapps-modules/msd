import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { integrationConfigurationErrorResponse } from "@/lib/server/integration-error";

function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("RAZORPAY is not configured.");
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

export async function POST(req: Request) {
  try {
    const razorpay = getRazorpayClient();
    const { amount, currency, receipt } = await req.json();

    const options = {
      amount: amount * 100,
      currency: currency || "INR",
      receipt: receipt || `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error) {
    if (error instanceof Error && error.message === "RAZORPAY is not configured.") {
      return integrationConfigurationErrorResponse("Razorpay");
    }

    return NextResponse.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
