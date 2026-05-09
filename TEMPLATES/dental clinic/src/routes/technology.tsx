import { createFileRoute } from "@tanstack/react-router";
import { CtaBanner } from "@/components/site/CtaBanner";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology — LuminaDental" },
      {
        name: "description",
        content:
          "The advanced technology behind LuminaDental: 3D imaging, intraoral scanning, and laser-assisted dentistry.",
      },
      { property: "og:title", content: "Technology — LuminaDental" },
      {
        property: "og:description",
        content: "Digital dentistry tools that make care faster, more precise, and more comfortable.",
      },
      { property: "og:url", content: "/technology" },
    ],
    links: [{ rel: "canonical", href: "/technology" }],
  }),
  component: TechnologyPage,
});

const tech = [
  {
    name: "3D Cone Beam CT",
    body: "Low-dose volumetric imaging for precision implant planning and airway analysis.",
  },
  {
    name: "Intraoral Scanning",
    body: "Goodbye to gooey impressions. Digital scans capture your bite in minutes.",
  },
  {
    name: "Laser Dentistry",
    body: "Soft-tissue lasers for faster healing, less bleeding, and gentler treatment.",
  },
  {
    name: "AI-Assisted Diagnostics",
    body: "Pattern detection on radiographs catches issues earlier than the human eye alone.",
  },
  {
    name: "In-House 3D Printing",
    body: "Surgical guides, night guards, and aligners produced on-site.",
  },
  {
    name: "Same-Day Crowns",
    body: "Milled-in-office ceramic restorations — one visit, no temporaries.",
  },
];

function TechnologyPage() {
  return (
    <main>
      <section className="bg-brand-50 py-24 relative overflow-hidden">
        <div className="absolute -left-20 -top-20 size-80 rounded-full bg-brand-100/40 blur-3xl animate-float-slow" />
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <ScrollReveal variant="fade" delay={50} duration={600}>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
              Tools of the trade
            </p>
          </ScrollReveal>
          <ScrollReveal variant="slide-up" delay={150} duration={800}>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold text-brand-900 md:text-6xl">
              Digital precision, human warmth.
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="slide-up" delay={250} duration={800}>
            <p className="mt-6 max-w-2xl text-lg text-ink-muted">
              We invest in the same technology used at leading academic dental institutions — so your
              care is faster, more accurate, and more comfortable.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 lg:grid-cols-3">
          {tech.map((t, i) => (
            <ScrollReveal
              key={t.name}
              variant="slide-up"
              delay={(i % 3) * 150}
              duration={800}
            >
              <article
                className="group cursor-pointer rounded-2xl border border-border p-8 transition-all duration-300 hover:border-brand-200 hover:bg-brand-50/30 hover:shadow-xl hover:-translate-y-1.5"
              >
                <h2 className="font-display text-xl font-bold text-brand-900 transition-colors duration-300 group-hover:text-brand-600">{t.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{t.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
