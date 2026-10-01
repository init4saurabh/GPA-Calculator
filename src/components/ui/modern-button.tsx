import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const modernButtonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap border-2 border-foreground text-xs font-black uppercase tracking-[0.12em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[4px_4px_0_#171513] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#171513] active:translate-y-0 active:shadow-[2px_2px_0_#171513]",
        glass: "bg-card text-foreground shadow-[4px_4px_0_#171513] hover:bg-secondary hover:-translate-y-0.5",
        outline: "bg-transparent text-foreground hover:bg-secondary",
        ghost: "border-transparent text-foreground hover:border-foreground hover:bg-card",
      },
      size: {
        default: "h-12 px-6 py-3", sm: "h-9 px-4 text-[11px]", lg: "h-14 px-8 text-sm", xl: "h-16 px-10 text-sm", icon: "h-12 w-12",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof modernButtonVariants> { asChild?: boolean; }
const ModernButton = React.forwardRef<HTMLButtonElement, ModernButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(modernButtonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
ModernButton.displayName = "ModernButton";
export { ModernButton, modernButtonVariants };
