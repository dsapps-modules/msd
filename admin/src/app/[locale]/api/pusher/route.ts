
import { NextResponse } from "next/server";
import Pusher from "pusher";
import { integrationConfigurationErrorResponse } from "@/lib/server/integration-error";

function getPusherClient() {
  const appId = process.env.PUSHER_APP_ID;
  const key = process.env.PUSHER_KEY;
  const secret = process.env.PUSHER_SECRET;
  const cluster = process.env.PUSHER_CLUSTER;

  if (!appId || !key || !secret || !cluster) {
    throw new Error("PUSHER is not configured.");
  }

  return new Pusher({
    appId,
    key,
    secret,
    cluster,
    useTLS: true,
  });
}

export async function POST(request: Request) {
  try {
    const pusher = getPusherClient();
    const { message, sender, channel, file_url, file_type,sender_type, timestamp } = await request.json();
   
   
    if ((!message?.trim() && !file_url) || !sender || !channel) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await pusher.trigger(channel, "new-message", {
      message,
      sender,
      sender_type: sender_type,
      timestamp: timestamp || new Date().toISOString(),
      file_url: file_url ?? null,
      file_type: file_type ?? null,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "PUSHER is not configured.") {
      return integrationConfigurationErrorResponse("Pusher");
    }

    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
