import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Antigravity Studio — Premium Web Design & Development",
  description:
    "Premium web design & development for ambitious brands ready to stand out and scale. Based in India.",
  keywords: [
    "freelance web designer India",
    "web developer",
    "Next.js developer",
    "UI/UX design",
    "e-commerce development",
    "React developer",
  ],
  authors: [{ name: "Antigravity Studio" }],
  openGraph: {
    title: "Antigravity Studio — Premium Web Design & Development",
    description:
      "Premium web design & development for ambitious brands ready to stand out and scale.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
