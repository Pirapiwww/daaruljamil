import AllHero from "@/components/AllHero";
import KontakSection from "@/components/kontak/KontakSection";

export default function Kontak() {
  return (
    <main>
      <AllHero
        title="Selamat Datang di Situs Kami"
        description="Temukan informasi terkini dan berbagai kegiatan yang kami selenggarakan."
        imageSrc="/images/hero.jpg"
        altText="Hero Image"
      />

    <KontakSection />
    </main>
  );
}