// src/components/TripSummaryCard.jsx
import React, { useState, useEffect, useMemo } from "react";
import { OPERATIONAL_INFO, STOPS_DATA, getLiveSchedules } from "../data/translokdata.js";

export default function TripSummaryCard({
  selectedMode,
  pickupStop,
  dropoffTarget,
  onCancelRoute,
}) {
  const [isGuideActive, setIsGuideActive] = useState(false);

  useEffect(() => {
    setIsGuideActive(false);
  }, [pickupStop, dropoffTarget, selectedMode]);

  if (!pickupStop || !dropoffTarget) return null;

  const liveSchedules = useMemo(() => {
    return getLiveSchedules(8, 2);
  }, [pickupStop?.id]);

  const dropoffStop = dropoffTarget.type === "STOP" ? dropoffTarget.data : STOPS_DATA.find((s) => s.id === dropoffTarget.data.to);
  const isDifferentCorridor = dropoffStop && pickupStop.corridor !== dropoffStop.corridor;
  const needsTransit = selectedMode === "ALL" && (isDifferentCorridor || !pickupStop.isTransit || (dropoffStop && !dropoffStop.isTransit));

  const transitHub = needsTransit
    ? STOPS_DATA.find((s) => s.isTransit && s.category === "hub" && s.id !== pickupStop.id && s.id !== dropoffStop?.id) || STOPS_DATA.find((s) => s.isTransit)
    : null;

  const totalTariff = needsTransit ? (OPERATIONAL_INFO.modes.ANGKOT.tariff + OPERATIONAL_INFO.modes.BRT.tariff) : (selectedMode === "BRT" ? OPERATIONAL_INFO.modes.BRT.tariff : OPERATIONAL_INFO.modes.ANGKOT.tariff);

  return (
    <div className="bg-white rounded-2xl border border-[#1AAA4A] shadow-lg overflow-hidden mt-6">
      
      {/* Header Summary */}
      <div className="bg-gradient-to-r from-[#1AAA4A] to-[#138037] px-6 py-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full mb-2 inline-block">
            {isGuideActive ? "Rute Terpilih" : "Ringkasan Perjalanan"}
          </span>
          <h3 className="font-bold text-lg sm:text-xl leading-tight">
            {pickupStop.name} <span className="text-green-300 mx-1">→</span> {dropoffTarget.type === "STOP" ? dropoffTarget.data.name : dropoffTarget.data.label}
          </h3>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl text-right shadow-sm w-full sm:w-auto">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide block">Estimasi Tarif</span>
          <span className="font-extrabold text-xl text-[#1AAA4A]">Rp {totalTariff.toLocaleString("id-ID")}</span>
        </div>
      </div>

      <div className="p-6">
        {/* Metrik Info Utama */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-[11px] text-gray-500 block mb-1">Berangkat</span>
            <strong className="text-sm text-gray-900 block truncate">{pickupStop.name}</strong>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-[11px] text-gray-500 block mb-1">Tujuan</span>
            <strong className="text-sm text-gray-900 block truncate">{dropoffTarget.type === "STOP" ? dropoffTarget.data.name : "Sepanjang Jalur"}</strong>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-[11px] text-gray-500 block mb-1">Moda Transportasi</span>
            <strong className="text-sm text-gray-900 block truncate">{needsTransit ? "Angkot + Bus BRT" : (selectedMode === "BRT" ? "Bus BRT" : "Angkot Feeder")}</strong>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-[11px] text-gray-500 block mb-1">Jam Operasional</span>
            <strong className="text-sm text-gray-900 block">{OPERATIONAL_INFO.operationalHours}</strong>
          </div>
        </div>

        {/* Kondisi Tombol vs Panduan Aktif */}
        {!isGuideActive ? (
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button onClick={onCancelRoute} className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
              Ubah Rute
            </button>
            <button onClick={() => setIsGuideActive(true)} className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1A72BA] hover:bg-[#155a96] text-white text-sm font-bold shadow-md transition">
              Mulai Panduan Jalan
            </button>
          </div>
        ) : (
          /* Timeline Langkah Perjalanan */
          <div className="pt-2">
            <h4 className="font-bold text-gray-900 mb-6">Langkah Perjalanan Anda</h4>
            <ol className="relative border-l-2 border-gray-200 ml-3 space-y-6">
              
              {/* Langkah 1: Penjemputan */}
              <li className="ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-[#1AAA4A] rounded-full ring-4 ring-white text-white text-xs font-bold">1</span>
                <div className="bg-white p-0">
                  <h5 className="font-bold text-sm text-gray-900">Menunggu di Halte {pickupStop.name}</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Armada terdekat tiba pukul <strong className="text-gray-900">{liveSchedules[0]} WIB</strong>. 
                    Siapkan uang pas atau e-money senilai {selectedMode === "BRT" ? "Rp 4.900" : "Rp 3.000"}.
                  </p>
                </div>
              </li>

              {/* Langkah 2: Transit (Opsional) */}
              {needsTransit && transitHub && (
                <li className="ml-6">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-[#FFCB07] rounded-full ring-4 ring-white text-gray-900 text-xs font-bold">2</span>
                  <div className="bg-white p-0">
                    <h5 className="font-bold text-sm text-gray-900">Transit di {transitHub.name}</h5>
                    <p className="text-sm text-gray-600 mt-1">Turun di halte transit ini untuk berpindah moda menuju rute {dropoffStop?.corridor || "tujuan akhir Anda"}.</p>
                  </div>
                </li>
              )}

              {/* Langkah 3: Penurunan */}
              <li className="ml-6">
                <span className="absolute -left-[11px] flex items-center justify-center w-6 h-6 bg-[#1A72BA] rounded-full ring-4 ring-white text-white text-xs font-bold">
                  {needsTransit && transitHub ? "3" : "2"}
                </span>
                <div className="bg-white p-0">
                  <h5 className="font-bold text-sm text-gray-900">Tiba di Tujuan Akhir</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    {dropoffTarget.type === "STOP" 
                      ? `Turun di halte resmi ${dropoffTarget.data.name}.` 
                      : "Jalur ini aman. Informasikan kepada pengemudi untuk menepi di lokasi tujuan Anda sepanjang jalur ini."}
                  </p>
                </div>
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}