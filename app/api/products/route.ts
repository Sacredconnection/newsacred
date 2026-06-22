import { NextRequest, NextResponse } from "next/server";

const WC_BASE = process.env.WC_BASE_URL ?? "https://sacred-snuff.com/wp-json/wc/store/v1";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.toString();
  const url = `${WC_BASE}/products${search ? `?${search}` : ""}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  const data = await res.json();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
    },
  });
}
