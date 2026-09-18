import HeroSection from "@/components/home/HeroSection"; 
import JamSection from "@/components/home/jam";
import AboutSection from "@/components/home/about";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <HeroSection />

      <JamSection />      

      <AboutSection />

      <Footer />
      
    </main>
  );
}