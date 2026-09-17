import AllHero from "@/components/AllHero";
import TahassusSection from "@/components/pendidikan/TahassusSection";

export default function Tahassus() {
  return (
    <main>
      <AllHero
        title="Selamat Datang di Situs Kami"
        description="Temukan informasi terkini dan berbagai kegiatan yang kami selenggarakan."
        imageSrc="/images/hero.jpg"
        altText="Hero Image"
      />

    <TahassusSection />
    </main>
  );
}