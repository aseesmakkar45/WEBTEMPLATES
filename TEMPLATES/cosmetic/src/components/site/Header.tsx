import { useEffect, useState } from "react";

const NAV = [
  { label: "Maison", href: "#about" },
  { label: "Collection", href: "#collection" },
  { label: "Atelier", href: "#atelier" },
  { label: "Journal", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-cream/75 border-b border-border/60 py-4"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <span className="w-10 h-10 rounded-full border border-gold/60 flex items-center justify-center text-mono text-gold">
            MV
          </span>
          <div className="leading-tight">
            <div className="text-display text-xl text-ink">Maison Velour</div>
            <div className="text-mono text-muted-foreground">Beauté · Paris</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-mono text-ink hover:text-gold transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden md:inline-flex text-mono text-ink hover:text-gold transition"
          >
            Sign in
          </a>
          <a
            href="#contact"
            className="rounded-full px-6 py-3 text-mono bg-ink text-cream hover:bg-gold hover:text-ink transition-colors duration-500"
          >
            Discover
          </a>
        </div>
      </div>
    </header>
  );
}
