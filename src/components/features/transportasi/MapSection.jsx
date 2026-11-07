import React from 'react';
import { MapPin } from 'lucide-react';
import ruteMap from '../../../assets/images/rute.jpg';

export default function MapSection() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold flex items-center gap-2 text-slate-800">
          <MapPin className="w-5 h-5 text-green-600"/> Skema Jalur Terpadu Cekungan Bandung
        </h3>
        <div className="flex gap-2">
          <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded">TMB JALUR</span>
          <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded">Angkot Dishub</span>
        </div>
      </div>
      <div className="p-4 bg-slate-100 flex-1 flex flex-col items-center justify-center relative min-h-[400px]">
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
  );
}