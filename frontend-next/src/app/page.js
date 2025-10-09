import { CTASection } from "@/components/CTASection";
import { FeaturesSection } from "./Landing/Features";
import { HeroSection } from "./Landing/HeroSection";
import { TestimonialSection } from "./Landing/TestimonialSection";
import Pricing from "./Landing/Pricing";
import FAQSection from "./Landing/FAQSection";
import RecentBlogs from "./Landing/RecentBlogs";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Pricing/>
      <TestimonialSection />
      <CTASection />
      <FeaturesSection />
      <RecentBlogs/>
      <FAQSection/>
    </div>
  );
}
