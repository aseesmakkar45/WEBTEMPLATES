import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reverie | Fall Into Dreams",
  description: "Singular voyages to astonishing destinations, shaped for those who seek beauty beyond the ordinary and the known.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
