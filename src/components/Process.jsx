import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Car from "./Car";

gsap.registerPlugin(ScrollTrigger);

/*
  "How it works": the section PINS to the screen and the 4 steps play one by one
  as you scroll. Everything is tied to scroll progress (scrub), like the hero.
*/
const STEPS = [
  { short: "Requirements", title: "Fill out your requirements", text: "Tell us what kind of help you need by choosing a service and getting started." },
  { short: "Understanding", title: "Understanding your business", text: "Our team gets back to you to understand your business and what you want to achieve." },
  { short: "Strategy", title: "Delivering the strategy", text: "A personalised plan and strategy is created around your requirements." },
  { short: "Results", title: "Execution and results", text: "We execute, assess and track performance so you can see the growth." },
];

const stroke = { stroke: "#C8FF3D", strokeOpacity: 0.55 };

// One small SVG illustration per step. Parts with class "bit" animate in.
const VISUALS = [
  // 1. form
  <svg key="v1" viewBox="0 0 320 240" className="h-full w-full">
    <rect className="bit" x="50" y="14" width="220" height="212" rx="18" fill="#fff" fillOpacity=".06" {...stroke} />
    {[0, 1, 2].map((i) => (
      <g key={i} className="bit">
        <rect x="74" y={52 + i * 46} width="20" height="20" rx="6" fill="#C8FF3D" />
        <path d={`M79 ${62 + i * 46} l4 4 l8 -9`} stroke="#0B1020" strokeWidth="3" fill="none" />
        <rect x="108" y={58 + i * 46} width={150 - i * 34} height="8" rx="4" fill="#fff" fillOpacity=".4" />
      </g>
    ))}
    <rect className="bit" x="74" y="190" width="96" height="24" rx="12" fill="#FF6B4A" />
  </svg>,
  // 2. conversation + magnifier
  <svg key="v2" viewBox="0 0 320 240" className="h-full w-full">
    <g className="bit"><rect x="30" y="30" width="170" height="64" rx="18" fill="#C8FF3D" /><path d="M60 94 L56 116 L84 94 Z" fill="#C8FF3D" /><rect x="50" y="52" width="110" height="8" rx="4" fill="#0B1020" /><rect x="50" y="70" width="70" height="8" rx="4" fill="#0B1020" opacity=".6" /></g>
    <g className="bit"><rect x="110" y="120" width="180" height="64" rx="18" fill="#FF6B4A" /><path d="M260 184 L266 206 L236 184 Z" fill="#FF6B4A" /><rect x="132" y="142" width="120" height="8" rx="4" fill="#fff" /><rect x="132" y="160" width="76" height="8" rx="4" fill="#fff" opacity=".7" /></g>
    <g className="bit"><circle cx="70" cy="170" r="30" fill="none" stroke="#fff" strokeWidth="6" /><path d="M92 192 L116 218" stroke="#fff" strokeWidth="8" strokeLinecap="round" /></g>
  </svg>,
  // 3. roadmap
  <svg key="v3" viewBox="0 0 320 240" className="h-full w-full">
    <path className="bit" d="M40 200 C110 200 90 120 160 120 S230 50 280 50" fill="none" stroke="#C8FF3D" strokeWidth="4" strokeDasharray="10 10" strokeLinecap="round" />
    {[[40, 200], [160, 120], [280, 50]].map(([x, y], i) => (
      <g key={i} className="bit"><circle cx={x} cy={y} r="16" fill="#FF6B4A" /><circle cx={x} cy={y} r="6" fill="#fff" /></g>
    ))}
    <g className="bit"><path d="M280 50 V16" stroke="#fff" strokeWidth="4" /><path d="M280 16 L308 26 L280 36 Z" fill="#C8FF3D" /></g>
    <rect className="bit" x="30" y="30" width="96" height="62" rx="12" fill="#fff" fillOpacity=".08" {...stroke} />
    <rect className="bit" x="44" y="46" width="68" height="7" rx="3.5" fill="#fff" fillOpacity=".5" />
    <rect className="bit" x="44" y="64" width="46" height="7" rx="3.5" fill="#fff" fillOpacity=".3" />
  </svg>,
  // 4. growth chart
  <svg key="v4" viewBox="0 0 320 240" className="h-full w-full">
    {[50, 80, 112, 146, 176].map((h, i) => (
      <rect key={i} className="bar bit" x={44 + i * 52} y={216 - h} width="34" height={h} rx="8" fill={i === 4 ? "#C8FF3D" : "#fff"} fillOpacity={i === 4 ? 1 : 0.25} />
    ))}
    <path className="bit" d="M50 150 L100 118 L152 126 L206 78 L262 36" fill="none" stroke="#FF6B4A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <path className="bit" d="M244 34 L264 34 L264 54" fill="none" stroke="#FF6B4A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

export default function Process() {
  const root = useRef(null);
  const track = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // soft idle float on the illustrations (transform only)
      gsap.to(".float", { y: -10, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut" });

      // first panel pops in when the section approaches
      gsap.from(".panel-0 .bit", {
        scale: 0.6, autoAlpha: 0, transformOrigin: "50% 50%", duration: 0.7, stagger: 0.06, ease: "back.out(1.7)",
        scrollTrigger: { trigger: root.current, start: "top 60%" },
      });

      const carW = () => root.current.querySelector(".pcar").getBoundingClientRect().width;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=3600", scrub: 1, pin: true, invalidateOnRefresh: true },
      });

      // continuous: progress bar, car on the track, background glow
      tl.to(".fill", { scaleX: 1, duration: 3 }, 0)
        .to(".pcar", { x: () => track.current.clientWidth - carW(), duration: 3 }, 0)
        .to(".pcar .wheel-1", { rotation: 720, svgOrigin: "95 118", duration: 3 }, 0)
        .to(".pcar .wheel-2", { rotation: 720, svgOrigin: "305 118", duration: 3 }, 0)
        .to(".pglow", { x: 320, y: -80, duration: 3 }, 0)
        .to({}, { duration: 0.4 }, 3); // short hold at the end

      // each step: old panel leaves, new one enters, its illustration builds up
      for (let i = 1; i < STEPS.length; i++) {
        tl.to(`.panel-${i - 1}`, { autoAlpha: 0, y: -50, duration: 0.35 }, i - 0.35)
          .fromTo(`.panel-${i}`, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.35 }, i - 0.1)
          .fromTo(`.panel-${i} .ghost`, { xPercent: 30 }, { xPercent: 0, duration: 0.5 }, i - 0.1)
          .fromTo(`.panel-${i} .bit`, { scale: 0.6, autoAlpha: 0, transformOrigin: "50% 50%" },
            { scale: 1, autoAlpha: 1, duration: 0.3, stagger: 0.05, ease: "back.out(1.7)" }, i)
          .to(`.dot-${i}`, { scale: 1.5, backgroundColor: "#C8FF3D", duration: 0.2 }, i - 0.1);
      }
      // growth chart bars rise from the bottom
      tl.fromTo(".bar", { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.5, stagger: 0.06, ease: "power2.out" }, STEPS.length - 1 + 0.05);
      tl.to(".dot-0", { scale: 1.5, backgroundColor: "#C8FF3D", duration: 0.01 }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="dots relative flex h-screen flex-col justify-between overflow-hidden bg-ink px-6 pb-10 pt-24 text-white md:px-14">
      <div className="pglow pointer-events-none absolute -left-40 top-1/3 h-[50vw] w-[50vw] rounded-full bg-[radial-gradient(circle,rgba(255,107,74,.18),transparent_60%)]" />

      <header className="relative">
        <p className="font-hand text-2xl text-lime">how it works</p>
        <h2 className="font-display text-3xl font-extrabold md:text-5xl">4 easy steps.</h2>
      </header>

      {/* stacked panels: all share the same grid cell, GSAP fades between them */}
      <div className="relative grid">
        {STEPS.map((s, i) => (
          <div key={s.title} className={`panel-${i} col-start-1 row-start-1 grid items-center gap-6 md:grid-cols-2 md:gap-12`}>
            <div className="relative">
              <span
                className="ghost pointer-events-none absolute -top-8 left-0 select-none font-display text-[7rem] font-extrabold leading-none text-transparent md:-top-16 md:text-[12rem]"
                style={{ WebkitTextStroke: "1px rgba(200,255,61,.35)" }}
              >
                0{i + 1}
              </span>
              <h3 className="relative pt-14 font-display text-2xl font-extrabold md:pt-24 md:text-5xl">{s.title}</h3>
              <p className="relative mt-4 max-w-md text-white/65">{s.text}</p>
            </div>
            <div className="float mx-auto h-[28vh] w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur md:h-[42vh]">
              {VISUALS[i]}
            </div>
          </div>
        ))}
      </div>

      {/* progress road: dots = steps, car drives along it as you scroll */}
      <div className="relative">
        <div ref={track} className="relative mx-3 h-px bg-white/20">
          <div className="fill absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-lime" />
          <Car className="pcar absolute -top-8 left-0 w-14" />
          {STEPS.map((s, i) => (
            <span key={s.short} className="absolute top-0 -translate-y-1/2" style={{ left: `${(i / 3) * 100}%` }}>
              <span className={`dot-${i} block h-3 w-3 -translate-x-1/2 rounded-full bg-white/30`} />
            </span>
          ))}
        </div>
        <div className="mt-4 flex justify-between text-[0.7rem] uppercase tracking-widest text-white/50">
          {STEPS.map((s) => <span key={s.short}>{s.short}</span>)}
        </div>
      </div>
    </section>
  );
}
