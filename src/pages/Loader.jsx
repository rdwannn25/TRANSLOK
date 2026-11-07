import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F4F6F4] backdrop-blur-sm">
      {/* Logo TransLok */}
      <div className="w-16 h-16 mb-4 rounded-2xl bg-[#1AAA4A] flex items-center justify-center text-white font-bold text-4xl shadow-md animate-pulse">
        T
      </div>
      
      {/* Teks Loading */}
      <h2 className="text-lg font-bold text-gray-900 tracking-wide mb-1">
        TRANSLOK
      </h2>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">
        Memuat Data Rute...
      </p>

      {/* Animasi Titik Tiga Warna (Identitas Moda Transportasi) */}
      <div className="flex gap-2.5">
        <span 
          className="w-3 h-3 rounded-full bg-[#1AAA4A] animate-bounce" 
          style={{ animationDelay: "0s" }}
        />
        <span 
          className="w-3 h-3 rounded-full bg-[#1A72BA] animate-bounce" 
          style={{ animationDelay: "0.15s" }}
        />
        <span 
          className="w-3 h-3 rounded-full bg-[#FFCB07] animate-bounce" 
          style={{ animationDelay: "0.3s" }}
        />
      </div>
    </div>
  );
}