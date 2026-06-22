import Link from "next/link";
import Image from "next/image";
import type { WooProduct } from "@/types/woo";
import { formatPrice } from "@/lib/api";

interface Props {
  product: WooProduct;
}

export default function ProductCard({ product }: Props) {
  const image = product.images[0];
  const minor = product.prices.currency_minor_unit ?? 2;
  const price = formatPrice(product.prices.price, minor);
  const maxPrice = product.prices.price_range
    ? formatPrice(product.prices.price_range.max_amount, minor)
    : null;
  const onSale =
    product.prices.sale_price &&
    product.prices.sale_price !== product.prices.regular_price;
  const rating = Math.round(Number(product.average_rating));

  return (
    <Link href={`/product/${product.slug}/`} className="product-card">
      <div className="product-card-img">
        {image ? (
          <Image
            src={image.thumbnail || image.src}
            alt={image.alt || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <span className="product-card-placeholder">🌿</span>
        )}
        {onSale && <span className="product-card-badge">Sale</span>}
        {!product.is_in_stock && (
          <span className="product-card-badge badge-oos">Out of Stock</span>
        )}
      </div>
      <div className="product-card-body">
        {product.categories[0] && (
          <p className="product-nation">{product.categories[0].name}</p>
        )}
        <h3
          className="product-card-name"
          dangerouslySetInnerHTML={{ __html: product.name }}
        />
        {product.review_count > 0 && (
          <p className="product-stars">
            <span className="stars">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</span>
            <span className="review-count">({product.review_count})</span>
          </p>
        )}
        <p className="product-price">
          {maxPrice && maxPrice !== price
            ? `$${price} – $${maxPrice}`
            : `$${price}`}
        </p>
        <span className="product-card-cta">
          {product.has_options ? "Select options" : "Add to cart"}
        </span>
      </div>
    </Link>
  );
}
