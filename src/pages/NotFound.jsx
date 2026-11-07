// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F6F4] flex flex-col items-center justify-center p-6 text-center font-body">
      {/* Ikon / Visual 404 */}
      <div className="relative mb-8">
        <div className="text-9xl font-black text-gray-200 tracking-tighter">
          404
        </div>
        {/* Ornamen rute terputus */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[#1AAA4A] ring-4 ring-white shadow-sm"></span>
          <span className="w-16 h-1.5 bg-[#1AAA4A] rounded-full"></span>
          <span className="w-16 h-1.5 bg-gray-300 rounded-full border-t border-dashed border-gray-400"></span>
          <span className="w-4 h-4 rounded-full bg-red-500 ring-4 ring-white shadow-sm flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          </span>
        </div>
      </div>

      {/* Teks Pesan */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        Oops! Anda Keluar Jalur
      </h1>
      <p className="text-sm text-[#71796F] max-w-md mx-auto mb-8">
        Halaman atau rute yang Anda cari tidak ditemukan dalam sistem TRANSLOK. 
        Mungkin URL-nya salah atau halaman telah dipindahkan.
      </p>

      {/* Tombol Kembali */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1AAA4A] hover:bg-[#138037] text-white font-bold rounded-xl shadow-md transition-transform hover:-translate-y-0.5"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Peta Rute
      </button>

      {/* Identitas Aplikasi Tambahan */}
      <div className="mt-12 flex items-center gap-1.5 opacity-60">
        <span className="w-2.5 h-2.5 rounded-full bg-[#1AAA4A]"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#1A72BA]"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFCB07]"></span>
      </div>
    </div>
  );
}