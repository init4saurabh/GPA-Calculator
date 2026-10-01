import { useNavigate } from "react-router-dom";
import { ArrowUpRight, BookOpen, Layers3 } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

const Calculate = () => {
  const navigate = useNavigate();
  const options = [
    { label: "SGPA", title: "One semester. One clear score.", description: "Use subject credits and marks to calculate your Semester Grade Point Average.", meta: "Up to 13 subjects", icon: BookOpen, accent: "bg-primary", path: "/calculate/sgpa" },
    { label: "CGPA", title: "The bigger academic picture.", description: "Combine semester-wise SGPA values into one cumulative grade point average.", meta: "Up to 8 semesters", icon: Layers3, accent: "bg-secondary", path: "/calculate/cgpa" },
  ];

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader backTo="/" backLabel="Home" />
      <main className="site-container py-14 md:py-20">
        <div className="mb-12 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <span className="eyebrow">Choose your route</span>
            <h1 className="display-title mt-6 max-w-4xl text-6xl sm:text-7xl lg:text-8xl">What are we calculating?</h1>
          </div>
          <p className="max-w-sm border-l-4 border-primary pl-5 font-semibold leading-relaxed text-muted-foreground lg:mb-2">Pick the number you need. The calculator handles the formula; you bring the grades.</p>
        </div>

        <div className="grid gap-7 lg:grid-cols-2">
          {options.map((option, index) => (
            <button key={option.label} onClick={() => navigate(option.path)} className="group hard-card relative min-h-[430px] overflow-hidden p-7 text-left transition-transform hover:-translate-y-1 md:p-10">
              <span className={`absolute -right-20 -top-20 h-56 w-56 rounded-full border-2 border-foreground ${option.accent} transition-transform duration-500 group-hover:scale-[1.35]`} />
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-black uppercase tracking-[0.18em]">Option 0{index + 1}</span>
                  <span className="grid h-14 w-14 place-items-center border-2 border-foreground bg-card"><option.icon className="h-6 w-6" strokeWidth={2.5} /></span>
                </div>
                <div className="mt-auto pt-24">
                  <p className="display-title text-7xl sm:text-8xl">{option.label}<span className="text-primary">.</span></p>
                  <h2 className="mt-5 max-w-md text-2xl font-black uppercase leading-tight tracking-tight">{option.title}</h2>
                  <p className="mt-4 max-w-md font-medium leading-relaxed text-muted-foreground">{option.description}</p>
                  <div className="mt-8 flex items-center justify-between border-t-2 border-foreground pt-5">
                    <span className="text-[11px] font-black uppercase tracking-[0.15em]">{option.meta}</span>
                    <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em]">Open calculator <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};
export default Calculate;
