import AllHero from "@/components/AllHero";
import GaleriSection from "@/components/informasi/galeri/galeriSection";

export default function Prestasi() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <AllHero
        title="Dokumentasi Prestasi"
        description="Dokumentasi prestasi yang telah diraih oleh Pondok Pesantren Ardaniah"
        imageSrc="/image/prestasi.jpeg"
        altText="Hero Image"
      />

        <GaleriSection type="prestasi" />
    </main>
  );
}