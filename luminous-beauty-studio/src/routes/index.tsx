import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Header } from "@/components/site/Header";
import { Marquee } from "@/components/site/Marquee";
import { Reveal } from "@/components/site/Reveal";
import { StoryScroll } from "@/components/site/StoryScroll";
import hero from "@/assets/hero.jpg";
import serum from "@/assets/product-serum.jpg";
import lip from "@/assets/product-lip.jpg";
import cream from "@/assets/product-cream.jpg";
import fragrance from "@/assets/product-fragrance.jpg";
import portrait from "@/assets/model-portrait.jpg";
import atelier from "@/assets/atelier.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Velour — Beauté · Paris" },
      {
        name: "description",
        content:
          "A French atelier of quiet luxury cosmetics. Bespoke skincare, color and fragrance, handcrafted in Paris.",
      },
      { property: "og:title", content: "Maison Velour — Beauté · Paris" },
      {
        property: "og:description",
        content: "Where modern beauty meets quiet luxury. Handcrafted cosmetics from Paris.",
      },
    ],
  }),
  component: Index,
});

const COLLECTION = [
  {
    name: "Sérum Lumière",
    type: "Skincare",
    price: "€145",
    desc: "A featherlight elixir of botanical squalane and vitamin C — for a quiet, lit-from-within radiance.",
    img: serum,
  },
  {
    name: "Crème Velours N°1",
    type: "Skincare",
    price: "€220",
    desc: "Our signature cashmere cream. Twenty-four hours of cushioned hydration, scented with neroli.",
    img: cream,
  },
  {
    name: "Rouge Couture",
    type: "Color",
    price: "€78",
    desc: "Hand-poured satin lipstick in eleven couture-grade shades. Refined matte, never dry.",
    img: lip,
  },
  {
    name: "Eau de Velours",
    type: "Fragrance",
    price: "€195",
    desc: "An amber-rose extrait composed in Grasse. Worn close to the skin like a private confession.",
    img: fragrance,
  },
];

const PILLARS = [
  { n: "01", t: "Bespoke", d: "Each formula begins with a skin consultation — never a category." },
  { n: "02", t: "French Botanical", d: "Cold-pressed actives sourced from a single farm in Provence." },
  { n: "03", t: "Atelier-Made", d: "Hand-poured, hand-labelled, hand-numbered in batches of 300." },
  { n: "04", t: "Refillable", d: "Every vessel is designed to be returned, refilled, returned again." },
];

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div id="top" className="min-h-screen bg-cream text-ink overflow-x-hidden">
      <Header />

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-32 pb-16 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 -z-10">
          <img
            src={hero}
            alt="Maison Velour atelier"
            className="w-full h-[120%] object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/50 via-cream/20 to-cream" />
          <div className="absolute inset-0 bg-cream/30" />
        </motion.div>

        <motion.div style={{ opacity }} className="relative max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-full border border-gold/60 bg-cream/70 backdrop-blur px-5 py-2 mb-10">
              <span className="text-gold text-sm">✦</span>
              <span className="text-mono text-ink">Voted #1 Quiet Luxury Beauty · 2025</span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="text-display text-[clamp(3rem,9vw,9rem)] leading-[0.95] text-ink">
              Where beauty
              <br />
              meets{" "}
              <span className="italic text-display text-gold/90">quiet luxury.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-10 max-w-2xl mx-auto text-lg leading-relaxed text-muted-foreground">
              A Parisian atelier composing skincare, color and fragrance for those
              who prefer their luxury whispered. Hand-formulated in micro-batches —
              tailored, considered, timeless.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#collection"
                className="rounded-full px-9 py-4 text-mono bg-ink text-cream hover:bg-gold hover:text-ink transition-colors duration-500"
              >
                Discover the Collection
              </a>
              <a
                href="#atelier"
                className="rounded-full px-9 py-4 text-mono border border-ink/30 text-ink hover:border-gold hover:text-gold transition-colors duration-500"
              >
                Visit the Atelier
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              {[
                { v: "12+", l: "Years of Craft" },
                { v: "9.8★", l: "House Rating" },
                { v: "40k", l: "Devotees" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-display text-4xl md:text-5xl text-ink">{s.v}</div>
                  <div className="mt-2 text-mono text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-mono text-muted-foreground"
        >
          <span className="block w-px h-12 bg-gold/60 mx-auto mb-3 animate-pulse" />
          scroll
        </motion.div>
      </section>

      <Marquee />

      {/* ABOUT */}
      <section id="about" className="py-32 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-12 items-center">
          <Reveal className="md:col-span-5">
            <div className="text-mono text-gold mb-6">— Our Maison</div>
            <h2 className="text-display text-5xl md:text-7xl leading-tight">
              A house crafted{" "}
              <span className="italic text-gold/90">for those who appreciate</span>{" "}
              the quiet art of beauty.
            </h2>
          </Reveal>

          <div className="md:col-span-7 grid md:grid-cols-2 gap-10">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Founded in 2013 by master perfumer Camille Aury, Maison Velour was
                born from a singular obsession: to translate the French art of
                discretion into objects of beauty.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Behind our champagne-lacquered doors, an atelier of certified
                artisans composes skincare, color and fragrance — formulas refined
                over a hundred iterations, never one more.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="grid grid-cols-2 gap-8 border-l border-border pl-8">
                <div>
                  <div className="text-mono text-muted-foreground">Maison since</div>
                  <div className="text-display text-5xl mt-2">2013</div>
                </div>
                <div>
                  <div className="text-mono text-muted-foreground">Artisans</div>
                  <div className="text-display text-5xl mt-2">18</div>
                </div>
                <div>
                  <div className="text-mono text-muted-foreground">Formulas</div>
                  <div className="text-display text-5xl mt-2">47</div>
                </div>
                <div>
                  <div className="text-mono text-muted-foreground">Boutiques</div>
                  <div className="text-display text-5xl mt-2">04</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SCROLL STORY */}
      <StoryScroll />

      {/* COLLECTION */}
      <section id="collection" className="py-32 px-6 md:px-10 bg-sand/40 border-y border-border/60">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-20">
            <Reveal>
              <div className="text-mono text-gold mb-4">— The Collection</div>
              <h2 className="text-display text-5xl md:text-7xl leading-tight max-w-2xl">
                Four houses. <span className="italic text-gold/90">One signature.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="max-w-md text-muted-foreground">
                Skincare, color, fragrance and ceremony — composed in our Paris
                atelier and released in numbered editions.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {COLLECTION.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <a
                  href="#contact"
                  className="group block rounded-md overflow-hidden bg-cream"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute top-5 left-5 text-mono bg-cream/85 backdrop-blur px-3 py-1.5 rounded-full">
                      {p.type}
                    </div>
                    <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="rounded-full bg-ink text-cream text-mono px-5 py-3">
                        Discover →
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-display text-3xl">{p.name}</h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed max-w-md">
                        {p.desc}
                      </p>
                    </div>
                    <div className="text-display text-2xl text-gold shrink-0">{p.price}</div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS / EDITORIAL with portrait */}
      <section className="py-32 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-14 items-center">
          <Reveal className="md:col-span-5">
            <div className="relative overflow-hidden rounded-md aspect-[4/5]" style={{ boxShadow: "var(--shadow-soft)" }}>
              <img src={portrait} alt="Velour campaign" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-cream">
                <div>
                  <div className="text-mono">Campagne Hiver</div>
                  <div className="text-display text-2xl italic">N°XXVII</div>
                </div>
                <div className="text-mono">Paris · 2025</div>
              </div>
            </div>
          </Reveal>

          <div className="md:col-span-7">
            <Reveal>
              <div className="text-mono text-gold mb-6">— Why Velour</div>
              <h2 className="text-display text-5xl md:text-6xl leading-tight">
                Beauty that lives quietly,{" "}
                <span className="italic text-gold/90">and lasts.</span>
              </h2>
            </Reveal>

            <div className="mt-14 grid sm:grid-cols-2 gap-x-10 gap-y-12">
              {PILLARS.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.08}>
                  <div className="border-t border-border pt-6">
                    <div className="text-mono text-gold">{p.n}</div>
                    <h3 className="text-display text-2xl mt-3">{p.t}</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{p.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ATELIER */}
      <section id="atelier" className="relative py-32 px-6 md:px-10 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-luxe)" }}
        />
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="text-mono text-gold mb-6">— The Atelier</div>
            <h2 className="text-display text-5xl md:text-6xl leading-tight">
              Composed by hand, in <span className="italic text-gold/90">the 7th.</span>
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
              Our Paris atelier sits behind a discreet champagne door on rue de
              l'Université. Inside, eighteen artisans — chemists, perfumers,
              colorists — labor over each formula as if it were the only one.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Nothing leaves the room until it earns Camille's signature, etched
              by hand on the underside of every box.
            </p>
            <a
              href="#contact"
              className="mt-10 inline-flex items-center gap-3 text-mono text-ink border-b border-gold pb-2 hover:text-gold transition"
            >
              Reserve a private visit →
            </a>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative aspect-[5/4] rounded-md overflow-hidden" style={{ boxShadow: "var(--shadow-soft)" }}>
              <img src={atelier} alt="Velour atelier" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-32 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
              <div>
                <div className="text-mono text-gold mb-4">— The Journal</div>
                <h2 className="text-display text-5xl md:text-6xl">From the house.</h2>
              </div>
              <a href="#" className="text-mono text-ink border-b border-gold pb-1 hover:text-gold">
                Read all →
              </a>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: g1, tag: "Editorial", t: "The Velour Edit, Fall 2025" },
              { img: g2, tag: "Ingredients", t: "Inside our gold elixir" },
              { img: g3, tag: "Ritual", t: "Three minutes, twice a day" },
            ].map((card, i) => (
              <Reveal key={card.t} delay={i * 0.1}>
                <a href="#" className="group block overflow-hidden rounded-md">
                  <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                    <img
                      src={card.img}
                      alt={card.t}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-5">
                    <div className="text-mono text-gold">{card.tag}</div>
                    <h3 className="text-display text-2xl mt-2 group-hover:text-gold transition">
                      {card.t}
                    </h3>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-32 px-6 md:px-10 bg-ink text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 20%, var(--gold) 0%, transparent 40%), radial-gradient(circle at 80% 80%, var(--champagne) 0%, transparent 50%)",
          }}
        />
        <div className="max-w-[1100px] mx-auto text-center relative">
          <Reveal>
            <div className="text-mono text-gold mb-6">— Step inside</div>
            <h2 className="text-display text-5xl md:text-8xl leading-[0.95]">
              Begin your <span className="italic text-gold">ritual.</span>
            </h2>
            <p className="mt-8 max-w-xl mx-auto text-cream/70 leading-relaxed">
              Reserve a private consultation at our Paris atelier, or join the
              Velour Cercle to receive our numbered releases first.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-14 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 bg-cream/5 border border-cream/20 rounded-full px-6 py-4 text-cream placeholder-cream/40 focus:outline-none focus:border-gold transition"
              />
              <button
                type="submit"
                className="rounded-full px-8 py-4 text-mono bg-gold text-ink hover:bg-cream transition-colors duration-500"
              >
                Join the Cercle
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-24 grid sm:grid-cols-3 gap-8 text-left max-w-3xl mx-auto">
              <div>
                <div className="text-mono text-gold mb-2">Atelier</div>
                <p className="text-cream/80">
                  14 rue de l'Université
                  <br />
                  75007 Paris
                </p>
              </div>
              <div>
                <div className="text-mono text-gold mb-2">Hours</div>
                <p className="text-cream/80">
                  Tuesday — Saturday
                  <br />
                  11h — 19h, on appointment
                </p>
              </div>
              <div>
                <div className="text-mono text-gold mb-2">Contact</div>
                <p className="text-cream/80">
                  bonjour@velour.paris
                  <br />
                  +33 1 45 55 00 00
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-cream/60 border-t border-cream/10 px-6 md:px-10 py-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-mono">
          <div>© Maison Velour · Beauté · Paris {new Date().getFullYear()}</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition">Instagram</a>
            <a href="#" className="hover:text-gold transition">Pinterest</a>
            <a href="#" className="hover:text-gold transition">Press</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
