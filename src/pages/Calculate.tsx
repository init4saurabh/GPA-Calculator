import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calculator, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModernButton } from "@/components/ui/modern-button";
import { ModernCard, ModernCardContent } from "@/components/ui/modern-card";

const Calculate = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-hero-gradient relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative p-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-xl"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </header>

      {/* Main Content */}
      <main className="relative flex items-center justify-center min-h-[80vh]">
        <div className="container mx-auto px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-16">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                What would you like to calculate?
              </h1>
              <p className="text-xl text-foreground/70 font-medium">
                Choose your calculation type below
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <ModernCard className="p-0 cursor-pointer group hover:scale-105" onClick={() => navigate("/calculate/sgpa")}>
                <ModernCardContent className="p-8 text-center">
                  <div className="mx-auto mb-6 p-6 rounded-2xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <Calculator className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    SGPA Calculator
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Calculate your Semester Grade Point Average based on subjects, credits, and grades
                  </p>
                  <ModernButton variant="glass" className="w-full">
                    Calculate SGPA
                  </ModernButton>
                </ModernCardContent>
              </ModernCard>

              <ModernCard className="p-0 cursor-pointer group hover:scale-105" onClick={() => navigate("/calculate/cgpa")}>
                <ModernCardContent className="p-8 text-center">
                  <div className="mx-auto mb-6 p-6 rounded-2xl bg-accent/10 w-fit group-hover:bg-accent/20 transition-colors">
                    <TrendingUp className="h-12 w-12 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                    CGPA Calculator
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Calculate your Cumulative Grade Point Average from semester-wise SGPA values
                  </p>
                  <ModernButton variant="glass" className="w-full">
                    Calculate CGPA
                  </ModernButton>
                </ModernCardContent>
              </ModernCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calculate;