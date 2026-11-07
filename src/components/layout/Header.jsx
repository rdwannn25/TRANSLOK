// src/components/layout/Header.jsx (atau src/components/Header.jsx)
import React from "react";
// Catatan: Sesuaikan "../data/translokdata.js" atau "../../data/translokdata.js" dengan posisi file Header.jsx Anda
import { OPERATIONAL_INFO, STOPS_DATA } from "../../data/translokdata.js";
import posterImage from "../../assets/images/poster1.jpg"; // Pastikan path ini sesuai dengan struktur folder Anda
import { ArrowRightLeft, Clock, Building2, CarFront, BusFront, Waypoints } from "lucide-react";

export default function Header({
  selectedMode = "ALL",
  onSelectMode = () => {},
}) {
  const transitStopsCount = STOPS_DATA.filter((s) => s.isTransit).length;

  return (
    <header className="bg-white border-b border-gray-200 font-body shadow-xs">
      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Tambahkan class w-11 h-11 dan object-contain, serta perbaiki src path */}
          <img 
            src="/Poster2.png" 
            alt="Logo Translok" 
            className="w-11 h-11 object-contain drop-shadow-sm" 
          />
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline font-bold text-lg text-gray-900 tracking-tight">
                {OPERATIONAL_INFO.appName}
              </h1>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#1AAA4A]/10 text-[#1AAA4A]">
                Integrasi Angkot & BRT
              </span>
            </div>
            <p className="text-xs text-[#71796F]">
              Sistem Informasi Angkutan Umum {OPERATIONAL_INFO.region}
            </p>
          </div>
        </div>

        {/* Jam Operasional Pill (FR-08) */}
        <div className="hidden sm:flex items-center gap-2 bg-[#F4F6F4] px-3.5 py-1.5 rounded-full border border-gray-200">
          <span className="w-2 h-2 rounded-full bg-[#1AAA4A] animate-pulse" />
          <span className="text-xs font-medium text-gray-700">
            Jam Operasional:{" "}
            <strong className="text-gray-900">
              {OPERATIONAL_INFO.operationalHours}
            </strong>
          </span>
        </div>
      </div>

           <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-white">
              
              {/* Latar Belakang Gambar */}
              <div className="absolute inset-0">
                <img 
                  src={posterImage} 
                  alt="Latar Translok Bandung" 
                  className="w-full h-full object-cover object-center"
                />
                {/* Overlay Gradien agar Teks Terbaca */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
              </div>

              {/* Konten Hero (Teks & Kartu) */}
              <div className="relative z-10 p-6 md:p-10 flex flex-col justify-end min-h-[360px] md:min-h-[420px]">
                
                {/* Tipografi */}
                <div className="max-w-2xl mb-8">
                  <span className="inline-block px-3 py-1 bg-[#1AAA4A]/90 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3 backdrop-blur-sm shadow-sm">
                    Bandung Raya
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-md">
                    LAYANAN TERPADU <span className="text-[#FFCB07]">TRANSLOK</span>
                  </h1>
                  <p className="mt-3 text-gray-200 text-sm md:text-base font-medium drop-shadow">
                    Sistem informasi rute, jadwal, dan integrasi armada Angkot & Bus BRT demi perjalanan yang nyaman dan tepat waktu.
                  </p>
                </div>

                {/* Glassmorphism Info Cards (Menggantikan elemen statis di poster asli) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">   
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4 transition hover:bg-white/20">
                      <div className="w-12 h-12 bg-[#1A72BA]/80 rounded-xl flex items-center justify-center text-white shrink-0 shadow-inner">
                        <ArrowRightLeft className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">Armada Angkot</h3>
                        <p className="text-gray-300 text-xs mt-0.5">Rute & Informasi Terintegrasi</p>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4 transition hover:bg-white/20">
                      <div className="w-12 h-12 bg-[#FFCB07]/90 rounded-xl flex items-center justify-center text-gray-900 shrink-0 shadow-inner">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">Armada Bus BRT</h3>
                        <p className="text-gray-300 text-xs mt-0.5">Jadwal Tepat Waktu</p>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4 transition hover:bg-white/20">
                      <div className="w-12 h-12 bg-[#1AAA4A]/80 rounded-xl flex items-center justify-center text-white shrink-0 shadow-inner">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">Fasilitas Halte</h3>
                        <p className="text-gray-300 text-xs mt-0.5">Pemberhentian Nyaman & Aman</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

             {/* Hero Info & Mode Switcher Section (FR-01, FR-03, FR-09, FR-13) */}
      <div className="bg-[#F4F6F4] py-5 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
            <div>
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-gray-900">
                Informasi Rute, Halte Transit & Armada
              </h2>
              <p className="text-xs sm:text-sm text-[#71796F] mt-1 max-w-2xl">
                Pantau ketersediaan armada pada titik halte resmi, jadwal keberangkatan,
                serta zona aman penaikan dan penurunan penumpang di koridor Bandung Raya.
              </p>
            </div>
          
            {/* Pemilih Moda Transportasi (FR-03) */}
            <div className="inline-flex p-1 rounded-xl bg-white border border-gray-200 shadow-xs self-start">
              {[
                { id: "ALL", label: "Semua & Titik Transit" },
                { id: "ANGKOT", label: "Angkot Feeder" },
                { id: "BRT", label: "Bus BRT" },
              ].map((tab) => {
                const isActive = selectedMode === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onSelectMode(tab.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? tab.id === "ANGKOT"
                          ? "bg-[#1A72BA] text-white shadow-xs"
                          : tab.id === "BRT"
                          ? "bg-[#FFCB07] text-gray-900 shadow-xs"
                          : "bg-[#1AAA4A] text-white shadow-xs"
                        : "text-[#71796F] hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>


          {/* 3 Kartu Informasi Utama: Angkot, Bus BRT, dan Info Titik Transit */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Informasi Angkot (Tertiary Blue #1A72BA) */}
            <div
              onClick={() => onSelectMode("ANGKOT")}
              className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer ${
                selectedMode === "ANGKOT"
                  ? "border-[#1A72BA] ring-2 ring-[#1A72BA]/15"
                  : "border-gray-200 hover:border-[#1A72BA]/50"
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#1A72BA]/10 text-[#1A72BA]">
                  CARI ANGKOT
                </span>
                <CarFront className="w-5 h-5 text-[#1A72BA]" />
              </div>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs text-[#71796F]"></p>
                  <p className="font-headline text-lg sm:text-xl font-bold text-gray-900">
                    {OPERATIONAL_INFO.modes.ANGKOT.tariffLabel}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-headline text-2xl font-extrabold text-[#1A72BA]">
                    {OPERATIONAL_INFO.modes.ANGKOT.activeFleet}
                  </span>
                  <span className="text-xs text-[#71796F]">
                    /{OPERATIONAL_INFO.modes.ANGKOT.totalFleet} 
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Informasi Bus BRT (Secondary Yellow #FFCB07) */}
            <div
              onClick={() => onSelectMode("BRT")}
              className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer ${
                selectedMode === "BRT"
                  ? "border-[#FFCB07] ring-2 ring-[#FFCB07]/30"
                  : "border-gray-200 hover:border-[#FFCB07]"
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FFCB07]/25 text-gray-900">
                  CARI BUS
                </span>
                <BusFront className="w-5 h-5 text-[#FFCB07]" />
              </div>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs text-[#71796F]"></p>
                  <p className="font-headline text-lg sm:text-xl font-bold text-gray-900">
                    {OPERATIONAL_INFO.modes.BRT.tariffLabel}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-headline text-2xl font-extrabold text-amber-600">
                    {OPERATIONAL_INFO.modes.BRT.activeFleet}
                  </span>
                  <span className="text-xs text-[#71796F]">
                    /{OPERATIONAL_INFO.modes.BRT.totalFleet} 
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Ringkasan Halte & Titik Transit Integrasi (Primary Green #1AAA4A) */}
            <div
              onClick={() => onSelectMode("ALL")}
              className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer ${
                selectedMode === "ALL"
                  ? "border-[#1AAA4A] ring-2 ring-[#1AAA4A]/15"
                  : "border-gray-200 hover:border-[#1AAA4A]/50"
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#1AAA4A]/10 text-[#1AAA4A]">
                  INTEGRASI JALUR & HALTE
                </span>
                <span className="text-xs font-semibold text-[#1AAA4A]">
                  {OPERATIONAL_INFO.operationalHours}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs text-[#71796F]">Total Titik Pemberhentian</p>
                  <p className="font-headline text-lg sm:text-xl font-bold text-gray-900">
                    {STOPS_DATA.length} Halte Resmi
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-headline text-2xl font-extrabold text-[#1AAA4A]">
                    {transitStopsCount}
                  </span>
                  <span className="text-xs text-[#71796F] block">
                    Titik Transit BRT-Angkot
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}