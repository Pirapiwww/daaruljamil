import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  altText?: string;
  imageFit?: "cover" | "contain"; 
  // Kita ubah tipenya agar bisa menerima string bebas (seperti "75%")
  imagePosition?: string; 
}

const AllHero = ({ 
  title, 
  description, 
  imageSrc, 
  altText,
  imageFit = "cover",
  imagePosition = "50%" // Default tetap tengah (50%)
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center border-b-4 border-[#628B35] overflow-hidden">
      {/* Layer 1: Gambar Background */}
      <Image
        src={imageSrc}
        alt={altText || title}
        fill
        priority
        className="transition-all duration-500"
        style={{ 
            objectFit: imageFit, 
            // Menggunakan nilai prop secara langsung
            objectPosition: `center ${imagePosition}` 
        }}
      />
      
      {/* Layer 2: Overlay Phthalo Green */}
      <div className="absolute inset-0 bg-[#103713]/60" />

      {/* Layer 3: Konten Teks */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-3xl md:text-5xl font-bold text-[#FFFDF5] uppercase tracking-wide mb-4">
          {title}
        </h1>
        <div className="w-24 h-1 bg-[#628B35] mx-auto mb-6" />
        <p className="text-sm md:text-base text-[#E2DBD0] max-w-2xl mx-auto leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AllHero;