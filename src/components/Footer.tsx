import { Twitter, Github, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16 px-[120px]">
      {/* Big Logo */}
      <div className="text-center mb-12">
        <h2 className="font-anton text-[120px] leading-none text-card tracking-tight">
          Mule<span className="text-cyan">Run</span>
        </h2>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center border-t border-card/20 pt-8">
        <div className="flex items-center gap-4">
          <span className="font-inter text-sm text-card/70">© 2024 MuleRun</span>
          <span className="text-card/30">|</span>
          <a href="#" className="font-inter text-sm text-card/70 hover:text-card transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="font-inter text-sm text-card/70 hover:text-card transition-colors">
            Terms of Service
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="w-10 h-10 bg-card/10 rounded flex items-center justify-center hover:bg-card/20 transition-colors">
            <Twitter className="w-5 h-5 text-card" />
          </a>
          <a href="#" className="w-10 h-10 bg-card/10 rounded flex items-center justify-center hover:bg-card/20 transition-colors">
            <Github className="w-5 h-5 text-card" />
          </a>
          <a href="#" className="w-10 h-10 bg-card/10 rounded flex items-center justify-center hover:bg-card/20 transition-colors">
            <Youtube className="w-5 h-5 text-card" />
          </a>
          <a href="#" className="w-10 h-10 bg-card/10 rounded flex items-center justify-center hover:bg-card/20 transition-colors">
            <Linkedin className="w-5 h-5 text-card" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
