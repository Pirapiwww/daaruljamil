import AllHero from "@/components/AllHero";
import Footer from "@/components/footer";

export default function Profile() {
  return (
    <main>
      <AllHero
        title="Profil Pondok Pesantren Ardaniah"
        description="Profil Singkat Pondok Pesantren Ardaniah Pusat dan Cabang Bogor"
        imageSrc="/image/masjid1.jpeg"
        altText="Hero Image"
        imagePosition="50%"
    />

    <Footer />
    </main>
  );
}