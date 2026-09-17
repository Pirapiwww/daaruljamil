import AllHero from "@/components/AllHero";
import KelasSection from "@/components/pendidikan/KelasSection";

export default function Kurikulum() {
  return (
    <main>
      <AllHero
        title="Selamat Datang di Situs Kami"
        description="Temukan informasi terkini dan berbagai kegiatan yang kami selenggarakan."
        imageSrc="/images/hero.jpg"
        altText="Hero Image"
      />

    <KelasSection />
    </main>
  );
}