import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import Marquee from "./components/Marquee";
import Notes from "./components/Notes";

export default function App() {
  return (
    <>
      <header className="fixed left-0 top-0 z-30 flex w-full items-center justify-between px-6 py-5 md:px-12">
        <span className="font-display text-xl font-extrabold">
          itzfizz<span className="text-coral">.</span>
        </span>
        <a href="#services" className="rounded-full border border-lime px-5 py-2 text-sm text-lime transition hover:bg-lime hover:text-ink">
          Our services
        </a>
      </header>

      <Hero />
      <Marquee />

      {/* warm paper-coloured area, a nice contrast after the dark hero */}
      <div className="bg-paper text-ink">
        <Services />
      </div>
      <Process />
      <div className="bg-paper text-ink">
        <Notes />
        <footer className="pb-10 text-center text-sm text-ink/50">© Itzfizz Digital</footer>
      </div>
    </>
  );
}
