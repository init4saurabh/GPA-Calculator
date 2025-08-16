import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="p-6 bg-card border-border hover:shadow-card-glow transition-all duration-300 hover:scale-105">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="h-8 w-8 text-primary animate-float" />
        </div>
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </Card>
  );
};