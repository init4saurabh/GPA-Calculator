import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeroButton } from "@/components/HeroButton";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Subject {
  id: number;
  credits: string;
  grade: string;
}

const SGPACalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [numSubjects, setNumSubjects] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [sgpa, setSGPA] = useState<number | null>(null);

  const gradePoints: { [key: string]: number } = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "F": 0
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
      grade: ""
    }));
    setSubjects(newSubjects);
    setShowForm(true);
  };

  const calculateSGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;
    
    for (const subject of subjects) {
      if (!subject.credits || !subject.grade) {
        toast({
          title: "Incomplete Data",
          description: "Please fill in all subjects' credits and grades",
          variant: "destructive"
        });
        return;
      }
      
      const credits = parseFloat(subject.credits);
      const gradePoint = gradePoints[subject.grade];
      
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

  const updateSubject = (id: number, field: "credits" | "grade", value: string) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === id ? { ...subject, [field]: value } : subject
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
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-12">
              Tell us how your semester went +_+
            </h1>

            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subjects" className="text-lg text-foreground">
                  Enter the no. of Subjects:
                </Label>
                <Input
                  id="subjects"
                  type="number"
                  min="1"
                  max="13"
                  placeholder="1 - 13"
                  value={numSubjects}
                  onChange={(e) => setNumSubjects(e.target.value)}
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
          Enter Subject Details
        </h1>

        <div className="max-w-4xl mx-auto space-y-4">
          {subjects.map((subject) => (
            <Card key={subject.id} className="p-6 bg-card border-border">
              <div className="grid md:grid-cols-3 gap-4 items-center">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-semibold text-foreground">
                    Subject {subject.id}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-foreground">Credits</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 4"
                    value={subject.credits}
                    onChange={(e) => updateSubject(subject.id, "credits", e.target.value)}
                    className="bg-input border-border focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-foreground">Grade</Label>
                  <Select
                    value={subject.grade}
                    onValueChange={(value) => updateSubject(subject.id, "grade", value)}
                  >
                    <SelectTrigger className="bg-input border-border focus:border-primary">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="O">O (10)</SelectItem>
                      <SelectItem value="A+">A+ (9)</SelectItem>
                      <SelectItem value="A">A (8)</SelectItem>
                      <SelectItem value="B+">B+ (7)</SelectItem>
                      <SelectItem value="B">B (6)</SelectItem>
                      <SelectItem value="C">C (5)</SelectItem>
                      <SelectItem value="F">F (0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          ))}
          
          <div className="text-center space-y-6 mt-8">
            <HeroButton onClick={calculateSGPA}>
              Calculate SGPA
            </HeroButton>
            
            {sgpa !== null && (
              <Card className="p-8 bg-primary/10 border-primary/30 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-primary mb-2">
                  Your SGPA
                </h2>
                <p className="text-4xl font-bold text-primary">
                  {sgpa}
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SGPACalculator;