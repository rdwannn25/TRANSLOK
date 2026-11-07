import React from 'react'
import { 
  Search, MapPin, Bus, Navigation, Accessibility, AlertTriangle, 
  CheckCircle2, Clock, Phone, ShieldCheck, ChevronRight, Check
} from 'lucide-react';
import ruteMap from '../assets/images/rute.jpg';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* 1. HEADER (Navbar) */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bus className="w-8 h-8 text-green-600" />
            <div>
              <h1 className="text-xl font-bold text-green-700 leading-none">TRANSLOK</h1>
              <p className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase">Bandung Juara</p>
            </div>
          </div>
          
          <nav className="hidden md:flex gap-1">
            <a href="#" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition">Beranda</a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow-sm">Peta Transportasi</a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition">Informasi Transportasi</a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition">Panduan Lansia</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-900 px-4 py-2 rounded-lg font-bold text-sm transition shadow-sm">
              <Phone className="w-4 h-4" />
              1500-123
            </button>
            <button className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center hover:bg-green-200 transition">
              <span className="font-bold">A</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 2. TOP BANNER & SEARCH */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg text-green-600">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800">Peta Digital Angkutan Umum Kota Bandung</h2>
              <p className="text-xs text-slate-500">Akses ramah lansia, kontras tinggi & terintegrasi Dishub Bandung</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full text-sm font-medium text-green-700 border border-green-100">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Status: 100% Koridor Beroperasi Normal
          </div>
        </div>

        {/* 3. SEARCH & FILTERS */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1 flex">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-10 pr-20 py-3 border border-slate-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm" 
              placeholder="Ketik nama halte, terminal, atau tujuan (misal: Alun-Alun, Dago)..."
            />
            <button className="absolute inset-y-2 right-2 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-lg transition">
              Hapus
            </button>
          </div>
          <button className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition">
            <Navigation className="w-5 h-5" />
            Halte Terdekat Saya
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <button className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-full font-medium shadow-sm transition hover:bg-green-800"><MapPin className="w-4 h-4"/> Semua Jalur</button>
          <button className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-full font-medium shadow-sm hover:bg-slate-50 transition"><Bus className="w-4 h-4 text-green-600"/> Bus TMB / BRT</button>
          <button className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-full font-medium shadow-sm hover:bg-slate-50 transition"><Bus className="w-4 h-4 text-blue-500"/> Trayek Angkot</button>
          <button className="flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-4 py-2 rounded-full font-medium shadow-sm hover:bg-amber-100 transition"><Accessibility className="w-4 h-4"/> Khusus Prioritas Lansia</button>
        </div>

        {/* 4. MAIN LAYOUT (MAP & SIDEBAR) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Map Area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold flex items-center gap-2 text-slate-800"><MapPin className="w-5 h-5 text-green-600"/> Skema Jalur Terpadu Cekungan Bandung</h3>
                <div className="flex gap-2">
                  <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded">TMB JALUR</span>
                  <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded">Angkot Dishub</span>
                </div>
              </div>
              <div className="p-4 bg-slate-100 flex-1 flex flex-col items-center justify-center relative min-h-[400px]">
                {/* Map Image Slicing */}
                <img 
                  src={ruteMap} 
                  alt="Peta Rute Transportasi Bandung" 
                  className="w-full h-auto object-contain rounded-lg border border-slate-200 shadow-sm mix-blend-multiply"
                />
              </div>
              <div className="p-4 bg-white border-t border-slate-100 flex flex-wrap gap-4 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2"><div className="w-4 h-1 bg-green-600 rounded-full"></div> Koridor BRT & TMB</div>
                <div className="flex items-center gap-2"><div className="w-4 h-1 bg-blue-500 rounded-full"></div> Trayek Angkot Reguler</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-400 rounded-full"></div> Halte Ramah Lansia</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Penurunan/Naik Khusus</div>
              </div>
            </div>

            {/* Lansia Banner */}
            <div className="bg-gradient-to-r from-amber-100 to-amber-50 rounded-2xl p-5 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-amber-200 p-2.5 rounded-full text-amber-800 mt-1">
                  <Accessibility className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-900 text-lg">Jaminan Pelayanan Prioritas Lansia</h4>
                  <p className="text-sm text-amber-800/80 mt-1">Seluruh halte bertanda emas memiliki bidang landai (ramp kursi roda) dan petugas pemandu.</p>
                </div>
              </div>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-900 hover:bg-amber-950 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition whitespace-nowrap">
                <ShieldCheck className="w-5 h-5" /> Panggil Petugas
              </button>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-100 p-3 rounded-bl-2xl text-amber-700">
                <Accessibility className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-green-600 tracking-wider uppercase mb-2 block">Pemberhentian Utama</span>
              <h2 className="text-2xl font-black text-slate-800 leading-tight">ALUN-ALUN BANDUNG</h2>
              <p className="text-sm text-slate-500 mt-2 mb-6">Pusat Transit Terpadu Jl. Asia Afrika & Dalemkaum</p>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-4 mb-6">
                <Clock className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Jam Operasional Pelayanan</p>
                  <p className="font-bold text-slate-800 text-lg">04:30 - 21:00 WIB</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-sm text-slate-800 mb-3">Rute yang Melewati Halte Ini:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">TMB K1 (Cicaheum - Elang)</span>
                  <span className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">TMB K2 (Cicaheum - Cibeureum)</span>
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">Angkot 09 (St. Hall - Dago)</span>
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">Angkot 08 (Leuwipanjang)</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-sm text-slate-800 mb-3">Fasilitas Ramah Lansia & Disabilitas:</h4>
                <ul className="space-y-2">
                  <li className="flex gap-2 text-sm text-slate-600"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0"/> Kursi tunggu prioritas (2 tempat duduk)</li>
                  <li className="flex gap-2 text-sm text-slate-600"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0"/> Ramp landai anti-slip untuk kursi roda</li>
                  <li className="flex gap-2 text-sm text-slate-600"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0"/> Pengeras suara pengumuman kedatangan bus</li>
                </ul>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2">
                <Navigation className="w-5 h-5" /> Gunakan Halte Ini Sebagai Tujuan
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
              <Bus className="w-6 h-6 text-blue-600 mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-blue-900 text-sm">Interval Kedatangan Bus (Headway)</h4>
                <p className="text-sm text-blue-800 mt-1">Rata-rata kedatangan setiap 8 - 12 Menit di jam normal.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. ROUTE LIST */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Daftar Koridor Utama & Trayek Aktif Hari Ini</h2>
              <p className="text-sm text-slate-500 mt-1">Data resmi Dinas Perhubungan Kota Bandung terverifikasi 2026</p>
            </div>
            <div className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600" /> Tarif Flat Tunai / QRIS: Rp 3.000 - Rp 5.000
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card TMB 1 */}
            <div className="border border-slate-200 rounded-xl p-4 hover:border-green-400 hover:shadow-md transition bg-slate-50 hover:bg-white group cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">BRT KORIDOR 1</span>
                <span className="flex items-center gap-1 text-xs font-medium text-green-600"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Beroperasi Normal</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1 flex items-center gap-2">Cicaheum <ChevronRight className="w-4 h-4 text-slate-400"/> Elang</h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-1">Melintasi: Jl. Jend. Sudirman, Alun-Alun, Kosambi, Cicaheum</p>
              <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block">Tarif Flat</span>
                  <span className="font-bold text-slate-800">Rp 4.000</span>
                </div>
                <button className="text-sm font-medium text-green-600 bg-green-50 group-hover:bg-green-100 px-3 py-1.5 rounded-lg transition">Lihat di Peta</button>
              </div>
            </div>

            {/* Card TMB 2 */}
            <div className="border border-slate-200 rounded-xl p-4 hover:border-green-400 hover:shadow-md transition bg-slate-50 hover:bg-white group cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">BRT KORIDOR 2</span>
                <span className="flex items-center gap-1 text-xs font-medium text-green-600"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Beroperasi Normal</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1 flex items-center gap-2">Cicaheum <ChevronRight className="w-4 h-4 text-slate-400"/> Cibeureum</h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-1">Melintasi: Jl. Ahmad Yani, Asia Afrika, Sudirman, Rajawali</p>
              <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block">Tarif Flat</span>
                  <span className="font-bold text-slate-800">Rp 4.000</span>
                </div>
                <button className="text-sm font-medium text-green-600 bg-green-50 group-hover:bg-green-100 px-3 py-1.5 rounded-lg transition">Lihat di Peta</button>
              </div>
            </div>

            {/* Card TMB 4 */}
            <div className="border border-slate-200 rounded-xl p-4 hover:border-green-400 hover:shadow-md transition bg-slate-50 hover:bg-white group cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">BRT KORIDOR 4</span>
                <span className="flex items-center gap-1 text-xs font-medium text-green-600"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Beroperasi Normal</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1 flex items-center gap-2">Antapani <ChevronRight className="w-4 h-4 text-slate-400"/> Leuwipanjang</h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-1">Melintasi: Jl. Terusan Jakarta, Kiaracondong, Soekarno Hatta</p>
              <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block">Tarif Flat</span>
                  <span className="font-bold text-slate-800">Rp 4.000</span>
                </div>
                <button className="text-sm font-medium text-green-600 bg-green-50 group-hover:bg-green-100 px-3 py-1.5 rounded-lg transition">Lihat di Peta</button>
              </div>
            </div>

            {/* Card Angkot 01 */}
            <div className="border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md transition bg-slate-50 hover:bg-white group cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">ANGKOT 01</span>
                <span className="flex items-center gap-1 text-xs font-medium text-green-600"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Beroperasi Normal</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1 flex items-center gap-2">Kebon Kalapa <ChevronRight className="w-4 h-4 text-slate-400"/> Cicaheum</h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-1">Melintasi: Abdul Muis, Supratman, Ahmad Yani, Cicaheum</p>
              <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block">Tarif Flat</span>
                  <span className="font-bold text-slate-800">Rp 3.000</span>
                </div>
                <button className="text-sm font-medium text-blue-600 bg-blue-50 group-hover:bg-blue-100 px-3 py-1.5 rounded-lg transition">Lihat di Peta</button>
              </div>
            </div>

            {/* Card Angkot 02 */}
            <div className="border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md transition bg-slate-50 hover:bg-white group cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">ANGKOT 02</span>
                <span className="flex items-center gap-1 text-xs font-medium text-green-600"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Beroperasi Normal</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1 flex items-center gap-2">Dago <ChevronRight className="w-4 h-4 text-slate-400"/> Kebon Kalapa</h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-1">Melintasi: Ir. H. Djuanda (Dago), Merdeka, Nias, Kalapa</p>
              <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block">Tarif Flat</span>
                  <span className="font-bold text-slate-800">Rp 3.000</span>
                </div>
                <button className="text-sm font-medium text-blue-600 bg-blue-50 group-hover:bg-blue-100 px-3 py-1.5 rounded-lg transition">Lihat di Peta</button>
              </div>
            </div>

            {/* Card Angkot 08 */}
            <div className="border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md transition bg-slate-50 hover:bg-white group cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">ANGKOT 08</span>
                <span className="flex items-center gap-1 text-xs font-medium text-green-600"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Beroperasi Normal</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1 flex items-center gap-2">Cicaheum <ChevronRight className="w-4 h-4 text-slate-400"/> Leuwipanjang</h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-1">Melintasi: By-pass Soekarno Hatta, Kiaracondong, Moh. Toha</p>
              <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block">Tarif Flat</span>
                  <span className="font-bold text-slate-800">Rp 3.000</span>
                </div>
                <button className="text-sm font-medium text-blue-600 bg-blue-50 group-hover:bg-blue-100 px-3 py-1.5 rounded-lg transition">Lihat di Peta</button>
              </div>
            </div>
            
          </div>
        </div>
      </main>

      {/* 6. FOOTER */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">TRANSLOK Kota Bandung</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm">Sistem Informasi Angkutan Umum Terintegrasi & Ramah Disabilitas/Lansia</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-600"/> Dinas Perhubungan Kota Bandung</div>
            <div className="flex items-center gap-2"><Phone className="w-5 h-5 text-blue-600"/> Bantuan Darurat 24 Jam</div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center text-xs text-slate-400">
          © 2026 TRANSLOK Kota Bandung • Hak Cipta Dilindungi Undang-Undang
        </div>
      </footer>
    </div>
  )
}

export default Home 