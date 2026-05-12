import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 pb-16">
      <div className="grid gap-12 border-t border-border pt-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-6 rounded bg-brand-600" aria-hidden />
            <span className="font-display text-lg font-bold text-brand-900">Lumina</span>
          </div>
          <p className="mt-4 text-sm text-ink-muted">
            A brighter standard of care in the heart of the city.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Location</h4>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            1200 Medical Plaza, Suite 400
            <br />
            San Francisco, CA 94103
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Hours</h4>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            <li>Mon – Thu: 8am – 6pm</li>
            <li>Fri: 8am – 3pm</li>
            <li>Sat: By Appointment</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm font-medium text-ink-muted">
            <li>
              <Link to="/services" className="hover:text-brand-600">Services</Link>
            </li>
            <li>
              <Link to="/specialists" className="hover:text-brand-600">Specialists</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-brand-600">Emergency Care</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-16 text-center">
        <p className="text-xs text-ink-muted/70">
          © {new Date().getFullYear()} Lumina Dental Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
