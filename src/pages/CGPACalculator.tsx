import { useState } from "react";
import { ArrowRight, Layers3, RotateCcw, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ModernButton } from "@/components/ui/modern-button";
import SiteHeader from "@/components/SiteHeader";
import { useToast } from "@/hooks/use-toast";

interface Semester { id: number; sgpa: string; }

const CGPACalculator = () => {
  const { toast } = useToast();
  const [numSemesters, setNumSemesters] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [cgpa, setCGPA] = useState<number | null>(null);

  const handleContinue = () => {
    const count = Number(numSemesters);
    if (!Number.isInteger(count) || count < 1 || count > 8) {
      toast({ title: "Check that number", description: "Enter a whole number between 1 and 8.", variant: "destructive" }); return;
    }
    setSemesters(Array.from({ length: count }, (_, index) => ({ id: index + 1, sgpa: "" })));
    setCGPA(null); setShowForm(true);
  };

  const updateSemester = (id: number, value: string) => {
    setSemesters((current) => current.map((semester) => semester.id === id ? { ...semester, sgpa: value } : semester));
    setCGPA(null);
  };

  const calculateCGPA = () => {
    let total = 0;
    for (const semester of semesters) {
      const sgpa = Number(semester.sgpa);
      if (!semester.sgpa || !Number.isFinite(sgpa)) { toast({ title: "A few blanks remain", description: "Enter the SGPA for every semester.", variant: "destructive" }); return; }
      if (sgpa < 0 || sgpa > 10) { toast({ title: "Invalid SGPA", description: `Semester ${semester.id} must be between 0 and 10.`, variant: "destructive" }); return; }
      total += sgpa;
    }
    const result = Math.round((total / semesters.length) * 100) / 100;
    setCGPA(result);
    toast({ title: "Done — CGPA calculated", description: `Your cumulative score is ${result}.` });
  };

  if (!showForm) {
    return (
      <div className="page-shell min-h-screen">
        <SiteHeader backTo="/calculate" backLabel="Calculators" />
        <main className="site-container grid min-h-[calc(100vh-80px)] items-center gap-12 py-14 lg:grid-cols-[1fr_.85fr]">
          <div>
            <span className="eyebrow"><Layers3 className="h-3.5 w-3.5" /> CGPA setup</span>
            <h1 className="display-title mt-7 max-w-3xl text-6xl sm:text-8xl lg:text-9xl">Stack up your semesters.</h1>
            <p className="mt-7 max-w-xl text-lg font-semibold leading-relaxed text-muted-foreground">Enter the number of completed semesters. We’ll turn every SGPA into one clean cumulative score.</p>
          </div>
          <div className="relative">
            <div className="absolute -right-4 -top-4 h-full w-full border-2 border-foreground bg-primary" />
            <div className="relative border-2 border-foreground bg-card p-7 sm:p-10">
              <div className="mb-10 flex items-start justify-between border-b-2 border-foreground pb-6">
                <div><p className="text-xs font-black uppercase tracking-[0.16em]">Step 01 / 02</p><h2 className="mt-2 text-2xl font-black uppercase">Build semester list</h2></div>
                <span className="display-title text-4xl text-primary">01</span>
              </div>
              <label htmlFor="semesters" className="field-label">Semesters completed</label>
              <Input id="semesters" type="number" min="1" max="8" placeholder="e.g. 4" value={numSemesters} onChange={(event) => setNumSemesters(event.target.value)} onKeyDown={(event) => event.key === "Enter" && handleContinue()} className="number-input text-2xl" />
              <div className="mt-3 flex justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground"><span>Minimum 01</span><span>Maximum 08</span></div>
              <ModernButton size="lg" onClick={handleContinue} className="mt-9 w-full">Create semester list <ArrowRight /></ModernButton>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell min-h-screen pb-20">
      <SiteHeader onBack={() => setShowForm(false)} backLabel="Change semesters" />
      <main className="site-container py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_390px]">
          <section>
            <div className="mb-9">
              <span className="eyebrow">Step 02 / 02</span>
              <h1 className="display-title mt-5 text-5xl sm:text-7xl">Add every semester.</h1>
              <p className="mt-4 font-semibold text-muted-foreground">We’ll average the values into your cumulative GPA.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {semesters.map((semester) => (
                <div key={semester.id} className="hard-card p-5 sm:p-6">
                  <div className="mb-7 flex items-center justify-between border-b-2 border-foreground pb-4">
                    <div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">Academic term</p><p className="mt-1 text-xl font-black uppercase">Semester {String(semester.id).padStart(2, "0")}</p></div>
                    <span className="display-title text-4xl text-primary">{String(semester.id).padStart(2, "0")}</span>
                  </div>
                  <label htmlFor={`semester-${semester.id}`} className="field-label">SGPA score / 10</label>
                  <Input id={`semester-${semester.id}`} type="number" step="0.01" min="0" max="10" placeholder="8.50" value={semester.sgpa} onChange={(event) => updateSemester(semester.id, event.target.value)} className="number-input text-2xl" />
                </div>
              ))}
            </div>
          </section>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className={`${cgpa === null ? "bg-foreground text-background" : "bg-secondary text-foreground"} border-2 border-foreground p-7 transition-colors`}>
              <div className="flex items-start justify-between"><div><p className="text-[10px] font-black uppercase tracking-[0.18em] opacity-70">Calculated result</p><p className="mt-1 text-lg font-black uppercase">Your CGPA</p></div><Trophy className="h-6 w-6" /></div>
              <p className="display-title my-10 text-8xl">{cgpa ?? "—.—"}</p>
              <p className="min-h-12 text-sm font-bold leading-relaxed opacity-75">{cgpa === null ? "Add each semester score, then run the calculation." : cgpa >= 9 ? "Outstanding consistency. You’re in the top lane." : cgpa >= 7 ? "A strong cumulative score. Keep the rhythm going." : "You have room to climb — one semester at a time."}</p>
            </div>
            <ModernButton size="lg" onClick={calculateCGPA} className="mt-5 w-full">Calculate CGPA <ArrowRight /></ModernButton>
            <button onClick={() => { setSemesters(semesters.map((s) => ({ ...s, sgpa: "" }))); setCGPA(null); }} className="mt-5 flex w-full items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"><RotateCcw className="h-3.5 w-3.5" /> Clear all values</button>
          </aside>
        </div>
      </main>
    </div>
  );
};
export default CGPACalculator;
