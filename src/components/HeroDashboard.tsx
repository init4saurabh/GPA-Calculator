import { TrendingUp } from "lucide-react";

const subjects = [
  { name: "Data Structures", value: 9, width: "90%" },
  { name: "Database Systems", value: 8, width: "80%" },
  { name: "Computer Networks", value: 9, width: "90%" },
];

const HeroDashboard = () => (
  <div className="relative mx-auto w-full max-w-[600px] lg:ml-auto">
    <div className="absolute -right-6 top-10 hidden h-[88%] w-full border-2 border-foreground bg-foreground md:block" />
    <div className="absolute -left-7 -top-7 z-10 hidden h-24 w-24 rotate-[-8deg] place-items-center border-2 border-foreground bg-secondary text-center text-[10px] font-black uppercase tracking-[0.12em] md:grid">10 point<br />scale</div>

    <div className="hard-card enter-up relative overflow-visible bg-card p-0" style={{ animationDelay: "120ms" }}>
      <div className="flex items-center justify-between border-b-2 border-foreground px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="h-2.5 w-2.5 rounded-full border border-foreground bg-secondary" />
          <span className="h-2.5 w-2.5 rounded-full border border-foreground bg-card" />
        </div>
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Semester report / 04</p>
        <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.14em]"><span className="h-2 w-2 animate-pulse rounded-full bg-green-500" /> Live</span>
      </div>

      <div className="p-4 sm:p-6">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">Academic snapshot</p>
            <h2 className="mt-1 text-xl font-black uppercase tracking-tight sm:text-2xl">Your performance</h2>
          </div>
          <span className="shrink-0 border border-foreground bg-secondary px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em]">On track ↗</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-[minmax(0,1.2fr)_minmax(104px,.8fr)]">
          <div className="flex items-center gap-4 border-2 border-foreground bg-background p-4 sm:p-5">
            <div className="relative grid h-28 w-28 shrink-0 place-items-center rounded-full border-2 border-foreground bg-[conic-gradient(#ff6138_0_87.4%,#ded8c9_87.4%)] sm:h-28 sm:w-28 xl:h-32 xl:w-32">
              <div className="grid h-[82px] w-[82px] place-items-center rounded-full border-2 border-foreground bg-card sm:h-[82px] sm:w-[82px] xl:h-[94px] xl:w-[94px]">
                <div className="text-center"><p className="display-title text-4xl sm:text-5xl">8.74</p><p className="text-[8px] font-black uppercase tracking-[0.14em] text-muted-foreground">SGPA / 10</p></div>
              </div>
            </div>
            <div className="min-w-0">
              <TrendingUp className="mb-3 h-6 w-6 text-primary" strokeWidth={3} />
              <p className="text-xs font-black uppercase leading-tight sm:text-sm">Strong semester</p>
              <p className="mt-2 text-[10px] font-bold leading-relaxed text-muted-foreground">Top 18% of your batch pace.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
            <div className="border-2 border-foreground bg-primary p-3 sm:p-4">
              <p className="text-[8px] font-black uppercase tracking-[0.15em]">Total credits</p>
              <p className="display-title mt-2 text-4xl">24</p>
            </div>
            <div className="border-2 border-foreground bg-secondary p-3 sm:p-4">
              <p className="text-[8px] font-black uppercase tracking-[0.15em]">Best grade</p>
              <p className="display-title mt-2 text-4xl">A+</p>
            </div>
          </div>
        </div>

        <div className="mt-4 border-2 border-foreground">
          <div className="grid grid-cols-[1fr_auto] border-b-2 border-foreground bg-foreground px-4 py-2 text-[8px] font-black uppercase tracking-[0.16em] text-background"><span>Subject performance</span><span>Grade point</span></div>
          {subjects.map((subject, index) => (
            <div key={subject.name} className={`grid grid-cols-[1fr_34px] items-center gap-4 px-4 py-2.5 ${index < 2 ? "border-b border-foreground/25" : ""}`}>
              <div>
                <div className="mb-1.5 flex justify-between text-[10px] font-black"><span>{subject.name}</span><span className="text-muted-foreground">0{index + 1}</span></div>
                <div className="h-1.5 border border-foreground bg-muted"><div className="h-full bg-primary" style={{ width: subject.width }} /></div>
              </div>
              <span className="grid h-8 w-8 place-items-center bg-foreground text-xs font-black text-background">{subject.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t-2 border-foreground bg-primary px-4 py-3 text-[8px] font-black uppercase tracking-[0.12em] sm:px-6 sm:text-[9px]">
        <span>✓ 3 subjects processed</span>
        <span>Calculated in 0.02s</span>
      </div>
    </div>
  </div>
);

export default HeroDashboard;
