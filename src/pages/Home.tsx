import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ModernButton } from "@/components/ui/modern-button";
import { ModernCard, ModernCardContent } from "@/components/ui/modern-card";
import { GraduationCap, Calculator, Zap, Sparkles, ArrowRight } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-hero-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/5 to-transparent rounded-full animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-accent/5 to-transparent rounded-full animate-pulse" />
      </div>

      {/* Header */}
      <header className="relative w-full p-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <Badge 
              className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-6 py-2 text-sm font-medium backdrop-blur-xl"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Exclusively for UCET Students
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative flex-1 flex items-center justify-center py-16">
        <div className="container mx-auto px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-float">
              GPA Calculator
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto leading-relaxed font-medium">
              Calculate your semester and cumulative GPA with precision. 
              <span className="text-primary font-semibold"> Fast, accurate, stress-free.</span>
            </p>
            
            <div className="pt-4">
              <ModernButton 
                onClick={() => navigate("/calculate")}
                size="xl"
                className="group"
              >
                Start Calculating
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </ModernButton>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-24">
            {[
              {
                icon: GraduationCap,
                title: "UCET Grading System",
                description: "Precisely calibrated for UCET's official grading standards and calculations"
              },
              {
                icon: Calculator,
                title: "SGPA & CGPA",
                description: "Calculate both semester and cumulative GPA with detailed breakdowns"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Modern interface with instant calculations and responsive design"
              }
            ].map((feature, index) => (
              <ModernCard key={index} className="p-0 h-full group hover:scale-105">
                <ModernCardContent className="p-8 text-center h-full flex flex-col justify-center">
                  <div className="mx-auto mb-6 p-4 rounded-2xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </ModernCardContent>
              </ModernCard>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;