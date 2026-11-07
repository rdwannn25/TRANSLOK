import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function RouteCard({ data }) {
  const isBrt = data.type === 'brt';
  const colorClass = isBrt ? 'green' : 'blue';
  
  return (
    <div className={`border border-slate-200 rounded-xl p-4 hover:border-${colorClass}-400 hover:shadow-md transition bg-slate-50 hover:bg-white group cursor-pointer`}>
      <div className="flex justify-between items-start mb-3">
        <span className={`bg-${colorClass}-600 text-white text-xs font-bold px-2 py-1 rounded`}>
          {data.code}
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-green-600">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          {data.status}
        </span>
      </div>
      <h3 className="font-bold text-slate-800 text-lg mb-1 flex items-center gap-2">
        {data.route} <ChevronRight className="w-4 h-4 text-slate-400"/> {data.destination}
      </h3>
      <p className="text-xs text-slate-500 mb-4 line-clamp-1">Melintasi: {data.via}</p>
      <div className="flex justify-between items-center pt-3 border-t border-slate-200">
        <div>
          <span className="text-xs text-slate-500 block">Tarif Flat</span>
          <span className="font-bold text-slate-800">Rp {data.price}</span>
        </div>
        <button className={`text-sm font-medium text-${colorClass}-600 bg-${colorClass}-50 group-hover:bg-${colorClass}-100 px-3 py-1.5 rounded-lg transition`}>
          Lihat di Peta
        </button>
      </div>
    </div>
  );
}