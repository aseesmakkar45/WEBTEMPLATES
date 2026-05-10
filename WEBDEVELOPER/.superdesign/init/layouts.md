# Layout Components

## Root Layout — `src/app/layout.tsx`
Next.js App Router layout. Wraps all pages with SmoothScroll, ClientCanvasWrapper (3D background), Header, and Footer.
```tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ClientCanvasWrapper from "@/components/ClientCanvasWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700;900&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SmoothScroll>
          <ClientCanvasWrapper />
          <Header />
          <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
```

## Header — `src/components/Header.tsx`
Fixed top nav. Transparent → frosted glass on scroll. Active link underline. Mobile overlay menu.
```tsx
const NAV_LINKS = [
  { href: "/web-design", label: "Web Design" },
  { href: "/ecommerce", label: "E-Commerce" },
  { href: "/seo", label: "SEO" },
  { href: "/portfolio", label: "Work" },
  { href: "/contact", label: "Contact" },
];
// Logo: "Anti<span color=orange>gravity</span>" in DM Serif Display
// CTA button: "Let's Talk →" with btn-primary class
```

## Footer — `src/components/Footer.tsx`
Dark background footer with 3-column grid: brand/tagline, services links, company links. Bottom copyright row.
