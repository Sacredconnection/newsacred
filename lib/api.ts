import type {
  WooProduct,
  WooStoreCategory,
  WooCart,
  ProductsQuery,
} from "@/types/woo";

const BASE_URL = process.env.WC_BASE_URL ?? "https://sacred-snuff.com/wp-json/wc/store/v1";

async function fetchWoo<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`WooCommerce API error: ${res.status} ${path}`);
  return res.json() as Promise<T>;
}

function buildQuery(params: Record<string, string | number | boolean | undefined>): string {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) q.set(k, String(v));
  }
  const s = q.toString();
  return s ? `?${s}` : "";
}

export function formatPrice(amount: string, minorUnit = 2): string {
  return (Number(amount) / Math.pow(10, minorUnit)).toFixed(2);
}

/* ── Products ── */

export async function getProducts(query: ProductsQuery = {}): Promise<WooProduct[]> {
  const qs = buildQuery(query as Record<string, string | number | boolean | undefined>);
  return fetchWoo<WooProduct[]>(`/products${qs}`, { next: { revalidate: 60 } });
}

export async function getProduct(id: number): Promise<WooProduct> {
  return fetchWoo<WooProduct>(`/products/${id}`, { next: { revalidate: 30 } });
}

export async function getProductBySlug(slug: string): Promise<WooProduct | null> {
  const products = await fetchWoo<WooProduct[]>(
    `/products?slug=${encodeURIComponent(slug)}&per_page=1`,
    { next: { revalidate: 30 } }
  );
  return products[0] ?? null;
}

/* ── Categories ── */

export async function getCategories(): Promise<WooStoreCategory[]> {
  return fetchWoo<WooStoreCategory[]>("/products/categories?per_page=100", {
    next: { revalidate: 3600 },
  });
}

/* ── Cart (client-side only — needs cookies/nonce) ── */

export async function getCart(): Promise<WooCart> {
  return fetchWoo<WooCart>("/cart", { credentials: "include" });
}

export async function addToCart(productId: number, quantity = 1, variationId?: number): Promise<WooCart> {
  const body: Record<string, unknown> = { id: productId, quantity };
  if (variationId) body.variation_id = variationId;
  return fetchWoo<WooCart>("/cart/add-item", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(body),
  });
}

export async function removeFromCart(key: string): Promise<WooCart> {
  return fetchWoo<WooCart>(`/cart/remove-item?key=${key}`, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function applyCartCoupon(code: string): Promise<WooCart> {
  return fetchWoo<WooCart>("/cart/apply-coupon", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ code }),
  });
}
