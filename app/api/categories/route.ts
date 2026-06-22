import { NextResponse } from "next/server";

const WC_BASE = process.env.WC_BASE_URL ?? "https://sacred-snuff.com/wp-json/wc/store/v1";

export async function GET() {
  const res = await fetch(`${WC_BASE}/products/categories?per_page=100`, {
    next: { revalidate: 3600 },
  });
  const data = await res.json();

  return NextResponse.json(data, {
    headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" },
  });
}
