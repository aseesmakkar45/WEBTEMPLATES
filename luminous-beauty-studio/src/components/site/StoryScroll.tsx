import { motion, useScroll, useTransform, useMotionTemplate, type MotionValue } from "motion/react";
import { useRef } from "react";
import provence from "@/assets/story-provence.jpg";
import atelier from "@/assets/atelier.jpg";
import note from "@/assets/story-note.jpg";
import drop from "@/assets/gallery-2.jpg";
import portrait from "@/assets/model-portrait.jpg";

type Chapter = {
  year: string;
  kicker: string;
  title: string;
  accent: string;
  body: string;
  img: string;
};

const CHAPTERS: Chapter[] = [
  {
    year: "MMXII",
    kicker: "Chapter I",
    title: "It began with a",
    accent: "question.",
    body:
      "What if beauty asked for less of you — and gave back more? Camille left her Grasse perfumery to find out, with a single notebook and a borrowed key to an empty Paris atelier.",
    img: note,
  },
  {
    year: "MMXIII",
    kicker: "Chapter II",
    title: "A farm, found in",
    accent: "Provence.",
    body:
      "Twelve hectares of cold-pressed lavender, immortelle and rose centifolia. Every ingredient that crosses our atelier door begins here — under the same sun, harvested by the same four hands.",
    img: provence,
  },
  {
    year: "MMXVI",
    kicker: "Chapter III",
    title: "One hundred",
    accent: "iterations.",
    body:
      "Behind a discreet champagne door on rue de l'Université, eighteen artisans now compose each formula by hand. Nothing leaves the bench until Camille's initials are pressed into wax.",
    img: atelier,
  },
  {
    year: "MMXX",
    kicker: "Chapter IV",
    title: "Gold,",
    accent: "distilled.",
    body:
      "Our signature Sérum Lumière took seven years to perfect — a single golden droplet that holds 32 botanicals and the patience of an entire decade.",
    img: drop,
  },
  {
    year: "Today",
    kicker: "Chapter V",
    title: "Yours,",
    accent: "quietly.",
    body:
      "A maison is not a brand. It is an inheritance. Wear it lightly, return your vessels, and let beauty live as it was meant to — close to the skin, far from the noise.",
    img: portrait,
  },
];

function ChapterPanel({
  chapter,
  index,
  total,
  progress,
}: {
  chapter: Chapter;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / total;
  const start = index * segment;
  const end = Math.min(1, start + segment);
  const fadeIn = start + segment * 0.15;
  const fadeOut = end - segment * 0.15;

  const opacity = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    [0, 1, 1, 0],
    { clamp: true },
  );
  const y = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    [50, 0, 0, -50],
    { clamp: true },
  );

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={chapter.img}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/40" />
      </div>

      {/* Text */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 flex items-center"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <div className="text-display text-5xl md:text-6xl text-gold">
              {chapter.year}
            </div>
          </div>
          <div className="md:col-span-8 md:col-start-4 text-cream">
            <div className="text-mono text-gold mb-6">— {chapter.kicker}</div>
            <h3 className="text-display text-5xl md:text-7xl leading-[1.05] max-w-3xl">
              {chapter.title}{" "}
              <span className="italic text-gold/90">{chapter.accent}</span>
            </h3>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/75">
              {chapter.body}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Counter({ progress, total }: { progress: MotionValue<number>; total: number }) {
  const current = useTransform(progress, (v) => {
    const n = Math.min(total, Math.max(1, Math.floor(v * total) + 1));
    return String(n).padStart(2, "0");
  });
  const text = useMotionTemplate`${current} / ${String(total).padStart(2, "0")}`;
  return <motion.span>{text}</motion.span>;
}

export function StoryScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });

  return (
    <section
      id="story"
      ref={ref}
      className="relative bg-ink"
      style={{ height: `${CHAPTERS.length * 110}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        {CHAPTERS.map((c, i) => (
          <ChapterPanel
            key={c.kicker}
            chapter={c}
            index={i}
            total={CHAPTERS.length}
            progress={scrollYProgress}
          />
        ))}

        <div className="absolute top-8 left-0 right-0 z-10 px-6 md:px-12 flex items-center justify-between text-mono text-cream/70">
          <span>— A Velour Story</span>
          <Counter progress={scrollYProgress} total={CHAPTERS.length} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-cream/15 z-10">
          <motion.div
            style={{ scaleX: barScaleX, transformOrigin: "0% 50%" }}
            className="h-full bg-gold"
          />
        </div>
      </div>
    </section>
  );
}
