import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Services taken from itzfizz.com
const SERVICES = [
  { tag: "01", title: "Search Engine Optimization", text: "Rank on the first page of Google and drive quality traffic that boosts sales." },
  { tag: "02", title: "Website Development", text: "Easy-to-edit WordPress websites that take your business online." },
  { tag: "03", title: "Social Media Marketing", text: "Turn your channels into a marketing platform and convert viewers into customers." },
];

export default function Services() {
  const root = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        y: 40, autoAlpha: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="services" className="mx-auto max-w-5xl px-6 py-28">
      <p className="reveal font-hand text-2xl text-coral">what we do</p>
      <h2 className="reveal font-display text-4xl font-extrabold md:text-5xl">We analyze, assess and execute.</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {SERVICES.map((s) => (
          <div key={s.title} className="reveal rounded-2xl border border-ink/10 bg-white/60 p-6 transition hover:-translate-y-1 hover:border-ink">
            <span className="font-display text-sm text-coral">{s.tag}</span>
            <h3 className="mt-2 font-display text-xl">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
