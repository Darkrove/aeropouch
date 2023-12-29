import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { actionExchangeToken } from "@/lib/server-actions/auth-actions";
import { setCustomer } from "@/store/actions/authenticateActions";

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const token = requestUrl.searchParams.get("token");

  if (token) {
    const response = await actionExchangeToken(token);
    if (response) {
      setCustomer();
    }
    return NextResponse.redirect(`${requestUrl.origin}`);
  }
}
