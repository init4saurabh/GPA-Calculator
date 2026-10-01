import * as React from "react";
import { cn } from "@/lib/utils";

const ModernCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative overflow-hidden border-2 border-foreground bg-card shadow-[7px_7px_0_#171513] transition-all duration-200 group", className)} {...props} />
));
ModernCard.displayName = "ModernCard";
const ModernCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col space-y-2 p-8", className)} {...props} />);
ModernCardHeader.displayName = "ModernCardHeader";
const ModernCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => <h3 ref={ref} className={cn("text-2xl font-black leading-none tracking-tight text-foreground", className)} {...props} />);
ModernCardTitle.displayName = "ModernCardTitle";
const ModernCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => <p ref={ref} className={cn("text-base leading-relaxed text-muted-foreground", className)} {...props} />);
ModernCardDescription.displayName = "ModernCardDescription";
const ModernCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("p-8 pt-0", className)} {...props} />);
ModernCardContent.displayName = "ModernCardContent";
const ModernCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center p-8 pt-0", className)} {...props} />);
ModernCardFooter.displayName = "ModernCardFooter";
export { ModernCard, ModernCardHeader, ModernCardFooter, ModernCardTitle, ModernCardDescription, ModernCardContent };
