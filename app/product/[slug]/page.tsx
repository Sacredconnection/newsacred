"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/api";
import type { WooProduct } from "@/types/woo";
import { notFound } from "next/navigation";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const [product, setProduct] = useState<WooProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState<Record<string, string>>({});
  const [activeImg, setActiveImg] = useState(0);
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    params.then(({ slug: s }) => {
      setSlug(s);
      fetch(`/api/products?slug=${s}&per_page=1`)
        .then((r) => r.json())
        .then((data: WooProduct[]) => {
          if (!data[0]) { setLoading(false); return; }
          setProduct(data[0]);
          // init variation selection
          const init: Record<string, string> = {};
          data[0].attributes.forEach((a) => {
            if (a.has_variations && a.terms[0]) init[a.name] = a.terms[0].name;
          });
          setSelectedVariation(init);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    });
  }, [params]);

  if (loading) return <div className="page-loading">Loading…</div>;
  if (!product) return notFound();

  const minor = product.prices.currency_minor_unit ?? 2;
  const price = formatPrice(product.prices.price, minor);
  const regularPrice = formatPrice(product.prices.regular_price, minor);
  const onSale = product.prices.sale_price !== product.prices.regular_price;
  const rating = Math.round(Number(product.average_rating));

  return (
    <main>
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <div className="container breadcrumb-inner">
          <Link href="/">Home</Link>
          {product.categories[0] && (
            <>
              <span>›</span>
              <Link href={`/product-category/${product.categories[0].slug}/`}>
                {product.categories[0].name}
              </Link>
            </>
          )}
          <span>›</span>
          <span dangerouslySetInnerHTML={{ __html: product.name }} />
        </div>
      </nav>

      <div className="pdp-grid container">
        {/* Gallery */}
        <div className="pdp-gallery">
          <div className="pdp-main-img">
            {product.images[activeImg] ? (
              <Image
                src={product.images[activeImg].src}
                alt={product.images[activeImg].alt || product.name}
                fill
                priority
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            ) : (
              <div className="img-placeholder">🌿</div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="pdp-thumbs">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  className={`pdp-thumb${activeImg === i ? " active" : ""}`}
                  onClick={() => setActiveImg(i)}
                >
                  <Image src={img.thumbnail} alt={img.alt} fill style={{ objectFit: "cover" }} sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="pdp-info">
          {product.categories[0] && (
            <p className="eyebrow">{product.categories[0].name}</p>
          )}
          <h1 className="pdp-title" dangerouslySetInnerHTML={{ __html: product.name }} />

          {product.review_count > 0 && (
            <div className="pdp-rating">
              <span className="stars">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</span>
              <span>{product.average_rating} · {product.review_count} reviews</span>
            </div>
          )}

          <div className="pdp-price">
            <span className="price-current">${price}</span>
            {onSale && <span className="price-orig">${regularPrice}</span>}
          </div>

          <div
            className="pdp-short-desc"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />

          {/* Variation attributes */}
          {product.attributes.filter((a) => a.has_variations).map((attr) => (
            <div key={attr.id} className="pdp-attr">
              <p className="pdp-attr-label">{attr.name}</p>
              <div className="pdp-attr-terms">
                {attr.terms.map((term) => (
                  <button
                    key={term.id}
                    className={`attr-btn${selectedVariation[attr.name] === term.name ? " selected" : ""}`}
                    onClick={() =>
                      setSelectedVariation((v) => ({ ...v, [attr.name]: term.name }))
                    }
                  >
                    {term.name}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Qty + cart */}
          <div className="pdp-actions">
            <div className="qty-row">
              <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span className="qty-num">{qty}</span>
              <button className="qty-btn" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className="btn-cart" disabled={!product.is_in_stock}>
              {product.is_in_stock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>

          <div className="pdp-meta">
            {product.is_in_stock ? (
              <span className="in-stock">✓ In stock</span>
            ) : (
              <span className="out-stock">✗ Currently out of stock</span>
            )}
            {product.low_stock_remaining && (
              <span>⚡ Only {product.low_stock_remaining} left</span>
            )}
            <span>🔒 Secure checkout</span>
            <span>↩ 30-day satisfaction guarantee</span>
          </div>

          {product.categories.length > 0 && (
            <p className="pdp-cats">
              <span>Category: </span>
              {product.categories.map((c, i) => (
                <span key={c.id}>
                  {i > 0 && ", "}
                  <Link href={`/product-category/${c.slug}/`}>{c.name}</Link>
                </span>
              ))}
            </p>
          )}
        </div>
      </div>

      {/* Full description */}
      {product.description && (
        <section className="pdp-desc section bg-cream">
          <div className="container pdp-desc-inner">
            <h2>About this product</h2>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </section>
      )}
    </main>
  );
}
