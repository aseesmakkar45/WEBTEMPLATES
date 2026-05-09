import { createFileRoute } from "@tanstack/react-router";
import { CtaBanner } from "@/components/site/CtaBanner";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — LuminaDental" },
      {
        name: "description",
        content:
          "Explore Lumina's complete dental services: general, cosmetic, restorative, implants, orthodontics, and emergency care.",
      },
      { property: "og:title", content: "Services — LuminaDental" },
      {
        property: "og:description",
        content: "Comprehensive dental care under one roof.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const services = [
  {
    title: "General Dentistry",
    body:
      "Routine cleanings, exams, fillings, and preventative imaging to keep your smile healthy for life.",
  },
  {
    title: "Cosmetic Artistry",
    body: "Veneers, bonding, professional whitening, and full smile makeovers.",
  },
  {
    title: "Dental Implants",
    body: "Permanent tooth replacement that looks and functions like the real thing.",
  },
  {
    title: "Orthodontics",
    body: "Invisible aligners and modern braces tailored to adults and teens.",
  },
  {
    title: "Periodontics",
    body: "Specialist gum care, scaling, and minimally-invasive periodontal therapy.",
  },
  {
    title: "Emergency Care",
    body: "Same-day appointments for pain, trauma, and urgent restorative needs.",
  },
];

function ServicesPage() {
  return (
    <main>
      <section className="bg-brand-50 py-24 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 size-80 rounded-full bg-brand-100/40 blur-3xl animate-float-slow" />
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <ScrollReveal variant="fade" delay={50} duration={600}>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600">Our practice</p>
          </ScrollReveal>
          <ScrollReveal variant="slide-up" delay={150} duration={800}>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold text-brand-900 md:text-6xl">
              A complete spectrum of care.
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="slide-up" delay={250} duration={800}>
            <p className="mt-6 max-w-2xl text-lg text-ink-muted">
              Every treatment is delivered by specialists working in one connected practice — so your
              care plan stays seamless from consultation through recovery.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ScrollReveal
              key={s.title}
              variant="slide-up"
              delay={(i % 3) * 150}
              duration={800}
            >
              <article
                className="group rounded-2xl border border-border p-8 transition-all duration-300 hover:border-brand-200 hover:bg-brand-50/30 hover:shadow-xl hover:-translate-y-1.5"
              >
                <div className="mb-6 font-display text-sm font-bold text-brand-600 transition-transform duration-300 group-hover:scale-110 inline-block">
                  0{i + 1}
                </div>
                <h2 className="font-display text-xl font-bold text-brand-900 transition-colors duration-300 group-hover:text-brand-600">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{s.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
