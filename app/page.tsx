import GaleriCarousel from "@/components/home/GaleriCarousel";
import HeroSection from "@/components/home/HeroSection"; 
import KeunggulanSection from "@/components/home/Keunggulan";
import LokasiSection from "@/components/home/maps";
import SplitStickyHome from "@/components/home/SplitStickyHome";
import HomeVideo from "@/components/home/HomeVideo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <HeroSection />

      <SplitStickyHome />

      <HomeVideo />

      <GaleriCarousel />

      <KeunggulanSection />
      
      <LokasiSection />
      
      <Footer />
    </main>
  );
}