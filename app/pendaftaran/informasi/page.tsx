import AllHero from "@/components/AllHero";
import PendaftaranSection from "@/components/pendaftaran/PendaftaranSection";

export default function Pendaftaran() {
  return (
    <main>
      <AllHero
        title="Selamat Datang di Situs Kami"
        description="Temukan informasi terkini dan berbagai kegiatan yang kami selenggarakan."
        imageSrc="/images/hero.jpg"
        altText="Hero Image"
      />

    <PendaftaranSection />
    </main>
  );
}