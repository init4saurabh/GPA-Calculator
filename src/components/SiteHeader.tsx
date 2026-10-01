import { ArrowLeft, Github, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SiteHeaderProps { backTo?: string; backLabel?: string; onBack?: () => void; }

const SiteHeader = ({ backTo, backLabel = "Back", onBack }: SiteHeaderProps) => {
  const navigate = useNavigate();
  const canGoBack = Boolean(backTo || onBack);
  return (
    <header className="site-container flex h-20 items-center justify-between border-b-2 border-foreground">
      <button onClick={() => (onBack ? onBack() : backTo ? navigate(backTo) : navigate("/"))} className="group flex items-center gap-3 text-left" aria-label={canGoBack ? backLabel : "Go to home"}>
        {canGoBack && <span className="grid h-9 w-9 place-items-center border-2 border-foreground bg-card transition-transform group-hover:-translate-x-1"><ArrowLeft className="h-4 w-4" strokeWidth={3} /></span>}
        <span className="display-title text-2xl tracking-[-0.02em]">GPA<span className="text-primary">.</span></span>
        {canGoBack && <span className="hidden text-xs font-black uppercase tracking-[0.15em] sm:block">{backLabel}</span>}
      </button>
      <div className="flex items-center gap-2">
        <span className="mr-3 hidden text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground md:block">Made for UCET</span>
        <a className="grid h-9 w-9 place-items-center border-2 border-foreground bg-card transition-colors hover:bg-secondary" href="https://github.com/init4saurabh" target="_blank" rel="noreferrer" aria-label="GitHub"><Github className="h-4 w-4" /></a>
        <a className="grid h-9 w-9 place-items-center border-2 border-foreground bg-card transition-colors hover:bg-secondary" href="https://www.linkedin.com/in/saurabh-kumar-6196052ba/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
      </div>
    </header>
  );
};
export default SiteHeader;
