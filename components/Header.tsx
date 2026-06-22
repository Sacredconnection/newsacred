"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV = [
  {
    label: "Shop Hapé",
    href: "/product-category/sacred-snuff-rape-tobacco/",
    children: [
      { label: "All Rapé", href: "/product-category/sacred-snuff-rape-tobacco/" },
      { label: "Shamanic Snuff", href: "/product-category/sacred-snuff-rape-tobacco/shamanic-snuff/" },
      { label: "Tobacco Free", href: "/product-category/sacred-snuff-rape-tobacco/shamanic-snuff/shamanic-snuff-tobacco-free/" },
      { label: "Apurinã", href: "/product-category/sacred-snuff-rape-tobacco/apurina/" },
      { label: "Caboclo", href: "/product-category/sacred-snuff-rape-tobacco/caboclo/" },
      { label: "Huni Kuin", href: "/product-category/sacred-snuff-rape-tobacco/hunikuin/" },
      { label: "Katukina", href: "/product-category/sacred-snuff-rape-tobacco/katukina/" },
      { label: "Kuntanawa", href: "/product-category/sacred-snuff-rape-tobacco/kuntanawa/" },
      { label: "Nukini", href: "/product-category/sacred-snuff-rape-tobacco/nukini-rape/" },
      { label: "Shawãdawa", href: "/product-category/sacred-snuff-rape-tobacco/shawadawa/" },
      { label: "Yawanawá", href: "/product-category/sacred-snuff-rape-tobacco/yawanawa/" },
      { label: "Ceremony Kits", href: "/product-category/sacred-snuff-rape-tobacco/kits/" },
    ],
  },
  {
    label: "Tools & Kuripes",
    href: "/product-category/accesories/",
    children: [
      { label: "All Tools", href: "/product-category/accesories/" },
      { label: "Bamboo Kuripe", href: "/product-category/accesories/kuripe-pipe/bamboo-kuripe/" },
      { label: "Wood Kuripe", href: "/product-category/accesories/kuripe-pipe/wood-kuripe-2/" },
      { label: "Bone Kuripe", href: "/product-category/accesories/kuripe-pipe/bone-kuripe/" },
      { label: "Metal Kuripe", href: "/product-category/accesories/kuripe-pipe/metal-kuripe/" },
      { label: "Rapé Pipes (Tepi)", href: "/product-category/accesories/tepi-rape-pipe/" },
      { label: "Snuff Containers", href: "/product-category/accesories/accessories/" },
      { label: "Tribal Beadwork", href: "/product-category/accesories/tribal-beadwork/" },
    ],
  },
  {
    label: "Sacred Botanicals",
    href: "/product-category/naturals/",
    children: [
      { label: "All Supplements", href: "/product-category/naturals/" },
      { label: "Sananga Eye Drops", href: "/product-category/naturals/sananga/" },
      { label: "Cacao", href: "/product-category/naturals/cacao/" },
      { label: "Mapacho", href: "/product-category/naturals/mapacho/" },
      { label: "Chilcuague", href: "/product-category/naturals/chilcuague/" },
      { label: "Extracts", href: "/product-category/naturals/tinctures-preparations-extracts/" },
      { label: "Herbals", href: "/product-category/naturals/herbals/" },
      { label: "Oils", href: "/product-category/naturals/oils/" },
    ],
  },
  {
    label: "Incense",
    href: "/product-category/incense/",
    children: [
      { label: "All Incense", href: "/product-category/incense/" },
      { label: "Natural Incenses", href: "/product-category/incense/naturalincenses/" },
      { label: "Palo Santo", href: "/product-category/incense/palo-santo/" },
      { label: "Smudge", href: "/product-category/incense/smudge/" },
      { label: "Resins", href: "/product-category/incense/resins/" },
      { label: "Floral Waters", href: "/product-category/incense/floralwaters/" },
    ],
  },
  { label: "Learn", href: "/blog/", children: [] },
];

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="promo-banner">
        <span>Free US shipping over $100</span>
        <span className="promo-sep">·</span>
        <span>10% off with code <strong>SACRED10</strong></span>
        <span className="promo-sep">·</span>
        <span>Small-batch, ships from the USA</span>
      </div>

      <header className="header">
        <div className="header-inner">
          <Link href="/" className="logo-img">
            <Image src="/logo.png" alt="Sacred Connection" width={180} height={60} priority style={{ objectFit: "contain" }} />
          </Link>

          <nav className="nav-desktop">
            {NAV.map((item) => (
              <div
                key={item.label}
                className="nav-item"
                onMouseEnter={() => setOpen(item.label)}
                onMouseLeave={() => setOpen(null)}
              >
                <Link href={item.href} className="nav-link">
                  {item.label}
                  {item.children.length > 0 && <span className="nav-arrow">›</span>}
                </Link>
                {item.children.length > 0 && open === item.label && (
                  <div className="dropdown">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="dropdown-item">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="header-actions">
            <Link href="/my-account/" className="header-link">Account</Link>
            <button className="cart-btn" aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span className="cart-count">0</span>
            </button>
            <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-nav">
          {NAV.map((item) => (
            <div key={item.label} className="mobile-nav-group">
              <Link href={item.href} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
              {item.children.map((child) => (
                <Link key={child.href} href={child.href} className="mobile-nav-child" onClick={() => setMobileOpen(false)}>
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
