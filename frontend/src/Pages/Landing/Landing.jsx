
import { ArrowRight, Sparkles, Zap, BookOpen } from "lucide-react";
import { FeaturesSection } from "./Features";
import { CTASection } from "../../components/CTASection";
import { HeroSection } from "./HeroSection";
import { HowItWorksSection } from "../../components/HowItWorksSection";

export default function Landing() {
  
  return (<div>
      <HeroSection/>
      <FeaturesSection/>
      <HowItWorksSection/>
      </div>
  );
}
