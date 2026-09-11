import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instagram",
  description: "Reels Insta 😂😂",
  openGraph: {
    title: "Instagram",
    description: "Reels Insta 😂😂",
  },
  twitter: {
    card: "summary",
    title: "Instagram",
    description: "Reels Insta 😂😂",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
