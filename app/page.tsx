"use client";
import { useState } from "react";

export default function Home() {
  const [qty, setQty] = useState(1);

  return (
    <>
      {/* PROMO BANNER */}
      <div className="promo-banner">
        <span>Free US shipping over $100</span>
        <span>·</span>
        <span>10% off your first order with code <strong>SACRED10</strong></span>
        <span>·</span>
        <span>Small-batch, ships from the USA</span>
      </div>

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <a href="/" className="logo">Sacred <em>Connection</em></a>
          <nav>
            <ul className="nav">
              <li><a href="/product-category/sacred-snuff-rape-tobacco/">Shop Hapé</a></li>
              <li><a href="/product-category/accesories/">Tools & Kuripes</a></li>
              <li><a href="/product-category/naturals/">Supplements</a></li>
              <li><a href="/product-category/incense/">Incense</a></li>
              <li><a href="/blog/">Learn</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            <button className="btn-quiz">Find Your Hapé</button>
            <button className="cart-btn">🛒 0</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <p className="hero-eyebrow">Ceremonial Amazonian Hapé · Made by Indigenous Hands</p>
        <h1>Ancient rituals,<br />from the Amazon<br />to your door.</h1>
        <p>
          For generations, the tribes of the Amazon have prepared hapé as a sacred bridge —
          between body and spirit, forest and breath. We carry that medicine to your practice,
          exactly as it was made: with prayer, fire, and intention.
        </p>
        <div className="hero-ctas">
          <button className="btn-primary">Explore the Medicine</button>
          <button className="btn-outline">Find Your Hapé</button>
        </div>
        <div className="hero-social-proof">
          <span><span className="stars">★★★★★</span> 4.9 from 2,300+ reviews</span>
          <span className="dot">·</span>
          <span>✦ Sourced from 9 tribal nations</span>
          <span className="dot">·</span>
          <span>✦ Ships from the USA</span>
        </div>
      </section>

      {/* BADGES */}
      <div className="badges">
        <div className="badges-inner">
          <div className="badge-item">
            <strong>Direct from the Tribes</strong>
            <p>Fair-trade partnership, no middlemen</p>
          </div>
          <div className="badge-item">
            <strong>100% Pure</strong>
            <p>No additives, no fillers — ever</p>
          </div>
          <div className="badge-item">
            <strong>Small Batch</strong>
            <p>Prepared in ceremony, sealed fresh</p>
          </div>
          <div className="badge-item">
            <strong>Fast US Shipping</strong>
            <p>Free over $100 · ships in 24h</p>
          </div>
        </div>
      </div>

      {/* WHAT IS HAPÉ */}
      <section className="section what-section">
        <div className="what-inner">
          <div className="what-text">
            <p className="section-eyebrow">What is Hapé?</p>
            <h2 className="section-title">A prayer you receive<br />through the breath.</h2>
            <blockquote className="what-quote">
              "Hapé is not taken. It is received — the forest speaking directly to your spirit."
            </blockquote>
            <p>
              Hapé is a sacred snuff of finely ground mapacho tobacco and ceremonial plants,
              prepared over days of ritual by indigenous healers in the Amazon basin. Each tribe
              guards its own recipes, passed from elder to apprentice for centuries.
            </p>
            <p>
              It is not smoked, and it is not a recreational product. Administered through the nose
              with a kuripe or tepi pipe, hapé is used in ceremony to ground the body, quiet the mind,
              clear stagnant energy, and open a deeper state of presence and connection.
            </p>
            <button className="btn-text">Read the complete guide to your first ceremony →</button>
          </div>
          <div className="what-image">
            <p className="what-image-caption">
              Pictured: Gesileu Phaspy Ninawa, master hapé maker and partner of Sacred Connection.
            </p>
          </div>
        </div>
      </section>

      {/* FIRST CEREMONY STEPS */}
      <section className="section ceremony-section">
        <div className="section-inner">
          <p className="section-eyebrow" style={{ textAlign: "center" }}>Your first ceremony</p>
          <h2 className="section-title" style={{ textAlign: "center", margin: "0 auto 12px" }}>
            In three movements
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto", textAlign: "center" }}>
            You don&apos;t need to be a shaman. You need a quiet moment, an open heart, and respect for the medicine.
          </p>
          <div className="steps-grid">
            <div className="step">
              <p className="step-num">I</p>
              <h3>Set your intention</h3>
              <p>
                Find a calm space. Light palo santo if you wish. Ask yourself what you are seeking —
                grounding, clarity, release — and hold that question gently.
              </p>
            </div>
            <div className="step">
              <p className="step-num">II</p>
              <h3>Receive the medicine</h3>
              <p>
                Using a kuripe (self-applicator), place a pea-sized amount and administer to each nostril
                with a steady breath. Strong at first — then a wave of stillness.
              </p>
            </div>
            <div className="step">
              <p className="step-num">III</p>
              <h3>Sit in the silence</h3>
              <p>
                Close your eyes for 10–15 minutes. Let the medicine ground you. Many feel a deep
                clearing of the mind and a quiet, rooted connection to the present.
              </p>
            </div>
          </div>
          <div className="guide-cta">
            <h3>Get the Free First Ceremony Guide</h3>
            <p>A beautiful 12-page PDF — how to choose a blend, prepare your space, and receive hapé safely.</p>
            <button className="btn-gold">Download Free Guide</button>
          </div>
        </div>
      </section>

      {/* SHOP BY INTENTION */}
      <section className="section intention-section">
        <div className="section-inner">
          <p className="section-eyebrow">Find your medicine</p>
          <h2 className="section-title">Shop by intention</h2>
          <p className="section-subtitle">
            Nine tribes, dozens of blends. Begin with what your spirit is asking for.
          </p>
          <div className="intention-grid">
            <a href="/product-category/sacred-snuff-rape-tobacco/caboclo/" className="intention-card">
              <div className="intention-card-img ground">🌿</div>
              <div className="intention-card-body">
                <p className="intention-label">For rooting &amp; presence</p>
                <h3>Grounding</h3>
                <p>Caboclo Paricá · Apurinã blends</p>
              </div>
            </a>
            <a href="/product-category/sacred-snuff-rape-tobacco/nukini-rape/" className="intention-card">
              <div className="intention-card-img clarity">⭐</div>
              <div className="intention-card-body">
                <p className="intention-label">For focus &amp; vision</p>
                <h3>Clarity</h3>
                <p>Nukini 7 Stars · Bashawa</p>
              </div>
            </a>
            <a href="/product-category/sacred-snuff-rape-tobacco/shawadawa/" className="intention-card">
              <div className="intention-card-img cleanse">💨</div>
              <div className="intention-card-body">
                <p className="intention-label">For release &amp; renewal</p>
                <h3>Cleansing</h3>
                <p>Shawãdawa Spiritual · Sananga</p>
              </div>
            </a>
            <a href="/product-category/sacred-snuff-rape-tobacco/yawanawa/" className="intention-card">
              <div className="intention-card-img connect">🌸</div>
              <div className="intention-card-body">
                <p className="intention-label">For heart &amp; ceremony</p>
                <h3>Connection</h3>
                <p>Feminine Force · Heart of the Boa</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCT */}
      <section className="section featured-section">
        <div className="featured-inner">
          <div className="featured-img">🪴</div>
          <div>
            <p className="section-eyebrow">Hapé of the Month · June Ceremony Blend</p>
            <div className="tag-row">
              <span className="tag tag-green">Limited Batch</span>
              <span className="tag tag-gold">Save 10%</span>
            </div>
            <p className="featured-nation">Prepared by the Yawanawá Nation · Acre, Brazil</p>
            <div className="featured-stars">
              <span className="stars">★★★★★</span>
              <span>5.0 · 132 verified reviews</span>
            </div>
            <h2>Força Feminina —<br />Feminine Force</h2>
            <p className="featured-desc">
              One of the most beloved medicines of the Yawanawá — a blend carried by the women of
              the nation, honoring the feminine force of the forest. Grounding and heart-opening,
              crafted for ceremony and for the moments when you need strength with softness.
              This month only, blessed and shipped in a limited batch.
            </p>
            <div className="price-row">
              <span className="price-current">$25.20</span>
              <span className="price-orig">$28.00</span>
              <span className="price-save">SAVE 10%</span>
            </div>
            <div className="qty-row">
              <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className="qty-num">{qty}</span>
              <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button className="btn-cart">Add to Cart — Begin Your Ceremony</button>
            <div className="featured-meta">
              <span>✓ 30-day satisfaction guarantee</span>
              <span>⚡ Only 14 tins left this batch</span>
              <span>🔒 Secure checkout</span>
            </div>
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="section bestsellers-section">
        <div className="section-inner">
          <div className="bs-header">
            <div>
              <p className="section-eyebrow">Most loved</p>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                The medicines our circle returns to
              </h2>
            </div>
            <button className="btn-link">View all 40+ blends →</button>
          </div>
          <div className="products-grid">
            {[
              { cls: "p1", nation: "Yawanawá Nation", badge: "BESTSELLER", name: "Força Feminina — Feminine Force", rating: "★★★★★", count: 132, price: "From $12.60 · 4 sizes" },
              { cls: "p2", nation: "Nukini Nation", badge: "", name: "7 Stars", rating: "★★★★★", count: 98, price: "From $14.00 · 4 sizes" },
              { cls: "p3", nation: "Caboclo Lineage", badge: "BEGINNER FRIENDLY", name: "Paricá — Grounding Classic", rating: "★★★★★", count: 114, price: "From $14.00 · 4 sizes" },
              { cls: "p4", nation: "Shawãdawa Nation", badge: "", name: "Spiritual — Deep Cleansing", rating: "★★★★★", count: 76, price: "From $14.00 · 4 sizes" },
            ].map((p) => (
              <div key={p.name} className="product-card">
                <div className={`product-img ${p.cls}`}>🍃</div>
                <div className="product-body">
                  <p className="product-nation">{p.nation}</p>
                  {p.badge && <p className="product-badge">{p.badge}</p>}
                  <h3>{p.name}</h3>
                  <p className="product-stars"><span className="stars">{p.rating}</span> ({p.count})</p>
                  <p className="product-price">{p.price}</p>
                  <button className="btn-size">Choose Size</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="section tools-section">
        <div className="section-inner">
          <p className="section-eyebrow">Complete the ritual</p>
          <h2 className="section-title">Tools for your ceremony</h2>
          <p className="section-subtitle">
            The medicine is half of the practice. These are its companions — the instruments and
            botanicals that hold the space.
          </p>
          <div className="tools-grid">
            {[
              { icon: "🎋", label: "Applicator Pipe", name: "Bamboo Kuripe", desc: "The self-applicator every practice begins with. Hand-carved and bound on tribal land.", price: "From $18.00", link: "Shop Kuripes" },
              { icon: "🪵", label: "Sacred Smoke", name: "Palo Santo", desc: "Sustainably gathered holy wood. Cleanse your space before you receive the medicine.", price: "From $9.00", link: "Shop Incense" },
              { icon: "💧", label: "Companion Medicine", name: "Sananga Eye Drops", desc: "Traditional eye medicine of the forest, used before ceremony for clear sight.", price: "$23.00", link: "Shop Sananga" },
              { icon: "🍫", label: "Heart Opener", name: "Ceremonial Cacao", desc: "Pure, single-origin cacao prepared the traditional way. Open the heart before ceremony.", price: "From $24.00", link: "Shop Cacao" },
            ].map((t) => (
              <div key={t.name} className="tool-card">
                <div className="tool-icon">{t.icon}</div>
                <p className="tool-label">{t.label}</p>
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
                <p className="tool-price">{t.price}</p>
                <button className="btn-tool">{t.link} →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KIT */}
      <section className="kit-section">
        <div className="kit-inner">
          <p className="section-eyebrow">Everything you need</p>
          <h2 className="section-title">The First Ceremony Kit</h2>
          <div className="kit-items">
            <span className="kit-item">Caboclo Paricá</span>
            <span className="kit-item">Bamboo Kuripe</span>
            <span className="kit-item">Palo Santo</span>
          </div>
          <p className="kit-price"><s>$52.00</s>$44.00</p>
          <p className="kit-save">✦ Save 15% — blessed and boxed together</p>
          <button className="btn-gold">Build My Kit — Save 15%</button>
        </div>
      </section>

      {/* TRIBES */}
      <section className="tribes-section">
        <div className="section-inner">
          <p className="section-eyebrow">Every tin carries a name, a face, a nation</p>
          <h2 className="section-title">
            Meet the guardians<br />of this medicine
          </h2>
          <p className="section-subtitle" style={{ color: "rgba(244,239,228,0.7)" }}>
            We don&apos;t buy from distributors. We sit with the makers. Our partners in nine tribal
            nations across the Brazilian Amazon.
          </p>
          <div className="tribes-grid">
            {[
              { avatar: "🌿", name: "Panã", nation: "Katukina Nation" },
              { avatar: "⭐", name: "Xiti", nation: "Nukini Nation" },
              { avatar: "🌊", name: "Shawãcaiá", nation: "Shawãdawa Nation" },
              { avatar: "🌸", name: "Nawashahu", nation: "Yawanawá Nation" },
            ].map((t) => (
              <div key={t.name} className="tribe-card">
                <div className="tribe-avatar">{t.avatar}</div>
                <p className="tribe-name">{t.name}</p>
                <p className="tribe-nation">{t.nation}</p>
              </div>
            ))}
          </div>
          <div className="tribes-stats">
            <div className="tribes-stat">
              <strong>9</strong>
              <p>Tribal nations in fair-trade partnership</p>
            </div>
            <div className="tribes-stat">
              <strong>100%</strong>
              <p>Crafted on indigenous land, ancestral methods</p>
            </div>
            <div className="tribes-stat">
              <strong>∞</strong>
              <p>Reinvested in reforestation &amp; cultural continuity</p>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section reviews-section">
        <div className="section-inner">
          <div className="reviews-header">
            <p className="section-eyebrow">From our circle</p>
            <h2 className="section-title">What seekers say after the ceremony</h2>
          </div>
          <div className="reviews-grid">
            {[
              { text: "I suffered with anxiety and focus. After Caboclo Paricá, it has really changed my life — more focus, calmness, and a sense of awareness. Customer for life.", author: "Brian N.", product: "Verified buyer · Caboclo Paricá" },
              { text: "This one really does help with dream recall. I'd take it at night an hour before bed, and several nights in a row I was remembering my dreams vividly upon waking.", author: "Thomas Iaci", product: "Verified buyer · Nukini 7 Stars" },
              { text: "Amazing Sananga — strong and fresh, in a nice and easy-to-use container. Exactly what I was looking for. Keep up the good work.", author: "Aaron Bilbao", product: "Verified buyer · Sananga Caboclo" },
            ].map((r) => (
              <div key={r.author} className="review-card">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">&ldquo;{r.text}&rdquo;</p>
                <div className="review-author">
                  <strong>{r.author}</strong>
                  <span>{r.product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL */}
      <section className="email-section">
        <div className="email-inner">
          <p className="section-eyebrow" style={{ textAlign: "center" }}>Free First Ceremony Guide</p>
          <h2 className="section-title" style={{ textAlign: "center" }}>Begin your practice with reverence.</h2>
          <p style={{ color: "var(--text-light)", fontSize: "15px" }}>
            Enter your email and we&apos;ll send you our 12-page First Ceremony Guide — plus 10% off your first order.
          </p>
          <ul className="email-features">
            <li>How to choose your first blend by intention</li>
            <li>Preparing your space and setting intention</li>
            <li>How to use a kuripe, step by step, safely</li>
            <li>Integration: what to do after the ceremony</li>
            <li>The story of the tribes behind the medicine</li>
          </ul>
          <div className="email-form">
            <input className="email-input" type="email" placeholder="your@email.com" />
            <button className="btn-gold">Send My Guide</button>
          </div>
          <p className="email-note">No noise. One thoughtful email a week. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section">
        <div className="section-inner">
          <p className="section-eyebrow">Good questions</p>
          <h2 className="section-title">Before you begin</h2>
          <div className="faq-list">
            {[
              { q: "Is hapé legal in the United States?", a: "Yes. Hapé is a tobacco product and is legal to purchase and possess in the US for adults 21 and over. We ship from our US warehouse to all 50 states, and we verify age at checkout." },
              { q: "I've never used hapé. Which blend should I start with?", a: "We recommend Caboclo Paricá for first-time users — it's grounding, well-balanced, and beginner-friendly. You can also take our short quiz to find the right blend based on your intention." },
              { q: "Is this the same as recreational tobacco or snuff?", a: "No. Hapé is a ceremonial medicine prepared in a sacred context by indigenous healers. It contains mapacho (Nicotiana rustica) and other ceremonial plants, and is intended for ritual use with reverence and intention." },
              { q: "How do I know the tribes are treated fairly?", a: "We work directly with indigenous communities, paying above fair-trade rates and reinvesting in reforestation and cultural preservation programs. You can meet our partners on the Our Tribes page." },
              { q: "How fast is shipping?", a: "Most orders ship within 24 hours from our US warehouse. Standard shipping takes 3–5 business days. Orders over $100 ship free." },
            ].map((f) => (
              <div key={f.q} className="faq-item">
                <p className="faq-q">{f.q}</p>
                <p className="faq-a">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo">Sacred <em>Connection</em></div>
              <p>
                Sacred Connection partners directly with indigenous communities of the Amazon,
                carrying authentic ceremonial medicine to seekers with fairness, reverence, and care.
              </p>
            </div>
            <div className="footer-col">
              <h4>Shop</h4>
              <ul>
                <li><a href="/product-category/sacred-snuff-rape-tobacco/">All Hapé</a></li>
                <li><a href="/product-category/sacred-snuff-rape-tobacco/shamanic-snuff/shamanic-snuff-tobacco-free/">Tobacco-Free Blends</a></li>
                <li><a href="/product-category/accesories/kuripe-pipe/">Kuripes &amp; Tepis</a></li>
                <li><a href="/product-category/naturals/sananga/">Sananga</a></li>
                <li><a href="/product-category/sacred-snuff-rape-tobacco/kits/">Ceremony Kits</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Learn</h4>
              <ul>
                <li><a href="/rape-the-sacred-snuff-of-the-amazon/">What is Hapé?</a></li>
                <li><a href="/blog/">Journal</a></li>
                <li><a href="/about/">About Us</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <ul>
                <li><a href="/contact/">Contact Us</a></li>
                <li><a href="/refund_returns/">Shipping &amp; Returns</a></li>
                <li><a href="/privacy-policy/">Privacy Policy</a></li>
                <li><a href="/my-account/">My Account</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-legal">
              For adults 21+. Hapé contains tobacco (Nicotiana rustica) unless marked tobacco-free.
              These products and statements have not been evaluated by the FDA and are not intended
              to diagnose, treat, cure, or prevent any disease. Use respectfully and responsibly.
            </p>
            <div className="footer-social">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">YouTube</a>
            </div>
            <p className="footer-copy">© 2026 Sacred Connection</p>
          </div>
        </div>
      </footer>
    </>
  );
}
