import { NextResponse } from "next/server";

export function integrationConfigurationErrorResponse(name: string) {
  return NextResponse.json(
    { error: `${name} is not configured for this environment.` },
    { status: 503 },
  );
}
