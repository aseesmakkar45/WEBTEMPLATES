import { createFileRoute, Link } from "@tanstack/react-router";
import clinicInterior from "@/assets/clinic-interior.jpg";
import specialists from "@/assets/specialists.jpg";
import { CtaBanner } from "@/components/site/CtaBanner";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LuminaDental — Precision care for your forever smile" },
      {
        name: "description",
        content:
          "Advanced restorative and cosmetic dentistry in San Francisco. Accepting new patients. Book online today.",
      },
      { property: "og:title", content: "LuminaDental — Precision care for your forever smile" },
      {
        property: "og:description",
        content:
          "Advanced restorative and cosmetic dentistry in a space designed for your comfort.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const services = [
  {
    title: "General Dentistry",
    body:
      "Preventative care, fillings, and digital imaging to keep your oral health at its peak year-round.",
  },
  {
    title: "Cosmetic Artistry",
    body:
      "Veneers, professional whitening, and full smile makeovers tailored to your facial aesthetics.",
  },
  {
    title: "Dental Implants",
    body:
      "State-of-the-art tooth replacement solutions that look, feel, and function like natural teeth.",
  },
];

function Index() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-50 pb-24 pt-16">
        <div className="absolute -left-20 -bottom-20 size-80 rounded-full bg-brand-100/40 blur-3xl animate-float" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <ScrollReveal variant="fade" delay={100} duration={600}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 text-xs font-bold tracking-wide text-brand-600 shadow-sm outline outline-1 outline-brand-600/10">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
                </span>
                ACCEPTING NEW PATIENTS
              </div>
            </ScrollReveal>
            <ScrollReveal variant="slide-up" delay={250} duration={800}>
              <h1 className="font-display text-5xl font-bold leading-tight text-brand-900 md:text-6xl">
                Precision care for your <span className="text-brand-600">forever smile.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal variant="slide-up" delay={350} duration={800}>
              <p className="mt-6 text-lg leading-relaxed text-ink-muted">
                Experience advanced restorative and cosmetic dentistry in a space designed for your
                comfort. Our team combines clinical mastery with a boutique patient experience.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="slide-up" delay={450} duration={800}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  to="/contact"
                  className="rounded-full bg-brand-600 px-8 py-4 font-bold text-primary-foreground shadow-brand transition-all duration-300 hover:-translate-y-1 hover:bg-brand-900 hover:shadow-lg"
                >
                  Schedule Online
                </Link>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    <div className="size-10 rounded-full border-2 border-background bg-brand-200 transition-transform duration-300 hover:scale-110" />
                    <div className="size-10 rounded-full border-2 border-background bg-brand-400 transition-transform duration-300 hover:scale-110" />
                    <div className="size-10 rounded-full border-2 border-background bg-brand-600 transition-transform duration-300 hover:scale-110" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-brand-900">4.9/5 Rating</p>
                    <p className="text-ink-muted">From 1,200+ patients</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal variant="blur-fade" delay={300} duration={1000} className="relative">
            <div className="absolute -right-20 -top-20 size-80 rounded-full bg-brand-200/60 blur-3xl animate-float-slow" />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl outline outline-1 -outline-offset-1 outline-black/5 transition-transform duration-500 hover:scale-[1.01]">
              <img
                src={clinicInterior}
                alt="Bright modern dental clinic interior"
                width={1200}
                height={1500}
                className="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal variant="slide-up" duration={800}>
            <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-bold text-brand-900 md:text-4xl">
                  Comprehensive Care
                </h2>
                <p className="mt-4 text-ink-muted">
                  From routine cleanings to complex surgical procedures, we offer a full spectrum of
                  dental services under one roof.
                </p>
              </div>
              <Link
                to="/services"
                className="group flex items-center gap-2 font-semibold text-brand-600"
              >
                View all services
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} variant="slide-up" delay={i * 150} duration={800}>
                <article
                  className="group cursor-pointer rounded-2xl border border-border p-8 transition-all duration-300 hover:border-brand-200 hover:bg-brand-50/30 hover:shadow-xl hover:-translate-y-1.5"
                >
                  <div className="mb-6 inline-flex size-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:bg-brand-600 group-hover:text-primary-foreground group-hover:scale-110">
                    {i === 0 && <div className="size-6 border-2 border-current rounded" />}
                    {i === 1 && <div className="size-6 rounded-full border-2 border-current" />}
                    {i === 2 && <div className="size-6 border-t-2 border-current" />}
                  </div>
                  <h3 className="font-display text-xl font-bold text-brand-900 transition-colors duration-300 group-hover:text-brand-600">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{s.body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Specialists */}
      <section className="bg-brand-900 py-24 text-primary-foreground relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 size-80 rounded-full bg-brand-600/10 blur-3xl animate-float-slow" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <ScrollReveal variant="blur-fade" duration={900} className="order-2 lg:order-1">
              <div className="aspect-square w-full overflow-hidden rounded-2xl outline outline-1 -outline-offset-1 outline-white/10 transition-transform duration-500 hover:scale-[1.01]">
                <img
                  src={specialists}
                  alt="Dr. Elena Vance and Dr. Marcus Thorne"
                  loading="lazy"
                  width={1200}
                  height={1200}
                  className="size-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal variant="slide-up" delay={200} duration={800} className="order-1 lg:order-2">
              <div>
                <h2 className="font-display text-4xl font-bold leading-tight">
                  Where technology meets <span className="text-brand-400">human expertise.</span>
                </h2>
                <p className="mt-6 text-lg text-primary-foreground/70">
                  Led by Dr. Elena Vance and Dr. Marcus Thorne, our practice is at the forefront of
                  digital dentistry. We use AI-assisted diagnostics and 3D printing to provide more
                  accurate, faster results.
                </p>
                <ul className="mt-10 space-y-4">
                  {[
                    "3D Cone Beam Computed Tomography (CBCT)",
                    "Intraoral Digital Scanning (No more putty)",
                    "Laser-Assisted Micro-Dentistry",
                  ].map((item, idx) => (
                    <li key={item} className="flex items-center gap-4 text-sm font-medium transition-transform duration-300 hover:translate-x-2">
                      <div className="size-2 rounded-full bg-brand-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/specialists"
                  className="mt-12 inline-block border-b-2 border-brand-400 pb-1 font-bold text-brand-400 transition-colors hover:border-primary-foreground hover:text-primary-foreground"
                >
                  Meet the Clinical Team
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
