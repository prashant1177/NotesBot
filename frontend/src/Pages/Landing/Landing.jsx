
import { FeaturesSection } from "./Features";
import { HeroSection } from "./HeroSection";
import { HowItWorksSection } from "../../components/HowItWorksSection";
import { TestimonialSection } from "./TestimonialSection";
import "../../App.css"
export default function Landing() {
  
  return (<div>
      <HeroSection/>
      <FeaturesSection  />
      <TestimonialSection  />
      <HowItWorksSection  />
      </div>
  );
}
