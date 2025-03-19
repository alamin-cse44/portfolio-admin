import Shell from "@/components/ui/core/Shell";
import HeroSection from "./home/HeroSection";
import Apartments from "./home/Apartments";
import ContactSection from "./home/ContactSection";
import TestimonialSection from "./home/TestimonialSection";
import SearchAvailability from "./home/SearchAvailability";

const HomePage = () => {
  return (
    <Shell className="mt-2">
      <HeroSection />
      <SearchAvailability />
      <Apartments />
      <TestimonialSection />
      <ContactSection />
    </Shell>
  );
};

export default HomePage;
