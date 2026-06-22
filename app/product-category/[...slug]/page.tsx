import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import type { WooProduct, WooStoreCategory } from "@/types/woo";

export const revalidate = 60;
export const dynamicParams = true;

const WC = process.env.WC_BASE_URL ?? "https://sacred-snuff.com/wp-json/wc/store/v1";

async function getAllCategories(): Promise<WooStoreCategory[]> {
  const res = await fetch(`${WC}/products/categories?per_page=100`, {
    next: { revalidate: 3600 },
  });
  return res.ok ? res.json() : [];
}

async function getCategoryBySlug(
  slug: string,
  all: WooStoreCategory[]
): Promise<WooStoreCategory | null> {
  return all.find((c) => c.slug === slug) ?? null;
}

async function getProducts(categoryId: number): Promise<WooProduct[]> {
  const res = await fetch(
    `${WC}/products?category=${categoryId}&per_page=48&orderby=popularity`,
    { next: { revalidate: 60 } }
  );
  return res.ok ? res.json() : [];
}

export async function generateStaticParams() {
  const res = await fetch(`${WC}/products/categories?per_page=100`, {
    next: { revalidate: 3600 },
  });
  const cats: WooStoreCategory[] = res.ok ? await res.json() : [];

  const params: { slug: string[] }[] = [];

  for (const cat of cats) {
    if (!cat.count) continue;
    if (cat.parent === 0) {
      params.push({ slug: [cat.slug] });
    } else {
      const parent = cats.find((c) => c.id === cat.parent);
      if (parent) {
        const grandparent = cats.find((c) => c.id === parent.parent);
        if (grandparent && grandparent.parent === 0) {
          params.push({ slug: [grandparent.slug, parent.slug, cat.slug] });
        } else {
          params.push({ slug: [parent.slug, cat.slug] });
        }
      } else {
        params.push({ slug: [cat.slug] });
      }
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const leaf = slug[slug.length - 1];
  const all = await getAllCategories();
  const cat = await getCategoryBySlug(leaf, all);
  if (!cat) return { title: "Category not found" };

  return {
    title: `${cat.name} — Sacred Connection`,
    description:
      cat.description.replace(/<[^>]*>/g, "").slice(0, 160) ||
      `Shop ${cat.name} — ceremonial medicines sourced directly from Amazonian tribes.`,
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
  const leaf = slug[slug.length - 1];

  const allCats = await getAllCategories();
  const category = await getCategoryBySlug(leaf, allCats);
  if (!category) notFound();

  const [products] = await Promise.all([getProducts(category.id)]);

  // Direct children of this category
  const subcategories = allCats
    .filter((c) => c.parent === category.id && c.count > 0)
    .sort((a, b) => b.count - a.count);

  // Build breadcrumb chain
  const buildBreadcrumb = (cat: WooStoreCategory): WooStoreCategory[] => {
    if (!cat.parent) return [cat];
    const parent = allCats.find((c) => c.id === cat.parent);
    return parent ? [...buildBreadcrumb(parent), cat] : [cat];
  };
  const breadcrumb = buildBreadcrumb(category);

  return (
    <main>
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <div className="container breadcrumb-inner">
          <Link href="/">Home</Link>
          {breadcrumb.map((crumb, i) => {
            const crumbSlug = breadcrumb.slice(0, i + 1).map((c) => c.slug).join("/");
            return (
              <span key={crumb.id}>
                <span>›</span>
                {i < breadcrumb.length - 1 ? (
                  <Link href={`/product-category/${crumbSlug}/`}>{crumb.name}</Link>
                ) : (
                  <span>{crumb.name}</span>
                )}
              </span>
            );
          })}
        </div>
      </nav>

      {/* Category header */}
      <div className="cat-header">
        {category.image && (
          <div className="cat-header-img">
            <Image
              src={category.image.src}
              alt={category.image.alt || category.name}
              fill
              priority
              style={{ objectFit: "cover" }}
              sizes="100vw"
            />
            <div className="cat-header-overlay" />
          </div>
        )}
        <div className="cat-header-content container">
          <h1>{category.name}</h1>
          {category.description && (
            <p dangerouslySetInnerHTML={{ __html: category.description }} />
          )}
          <span>{category.count} product{category.count !== 1 ? "s" : ""}</span>
        </div>
      </div>

      <div className="container cat-body">
        {/* Subcategory pills */}
        {subcategories.length > 0 && (
          <div className="subcat-row">
            <Link
              href={`/product-category/${slug.join("/")}/`}
              className="subcat-pill active"
            >
              All ({category.count})
            </Link>
            {subcategories.map((sub) => {
              const subSlug = [...slug, sub.slug].join("/");
              return (
                <Link
                  key={sub.id}
                  href={`/product-category/${subSlug}/`}
                  className="subcat-pill"
                >
                  {sub.name} ({sub.count})
                </Link>
              );
            })}
          </div>
        )}

        {/* Products grid */}
        {products.length === 0 ? (
          <p className="no-products">No products found in this category.</p>
        ) : (
          <div className="products-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
