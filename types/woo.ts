export interface WooImage {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  link: string;
}

export interface WooPrices {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range: { min_amount: string; max_amount: string } | null;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
}

export interface WooAttributeTerm {
  id: number;
  name: string;
  slug: string;
}

export interface WooAttribute {
  id: number;
  name: string;
  taxonomy: string;
  has_variations: boolean;
  terms: WooAttributeTerm[];
}

export interface WooVariation {
  id: number;
  attributes: { name: string; value: string }[];
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  type: "simple" | "variable";
  permalink: string;
  short_description: string;
  description: string;
  average_rating: string;
  review_count: number;
  images: WooImage[];
  categories: WooCategory[];
  tags: { id: number; name: string; slug: string }[];
  prices: WooPrices;
  is_purchasable: boolean;
  is_in_stock: boolean;
  low_stock_remaining: number | null;
  has_options: boolean;
  attributes: WooAttribute[];
  variations: WooVariation[];
  add_to_cart: { text: string; url: string; minimum: number; maximum: number };
}

export interface WooStoreCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  count: number;
  image: WooImage | null;
}

export interface WooCartItem {
  key: string;
  id: number;
  quantity: number;
  name: string;
  short_description: string;
  images: WooImage[];
  prices: WooPrices;
  totals: {
    line_subtotal: string;
    line_subtotal_tax: string;
    line_total: string;
    line_total_tax: string;
    currency_code: string;
    currency_symbol: string;
  };
}

export interface WooCart {
  items: WooCartItem[];
  items_count: number;
  items_weight: number;
  coupons: unknown[];
  totals: {
    total_price: string;
    total_items: string;
    total_tax: string;
    currency_code: string;
    currency_symbol: string;
  };
  needs_payment: boolean;
  needs_shipping: boolean;
  payment_methods: string[];
}

export interface ProductsQuery {
  per_page?: number;
  page?: number;
  category?: string | number;
  search?: string;
  orderby?: "menu_order" | "popularity" | "rating" | "date" | "price";
  order?: "asc" | "desc";
  on_sale?: boolean;
  stock_status?: "instock" | "outofstock";
}
