const PRESS = [
  "Vogue Beauté 2025",
  "Harper's Bazaar",
  "Le Figaro Madame",
  "Allure",
  "Elle France",
  "Cosmopolitan",
  "Condé Nast Traveler",
];

export function Marquee() {
  const items = [...PRESS, ...PRESS];
  return (
    <div className="relative overflow-hidden border-y border-border/70 bg-cream/60 py-5">
      <div className="flex w-max animate-marquee gap-14 whitespace-nowrap">
        {items.map((p, i) => (
          <div key={i} className="flex items-center gap-14">
            <span className="text-mono text-muted-foreground">{p}</span>
            <span className="text-gold">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
