import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModernButton } from "@/components/ui/modern-button";
import { ModernCard, ModernCardContent } from "@/components/ui/modern-card";

import { useToast } from "@/hooks/use-toast";

interface Subject {
  id: number;
  credits: string;
  marks: string;
}

const SGPACalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [numSubjects, setNumSubjects] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [sgpa, setSGPA] = useState<number | null>(null);

  const convertMarksToGradePoint = (marks: number): number => {
    if (marks >= 90) return 10; // O
    if (marks >= 80) return 9;  // A+
    if (marks >= 70) return 8;  // A
    if (marks >= 60) return 7;  // B+
    if (marks >= 50) return 6;  // B
    if (marks >= 40) return 5;  // C
    return 0; // F
  };

  const handleContinue = () => {
    const num = parseInt(numSubjects);
    if (num < 1 || num > 13) {
      toast({
        title: "Invalid Input",
        description: "Number of subjects must be between 1 and 13",
        variant: "destructive"
      });
      return;
    }
    
    const newSubjects = Array.from({ length: num }, (_, i) => ({
      id: i + 1,
      credits: "",
      marks: ""
    }));
    setSubjects(newSubjects);
    setShowForm(true);
  };

  const calculateSGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;
    
    for (const subject of subjects) {
      if (!subject.credits || !subject.marks) {
        toast({
          title: "Incomplete Data",
          description: "Please fill in all subjects' credits and marks",
          variant: "destructive"
        });
        return;
      }
      
      const credits = parseFloat(subject.credits);
      const marks = parseFloat(subject.marks);
      
      if (marks < 0 || marks > 100) {
        toast({
          title: "Invalid Marks",
          description: "Marks must be between 0 and 100",
          variant: "destructive"
        });
        return;
      }
      
      const gradePoint = convertMarksToGradePoint(marks);
      
      totalCredits += credits;
      totalGradePoints += credits * gradePoint;
    }
    
    const calculatedSGPA = totalGradePoints / totalCredits;
    setSGPA(Math.round(calculatedSGPA * 100) / 100);
    
    toast({
      title: "SGPA Calculated!",
      description: `Your SGPA is ${Math.round(calculatedSGPA * 100) / 100}`,
    });
  };

  const updateSubject = (id: number, field: "credits" | "marks", value: string) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === id ? { ...subject, [field]: value } : subject
    ));
  };

  if (!showForm) {
    return (
      <div className="min-h-screen bg-hero-gradient relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
          <div className="absolute bottom-1/3 -right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
        </div>

        {/* Header */}
        <header className="relative p-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/calculate")}
            className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </header>

        {/* Main Content */}
        <main className="relative flex items-center justify-center min-h-[80vh]">
          <div className="container mx-auto px-8 text-center">
            <div className="max-w-lg mx-auto space-y-12">
              <div className="space-y-6">
                <div className="mx-auto w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                  <BookOpen className="w-12 h-12 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Let's calculate your SGPA
                </h1>
                <p className="text-xl text-foreground/70 font-medium">
                  How many subjects did you take this semester?
                </p>
              </div>

              <ModernCard className="p-0">
                <ModernCardContent className="p-8 space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="subjects" className="text-lg font-semibold text-foreground block">
                      Number of Subjects
                    </Label>
                    <Input
                      id="subjects"
                      type="number"
                      min="1"
                      max="13"
                      placeholder="Enter between 1-13"
                      value={numSubjects}
                      onChange={(e) => setNumSubjects(e.target.value)}
                      className="text-center text-xl py-6 bg-input/50 border-border/50 focus:border-primary/50 backdrop-blur-sm rounded-xl"
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter a number between 1 and 13
                    </p>
                  </div>
                  
                  <ModernButton onClick={handleContinue} size="lg" className="w-full">
                    Continue to Subject Details
                  </ModernButton>
                </ModernCardContent>
              </ModernCard>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient py-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
      </div>

      {/* Header */}
      <header className="relative px-8 mb-8">
        <Button
          variant="ghost"
          onClick={() => setShowForm(false)}
          className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-xl"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
            Subject Details
          </h1>
          <p className="text-lg text-foreground/70 font-medium">
            Enter credits and marks for each subject
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {subjects.map((subject) => (
            <ModernCard key={subject.id} className="p-0">
              <ModernCardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6 items-center">
                  <div className="text-center md:text-left">
                    <div className="inline-flex items-center gap-3 bg-primary/10 rounded-xl px-4 py-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span className="text-lg font-bold text-primary">
                        Subject {subject.id}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-foreground font-semibold">Credits</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 4"
                      value={subject.credits}
                      onChange={(e) => updateSubject(subject.id, "credits", e.target.value)}
                      className="bg-input/50 border-border/50 focus:border-primary/50 backdrop-blur-sm rounded-xl text-center font-medium"
                    />
                  </div>
                  
                  <div className="space-y-3 md:col-span-2">
                    <Label className="text-foreground font-semibold">Marks (0-100)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="e.g., 85"
                      value={subject.marks}
                      onChange={(e) => updateSubject(subject.id, "marks", e.target.value)}
                      className="bg-input/50 border-border/50 focus:border-primary/50 backdrop-blur-sm rounded-xl text-center font-medium"
                    />
                    <p className="text-xs text-muted-foreground">
                      90-100: O (10pts) • 80-89: A+ (9pts) • 70-79: A (8pts) • 60-69: B+ (7pts) • 50-59: B (6pts) • 40-49: C (5pts) • Below 40: F (0pts)
                    </p>
                  </div>
                </div>
              </ModernCardContent>
            </ModernCard>
          ))}
          
          <div className="text-center space-y-8 mt-12">
            <ModernButton onClick={calculateSGPA} size="xl" className="px-12">
              Calculate My SGPA
            </ModernButton>
            
            {sgpa !== null && (
              <ModernCard className="p-0 max-w-md mx-auto bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
                <ModernCardContent className="p-8 text-center">
                  <div className="mb-4">
                    <Star className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Your SGPA is
                    </h2>
                  </div>
                  <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                    {sgpa}
                  </div>
                  <p className="text-muted-foreground font-medium">
                    Great job this semester!
                  </p>
                </ModernCardContent>
              </ModernCard>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SGPACalculator;