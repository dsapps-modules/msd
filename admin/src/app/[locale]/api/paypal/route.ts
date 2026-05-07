import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { integrationConfigurationErrorResponse } from "@/lib/server/integration-error";

const PAYPAL_API = "https://api-m.sandbox.paypal.com";

export async function POST(req: NextRequest) {
  const { orderId } = await req.json();
  const paypalClient = process.env.PAYPAL_CLIENT_ID;
  const paypalSecret = process.env.PAYPAL_SECRET;

  try {
    if (!paypalClient || !paypalSecret) {
      throw new Error("PAYPAL is not configured.");
    }

    const authResponse = await axios.post(
      `${PAYPAL_API}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        auth: {
          username: paypalClient,
          password: paypalSecret,
        },
      }
    );

    const accessToken = authResponse.data.access_token;
    const orderResponse = await axios.get(
      `${PAYPAL_API}/v2/checkout/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json(orderResponse.data);
  } catch (error) {
    if (error instanceof Error && error.message === "PAYPAL is not configured.") {
      return integrationConfigurationErrorResponse("PayPal");
    }

   
    return NextResponse.json({ error: "Payment validation failed" }, { status: 500 });
  }
}
