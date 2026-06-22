import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo-img" style={{ marginBottom: 14 }}>
              <Image src="/logo.png" alt="Sacred Connection" width={160} height={54} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            </Link>
            <p>Authentic ceremonial hapé sourced directly from indigenous communities of the Amazon.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><Link href="/product-category/sacred-snuff-rape-tobacco/">All Hapé</Link></li>
              <li><Link href="/product-category/sacred-snuff-rape-tobacco/shamanic-snuff/shamanic-snuff-tobacco-free/">Tobacco-Free</Link></li>
              <li><Link href="/product-category/accesories/kuripe-pipe/">Kuripes & Tepis</Link></li>
              <li><Link href="/product-category/naturals/sananga/">Sananga</Link></li>
              <li><Link href="/product-category/sacred-snuff-rape-tobacco/kits/">Ceremony Kits</Link></li>
            </ul>
          </div>
          <div>
            <h4>Learn</h4>
            <ul>
              <li><Link href="/rape-the-sacred-snuff-of-the-amazon/">What is Hapé?</Link></li>
              <li><Link href="/blog/">Journal</Link></li>
              <li><Link href="/about/">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><Link href="/contact/">Contact</Link></li>
              <li><Link href="/refund_returns/">Shipping & Returns</Link></li>
              <li><Link href="/privacy-policy/">Privacy Policy</Link></li>
              <li><Link href="/my-account/">My Account</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-legal">
            For adults 21+. Hapé contains tobacco (Nicotiana rustica) unless marked tobacco-free.
            Not evaluated by the FDA. Use respectfully and responsibly.
          </p>
          <p className="footer-copy">© {new Date().getFullYear()} Sacred Connection</p>
        </div>
      </div>
    </footer>
  );
}
