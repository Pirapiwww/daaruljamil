import AllHero from "@/components/AllHero";
import GaleriSection from "@/components/informasi/galeri/galeriSection";

export default function Kegiatan() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <AllHero
        title="Dokumentasi Kegiatan"
        description="Dokumentasi kegiatan yang telah dilaksanakan oleh Pondok Pesantren Ardaniah"
        imageSrc="/image/kegiatan.jpeg"
        altText="Hero Image"
      />

    <GaleriSection type="kegiatan" />
    </main>
  );
}