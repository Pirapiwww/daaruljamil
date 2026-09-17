import AllHero from "@/components/AllHero";
import PublikasiSection from "@/components/informasi/publikasi/PublikasiSection";
import PublikasiSection2 from "@/components/informasi/publikasi/PublikasiSection2";

export default function Publikasi() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <AllHero
        title="Selamat Datang di Situs Kami"
        description="Temukan informasi terkini dan berbagai kegiatan yang kami selenggarakan."
        imageSrc="/images/hero.jpg"
        altText="Hero Image"
      />

    <PublikasiSection />

    </main>
  );
}