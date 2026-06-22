"use client";

export default function NewsletterForm() {
  return (
    <form
      className="newsletter-form"
      onSubmit={(e) => e.preventDefault()}
    >
      <input type="email" placeholder="your@email.com" className="newsletter-input" required />
      <button type="submit" className="btn-gold">Send My Guide</button>
    </form>
  );
}
