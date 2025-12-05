import { useEffect, useState } from "react";
import logoDescriprt from "@/assets/logo-descript.png";
import logoMidjourney from "@/assets/logo-midjourney.png";
import logoImages from "@/assets/logo-images.png";
import logoCapcut from "@/assets/logo-capcut.png";
import logoVeed from "@/assets/logo-veed.png";
import logoHubspot from "@/assets/logo-hubspot.jpg";
import logoCanva from "@/assets/logo-canva.png";
import logoRepurpose from "@/assets/logo-repurpose.jpg";
import logoMule from "@/assets/logo-mule.png";

const PricingSection = () => {
  const [phase, setPhase] = useState<'spread' | 'converging' | 'merged' | 'expanding'>('spread');
  
  const logos = [
    { src: logoDescriprt, alt: "Descript" },
    { src: logoMidjourney, alt: "Midjourney" },
    { src: logoImages, alt: "Images" },
    { src: logoCapcut, alt: "CapCut" },
    { src: logoVeed, alt: "Veed" },
    { src: logoHubspot, alt: "HubSpot" },
    { src: logoCanva, alt: "Canva" },
    { src: logoRepurpose, alt: "Repurpose" },
  ];

  useEffect(() => {
    const timings = {
      spread: 1500,
      converging: 1200,
      merged: 2500,
      expanding: 1200,
    };

    const timer = setTimeout(() => {
      setPhase(current => {
        switch (current) {
          case 'spread': return 'converging';
          case 'converging': return 'merged';
          case 'merged': return 'expanding';
          case 'expanding': return 'spread';
          default: return 'spread';
        }
      });
    }, timings[phase]);

    return () => clearTimeout(timer);
  }, [phase]);

  // Calculate horizontal offset to move logos to center
  const getLogoOffset = (index: number) => {
    // Position 0-3 are on left side, 4-7 are on right side
    // Each logo needs to move towards the center
    // Gap is 16px (gap-4), logo size is 85px
    const logoSize = 85;
    const gap = 16;
    const totalWidth = logoSize + gap;
    
    // Distance from center for each logo
    // Index 0,1,2,3 -> left side (negative offset to go right)
    // Index 4,5,6,7 -> right side (positive offset to go left)
    const centerPosition = 3.5; // between index 3 and 4
    const offsetFromCenter = (index - centerPosition) * totalWidth;
    
    return -offsetFromCenter; // Negative because we want to move towards center
  };

  const isConvergedOrMerged = phase === 'converging' || phase === 'merged';

  return (
    <section className="bg-yellow-light py-16 px-6">
      <div className="bg-[#FDFBF5] rounded-2xl p-12 max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-anton text-5xl md:text-6xl text-foreground mb-4">
            Mulerun's all-in-one edge
          </h2>
          <p className="font-inter text-sm text-muted-foreground">
            <span className="highlight-yellow px-2 py-1">Multiple pro tools, a fraction of the price.</span>
          </p>
        </div>

        {/* Platform Icons with Animation */}
        <div className="relative flex justify-center items-center gap-3 md:gap-4 mb-12 h-[85px]">
          {/* Individual logos */}
          {logos.map((logo, index) => {
            const offset = getLogoOffset(index);
            const shouldHide = phase === 'merged' || phase === 'converging';
            
            return (
              <div 
                key={index}
                style={{
                  transform: shouldHide ? `translateX(${offset}px) scale(0)` : 'translateX(0) scale(1)',
                  opacity: shouldHide ? 0 : 1,
                  transition: 'all 1s ease-in-out',
                }}
                className="w-16 h-16 md:w-[85px] md:h-[85px] rounded-full border border-foreground/10 flex items-center justify-center shadow-sm overflow-hidden flex-shrink-0"
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
          
          {/* Mule logo (appears when merged) */}
          <div 
            style={{
              opacity: phase === 'merged' ? 1 : phase === 'converging' ? 0 : 0,
              transform: phase === 'merged' ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.5)',
              transition: phase === 'converging' ? 'all 0.8s ease-out 0.5s' : phase === 'expanding' ? 'all 0.3s ease-in' : 'all 0.5s ease-out',
            }}
            className="absolute left-1/2 top-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full border border-foreground/10 flex items-center justify-center shadow-lg overflow-hidden bg-[#FDFBF5]"
          >
            <img 
              src={logoMule} 
              alt="Mulerun" 
              className="w-full h-full object-contain p-1"
            />
          </div>
        </div>

        {/* Pricing Label */}
        <div className="text-center mb-8">
          <span className="font-inter text-sm text-muted-foreground">
            Multiple pro platforms = <span className="text-cyan">Mulerun has them all.</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="flex gap-6 justify-center mb-12">
          <div className="bg-background border border-foreground/20 rounded-lg p-6 w-[280px]">
            <span className="font-jetbrains text-xs uppercase text-muted-foreground block mb-2">
              Buy 3 separate accounts:
            </span>
            <div className="font-inter font-bold text-2xl text-foreground">
              $65-85/month
            </div>
          </div>
          
          <div className="bg-cyan rounded-lg p-6 w-[280px] relative">
            <span className="font-jetbrains text-xs uppercase text-foreground/70 block mb-2">
              Get everything with Mulerun:
            </span>
            <div className="font-inter font-bold text-lg text-foreground">
              starting at 
              <span className="text-2xl ml-1">$x.xx/mo</span>
            </div>
          </div>
          
          <div className="bg-background border border-foreground/20 rounded-lg p-6 w-[280px]">
            <span className="font-jetbrains text-xs uppercase text-muted-foreground block mb-2">
              Annual savings:
            </span>
            <div className="font-inter font-bold text-2xl text-yellow-bright">
              $17,264/year
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="flex justify-center gap-16 mb-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-foreground/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-inter font-bold text-lg text-foreground mb-2">hit</h3>
            <p className="font-inter text-xs text-muted-foreground max-w-[200px]">
              Over countless AI features—video scripts, captions, thumbnails, shorts.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-foreground/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-inter font-bold text-lg text-foreground mb-2">Quality</h3>
            <p className="font-inter text-xs text-muted-foreground max-w-[200px]">
              No more juggling multiple tools. Everything in one place, one login, one workflow.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-foreground/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="font-inter font-bold text-lg text-foreground mb-2">$?</h3>
            <p className="font-inter text-xs text-muted-foreground max-w-[200px]">
              Predictable and scalable pricing for every stage of growth.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col items-center">
          <button className="bg-foreground text-background px-6 py-3 rounded font-jetbrains font-bold text-sm uppercase flex items-center gap-2 hover:bg-foreground/90 transition-colors">
            Sign Up Now
            <span className="tracking-tighter">&gt;&gt;</span>
          </button>
          {/* Tooltip bubble */}
          <div className="relative mt-4">
            {/* Arrow pointing up */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-bright rotate-45" />
            {/* Bubble */}
            <div className="bg-yellow-bright text-foreground px-5 py-3 rounded-lg relative">
              <p className="font-inter text-sm font-medium text-center">Get 300 free credits now.</p>
              <p className="font-inter text-sm text-center">No card required.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;