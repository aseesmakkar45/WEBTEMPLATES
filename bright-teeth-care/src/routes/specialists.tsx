import { createFileRoute } from "@tanstack/react-router";
import specialists from "@/assets/specialists.jpg";
import { CtaBanner } from "@/components/site/CtaBanner";

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
      <section className="bg-brand-900 py-24 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
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
          <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl outline outline-1 -outline-offset-1 outline-white/10">
            <img
              src={specialists}
              alt="The LuminaDental clinical team"
              loading="lazy"
              width={1200}
              height={1500}
              className="size-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2">
          {team.map((m) => (
            <article
              key={m.name}
              className="rounded-2xl border border-border p-8 transition-all hover:border-brand-100 hover:bg-brand-50/50 hover:shadow-lg"
            >
              <h2 className="font-display text-2xl font-bold text-brand-900">{m.name}</h2>
              <p className="mt-1 text-sm font-semibold text-brand-600">{m.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{m.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
