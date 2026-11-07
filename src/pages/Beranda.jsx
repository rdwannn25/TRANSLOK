import React from 'react';
import { Accessibility, ArrowDownUp, X, Clock, Search, Map as MapIcon, Wallet, Headset } from 'lucide-react';
import Header from '../components/layout/Header';
import BottomNav from '../components/layout/BottomNav';

export default function Beranda() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      <Header />
      
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        
        {/* Header Greeting Lansia-friendly */}
        <div>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-xs font-bold mb-3 border border-green-200">
            <Accessibility className="w-4 h-4" /> Mode Ramah Lansia Aktif
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">Mau ke mana hari ini di Bandung?</h2>
          <p className="text-sm text-slate-600">Pilih rute perjalanan aman dan nyaman bersama TRANSLOK.</p>
        </div>

        {/* Route Search Card */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          
          {/* Inputs with Swap Button */}
          <div className="relative flex flex-col gap-3">
            {/* Input Asal */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-1">
                <span className="w-3 h-3 rounded-full border-2 border-green-600 bg-white"></span> Dari mana?
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="Dago Atas"
                  className="w-full bg-slate-100 text-slate-800 text-base font-semibold p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 pr-10"
                />
                <button className="absolute right-3 top-4 text-slate-400 hover:text-slate-600 p-1"><X className="w-4 h-4"/></button>
              </div>
            </div>

            {/* Swap Button Absolute */}
            <button className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-full flex items-center justify-center shadow-md border-2 border-white">
              <ArrowDownUp className="w-5 h-5" />
            </button>

            {/* Input Tujuan */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-1 mt-2">
                <span className="w-3 h-3 rounded-full border-2 border-red-500 bg-white"></span> Mau ke mana?
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="Alun-Alun Bandung"
                  className="w-full bg-slate-100 text-slate-800 text-base font-semibold p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 pr-10"
                />
                <button className="absolute right-3 top-4 text-slate-400 hover:text-slate-600 p-1"><X className="w-4 h-4"/></button>
              </div>
            </div>
          </div>

          {/* Moda Transportasi */}
          <div className="mt-5">
            <label className="text-sm font-bold text-slate-800 mb-2 block">Pilihan Moda Transportasi</label>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-green-600 bg-green-600 text-white font-bold transition">
                Angkot
              </button>
              <button className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition">
                BRT TMB
              </button>
            </div>
          </div>

          {/* Jam Operasional Box */}
          <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full text-blue-600"><Clock className="w-5 h-5"/></div>
            <div>
              <p className="text-xs text-slate-500">Jam Operasional Layanan</p>
              <p className="text-sm font-bold text-slate-800">Setiap Hari pukul 04.00 - 21.00 WIB</p>
            </div>
          </div>

          <button className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-4 rounded-xl shadow-md transition flex items-center justify-center gap-2">
            <Search className="w-5 h-5" /> Cari Rute Sekarang
          </button>
        </div>

        {/* Informasi Cepat */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-3">Informasi Cepat</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <div className="bg-yellow-100 w-10 h-10 rounded-full flex items-center justify-center text-yellow-700 mb-3"><MapIcon className="w-5 h-5"/></div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">Peta Transportasi</h4>
              <p className="text-xs text-slate-500">Lihat trayek angkot & halte BRT lengkap</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center text-blue-700 mb-3"><Wallet className="w-5 h-5"/></div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">Informasi Tarif</h4>
              <p className="text-xs text-slate-500">Tarif Angkot Rp3.000 flat & subsidi lansia</p>
            </div>
          </div>
        </div>

        {/* Banner Bantuan */}
        <div className="bg-green-100/50 border border-green-200 rounded-2xl p-4 flex items-center gap-4 mt-2">
          <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0"><Headset className="w-6 h-6"/></div>
          <div>
            <h4 className="font-bold text-green-900 text-sm">Butuh Bantuan Navigasi?</h4>
            <p className="text-xs text-green-800 mt-1">Tekan tombol Bantuan di bawah untuk panduan suara atau hubungi petugas kami.</p>
          </div>
        </div>

      </main>

      <BottomNav activeTab="beranda" />
    </div>
  );
}