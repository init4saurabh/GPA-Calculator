import { useNavigate } from "react-router-dom";
import { ArrowDownRight, ArrowRight, Check, Sigma, Sparkles, Zap } from "lucide-react";
import { ModernButton } from "@/components/ui/modern-button";
import SiteHeader from "@/components/SiteHeader";
import BrandLogo from "@/components/BrandLogo";

const Home = () => {
  const navigate = useNavigate();
  const ticker = ["SGPA", "CGPA", "UCET READY", "ZERO GUESSWORK", "100% FREE"];

  return (
    <div className="page-shell overflow-hidden">
      <SiteHeader />

      <main>
        <section className="site-container grid min-h-[calc(100vh-80px)] items-center gap-12 py-14 lg:grid-cols-[1.08fr_.92fr] lg:py-16">
          <div className="enter-up relative z-10">
            <div className="eyebrow mb-7"><Sparkles className="h-3.5 w-3.5" /> No sign-up. No spreadsheet.</div>
            <h1 className="display-title max-w-[820px] text-[clamp(4.25rem,9.2vw,9.4rem)]">
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

          <div className="relative mx-auto w-full max-w-[590px] lg:ml-auto">
            <div className="absolute -right-5 -top-5 h-32 w-32 bg-secondary md:-right-10 md:-top-9" />
            <div className="absolute -bottom-7 -left-5 h-24 w-24 border-[14px] border-primary md:-left-10" />
            <div className="hard-card enter-up relative rotate-[1.5deg] p-4 sm:p-6" style={{ animationDelay: "120ms" }}>
              <div className="mb-8 flex items-center justify-between border-b-2 border-foreground pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">Live preview</p>
                  <p className="mt-1 text-lg font-black">Semester 04</p>
                </div>
                <span className="border-2 border-foreground bg-secondary px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em]">● Ready</span>
              </div>

              <div className="space-y-3">
                {[{ name: "Data Structures", credit: 4, score: 9 }, { name: "DBMS", credit: 3, score: 8 }, { name: "Computer Networks", credit: 4, score: 9 }].map((subject, index) => (
                  <div key={subject.name} className="grid grid-cols-[34px_1fr_auto] items-center gap-3 border-2 border-foreground bg-background p-3 sm:grid-cols-[42px_1fr_auto] sm:p-4">
                    <span className="text-sm font-black text-muted-foreground">0{index + 1}</span>
                    <div><p className="text-sm font-black sm:text-base">{subject.name}</p><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{subject.credit} Credits</p></div>
                    <span className="grid h-10 w-10 place-items-center bg-foreground text-lg font-black text-card">{subject.score}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-4 bg-primary p-5 text-foreground sm:p-6">
                <div><p className="text-[10px] font-black uppercase tracking-[0.16em]">Your SGPA</p><p className="display-title mt-2 text-6xl sm:text-7xl">8.74</p></div>
                <ArrowDownRight className="h-10 w-10" strokeWidth={2.5} />
              </div>
            </div>
          </div>
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
