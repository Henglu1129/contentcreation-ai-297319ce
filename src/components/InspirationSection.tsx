import { ArrowRight, Play, Pause, SkipForward } from "lucide-react";
import featureImage1 from "@/assets/feature-image-1.png";
import featureImage2 from "@/assets/feature-image-2.png";

const InspirationSection = () => {
  return (
    <section className="py-10 bg-background">
      {/* Section 1 - When inspiration strikes */}
      <div className="px-[120px] py-16">
        <div className="flex gap-[100px] items-start">
          {/* Left Content */}
          <div className="flex-1">
            <h2 className="font-anton text-5xl leading-[120%] text-foreground mb-8">
              When inspiration strikes—<br />create instantly
            </h2>
            
            {/* Video Card */}
            <div className="bg-card rounded-lg border border-foreground/10 p-4 max-w-md">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-cyan rounded-full" />
                <span className="font-jetbrains font-bold text-xs uppercase tracking-wider text-foreground">
                  ILLUSTRATE VIDEO SPARKS
                </span>
              </div>
              <p className="font-inter text-sm text-muted-foreground mb-4">
                Capture and visualize your creative ideas in real-time, turning fleeting thoughts into shareable video concepts.
              </p>
              <button className="flex items-center gap-2 bg-cyan text-foreground px-3 py-2 rounded font-jetbrains font-bold text-xs uppercase">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="mt-4 text-xs font-jetbrains text-muted-foreground uppercase">
                CREATOR PLAN ONLY
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img 
              src={featureImage1} 
              alt="AI Creative Tool"
              className="w-[400px] h-[500px] object-cover rounded-lg"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-cyan rounded-lg flex items-center justify-center">
              <DecorativeShape />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 - You're the creator */}
      <div className="px-[120px] py-16">
        <div className="flex gap-[100px] items-start flex-row-reverse">
          <div className="flex-1 text-right">
            <h2 className="font-anton text-5xl leading-[120%] text-foreground mb-8">
              You're the creator—<br />and the crew
            </h2>
            
            <div className="flex flex-col gap-4 items-end">
              <div className="bg-card rounded-lg border border-foreground/10 p-4 max-w-md text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-jetbrains font-bold text-xs uppercase text-cyan tracking-wider">
                    AUTO SHORT VIDEO CREATOR
                  </span>
                </div>
                <p className="font-inter text-sm text-muted-foreground">
                  Turn any idea, topic, or script into polished short-form videos—ready for TikTok, Reels, and Shorts in minutes.
                </p>
                <button className="mt-3 font-jetbrains font-bold text-xs uppercase text-foreground underline">
                  Learn More
                </button>
              </div>
              
              <div className="font-jetbrains text-xs uppercase text-muted-foreground">
                PODCAST GENERATOR
              </div>
              <div className="font-jetbrains text-xs uppercase text-muted-foreground">
                SUBTITLE TRANSLATE AI PRO
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src={featureImage2} 
              alt="AI Video Creator"
              className="w-[400px] h-[500px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Section 3 - Great content deserves */}
      <div className="px-[120px] py-16">
        <div className="flex gap-[100px] items-start">
          <div className="flex-1">
            <h2 className="font-anton text-5xl leading-[120%] text-foreground mb-8">
              Great content deserves<br />great attention
            </h2>
            
            <div className="bg-card rounded-lg border border-foreground/10 p-4 max-w-md">
              <span className="font-jetbrains font-bold text-xs uppercase text-yellow-glow tracking-wider">
                YOUTUBE TITLE GENERATOR WITH EMOJIS
              </span>
              <p className="font-inter text-sm text-muted-foreground mt-2">
                Generate attention-grabbing, emoji-enhanced YouTube titles optimized for clicks, engagement, and SEO performance.
              </p>
              <button className="mt-3 flex items-center gap-2 bg-yellow-bright text-foreground px-3 py-2 rounded font-jetbrains font-bold text-xs uppercase">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="mt-4 text-xs font-jetbrains text-muted-foreground uppercase">
                YOUTUBE CAPTION TRANSCRIPT
              </div>
            </div>
          </div>

          <div className="w-[400px] h-[300px] bg-yellow-light rounded-lg flex items-center justify-center">
            <div className="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-20 h-20 bg-card rounded border border-yellow-glow" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 - One piece, every platform */}
      <div className="px-[120px] py-16">
        <div className="text-center mb-12">
          <h2 className="font-anton text-5xl leading-[120%] text-foreground">
            One piece. Every platform.
          </h2>
        </div>
        
        <div className="flex gap-8 justify-center">
          <div className="bg-card rounded-lg border border-foreground/10 p-6 max-w-sm">
            <div className="w-full h-48 bg-yellow-light rounded mb-4 flex items-center justify-center">
              <Play className="w-12 h-12 text-foreground/50" />
            </div>
            <span className="font-jetbrains font-bold text-xs uppercase text-cyan tracking-wider">
              YOUTUBE VIDEO TO SOCIAL CONTENT
            </span>
            <p className="font-inter text-sm text-muted-foreground mt-2">
              Turn long-form YouTube videos into scroll-stopping social clips for TikTok, Instagram Reels, and Twitter.
            </p>
          </div>
          
          <div className="flex flex-col gap-2 text-right">
            <span className="font-jetbrains text-xs uppercase text-muted-foreground">
              AI EDITING POWERED CLIP FINDER
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const DecorativeShape = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 0L48 24L24 48L0 24L24 0Z" fill="hsl(var(--foreground))" />
  </svg>
);

export default InspirationSection;
