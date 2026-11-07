import React from 'react';
import { Check, Phone } from 'lucide-react';

export default function Footer() {
  return (
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
  );
}