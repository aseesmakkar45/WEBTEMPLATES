import { createFileRoute, Link } from "@tanstack/react-router";
import clinicInterior from "@/assets/clinic-interior.jpg";
import specialists from "@/assets/specialists.jpg";
import { CtaBanner } from "@/components/site/CtaBanner";

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
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 text-xs font-bold tracking-wide text-brand-600 shadow-sm outline outline-1 outline-brand-600/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
              </span>
              ACCEPTING NEW PATIENTS
            </div>
            <h1 className="font-display text-5xl font-bold leading-tight text-brand-900 md:text-6xl">
              Precision care for your <span className="text-brand-600">forever smile.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              Experience advanced restorative and cosmetic dentistry in a space designed for your
              comfort. Our team combines clinical mastery with a boutique patient experience.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                to="/contact"
                className="rounded-full bg-brand-600 px-8 py-4 font-bold text-primary-foreground shadow-brand transition-all hover:-translate-y-0.5 hover:bg-brand-900"
              >
                Schedule Online
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <div className="size-10 rounded-full border-2 border-background bg-brand-200" />
                  <div className="size-10 rounded-full border-2 border-background bg-brand-400" />
                  <div className="size-10 rounded-full border-2 border-background bg-brand-600" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-brand-900">4.9/5 Rating</p>
                  <p className="text-ink-muted">From 1,200+ patients</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-20 -top-20 size-80 rounded-full bg-brand-200/60 blur-3xl" />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl outline outline-1 -outline-offset-1 outline-black/5">
              <img
                src={clinicInterior}
                alt="Bright modern dental clinic interior"
                width={1200}
                height={1500}
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
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
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {services.map((s, i) => (
              <article
                key={s.title}
                className="group cursor-pointer rounded-2xl border border-border p-8 transition-all hover:border-brand-100 hover:bg-brand-50/50 hover:shadow-lg"
              >
                <div className="mb-6 inline-flex size-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-primary-foreground">
                  {i === 0 && <div className="size-6 border-2 border-current" />}
                  {i === 1 && <div className="size-6 rounded-full border-2 border-current" />}
                  {i === 2 && <div className="size-6 border-t-2 border-current" />}
                </div>
                <h3 className="font-display text-xl font-bold text-brand-900">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Specialists */}
      <section className="bg-brand-900 py-24 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-square w-full overflow-hidden rounded-2xl outline outline-1 -outline-offset-1 outline-white/10">
                <img
                  src={specialists}
                  alt="Dr. Elena Vance and Dr. Marcus Thorne"
                  loading="lazy"
                  width={1200}
                  height={1200}
                  className="size-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
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
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-sm font-medium">
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
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
