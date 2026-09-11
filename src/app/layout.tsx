import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instagram",
  description: "Ghafer Private Videos",
  openGraph: {
    title: "Instagram",
    description: "Ghafer Private Videos",
  },
  twitter: {
    card: "summary",
    title: "Instagram",
    description: "Ghafer Private Videos",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
