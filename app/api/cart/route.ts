import { NextRequest, NextResponse } from "next/server";

const WC_BASE = process.env.WC_BASE_URL ?? "https://sacred-snuff.com/wp-json/wc/store/v1";

// GET /api/cart → retorna o carrinho atual
export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie") ?? "";
  const res = await fetch(`${WC_BASE}/cart`, {
    headers: { cookie },
    credentials: "include",
  });
  const data = await res.json();
  const response = NextResponse.json(data);

  // Repassa cookies de sessão do WooCommerce para o browser
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) response.headers.set("set-cookie", setCookie);

  return response;
}
