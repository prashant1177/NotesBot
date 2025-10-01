import { CTASection } from "@/components/CTASection";
import { FeaturesSection } from "./Landing/Features";
import { HeroSection } from "./Landing/HeroSection";
import { HowItWorksSection } from "./Landing/HowItWorksSection";
import { TestimonialSection } from "./Landing/TestimonialSection";
import Pricing from "./Landing/Pricing";
import FAQSection from "./Landing/FAQSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Pricing/>
      <TestimonialSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <FAQSection/>
    </div>
  );
}
