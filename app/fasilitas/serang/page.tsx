import AllHero from "@/components/AllHero";
import FasilitasSection from "@/components/fasilitas/FasilitasSection";

export default function Fasilitas() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <AllHero
        title="Selamat Datang di Situs Kami"
        description="Temukan informasi terkini dan berbagai kegiatan yang kami selenggarakan."
        imageSrc="/images/hero.jpg"
        altText="Hero Image"
      />

      <FasilitasSection fasilitasId={1} />
    </main>
  );
}