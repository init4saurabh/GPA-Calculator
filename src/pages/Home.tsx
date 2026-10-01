import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Sigma, Sparkles, Zap } from "lucide-react";
import { ModernButton } from "@/components/ui/modern-button";
import SiteHeader from "@/components/SiteHeader";
import BrandLogo from "@/components/BrandLogo";
import HeroDashboard from "@/components/HeroDashboard";

const Home = () => {
  const navigate = useNavigate();
  const ticker = ["SGPA", "CGPA", "UCET READY", "ZERO GUESSWORK", "100% FREE"];

  return (
    <div className="page-shell overflow-hidden">
      <SiteHeader />

      <main>
        <section className="site-container grid items-start gap-12 py-14 lg:min-h-[calc(100vh-80px)] lg:items-center lg:grid-cols-[minmax(0,1fr)_minmax(460px,.8fr)] xl:grid-cols-[minmax(0,1fr)_560px] lg:py-16">
          <div className="enter-up relative z-10">
            <div className="eyebrow mb-7"><Sparkles className="h-3.5 w-3.5" /> No sign-up. No spreadsheet.</div>
            <h1 className="display-title max-w-[820px] text-[clamp(3.1rem,13.4vw,6.5rem)]">
              Grades,
              <span className="relative block w-fit text-primary">
                Minus The
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 400 20" fill="none" aria-hidden="true"><path d="M4 13C90 3 278 4 396 12" stroke="#171513" strokeWidth="7" strokeLinecap="square" /></svg>
              </span>
              Guesswork.
            </h1>
            <p className="mt-10 max-w-xl text-lg font-semibold leading-relaxed text-muted-foreground md:text-xl">
              A sharp, zero-fuss GPA calculator built for UCET students. Add your numbers, get the answer, move on with your day.
            </p>
            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <ModernButton size="xl" onClick={() => navigate("/calculate")} className="group w-full sm:w-auto">
                Calculate my GPA <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </ModernButton>
              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.13em]">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary"><Check className="h-4 w-4" strokeWidth={3} /></span>
                Takes less than a minute
              </div>
            </div>
          </div>

          <HeroDashboard />
        </section>

        <div className="overflow-hidden border-y-2 border-foreground bg-foreground py-3 text-background">
          <div className="marquee-track flex w-max items-center">
            {[...ticker, ...ticker].map((item, index) => <span key={`${item}-${index}`} className="mx-7 flex items-center gap-7 text-xs font-black uppercase tracking-[0.2em]"><span className="text-secondary">✦</span>{item}</span>)}
          </div>
        </div>

        <section className="site-container py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <span className="eyebrow">Built different</span>
              <h2 className="display-title mt-6 text-5xl md:text-7xl">Only the useful stuff.</h2>
              <p className="mt-6 max-w-sm font-semibold leading-relaxed text-muted-foreground">No account walls, no confusing controls, and definitely no twenty-tab spreadsheet.</p>
            </div>
            <div className="grid border-2 border-foreground md:grid-cols-3">
              {[{ icon: Sigma, n: "01", title: "Both modes", copy: "Semester SGPA and cumulative CGPA, under one roof." }, { icon: Zap, n: "02", title: "Instant math", copy: "Results update cleanly with accurate grade-point logic." }, { icon: Check, n: "03", title: "UCET aligned", copy: "Grade brackets tuned for the system you actually use." }].map((feature, index) => (
                <article key={feature.n} className={`min-h-[310px] p-7 transition-colors hover:bg-secondary ${index < 2 ? "border-b-2 border-foreground md:border-b-0 md:border-r-2" : ""}`}>
                  <div className="flex items-start justify-between"><feature.icon className="h-8 w-8" strokeWidth={2.5} /><span className="text-xs font-black text-muted-foreground">/{feature.n}</span></div>
                  <h3 className="mt-20 text-2xl font-black uppercase tracking-tight">{feature.title}</h3>
                  <p className="mt-3 font-medium leading-relaxed text-muted-foreground">{feature.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-foreground">
        <div className="bg-secondary">
          <div className="site-container grid items-center gap-7 py-10 md:grid-cols-[1fr_auto] md:py-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-foreground/60">Ready when you are</p>
              <h2 className="display-title mt-3 max-w-4xl text-4xl sm:text-6xl">Make the numbers make sense.</h2>
            </div>
            <button onClick={() => navigate("/calculate")} className="group flex h-16 items-center justify-between gap-8 border-2 border-foreground bg-primary px-6 text-xs font-black uppercase tracking-[0.14em] shadow-[5px_5px_0_#171513] transition-all hover:-translate-y-1 hover:shadow-[7px_7px_0_#171513]">
              Start calculating <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="bg-foreground text-background">
          <div className="site-container py-10 sm:py-12">
            <div className="grid gap-10 border-b border-background/20 pb-10 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <BrandLogo inverse large />
                <p className="mt-5 max-w-md text-sm font-semibold leading-relaxed text-background/55">A small, focused academic tool for UCET students. No accounts, no clutter, just the number you came for.</p>
              </div>
              <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-xs font-black uppercase tracking-[0.13em] sm:grid-cols-4">
                <button onClick={() => navigate("/calculate/sgpa")} className="text-left transition-colors hover:text-secondary">SGPA</button>
                <button onClick={() => navigate("/calculate/cgpa")} className="text-left transition-colors hover:text-secondary">CGPA</button>
                <a href="https://github.com/init4saurabh" target="_blank" rel="noreferrer" className="transition-colors hover:text-secondary">GitHub</a>
                <a href="https://www.linkedin.com/in/saurabh-kumar-6196052ba/" target="_blank" rel="noreferrer" className="transition-colors hover:text-secondary">LinkedIn</a>
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-background/45 sm:flex-row sm:items-center sm:justify-between">
              <span>Built with intent, not templates.</span>
              <span>Designed & developed by Saurabh · {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Home;
