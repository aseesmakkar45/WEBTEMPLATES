import { createFileRoute } from "@tanstack/react-router";
import specialists from "@/assets/specialists.jpg";
import { CtaBanner } from "@/components/site/CtaBanner";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const Route = createFileRoute("/specialists")({
  head: () => ({
    meta: [
      { title: "Our Specialists — LuminaDental" },
      {
        name: "description",
        content:
          "Meet the clinicians behind LuminaDental — board-certified specialists in cosmetic, restorative, and surgical dentistry.",
      },
      { property: "og:title", content: "Our Specialists — LuminaDental" },
      {
        property: "og:description",
        content: "Board-certified clinicians with decades of combined experience.",
      },
      { property: "og:url", content: "/specialists" },
    ],
    links: [{ rel: "canonical", href: "/specialists" }],
  }),
  component: SpecialistsPage,
});

const team = [
  {
    name: "Dr. Elena Vance",
    role: "Cosmetic & Restorative Lead",
    bio: "Fellow of the American Academy of Cosmetic Dentistry. 15+ years specializing in veneers and smile design.",
  },
  {
    name: "Dr. Marcus Thorne",
    role: "Oral Surgeon",
    bio: "Implantology and bone-grafting specialist trained at UCSF. Pioneer of guided-surgery protocols.",
  },
  {
    name: "Dr. Priya Shah",
    role: "Orthodontist",
    bio: "Invisible-aligner expert with a focus on adult orthodontics and TMJ-conscious alignment.",
  },
  {
    name: "Dr. Noah Berg",
    role: "Periodontist",
    bio: "Minimally-invasive gum therapy and laser-assisted periodontal care.",
  },
];

function SpecialistsPage() {
  return (
    <main>
      <section className="bg-brand-900 py-24 text-primary-foreground relative overflow-hidden">
        <div className="absolute -left-20 -top-20 size-80 rounded-full bg-brand-600/10 blur-3xl animate-float" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center relative z-10">
          <ScrollReveal variant="slide-up" duration={800}>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-400">
                Clinical Team
              </p>
              <h1 className="mt-4 font-display text-5xl font-bold leading-tight md:text-6xl">
                Specialists who treat you like family.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-primary-foreground/70">
                Decades of combined experience, one unified standard of care. Every clinician at
                Lumina is board-certified and committed to ongoing education.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="blur-fade" delay={200} duration={1000}>
            <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl outline outline-1 -outline-offset-1 outline-white/10 transition-transform duration-500 hover:scale-[1.01]">
              <img
                src={specialists}
                alt="The LuminaDental clinical team"
                loading="lazy"
                width={1200}
                height={1500}
                className="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2">
          {team.map((m, i) => (
            <ScrollReveal
              key={m.name}
              variant="slide-up"
              delay={(i % 2) * 150}
              duration={800}
            >
              <article
                className="group rounded-2xl border border-border p-8 transition-all duration-300 hover:border-brand-200 hover:bg-brand-50/30 hover:shadow-xl hover:-translate-y-1.5"
              >
                <h2 className="font-display text-2xl font-bold text-brand-900 transition-colors duration-300 group-hover:text-brand-600">{m.name}</h2>
                <p className="mt-1 text-sm font-semibold text-brand-600">{m.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{m.bio}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
