import { cn } from "@/lib/utils";

interface BrandLogoProps {
  inverse?: boolean;
  large?: boolean;
  className?: string;
}

const BrandLogo = ({ inverse = false, large = false, className }: BrandLogoProps) => (
  <span className={cn("group/logo inline-flex items-center", large ? "gap-4" : "gap-3", className)} aria-label="GPA calculator">
    <span className={cn("relative grid shrink-0 place-items-center border-2 font-black transition-transform duration-200 group-hover/logo:-rotate-3", large ? "h-14 w-14 text-3xl" : "h-10 w-10 text-xl", inverse ? "border-background bg-background text-foreground" : "border-foreground bg-foreground text-background")}>
      G
      <span className={cn("absolute -right-1.5 -top-1.5 border-2", large ? "h-4 w-4" : "h-3 w-3", inverse ? "border-foreground bg-secondary" : "border-background bg-primary")} />
    </span>
    <span className="flex flex-col text-left">
      <span className={cn("display-title leading-none", large ? "text-5xl sm:text-6xl" : "text-[1.65rem]", inverse && "text-background")}>
        GPA<span className="text-primary">.</span>
      </span>
      <span className={cn("mt-0.5 hidden text-[8px] font-black uppercase leading-none tracking-[0.22em] sm:block", inverse ? "text-background/55" : "text-muted-foreground")}>
        Grade point, simplified
      </span>
    </span>
  </span>
);

export default BrandLogo;
