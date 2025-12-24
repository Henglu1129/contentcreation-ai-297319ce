import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

// Helper function to get cookie value by name
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

const CTASection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookie('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleCTAClick = (e: React.MouseEvent) => {
    if (isLoggedIn) {
      e.preventDefault();
      const section = document.getElementById('out-of-content-ideas');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="bg-cyan py-12 md:py-20 px-4 md:px-[120px] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="grid grid-cols-8 gap-4">
          {[...Array(32)].map((_, i) => (
            <div 
              key={i} 
              className="w-4 h-4 bg-foreground rounded-sm"
              style={{ 
                transform: `rotate(${Math.random() * 45}deg)`,
                opacity: Math.random() * 0.5 + 0.2
              }}
            />
          ))}
        </div>
      </div>

      <div className="text-center relative z-10">
        {/* Decorative Arrow */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-yellow-bright rotate-45" />
              ))}
            </div>
            <ArrowRight className="w-8 h-8 text-foreground" />
          </div>
        </div>

        <h2 className="font-anton text-4xl md:text-6xl leading-[110%] text-foreground mb-6">
          <span className="bg-yellow-bright px-2">Get a Mule Run</span>
          <br />
          <span className="bg-yellow-light px-2">Your Messes</span>
        </h2>

        <a 
          href={isLoggedIn ? "#out-of-content-ideas" : "https://mulerun.com/signin?continue=%2Fthemes%2Fcontentcreation-ai%2F"}
          onClick={handleCTAClick}
          target={isLoggedIn ? undefined : "_blank"}
          rel={isLoggedIn ? undefined : "noopener noreferrer"}
          className="bg-foreground text-card px-6 py-3 rounded font-jetbrains font-bold text-sm uppercase inline-flex items-center gap-2 mx-auto hover:bg-foreground/90 transition-colors"
        >
          {isLoggedIn ? "Run it now!" : "Sign Up for Free"}
          <ArrowRight className="w-5 h-5" />
        </a>

        <p className="font-inter text-sm text-foreground/70 mt-4">
          Now, in Open Beta — experiment for free, no strings attached.
        </p>
      </div>
    </section>
  );
};

export default CTASection;