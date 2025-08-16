import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeroButton } from "@/components/HeroButton";
import { Card } from "@/components/ui/card";
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
      <div className="min-h-screen bg-hero-gradient">
        {/* Header */}
        <header className="p-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/calculate")}
            className="text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </header>

        {/* Main Content */}
        <main className="flex items-center justify-center min-h-[80vh]">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Enter your sem-wise CGPA,
            </h1>
            <p className="text-2xl md:text-3xl text-primary mb-12">
              no need to panic now 😊
            </p>

            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-2">
                <Label htmlFor="semesters" className="text-lg text-foreground">
                  Enter the no. of Semesters:
                </Label>
                <Input
                  id="semesters"
                  type="number"
                  min="1"
                  max="8"
                  placeholder="1 - 8"
                  value={numSemesters}
                  onChange={(e) => setNumSemesters(e.target.value)}
                  className="text-center text-lg py-6 bg-input border-border focus:border-primary"
                />
              </div>
              
              <HeroButton onClick={handleContinue}>
                Continue
              </HeroButton>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient py-6">
      {/* Header */}
      <header className="px-6 mb-8">
        <Button
          variant="ghost"
          onClick={() => setShowForm(false)}
          className="text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-8">
          Enter Semester-wise SGPA
        </h1>

        <div className="max-w-2xl mx-auto space-y-4">
          {semesters.map((semester) => (
            <Card key={semester.id} className="p-6 bg-card border-border">
              <div className="grid md:grid-cols-2 gap-4 items-center">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-semibold text-foreground">
                    Semester {semester.id}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-foreground">SGPA</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    placeholder="e.g., 8.5"
                    value={semester.sgpa}
                    onChange={(e) => updateSemester(semester.id, e.target.value)}
                    className="bg-input border-border focus:border-primary"
                  />
                </div>
              </div>
            </Card>
          ))}
          
          <div className="text-center space-y-6 mt-8">
            <HeroButton onClick={calculateCGPA}>
              Calculate CGPA
            </HeroButton>
            
            {cgpa !== null && (
              <Card className="p-8 bg-primary/10 border-primary/30 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-primary mb-2">
                  Your CGPA
                </h2>
                <p className="text-4xl font-bold text-primary">
                  {cgpa}
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CGPACalculator;