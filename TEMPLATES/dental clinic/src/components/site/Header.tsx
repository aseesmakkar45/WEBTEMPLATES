import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-brand-100/50 bg-background/95 shadow-sm backdrop-blur-md"
          : "border-border bg-background/80 backdrop-blur-md"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 ${
          isScrolled ? "py-3" : "py-5"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className="size-8 rounded-lg bg-brand-600 transition-transform duration-500 group-hover:rotate-12"
            aria-hidden
          />
          <span className="font-display text-xl font-bold tracking-tight text-brand-900 transition-colors duration-300 group-hover:text-brand-600">
            LuminaDental
          </span>
        </Link>
        <div className="hidden space-x-8 text-sm font-medium text-ink-muted md:flex">
          <Link
            to="/services"
            className="nav-link-hover transition-colors hover:text-brand-600"
            activeProps={{ className: "text-brand-600 after:scale-x-100!" }}
          >
            Services
          </Link>
          <Link
            to="/specialists"
            className="nav-link-hover transition-colors hover:text-brand-600"
            activeProps={{ className: "text-brand-600 after:scale-x-100!" }}
          >
            Our Specialists
          </Link>
          <Link
            to="/technology"
            className="nav-link-hover transition-colors hover:text-brand-600"
            activeProps={{ className: "text-brand-600 after:scale-x-100!" }}
          >
            Technology
          </Link>
          <Link
            to="/contact"
            className="nav-link-hover transition-colors hover:text-brand-600"
            activeProps={{ className: "text-brand-600 after:scale-x-100!" }}
          >
            Contact
          </Link>
        </div>
        <Link
          to="/book"
          className="rounded-full bg-brand-900 px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:bg-brand-600 hover:shadow-brand active:scale-95"
        >
          Book Appointment
        </Link>
      </div>
    </nav>
  );
}

