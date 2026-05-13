import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-brand-600" aria-hidden />
          <span className="font-display text-xl font-bold tracking-tight text-brand-900">
            LuminaDental
          </span>
        </Link>
        <div className="hidden space-x-8 text-sm font-medium text-ink-muted md:flex">
          <Link to="/services" className="transition-colors hover:text-brand-600" activeProps={{ className: "text-brand-600" }}>
            Services
          </Link>
          <Link to="/specialists" className="transition-colors hover:text-brand-600" activeProps={{ className: "text-brand-600" }}>
            Our Specialists
          </Link>
          <Link to="/technology" className="transition-colors hover:text-brand-600" activeProps={{ className: "text-brand-600" }}>
            Technology
          </Link>
          <Link to="/contact" className="transition-colors hover:text-brand-600" activeProps={{ className: "text-brand-600" }}>
            Contact
          </Link>
        </div>
        <Link
          to="/book"
          className="rounded-full bg-brand-900 px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-brand-600 active:scale-95"
        >
          Book Appointment
        </Link>
      </div>
    </nav>
  );
}
