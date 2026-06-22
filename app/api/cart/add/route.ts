import { NextRequest, NextResponse } from "next/server";

const WC_BASE = process.env.WC_BASE_URL ?? "https://sacred-snuff.com/wp-json/wc/store/v1";

// POST /api/cart/add  body: { id, quantity, variation_id? }
export async function POST(req: NextRequest) {
  const body = await req.json();
  const cookie = req.headers.get("cookie") ?? "";

  const res = await fetch(`${WC_BASE}/cart/add-item`, {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const data = await res.json();
  const response = NextResponse.json(data, { status: res.status });

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) response.headers.set("set-cookie", setCookie);

  return response;
}
