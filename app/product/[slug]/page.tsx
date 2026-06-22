import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getProducts } from "@/lib/api";
import { formatPrice } from "@/lib/api";
import type { WooProduct } from "@/types/woo";

const WC_BASE = process.env.WC_BASE_URL ?? "https://sacred-snuff.com/wp-json/wc/store/v1";

async function getProductBySlug(slug: string): Promise<WooProduct | null> {
  const res = await fetch(`${WC_BASE}/products?slug=${slug}&per_page=1`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) return null;
  const data: WooProduct[] = await res.json();
  return data[0] ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produto não encontrado" };

  const image = product.images[0];
  return {
    title: `${product.name} — Sacred Connection`,
    description: product.short_description.replace(/<[^>]*>/g, "").slice(0, 160),
    openGraph: {
      title: product.name,
      images: image ? [{ url: image.src, alt: image.alt }] : [],
    },
    alternates: {
      canonical: `https://sacred-snuff.com/product/${slug}/`,
    },
  };
}

export async function generateStaticParams() {
  const products = await getProducts({ per_page: 100 });
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const price = formatPrice(product.prices.price, product.prices.currency_minor_unit);
  const regularPrice = formatPrice(product.prices.regular_price, product.prices.currency_minor_unit);
  const onSale = product.prices.sale_price !== product.prices.regular_price;
  const image = product.images[0];

  return (
    <main className="section" style={{ background: "var(--white)" }}>
      <div className="featured-inner section-inner">
        {/* Imagem */}
        <div className="featured-img" style={{ position: "relative", overflow: "hidden", borderRadius: 8 }}>
          {image ? (
            <Image
              src={image.src}
              alt={image.alt || product.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <span style={{ fontSize: 96 }}>🪴</span>
          )}
        </div>

        {/* Info */}
        <div>
          {product.categories[0] && (
            <p className="section-eyebrow">{product.categories[0].name}</p>
          )}
          <h1 className="section-title"
            dangerouslySetInnerHTML={{ __html: product.name }}
          />

          {product.review_count > 0 && (
            <div className="featured-stars">
              <span className="stars">{"★".repeat(Math.round(Number(product.average_rating)))}</span>
              <span>{product.average_rating} · {product.review_count} avaliações</span>
            </div>
          )}

          <div
            className="featured-desc"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />

          <div className="price-row">
            <span className="price-current">${price}</span>
            {onSale && <span className="price-orig">${regularPrice}</span>}
          </div>

          {/* Variações de peso */}
          {product.attributes.map((attr) => (
            <div key={attr.id} style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "var(--text-mid)" }}>
                {attr.name}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {attr.terms.map((term) => (
                  <button key={term.id} className="btn-size" style={{ width: "auto", padding: "8px 16px" }}>
                    {term.name}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button className="btn-cart">Add to Cart</button>

          <div className="featured-meta">
            {product.is_in_stock ? (
              <span>✓ Em estoque</span>
            ) : (
              <span style={{ color: "var(--brown-light)" }}>✗ Fora de estoque</span>
            )}
            {product.low_stock_remaining && (
              <span>⚡ Apenas {product.low_stock_remaining} restantes</span>
            )}
            <span>🔒 Checkout seguro</span>
          </div>
        </div>
      </div>

      {/* Descrição completa */}
      {product.description && (
        <div className="section-inner" style={{ marginTop: 64, maxWidth: 760 }}>
          <h2 className="section-title" style={{ fontSize: 28, marginBottom: 24 }}>Sobre este produto</h2>
          <div
            style={{ fontSize: 16, lineHeight: 1.85, color: "var(--text-mid)" }}
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      )}
    </main>
  );
}
