import { FeaturesSection } from "./Landing/Features";
import { HeroSection } from "./Landing/HeroSection";
import { HowItWorksSection } from "./Landing/HowItWorksSection";
import { TestimonialSection } from "./Landing/TestimonialSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <HowItWorksSection />{" "}
    </div>
  );
}
