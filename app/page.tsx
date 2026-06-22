import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import NewsletterForm from "@/components/NewsletterForm";
import type { WooProduct, WooStoreCategory } from "@/types/woo";

export const revalidate = 60;

const WC = process.env.WC_BASE_URL ?? "https://sacred-snuff.com/wp-json/wc/store/v1";

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${WC}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API error: ${res.status} ${path}`);
  return res.json();
}

const TOP_CATEGORY_SLUGS = [
  "sacred-snuff-rape-tobacco",
  "accesories",
  "naturals",
  "incense",
];

export default async function HomePage() {
  const [allCategories, popular, newest] = await Promise.all([
    fetchJSON<WooStoreCategory[]>("/products/categories?per_page=100"),
    fetchJSON<WooProduct[]>("/products?per_page=8&orderby=popularity"),
    fetchJSON<WooProduct[]>("/products?per_page=4&orderby=date&order=desc"),
  ]);

  const topCategories = TOP_CATEGORY_SLUGS.map(
    (slug) => allCategories.find((c) => c.slug === slug)
  ).filter(Boolean) as WooStoreCategory[];

  // Subcategories of Rapé (parent 78) for the tribal section
  const rapeSubcats = allCategories
    .filter((c) => c.parent === 78 && c.count > 0 && c.slug !== "kits" && c.slug !== "shamanic-snuff")
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow">Ceremonial Amazonian Hapé · Made by Indigenous Hands</p>
          <h1>Ancient rituals,<br />from the Amazon<br />to your door.</h1>
          <p className="hero-sub">
            For generations, the tribes of the Amazon have prepared hapé as a sacred bridge —
            between body and spirit, forest and breath.
          </p>
          <div className="hero-ctas">
            <Link href="/product-category/sacred-snuff-rape-tobacco/" className="btn-primary">
              Explore the Medicine
            </Link>
            <Link href="/product-category/sacred-snuff-rape-tobacco/kits/" className="btn-outline">
              Ceremony Kits
            </Link>
          </div>
          <div className="hero-trust">
            <span><span className="stars">★★★★★</span> 4.9 from 2,300+ reviews</span>
            <span className="sep">·</span>
            <span>Sourced from 9 tribal nations</span>
            <span className="sep">·</span>
            <span>Ships from the USA</span>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-bar-inner">
          {[
            { title: "Direct from the Tribes", desc: "Fair-trade, no middlemen" },
            { title: "100% Pure", desc: "No additives, no fillers — ever" },
            { title: "Small Batch", desc: "Prepared in ceremony, sealed fresh" },
            { title: "Fast US Shipping", desc: "Free over $100 · ships in 24h" },
          ].map((b) => (
            <div key={b.title} className="trust-item">
              <strong>{b.title}</strong>
              <span>{b.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CATEGORIES */}
      <section className="section bg-cream">
        <div className="container">
          <p className="eyebrow">Shop by Category</p>
          <h2 className="section-title">Find your medicine</h2>
          <div className="cat-grid-top">
            {topCategories.map((cat) => (
              <Link key={cat.id} href={`/product-category/${cat.slug}/`} className="cat-card-top">
                {cat.image && (
                  <div className="cat-card-top-img">
                    <Image
                      src={cat.image.src}
                      alt={cat.image.alt || cat.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="cat-card-top-body">
                  <h3>{cat.name}</h3>
                  <span>{cat.count} products</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Most Loved</p>
              <h2 className="section-title">Best sellers</h2>
            </div>
            <Link href="/product-category/sacred-snuff-rape-tobacco/" className="btn-link">
              View all →
            </Link>
          </div>
          <div className="products-grid">
            {popular.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* TRIBAL VARIETIES */}
      <section className="section bg-forest">
        <div className="container">
          <p className="eyebrow light">Shop by Tribe</p>
          <h2 className="section-title light">Nine nations, one medicine</h2>
          <div className="tribe-grid">
            {rapeSubcats.map((cat) => (
              <Link
                key={cat.id}
                href={`/product-category/sacred-snuff-rape-tobacco/${cat.slug}/`}
                className="tribe-cat-card"
              >
                {cat.image ? (
                  <div className="tribe-cat-img">
                    <Image
                      src={cat.image.src}
                      alt={cat.image.alt || cat.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                ) : (
                  <div className="tribe-cat-img tribe-cat-placeholder">🌿</div>
                )}
                <div className="tribe-cat-body">
                  <p className="tribe-cat-name">{cat.name}</p>
                  <p className="tribe-cat-count">{cat.count} blends</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="section bg-cream">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Just In</p>
              <h2 className="section-title">New arrivals</h2>
            </div>
            <Link href="/product-category/sacred-snuff-rape-tobacco/" className="btn-link">
              See all →
            </Link>
          </div>
          <div className="products-grid grid-4">
            {newest.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <div className="newsletter-inner">
          <p className="eyebrow light">Free First Ceremony Guide</p>
          <h2>Begin your practice<br />with reverence.</h2>
          <p>Get our 12-page guide + 10% off your first order.</p>
          <NewsletterForm />
          <p className="newsletter-note">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

    </>
  );
}
