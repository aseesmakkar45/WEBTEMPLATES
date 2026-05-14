import { createFileRoute } from "@tanstack/react-router";
import { CtaBanner } from "@/components/site/CtaBanner";

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
      <section className="bg-brand-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
            Tools of the trade
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold text-brand-900 md:text-6xl">
            Digital precision, human warmth.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            We invest in the same technology used at leading academic dental institutions — so your
            care is faster, more accurate, and more comfortable.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 lg:grid-cols-3">
          {tech.map((t) => (
            <article key={t.name} className="rounded-2xl border border-border p-8">
              <h2 className="font-display text-xl font-bold text-brand-900">{t.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{t.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
