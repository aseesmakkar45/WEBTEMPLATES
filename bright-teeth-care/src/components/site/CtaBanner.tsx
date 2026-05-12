import { Link } from "@tanstack/react-router";

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="rounded-[2.5rem] bg-brand-600 px-8 py-16 text-center text-primary-foreground md:px-12 md:py-24">
        <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold md:text-5xl">
          Ready to experience a different kind of dentistry?
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-primary-foreground/80">
          Join 5,000+ happy patients who trust Lumina for their oral health. No judgement, just
          world-class care.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/book"
            className="w-full rounded-full bg-background px-8 py-4 font-bold text-brand-900 transition-transform hover:scale-105 sm:w-auto"
          >
            Book Your First Visit
          </Link>
          <a
            href="tel:+15552349000"
            className="w-full rounded-full bg-brand-900/20 px-8 py-4 font-bold text-primary-foreground outline outline-1 outline-primary-foreground/30 backdrop-blur-sm transition-transform hover:scale-105 sm:w-auto"
          >
            Call (555) 234-9000
          </a>
        </div>
      </div>
    </section>
  );
}
