import { ChevronDown, ArrowRight } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-[120px] py-4 h-20 bg-background">
      <div className="flex items-center gap-11">
        {/* Logo */}
        <div className="flex items-center gap-2 bg-stone-dark rounded-sm py-1 pr-2 pl-0.5 h-10">
          <div className="w-9 h-9 bg-card rounded-sm border border-border/10 flex items-center justify-center">
            <PixelIcon />
          </div>
          <span className="font-jakarta font-bold text-lg text-foreground">MuleRun</span>
        </div>

        {/* Nav Links */}
        <nav className="flex items-center gap-7">
          <button className="flex items-center gap-0 font-jetbrains font-bold text-sm uppercase tracking-tight text-foreground/80 hover:text-foreground transition-colors">
            THEMES
            <ChevronDown className="w-6 h-6" />
          </button>
          <button className="font-jetbrains font-bold text-sm uppercase tracking-tight text-foreground/80 hover:text-foreground transition-colors">
            Agent Store
          </button>
          <button className="font-jetbrains font-bold text-sm uppercase tracking-tight text-foreground/80 hover:text-foreground transition-colors">
            Ambassadors
          </button>
          <button className="font-jetbrains font-bold text-sm uppercase tracking-tight text-foreground/80 hover:text-foreground transition-colors">
            DOCS
          </button>
          <button className="flex items-center gap-0 font-jetbrains font-bold text-sm uppercase tracking-tight text-foreground/80 hover:text-foreground transition-colors">
            Resources
            <ChevronDown className="w-6 h-6" />
          </button>
        </nav>
      </div>

      {/* Sign In Button */}
      <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded font-jetbrains font-bold text-sm uppercase tracking-tight hover:bg-primary/90 transition-colors">
        Sign In
        <ArrowRight className="w-5 h-5" />
      </button>
    </header>
  );
};

const PixelIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground">
    <rect x="6" y="2" width="3" height="3" fill="currentColor" />
    <rect x="9" y="2" width="3" height="3" fill="currentColor" />
    <rect x="12" y="3" width="8" height="2" fill="currentColor" />
    <rect x="4" y="5" width="16" height="3" fill="currentColor" />
    <rect x="2" y="8" width="20" height="8" fill="currentColor" />
    <rect x="4" y="16" width="16" height="3" fill="currentColor" />
    <rect x="6" y="19" width="12" height="2" fill="currentColor" />
    <rect x="8" y="10" width="2" height="2" fill="hsl(var(--card))" />
    <rect x="14" y="10" width="2" height="2" fill="hsl(var(--card))" />
    <rect x="16" y="14" width="4" height="3" fill="hsl(var(--card))" />
  </svg>
);

export default Header;
