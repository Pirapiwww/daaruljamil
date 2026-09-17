import AllHero from "@/components/AllHero";
import SyaratSection from "@/components/pendaftaran/SyaratSection";

export default function Pendaftaran() {
  return (
    <main>
      <AllHero
        title="Selamat Datang di Situs Kami"
        description="Temukan informasi terkini dan berbagai kegiatan yang kami selenggarakan."
        imageSrc="/images/hero.jpg"
        altText="Hero Image"
      />

    <SyaratSection />
    </main>
  );
}