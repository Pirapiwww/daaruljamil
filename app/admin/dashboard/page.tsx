export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Dashboard</h1>
      
      {/* Welcome Banner seperti di gambar */}
      <div className="bg-[#a2f3e1] p-10 rounded-[2rem] shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Hai Admin, welcome back
          </h2>
          <p className="text-gray-700 font-medium">
            Semoga hari Anda menyenangkan dalam mengelola sistem.
          </p>
        </div>
        {/* Dekorasi abstrak */}
        <div className="absolute top-0 right-0 w-64 h-full bg-white/10 skew-x-12 translate-x-20" />
      </div>

      {/* Content Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-white rounded-3xl border border-gray-100 shadow-sm" />
        ))}
      </div>
    </div>
  );
}