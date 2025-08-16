import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { HeroButton } from "@/components/HeroButton";
import { FeatureCard } from "@/components/FeatureCard";
import { GraduationCap, Calculator, Zap } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-hero-gradient flex flex-col">
      {/* Header */}
      <header className="w-full p-6">
        <div className="container mx-auto">
          <Badge 
            variant="secondary" 
            className="mx-auto block w-fit bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 px-4 py-2"
          >
            ⭐ Exclusively for UCET Students
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-primary mb-6 animate-float">
            GPA Calculator
          </h1>
          <p className="text-xl md:text-2xl text-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Effortlessly calculate your semester and overall GPA - accurate, fast, stress-free
          </p>
          
          <HeroButton 
            onClick={() => navigate("/calculate")}
            className="mb-16"
          >
            Start Calculating
          </HeroButton>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <FeatureCard
              icon={GraduationCap}
              title="UCET Grading"
              description="Accurate results based on UCET's grading system"
            />
            <FeatureCard
              icon={Calculator}
              title="SGPA and CGPA"
              description="Calculate both SGPA and CGPA with ease"
            />
            <FeatureCard
              icon={Zap}
              title="Fast & Clean Interface"
              description="Modern, responsive design that works smoothly everywhere"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;