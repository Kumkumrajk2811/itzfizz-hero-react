import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Car from "./Car";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["WELCOME", "ITZFIZZ"];

// Edit these numbers/texts freely
const STATS = [
  { value: "93%", text: "of online experiences begin with a search engine" },
  { value: "58%", text: "more organic traffic with a focused SEO plan" },
  { value: "134%", text: "growth in qualified leads from social campaigns" },
  { value: "3X", text: "average return on every marketing rupee" },
];

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    // gsap.context scopes selectors to this component and cleans up on unmount
    const ctx = gsap.context(() => {
      // 1) INTRO: headline letters, then stats one by one
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".letter", { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.05 })
        .from(".tag", { y: 16, autoAlpha: 0, duration: 0.7 }, "-=0.5")
        .from(".stat", { y: 30, autoAlpha: 0, duration: 0.8, stagger: 0.18 }, "-=0.3")
        .from(".hint", { autoAlpha: 0, duration: 0.8 }, "-=0.2")
        .from(".car", { x: -120, autoAlpha: 0, duration: 1 }, 0.3);

      // 2) SCROLL: tied to scroll progress, scrub: 1 adds smooth easing
      const carWidth = () => root.current.querySelector(".car").getBoundingClientRect().width;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=2200",
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(".car", { x: 24 }, { x: () => window.innerWidth - carWidth() - 24, ease: "none", duration: 1 }, 0)
        .to(".wheel-1", { rotation: 1080, svgOrigin: "95 118", ease: "none", duration: 1 }, 0)
        .to(".wheel-2", { rotation: 1080, svgOrigin: "305 118", ease: "none", duration: 1 }, 0)
        .to(".road-lines", { x: -600, ease: "none", duration: 1 }, 0)
        .to(".letter", { color: "#F4F6FB", stagger: 0.03, duration: 0.1, ease: "none" }, 0)
        .to(".glow", { scale: 1.3, ease: "none", duration: 1 }, 0)
        .to(".hint", { autoAlpha: 0, duration: 0.1 }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex h-screen flex-col items-center overflow-hidden pt-[15vh]">
      {/* soft lime glow */}
      <div className="glow pointer-events-none absolute -top-1/4 left-1/2 h-[70vw] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,255,61,.12),transparent_60%)]" />

      {/* Headline */}
      <h1 className="relative mr-[-0.35em] text-center font-display text-[clamp(1.8rem,6.5vw,5rem)] font-extrabold leading-[1.15] tracking-[0.35em]" aria-label="Welcome Itzfizz">
        {WORDS.map((word) => (
          <span key={word} className="block whitespace-nowrap">
            {[...word].map((ch, i) => (
              <span key={i} className="letter inline-block text-white/15">{ch}</span>
            ))}
          </span>
        ))}
      </h1>

      <p className="tag relative mt-4 text-xs uppercase tracking-[0.3em] text-coral">
        SEO · Websites · Social Media
      </p>

      {/* Stats */}
      <div className="relative mt-[5vh] grid w-[min(1000px,90%)] grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        {STATS.map((s) => (
          <div key={s.value} className="stat border-t border-white/20 pt-4">
            <strong className="block font-display text-[clamp(1.8rem,4vw,3rem)] text-lime">{s.value}</strong>
            <span className="text-[0.85rem] leading-snug text-white/65">{s.text}</span>
          </div>
        ))}
      </div>

      <p className="hint absolute bottom-[27vh] text-xs uppercase tracking-[0.3em] text-white/50">Scroll to drive</p>

      {/* Road + car */}
      <div className="absolute bottom-0 left-0 h-[20vh] w-full border-t-2 border-white/10 bg-[#070B17]">
        <div className="road-lines absolute left-0 top-1/2 h-1 w-[200%]" />
      </div>
      <Car className="car absolute left-0 w-[clamp(180px,26vw,340px)] will-change-transform" />
      <style>{`.car{bottom:calc(20vh - 6px)}`}</style>
    </section>
  );
}
