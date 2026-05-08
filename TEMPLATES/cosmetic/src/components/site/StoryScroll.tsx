import { useRef, useEffect, useState } from "react";
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
  progress: number;
}) {
  const segment = 1 / total;
  const start = index * segment;
  const end = Math.min(1, start + segment);
  const fadeIn = start + segment * 0.15;
  const fadeOut = end - segment * 0.15;

  let opacity = 0;
  let y = 30;

  const isFirst = index === 0;
  const isLast = index === total - 1;

  if (isFirst) {
    if (progress <= fadeOut) {
      opacity = 1;
      y = 0;
    } else if (progress > fadeOut && progress <= end) {
      const p = (progress - fadeOut) / (end - fadeOut);
      opacity = 1 - p;
      y = -p * 30;
    } else {
      opacity = 0;
      y = -30;
    }
  } else if (isLast) {
    if (progress < start) {
      opacity = 0;
      y = 30;
    } else if (progress >= start && progress < fadeIn) {
      const p = (progress - start) / (fadeIn - start);
      opacity = p;
      y = 30 - p * 30;
    } else {
      opacity = 1;
      y = 0;
    }
  } else {
    if (progress < start) {
      opacity = 0;
      y = 30;
    } else if (progress >= start && progress < fadeIn) {
      const p = (progress - start) / (fadeIn - start);
      opacity = p;
      y = 30 - p * 30;
    } else if (progress >= fadeIn && progress <= fadeOut) {
      opacity = 1;
      y = 0;
    } else if (progress > fadeOut && progress <= end) {
      const p = (progress - fadeOut) / (end - fadeOut);
      opacity = 1 - p;
      y = -p * 30;
    } else {
      opacity = 0;
      y = -30;
    }
  }

  return (
    <div
      style={{
        opacity,
        transform: `translate3d(0, ${y}px, 0)`,
        transition: "opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1), transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        pointerEvents: opacity > 0.1 ? "auto" : "none",
        display: opacity > 0.001 ? "block" : "none",
      }}
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
      <div className="absolute inset-0 flex items-center">
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
      </div>
    </div>
  );
}

export function StoryScroll() {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const elementHeight = rect.height;
      const totalScrollable = elementHeight - window.innerHeight;
      
      const scrolled = -rect.top;
      const currentProgress = totalScrollable > 0 ? Math.min(1, Math.max(0, scrolled / totalScrollable)) : 0;
      
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentChapterNumber = Math.min(
    CHAPTERS.length,
    Math.max(1, Math.floor(progress * CHAPTERS.length) + 1)
  );

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
            progress={progress}
          />
        ))}

        <div className="absolute top-8 left-0 right-0 z-10 px-6 md:px-12 flex items-center justify-between text-mono text-cream/70">
          <span>— A Velour Story</span>
          <span>
            {String(currentChapterNumber).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}
          </span>
        </div>


        <div className="absolute bottom-0 left-0 right-0 h-px bg-cream/15 z-10">
          <div
            style={{ 
              width: `${progress * 100}%`,
              transformOrigin: "0% 50%",
              transition: "width 0.1s ease-out" 
            }}
            className="h-full bg-gold"
          />
        </div>
      </div>
    </section>
  );
}
