import React, { useMemo, useState } from "react";
import { STOPS_DATA, OPERATIONAL_INFO, getLiveSchedules } from "../data/translokdata.js";

export default function StopExplorerPanel({
  selectedMode,
  pickupStop,
  dropoffTarget,
  selectionStep,
  onSetSelectionStep,
  onSelectStop,
  onResetSelection,
  onConfirmRoute,
  onSwapLocations,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyTransit, setOnlyTransit] = useState(false);

  const filteredStops = STOPS_DATA.filter((stop) => {
    const matchesSearch = stop.name.toLowerCase().includes(searchQuery.toLowerCase()) || stop.corridor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTransit = onlyTransit ? stop.isTransit : true;
    return matchesSearch && matchesTransit;
  });

  const isRouteAvailableAtPickup = !pickupStop || selectedMode === "ALL" || pickupStop.modes.includes(selectedMode);
  const recommendedTransitStop = pickupStop && !isRouteAvailableAtPickup
    ? STOPS_DATA.find((s) => s.corridor === pickupStop.corridor && s.isTransit) || STOPS_DATA.find((s) => s.isTransit)
    : null;
  const isDropoffRestricted = dropoffTarget?.type === "SEGMENT" && dropoffTarget?.data?.status === "RESTRICTED";

  const liveSchedules = useMemo(() => {
    return getLiveSchedules(8, 2); 
  }, [pickupStop?.id]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-6">
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Detail Perjalanan</h3>
          {(pickupStop || dropoffTarget) && (
            <button onClick={onResetSelection} className="text-xs font-semibold text-red-600 hover:text-red-700">Ulangi</button>
          )}
        </div>

        <div className="relative flex flex-col gap-3">
          <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-gray-200 z-0"></div>

          <button
            onClick={() => onSetSelectionStep("PICKUP")}
            className={`relative z-10 w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              selectionStep === "PICKUP" ? "border-[#1AAA4A] bg-[#1AAA4A]/5 ring-1 ring-[#1AAA4A]" : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-[#1AAA4A] flex-shrink-0 border-2 border-white shadow-sm"></div>
            <div className="flex-1 overflow-hidden">
              <span className="text-[10px] font-bold uppercase text-gray-500 block mb-0.5">Dari Halte</span>
              <p className="font-bold text-sm text-gray-900 truncate">{pickupStop ? pickupStop.name : "Pilih lokasi awal..."}</p>
            </div>
          </button>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={onSwapLocations}
              title="Tukar Lokasi Awal & Tujuan"
              className="p-2 bg-white border border-gray-200 rounded-full shadow-sm text-gray-400 hover:text-[#1AAA4A] hover:border-[#1AAA4A] hover:bg-green-50 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => onSetSelectionStep("DROPOFF")}
            className={`relative z-10 w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              selectionStep === "DROPOFF" ? "border-[#1A72BA] bg-[#1A72BA]/5 ring-1 ring-[#1A72BA]" : "border-gray-200 hover:bg-gray-50"
            }`}
          >
             <div className="w-4 h-4 bg-[#1A72BA] flex-shrink-0 border-2 border-white shadow-sm"></div>
            <div className="flex-1 overflow-hidden">
              <span className="text-[10px] font-bold uppercase text-gray-500 block mb-0.5">Ke Tujuan</span>
              <p className="font-bold text-sm text-gray-900 truncate">
                {dropoffTarget ? (dropoffTarget.type === "STOP" ? dropoffTarget.data.name : "Area: " + dropoffTarget.data.label) : "Mau kemana?"}
              </p>
            </div>
          </button>
        </div>
      </div>

      {(pickupStop || dropoffTarget) && (
        <div className="flex flex-col gap-3 border-t border-gray-100 pt-4">
          
          {pickupStop && (
            isRouteAvailableAtPickup ? (
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Jadwal armada terdekat di <strong>{pickupStop.name}</strong>:</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-[#1AAA4A] text-white text-xs font-bold rounded">
                    {liveSchedules[0]} WIB
                  </span>
                  <span className="px-2 py-1 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded">
                    {liveSchedules[1]}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs text-amber-800 mb-2">Bus BRT tidak berhenti di sini. Sebaiknya Anda menuju halte transit.</p>
                {recommendedTransitStop && (
                  <button onClick={() => { onSetSelectionStep("PICKUP"); setTimeout(() => onSelectStop(recommendedTransitStop), 0); }} className="w-full py-1.5 px-3 rounded-lg bg-amber-400 text-amber-900 font-bold text-xs hover:bg-amber-500 transition">
                    Ubah ke {recommendedTransitStop.name}
                  </button>
                )}
              </div>
            )
          )}

          {dropoffTarget && (
            <div className={`rounded-xl p-3 border ${isDropoffRestricted ? "bg-red-50 border-red-200" : "bg-emerald-50 border-emerald-200"}`}>
              <span className={`text-[10px] font-bold uppercase block mb-1 ${isDropoffRestricted ? "text-red-700" : "text-emerald-700"}`}>
                {isDropoffRestricted ? "⛔ Larangan Berhenti" : "✅ Titik Turun Aman"}
              </span>
              <p className="text-xs text-gray-700">
                {isDropoffRestricted 
                  ? "Angkot dilarang berhenti di area ini (rawan macet). Silakan pilih titik sebelum/sesudahnya." 
                  : (dropoffTarget.type === "STOP" ? "Pemberhentian halte resmi." : "Beri tahu sopir untuk berhenti di sepanjang jalur aman ini.")}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-bold text-gray-900">Pilih Lokasi</label>
          <button onClick={() => setOnlyTransit(!onlyTransit)} className={`text-[10px] font-bold px-2 py-1 rounded-full transition ${onlyTransit ? "bg-[#FFCB07] text-gray-900" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
            ★ Titik Transit
          </button>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Cari halte untuk ${selectionStep === "PICKUP" ? "titik jemput" : "titik turun"}...`}
          className="w-full px-3 py-2.5 mb-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1AAA4A] focus:bg-white"
        />
        <div className="max-h-40 overflow-y-auto pr-2 space-y-1.5 custom-scrollbar">
          {filteredStops.map((stop) => (
            <button key={stop.id} onClick={() => onSelectStop(stop)} className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition bg-white border border-gray-100 hover:border-[#1AAA4A] hover:shadow-sm">
              <div className="flex items-center gap-2 truncate">
                <span className={`w-2 h-2 rounded-full shrink-0 ${stop.isTransit ? "bg-[#FFCB07]" : "bg-[#1A72BA]"}`} />
                <span className="text-xs font-semibold text-gray-800">{stop.name}</span>
              </div>
              {stop.isTransit && <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">TRANSIT</span>}
            </button>
          ))}
        </div>
      </div>

      {pickupStop && dropoffTarget && isRouteAvailableAtPickup && !isDropoffRestricted && (
        <button
          onClick={onConfirmRoute}
          className="mt-2 w-full py-3.5 px-4 rounded-xl bg-[#1AAA4A] hover:bg-[#138037] text-white font-bold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          <span>Lihat Panduan Perjalanan</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>
      )}
    </div>
  );
}