import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import JournalSection from "@/components/JournalSection";
import ProcessSection from "@/components/ProcessSection";
import AdvisorySection from "@/components/AdvisorySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <JournalSection />
      <ProcessSection />
      {/* <AdvisorySection /> */}
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
