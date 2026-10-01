import { ArrowLeft, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import BrandLogo from "@/components/BrandLogo";

interface SiteHeaderProps { backTo?: string; backLabel?: string; onBack?: () => void; }

const SiteHeader = ({ backTo, backLabel = "Back", onBack }: SiteHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const canGoBack = Boolean(backTo || onBack);
  const isHome = location.pathname === "/";

  return (
    <header className="site-container flex h-20 items-center justify-between border-b-2 border-foreground">
      <div className="flex items-center gap-3 sm:gap-5">
        {canGoBack && (
          <button onClick={() => (onBack ? onBack() : navigate(backTo!))} className="group grid h-10 w-10 place-items-center border-2 border-foreground bg-card transition-all hover:-translate-x-1 hover:bg-secondary" aria-label={backLabel}>
            <ArrowLeft className="h-4 w-4" strokeWidth={3} />
          </button>
        )}
        <button onClick={() => navigate("/")} className="leading-none" aria-label="Go to home"><BrandLogo /></button>
        {canGoBack && <span className="hidden border-l-2 border-foreground pl-5 text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground md:block">{backLabel}</span>}
      </div>

      <nav className="flex items-center gap-2" aria-label="Primary navigation">
        <span className="mr-3 hidden text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground lg:block">UCET · SGPA · CGPA</span>
        <a className="hidden h-9 w-9 place-items-center border-2 border-foreground bg-card transition-colors hover:bg-secondary sm:grid" href="https://github.com/init4saurabh" target="_blank" rel="noreferrer" aria-label="GitHub"><Github className="h-4 w-4" /></a>
        <a className="hidden h-9 w-9 place-items-center border-2 border-foreground bg-card transition-colors hover:bg-secondary sm:grid" href="https://www.linkedin.com/in/saurabh-kumar-6196052ba/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
        {isHome && (
          <button onClick={() => navigate("/calculate")} className="ml-1 flex h-10 items-center gap-2 border-2 border-foreground bg-primary px-3 text-[10px] font-black uppercase tracking-[0.12em] shadow-[3px_3px_0_#171513] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#171513] sm:px-4">
            Start <span className="hidden sm:inline">calculating</span><ArrowUpRight className="h-3.5 w-3.5" strokeWidth={3} />
          </button>
        )}
      </nav>
    </header>
  );
};
export default SiteHeader;
