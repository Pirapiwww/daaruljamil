import AllHero from "@/components/AllHero";
import Footer from "@/components/footer";
import Masjid from "@/components/profil/masjid";

export default function Profile() {
  return (
    <main>
      <AllHero
        title="Profil Masjid Daarul Jamil"
        description="Informasi tentang Masjid Daarul Jamil"
        imageSrc="/image/masjid1.jpeg"
        altText="Hero Image"
        imagePosition="50%"
    />

    <Masjid />

    <Footer />
    </main>
  );
}