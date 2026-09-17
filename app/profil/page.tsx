import AllHero from "@/components/AllHero";
import ProfileSection from "@/components/profile/ProfileSection";

export default function Profile() {
  return (
    <main>
      <AllHero
        title="Profil Pondok Pesantren Ardaniah"
        description="Profil Singkat Pondok Pesantren Ardaniah Pusat dan Cabang Bogor"
        imageSrc="/image/profil.jpg"
        altText="Hero Image"
        imagePosition="70%"
    />

    <ProfileSection />
    </main>
  );
}