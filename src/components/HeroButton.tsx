import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export const HeroButton = ({ 
  children, 
  onClick, 
  variant = "primary",
  className 
}: HeroButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "px-8 py-6 text-lg font-semibold transition-all duration-300 animate-glow",
        variant === "primary" && "bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow",
        variant === "secondary" && "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-primary/30",
        className
      )}
    >
      {children}
    </Button>
  );
};