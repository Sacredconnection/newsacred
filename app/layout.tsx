import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sacred Connection — Ceremonial Hapé, Direct From the Amazon",
  description: "Authentic ceremonial hapé sourced directly from 9 tribal nations in the Brazilian Amazon. Fair-trade, 100% pure, ships from the USA.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
