import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Fox from "./Fox";
gsap.registerPlugin(ScrollTrigger);

// Client words as sticky notes (short versions of what's on itzfizz.com)
const NOTES = [
  { text: "An exciting journey so far. Looking forward to more projects together.", who: "Director, Vakkal Impex", color: "#FFE27A", rot: -3 },
  { text: "A professional, dedicated team that finishes on time with a touch of class.", who: "Happy client", color: "#BDF2D5", rot: 2.5 },
  { text: "Great service at a fair price. A must-hire for websites and digital marketing.", who: "Happy client", color: "#FFC9B8", rot: -2 },
  { text: "Want a professional website at a pocket-friendly price? Connect and watch the magic.", who: "Mustafai Unani Clinic", color: "#CDE3FF", rot: 3 },
];

export default function Notes() {
  const root = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // notes drop onto the board and settle at their own angle
      gsap.fromTo(".note",
        { y: -80, autoAlpha: 0, rotation: 0 },
        { y: 0, autoAlpha: 1, rotation: (i) => NOTES[i].rot, duration: 0.9, stagger: 0.18, ease: "back.out(1.6)",
          scrollTrigger: { trigger: root.current, start: "top 70%" } });
      gsap.from(".fox", { y: 60, autoAlpha: 0, duration: 0.8, scrollTrigger: { trigger: root.current, start: "top 75%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  // small hover wiggle: straighten and lift
  const lift = (e, rot, on) =>
    gsap.to(e.currentTarget, { rotation: on ? 0 : rot, scale: on ? 1.05 : 1, duration: 0.3, ease: "power2.out" });

  return (
    <section ref={root} className="mx-auto max-w-5xl px-6 pb-28 pt-28">
      <div className="flex items-end gap-4">
        <Fox className="fox w-20" />
        <div>
          <p className="font-hand text-2xl text-coral">kind words</p>
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">What my clients say.</h2>
        </div>
      </div>
      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        {NOTES.map((n, i) => (
          <figure
            key={i}
            className="note relative p-7 pt-9 shadow-[0_12px_24px_-8px_rgba(11,16,32,.35)]"
            style={{ background: n.color }}
            onMouseEnter={(e) => lift(e, n.rot, true)}
            onMouseLeave={(e) => lift(e, n.rot, false)}
          >
            <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 bg-white/60" />
            <blockquote className="font-hand text-2xl leading-snug text-ink">{n.text}</blockquote>
            <figcaption className="mt-4 text-xs uppercase tracking-widest text-ink/60">{n.who}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
