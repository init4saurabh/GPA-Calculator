import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, RotateCcw, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ModernButton } from "@/components/ui/modern-button";
import SiteHeader from "@/components/SiteHeader";
import { useToast } from "@/hooks/use-toast";

interface Subject { id: number; credits: string; marks: string; }

const SGPACalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [numSubjects, setNumSubjects] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [sgpa, setSGPA] = useState<number | null>(null);

  const gradePoint = (marks: number) => marks >= 90 ? 10 : marks >= 80 ? 9 : marks >= 70 ? 8 : marks >= 60 ? 7 : marks >= 50 ? 6 : marks >= 35 ? 5 : 0;

  const handleContinue = () => {
    const count = Number(numSubjects);
    if (!Number.isInteger(count) || count < 1 || count > 13) {
      toast({ title: "Check that number", description: "Enter a whole number between 1 and 13.", variant: "destructive" });
      return;
    }
    setSubjects(Array.from({ length: count }, (_, index) => ({ id: index + 1, credits: "", marks: "" })));
    setSGPA(null);
    setShowForm(true);
  };

  const updateSubject = (id: number, field: "credits" | "marks", value: string) => {
    setSubjects((current) => current.map((subject) => subject.id === id ? { ...subject, [field]: value } : subject));
    setSGPA(null);
  };

  const calculateSGPA = () => {
    let totalCredits = 0;
    let weightedPoints = 0;
    for (const subject of subjects) {
      const credits = Number(subject.credits);
      const marks = Number(subject.marks);
      if (!subject.credits || !subject.marks || !Number.isFinite(credits) || !Number.isFinite(marks)) {
        toast({ title: "A few blanks remain", description: "Fill credits and marks for every subject.", variant: "destructive" }); return;
      }
      if (credits <= 0) { toast({ title: "Invalid credits", description: `Subject ${subject.id} needs credits greater than zero.`, variant: "destructive" }); return; }
      if (marks < 0 || marks > 100) { toast({ title: "Invalid marks", description: `Subject ${subject.id} marks must be between 0 and 100.`, variant: "destructive" }); return; }
      totalCredits += credits;
      weightedPoints += credits * gradePoint(marks);
    }
    const result = Math.round((weightedPoints / totalCredits) * 100) / 100;
    setSGPA(result);
    toast({ title: "Done — SGPA calculated", description: `Your semester score is ${result}.` });
  };

  if (!showForm) {
    return (
      <div className="page-shell min-h-screen">
        <SiteHeader backTo="/calculate" backLabel="Calculators" />
        <main className="site-container grid min-h-[calc(100vh-80px)] items-center gap-12 py-14 lg:grid-cols-[1fr_.85fr]">
          <div>
            <span className="eyebrow"><BookOpen className="h-3.5 w-3.5" /> SGPA setup</span>
            <h1 className="display-title mt-7 max-w-3xl text-6xl sm:text-8xl lg:text-9xl">Start with your subjects.</h1>
            <p className="mt-7 max-w-xl text-lg font-semibold leading-relaxed text-muted-foreground">Tell us how many subjects you took. We’ll build a clean grade sheet for the rest.</p>
          </div>
          <div className="relative">
            <div className="absolute -right-4 -top-4 h-full w-full border-2 border-foreground bg-secondary" />
            <div className="relative border-2 border-foreground bg-card p-7 sm:p-10">
              <div className="mb-10 flex items-start justify-between border-b-2 border-foreground pb-6">
                <div><p className="text-xs font-black uppercase tracking-[0.16em]">Step 01 / 02</p><h2 className="mt-2 text-2xl font-black uppercase">Build your grade sheet</h2></div>
                <span className="display-title text-4xl text-primary">01</span>
              </div>
              <label htmlFor="subjects" className="field-label">Number of subjects</label>
              <Input id="subjects" type="number" min="1" max="13" placeholder="e.g. 6" value={numSubjects} onChange={(event) => setNumSubjects(event.target.value)} onKeyDown={(event) => event.key === "Enter" && handleContinue()} className="number-input text-2xl" />
              <div className="mt-3 flex justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground"><span>Minimum 01</span><span>Maximum 13</span></div>
              <ModernButton size="lg" onClick={handleContinue} className="mt-9 w-full">Create grade sheet <ArrowRight /></ModernButton>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell min-h-screen pb-20">
      <SiteHeader onBack={() => setShowForm(false)} backLabel="Change subjects" />
      <main className="site-container py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_390px]">
          <section>
            <div className="mb-9">
              <span className="eyebrow">Step 02 / 02</span>
              <h1 className="display-title mt-5 text-5xl sm:text-7xl">Fill the grade sheet.</h1>
              <p className="mt-4 font-semibold text-muted-foreground">Credits × grade points = your final SGPA.</p>
            </div>

            <div className="border-2 border-foreground bg-card">
              <div className="hidden grid-cols-[90px_1fr_1fr_80px] gap-5 border-b-2 border-foreground bg-foreground px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-background md:grid"><span>Subject</span><span>Credits</span><span>Marks / 100</span><span>Points</span></div>
              {subjects.map((subject, index) => {
                const marks = Number(subject.marks);
                const points = subject.marks && marks >= 0 && marks <= 100 ? gradePoint(marks) : "—";
                return (
                  <div key={subject.id} className={`grid gap-4 p-5 md:grid-cols-[90px_1fr_1fr_80px] md:items-end ${index < subjects.length - 1 ? "border-b-2 border-foreground" : ""}`}>
                    <div><span className="field-label md:hidden">Subject</span><span className="display-title text-3xl">{String(subject.id).padStart(2, "0")}</span></div>
                    <div><label className="field-label md:hidden" htmlFor={`credits-${subject.id}`}>Credits</label><Input id={`credits-${subject.id}`} type="number" min="0.5" step="0.5" placeholder="4" value={subject.credits} onChange={(event) => updateSubject(subject.id, "credits", event.target.value)} className="number-input" /></div>
                    <div><label className="field-label md:hidden" htmlFor={`marks-${subject.id}`}>Marks / 100</label><Input id={`marks-${subject.id}`} type="number" min="0" max="100" placeholder="84" value={subject.marks} onChange={(event) => updateSubject(subject.id, "marks", event.target.value)} className="number-input" /></div>
                    <div className="flex items-center justify-between md:block"><span className="field-label md:hidden">Points</span><span className="grid h-14 w-14 place-items-center bg-secondary text-xl font-black md:w-full">{points}</span></div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
              <span>90+ → 10</span><span>80+ → 9</span><span>70+ → 8</span><span>60+ → 7</span><span>50+ → 6</span><span>35+ → 5</span><span>&lt;35 → 0</span>
            </div>
          </section>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className={`${sgpa === null ? "bg-foreground text-background" : "bg-primary text-foreground"} border-2 border-foreground p-7 transition-colors`}>
              <div className="flex items-start justify-between"><div><p className="text-[10px] font-black uppercase tracking-[0.18em] opacity-70">Calculated result</p><p className="mt-1 text-lg font-black uppercase">Your SGPA</p></div><Sparkles className="h-6 w-6" /></div>
              <p className="display-title my-10 text-8xl">{sgpa ?? "—.—"}</p>
              <p className="min-h-12 text-sm font-bold leading-relaxed opacity-75">{sgpa === null ? "Fill every row, then run the calculation." : sgpa >= 9 ? "Outstanding. That is a seriously strong semester." : sgpa >= 7 ? "Solid work. You are moving in the right direction." : "A baseline, not a verdict. Keep building."}</p>
            </div>
            <ModernButton size="lg" onClick={calculateSGPA} className="mt-5 w-full">Calculate SGPA <ArrowRight /></ModernButton>
            <button onClick={() => { setSubjects(subjects.map((s) => ({ ...s, credits: "", marks: "" }))); setSGPA(null); }} className="mt-5 flex w-full items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"><RotateCcw className="h-3.5 w-3.5" /> Clear all values</button>
          </aside>
        </div>
      </main>
    </div>
  );
};
export default SGPACalculator;
