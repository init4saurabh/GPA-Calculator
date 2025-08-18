import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModernButton } from "@/components/ui/modern-button";
import { ModernCard, ModernCardContent } from "@/components/ui/modern-card";
import { useToast } from "@/hooks/use-toast";

interface Semester {
  id: number;
  sgpa: string;
}

const CGPACalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [numSemesters, setNumSemesters] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [cgpa, setCGPA] = useState<number | null>(null);

  const handleContinue = () => {
    const num = parseInt(numSemesters);
    if (num < 1 || num > 8) {
      toast({
        title: "Invalid Input",
        description: "Number of semesters must be between 1 and 8",
        variant: "destructive"
      });
      return;
    }
    
    const newSemesters = Array.from({ length: num }, (_, i) => ({
      id: i + 1,
      sgpa: ""
    }));
    setSemesters(newSemesters);
    setShowForm(true);
  };

  const calculateCGPA = () => {
    let totalSGPA = 0;
    let validSemesters = 0;
    
    for (const semester of semesters) {
      if (!semester.sgpa) {
        toast({
          title: "Incomplete Data",
          description: "Please fill in all semester SGPAs",
          variant: "destructive"
        });
        return;
      }
      
      const sgpa = parseFloat(semester.sgpa);
      if (sgpa < 0 || sgpa > 10) {
        toast({
          title: "Invalid SGPA",
          description: `SGPA for Semester ${semester.id} must be between 0 and 10`,
          variant: "destructive"
        });
        return;
      }
      
      totalSGPA += sgpa;
      validSemesters++;
    }
    
    const calculatedCGPA = totalSGPA / validSemesters;
    setCGPA(Math.round(calculatedCGPA * 100) / 100);
    
    toast({
      title: "CGPA Calculated!",
      description: `Your CGPA is ${Math.round(calculatedCGPA * 100) / 100}`,
    });
  };

  const updateSemester = (id: number, value: string) => {
    setSemesters(prev => prev.map(semester => 
      semester.id === id ? { ...semester, sgpa: value } : semester
    ));
  };

  if (!showForm) {
    return (
      <div className="min-h-screen bg-hero-gradient relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -left-1/3 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
          <div className="absolute bottom-1/3 -right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
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
                <div className="mx-auto w-24 h-24 rounded-2xl bg-accent/10 flex items-center justify-center mb-8">
                  <Calendar className="w-12 h-12 text-accent" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                  Calculate your CGPA
                </h1>
                <p className="text-xl text-foreground/70 font-medium ">
                  Enter your semester-wise SGPA values -😊
                </p>
              </div>

              <ModernCard className="p-0">
                <ModernCardContent className="p-8 space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="semesters" className="text-lg font-semibold text-foreground block">
                      Number of Semesters Completed
                    </Label>
                    <Input
                      id="semesters"
                      type="number"
                      min="1"
                      max="8"
                      placeholder="Enter between 1-8"
                      value={numSemesters}
                      onChange={(e) => setNumSemesters(e.target.value)}
                      className="text-center text-xl py-6 bg-input/50 border-border/50 focus:border-primary/50 backdrop-blur-sm rounded-xl"
                    />
                   <p className="text-sm text-red-500">
                        Enter number of semesters between 1 and 8
                  </p>
                  </div>
                  
                  <ModernButton onClick={handleContinue} size="lg" className="w-full">
                    Continue to SGPA Entry
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
        <div className="absolute top-1/4 -left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
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
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary mb-4">
            Semester SGPA Values
          </h1>
          <p className="text-lg text-foreground/70 font-medium">
            Enter your SGPA for each completed semester
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {semesters.map((semester) => (
            <ModernCard key={semester.id} className="p-0">
              <ModernCardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div className="text-center md:text-left">
                    <div className="inline-flex items-center gap-3 bg-accent/10 rounded-xl px-4 py-2">
                      <Calendar className="w-5 h-5 text-accent" />
                      <span className="text-lg font-bold text-accent">
                        Semester {semester.id}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 md:col-span-2">
                    <Label className="text-foreground font-semibold">SGPA (0.00 - 10.00)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      placeholder="0-10"
                      value={semester.sgpa}
                      onChange={(e) => updateSemester(semester.id, e.target.value)}
                      className="bg-input/50 border-border/50 focus:border-primary/50 backdrop-blur-sm rounded-xl text-center font-medium text-lg py-3"
                    />
                  </div>
                </div>
              </ModernCardContent>
            </ModernCard>
          ))}
          
          <div className="text-center space-y-8 mt-12">
            <ModernButton onClick={calculateCGPA} size="xl" className="px-12">
              Calculate My CGPA
            </ModernButton>
            
            {cgpa !== null && (
              <ModernCard className="p-0 max-w-md mx-auto bg-gradient-to-r from-accent/10 to-primary/10 border-accent/30">
                <ModernCardContent className="p-8 text-center">
                  <div className="mb-4">
                    <Trophy className="w-12 h-12 text-accent mx-auto mb-3" />
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Your CGPA is
                    </h2>
                  </div>
                  <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary mb-2">
                    {cgpa}
                  </div>
                  <p>
                    {cgpa >= 9 ? "Outstanding!" : cgpa >= 7 ? "Great job!" : "Keep improving!"}
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

export default CGPACalculator;