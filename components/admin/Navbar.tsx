import React from "react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-end w-full gap-4">
      {/* Container Teks Profil - Sembunyi di mobile sangat kecil, muncul di SM keatas */}
      <div className="text-right hidden sm:block">
        <p className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-none mb-1">
          Administrator
        </p>
        <p className="text-sm font-black text-primary leading-none font-heading uppercase">
          Admin Ardaniah
        </p>
      </div>
      
      {/* Avatar/Foto Profil */}
      <div className="flex items-center gap-2 cursor-pointer group p-1 hover:bg-lightGray rounded-2xl transition-all duration-300">
        <div className="w-10 h-10 rounded-xl bg-primary overflow-hidden border-2 border-bone shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
          <img 
            src="https://ui-avatars.com/api/?name=Admin+Ardaniah&background=103713&color=FFFDF5" 
            alt="avatar" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}