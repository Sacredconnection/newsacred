import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { formatPrice } from "@/lib/api";
import type { WooProduct, WooStoreCategory } from "@/types/woo";

const WC_BASE = process.env.WC_BASE_URL ?? "https://sacred-snuff.com/wp-json/wc/store/v1";

async function getCategoryBySlug(slug: string): Promise<WooStoreCategory | null> {
  const res = await fetch(`${WC_BASE}/products/categories?slug=${slug}&per_page=1`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const data: WooStoreCategory[] = await res.json();
  return data[0] ?? null;
}

async function getProductsByCategory(categoryId: number, page = 1): Promise<WooProduct[]> {
  const res = await fetch(
    `${WC_BASE}/products?category=${categoryId}&per_page=24&page=${page}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const leafSlug = slug[slug.length - 1];
  const category = await getCategoryBySlug(leafSlug);
  if (!category) return { title: "Categoria não encontrada" };

  return {
    title: `${category.name} — Sacred Connection`,
    description: category.description.replace(/<[^>]*>/g, "").slice(0, 160) || `Shop ${category.name}`,
    alternates: {
      canonical: `https://sacred-snuff.com/product-category/${slug.join("/")}/`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const leafSlug = slug[slug.length - 1];

  const category = await getCategoryBySlug(leafSlug);
  if (!category) notFound();

  const products = await getProductsByCategory(category.id);

  return (
    <main className="section" style={{ background: "var(--cream)" }}>
      <div className="section-inner">
        {/* Header da categoria */}
        <div style={{ marginBottom: 48 }}>
          <p className="section-eyebrow">
            {slug.map((s, i) => (
              <span key={s}>
                {i > 0 && " / "}
                <Link href={`/product-category/${slug.slice(0, i + 1).join("/")}/`}
                  style={{ color: "var(--green-sage)" }}>
                  {s.replace(/-/g, " ")}
                </Link>
              </span>
            ))}
          </p>
          <h1 className="section-title">{category.name}</h1>
          {category.description && (
            <p className="section-subtitle"
              dangerouslySetInnerHTML={{ __html: category.description }}
            />
          )}
          <p style={{ fontSize: 13, color: "var(--text-light)", marginTop: 8 }}>
            {category.count} produto{category.count !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Grid de produtos */}
        {products.length === 0 ? (
          <p style={{ color: "var(--text-light)", fontSize: 16 }}>Nenhum produto encontrado.</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => {
              const price = formatPrice(product.prices.price, product.prices.currency_minor_unit);
              const maxPrice = product.prices.price_range
                ? formatPrice(product.prices.price_range.max_amount, product.prices.currency_minor_unit)
                : null;
              const image = product.images[0];

              return (
                <Link key={product.id} href={`/product/${product.slug}/`} className="product-card"
                  style={{ display: "block", textDecoration: "none" }}>
                  <div className="product-img p1" style={{ position: "relative" }}>
                    {image ? (
                      <Image
                        src={image.thumbnail}
                        alt={image.alt || product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <span>🍃</span>
                    )}
                  </div>
                  <div className="product-body">
                    {product.categories[0] && (
                      <p className="product-nation">{product.categories[0].name}</p>
                    )}
                    <h3 dangerouslySetInnerHTML={{ __html: product.name }} />
                    {product.review_count > 0 && (
                      <p className="product-stars">
                        <span className="stars">{"★".repeat(Math.round(Number(product.average_rating)))}</span>
                        {" "}({product.review_count})
                      </p>
                    )}
                    <p className="product-price">
                      {maxPrice && maxPrice !== price
                        ? `$${price} – $${maxPrice}`
                        : `$${price}`}
                    </p>
                    <button className="btn-size">
                      {product.has_options ? "Escolher opção" : "Adicionar ao carrinho"}
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
