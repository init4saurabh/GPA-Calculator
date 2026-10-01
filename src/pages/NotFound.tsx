import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModernButton } from "@/components/ui/modern-button";
import SiteHeader from "@/components/SiteHeader";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main className="site-container flex min-h-[calc(100vh-80px)] items-center py-16">
        <div>
          <span className="eyebrow">Error / 404</span>
          <h1 className="display-title mt-6 text-[clamp(6rem,22vw,18rem)] text-primary">Lost?</h1>
          <p className="max-w-xl text-xl font-black uppercase leading-snug">This page skipped class. Let’s get you back to the calculator.</p>
          <ModernButton size="lg" onClick={() => navigate("/")} className="mt-8"><ArrowLeft /> Back home</ModernButton>
        </div>
      </main>
    </div>
  );
};
export default NotFound;
