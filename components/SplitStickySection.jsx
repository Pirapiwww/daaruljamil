export default function SplitStickySection({ left, right }) {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Mobile version - Tetap di atas */}
          <div className="md:hidden order-first">
            {right}
          </div>

          {/* LEFT - Konten Utama */}
          <div className="md:col-span-8 py-10">
            {left}
          </div>

          {/* RIGHT - Sidebar Centered (Desktop Only) */}
          <div className="md:col-span-4 hidden md:flex flex-col justify-center relative">
            {/* Sticky dihilangkan atau disesuaikan karena 'justify-center' 
                sudah menjaga konten tetap di tengah layar selama 
                tinggi 'left' lebih besar dari 'right'.
            */}
            <div className="py-10">
              {right}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}