const ITEMS = ["SEO", "WordPress Websites", "Social Media Marketing", "Rank #1 on Google"];
const ROW = [...ITEMS, ...ITEMS]; // rendered twice so the loop is seamless

export default function Marquee() {
  return (
    <div className="overflow-hidden bg-lime py-4 text-ink" aria-hidden="true">
      <div className="marquee flex w-max">
        {[0, 1].map((n) => (
          <div key={n} className="flex shrink-0 gap-10 pr-10 font-display text-2xl font-extrabold uppercase">
            {ROW.map((t, i) => (
              <span key={i} className="whitespace-nowrap">{t} <span className="text-coral">✦</span></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
