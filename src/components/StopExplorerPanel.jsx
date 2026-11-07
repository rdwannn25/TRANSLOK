// src/components/StopExplorerPanel.jsx
import React, { useState } from "react";
import { STOPS_DATA, OPERATIONAL_INFO } from "../data/translokdata.js";

export default function StopExplorerPanel({
  selectedMode,
  pickupStop,
  dropoffTarget,
  selectionStep,
  onSetSelectionStep,
  onSelectStop,
  onResetSelection,
  onConfirmRoute,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyTransit, setOnlyTransit] = useState(false);

  // Filter daftar halte berdasarkan input pencarian & toggle titik transit
  const filteredStops = STOPS_DATA.filter((stop) => {
    const matchesSearch =
      stop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stop.corridor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTransit = onlyTransit ? stop.isTransit : true;
    return matchesSearch && matchesTransit;
  });

  // Cek apakah halte jemput melayani moda yang sedang dipilih (Logika Flowchart: "Rute Tersedia?")
  const isRouteAvailableAtPickup =
    !pickupStop ||
    selectedMode === "ALL" ||
    pickupStop.modes.includes(selectedMode);

  // Cari rekomendasi halte transit terdekat jika pengguna memilih BRT di halte khusus Angkot (FR-11)
  const recommendedTransitStop =
    pickupStop && !isRouteAvailableAtPickup
      ? STOPS_DATA.find(
          (s) => s.corridor === pickupStop.corridor && s.isTransit
        ) || STOPS_DATA.find((s) => s.isTransit)
      : null;

  // Cek apakah titik turun valid (Tidak boleh di Zona Merah)
  const isDropoffRestricted =
    dropoffTarget?.type === "SEGMENT" &&
    dropoffTarget?.data?.status === "RESTRICTED";

  // Handler khusus saat tombol rekomendasi transit diklik agar pasti mengganti Titik Jemput
  const handleSwitchPickupToTransit = (transitStop) => {
    onSetSelectionStep("PICKUP");
    setTimeout(() => {
      onSelectStop(transitStop);
    }, 0);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 flex flex-col gap-5 font-body">
      {/* Bagian 1: Mode Pemilihan Titik Jemput vs Titik Turun (FR-02, FR-06, FR-07) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-headline font-bold text-base text-gray-900">
            1. Tentukan Titik Perjalanan
          </h3>
          {(pickupStop || dropoffTarget) && (
            <button
              type="button"
              onClick={onResetSelection}
              className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
            >
              Reset Pilihan
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Tombol Aktifkan Pemilihan Titik Jemput (FR-06) */}
          <button
            type="button"
            onClick={() => onSetSelectionStep("PICKUP")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectionStep === "PICKUP"
                ? "border-[#1AAA4A] bg-[#1AAA4A]/5 ring-2 ring-[#1AAA4A]/20"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1AAA4A] block">
              Titik Jemput (FR-06)
            </span>
            <p className="font-headline font-bold text-sm text-gray-900 truncate mt-0.5">
              {pickupStop ? pickupStop.name : "Pilih Halte..."}
            </p>
            <span className="text-[11px] text-[#71796F]">
              {pickupStop
                ? `Koridor ${pickupStop.corridor}`
                : "Wajib di halte resmi"}
            </span>
          </button>

          {/* Tombol Aktifkan Pemilihan Titik Tujuan/Drop-off (FR-07) */}
          <button
            type="button"
            onClick={() => onSetSelectionStep("DROPOFF")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectionStep === "DROPOFF"
                ? "border-[#1A72BA] bg-[#1A72BA]/5 ring-2 ring-[#1A72BA]/20"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A72BA] block">
              Titik Turun (FR-07)
            </span>
            <p className="font-headline font-bold text-sm text-gray-900 truncate mt-0.5">
              {dropoffTarget
                ? dropoffTarget.type === "STOP"
                  ? dropoffTarget.data.name
                  : "Jalur Jalan"
                : "Pilih Tujuan..."}
            </p>
            <span className="text-[11px] text-[#71796F] truncate block">
              {dropoffTarget
                ? dropoffTarget.type === "STOP"
                  ? "Turun di Halte Resmi"
                  : dropoffTarget.data.label
                : selectedMode === "BRT"
                ? "Wajib di halte BRT"
                : "Halte / Jalur Hijau"}
            </span>
          </button>
        </div>
      </div>

      {/* Bagian 2: Evaluasi Ketersediaan Rute & Armada di Halte Terpilih (Flowchart Decision) */}
      {pickupStop && (
        <div className="rounded-xl border border-gray-200 bg-[#F4F6F4] p-4">
          {!isRouteAvailableAtPickup ? (
            /* Cabang Flowchart: Rute Tidak Tersedia untuk Moda Terpilih */
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-amber-800 bg-amber-100/80 px-3 py-2 rounded-lg">
                <span className="font-bold text-sm">⚠️</span>
                <p className="text-xs font-semibold">
                  Rute <strong>Bus BRT</strong> tidak berhenti langsung di Halte{" "}
                  <strong>{pickupStop.name}</strong> (Khusus Angkot Feeder).
                </p>
              </div>
              {recommendedTransitStop && (
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-xs text-[#71796F] mb-2">
                    <strong className="text-gray-900">
                      Rekomendasi Perjalanan (FR-11):
                    </strong>{" "}
                    Anda dapat naik <strong>Angkot Feeder</strong> dari{" "}
                    {pickupStop.name} menuju Titik Transit{" "}
                    <strong>{recommendedTransitStop.name}</strong>, atau pindah
                    titik jemput langsung ke halte transit tersebut.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleSwitchPickupToTransit(recommendedTransitStop)}
                    className="w-full py-2 px-3 rounded-lg bg-[#FFCB07] text-gray-900 font-semibold text-xs hover:brightness-95 transition cursor-pointer"
                  >
                    Pindah Titik Jemput ke {recommendedTransitStop.name}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Cabang Flowchart: Rute Tersedia -> Tampilkan Armada, Jadwal & Status Transit */
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold text-[#71796F]">
                    INFORMASI HALTE JEMPUT (FR-06)
                  </span>
                  <h4 className="font-headline font-bold text-base text-gray-900">
                    Halte {pickupStop.name}
                  </h4>
                </div>
                {pickupStop.isTransit ? (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FFCB07] text-gray-900">
                    ★ Titik Transit BRT & Angkot
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1A72BA]/15 text-[#1A72BA]">
                    Halte Angkot Feeder
                  </span>
                )}
              </div>

              {/* Jadwal Keberangkatan Terdekat di Halte Ini (FR-08) */}
              <div className="bg-white p-3 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#71796F] font-medium">
                    Jadwal Melintas Berikutnya:
                  </span>
                  <span className="font-semibold text-[#1AAA4A]">
                    Operasional {OPERATIONAL_INFO.operationalHours}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {pickupStop.nextSchedule.map((time, idx) => (
                    <span
                      key={time}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                        idx === 0
                          ? "bg-[#1AAA4A] text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {time} WIB {idx === 0 && "(Terdekat)"}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bagian 3: Validasi Lokasi Penurunan Angkot / BRT (FR-07) */}
      {dropoffTarget && (
        <div
          className={`rounded-xl p-4 border ${
            isDropoffRestricted
              ? "bg-red-50 border-red-300"
              : "bg-emerald-50/70 border-emerald-200"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span
              className={`text-[11px] font-bold uppercase ${
                isDropoffRestricted ? "text-red-700" : "text-[#1AAA4A]"
              }`}
            >
              {isDropoffRestricted
                ? "⛔ Zona Larangan Berhenti (FR-07)"
                : "✅ Titik Penurunan Aman & Diizinkan (FR-07)"}
            </span>
          </div>
          <p className="font-headline font-bold text-sm text-gray-900">
            {dropoffTarget.type === "STOP"
              ? `Halte Resmi: ${dropoffTarget.data.name}`
              : dropoffTarget.data.label}
          </p>
          <p className="text-xs text-gray-700 mt-1">
            {isDropoffRestricted
              ? "Ruas jalan ini bergaris MERAH pada peta (rawan kemacetan/tikungan). Angkot dilarang berhenti menurunkan penumpang di sini. Silakan pilih titik halte sebelum atau sesudah ruas ini."
              : dropoffTarget.type === "STOP"
              ? "Titik pemberhentian resmi yang aman untuk naik/turun penumpang."
              : "Ruas jalan ini bergaris HIJAU. Penumpang Angkot Feeder diizinkan turun di sepanjang jalur aman ini."}
          </p>
        </div>
      )}

      {/* Bagian 4: Quick Filter Daftar Halte */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-bold text-gray-800">
            Cari Cepat Halte / Titik Transit ({filteredStops.length})
          </label>
          <button
            type="button"
            onClick={() => setOnlyTransit(!onlyTransit)}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition cursor-pointer ${
              onlyTransit
                ? "bg-[#FFCB07] border-amber-400 text-gray-900"
                : "bg-gray-50 border-gray-200 text-[#71796F]"
            }`}
          >
            {onlyTransit ? "★ Menampilkan Titik Transit" : "Filter Titik Transit"}
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama halte (misal: Stasiun Hall, Kosambi, Alun-alun)..."
            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-[#F4F6F4] text-xs text-gray-900 placeholder-[#71796F] focus:outline-none focus:bg-white focus:border-[#1AAA4A]"
          />
        </div>

        {/* Scrollable Pill List Halte */}
        <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5">
          {filteredStops.map((stop) => {
            const isSelected =
              pickupStop?.id === stop.id ||
              (dropoffTarget?.type === "STOP" &&
                dropoffTarget?.data?.id === stop.id);

            return (
              <button
                key={stop.id}
                type="button"
                onClick={() => onSelectStop(stop)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition border cursor-pointer ${
                  isSelected
                    ? "bg-[#1AAA4A]/10 border-[#1AAA4A] font-semibold text-gray-900"
                    : "bg-white border-gray-100 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      stop.isTransit ? "bg-[#FFCB07]" : "bg-[#1A72BA]"
                    }`}
                  />
                  <span className="truncate">{stop.name}</span>
                  <span className="text-[10px] text-[#71796F]">
                    ({stop.corridor})
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {stop.isTransit && (
                    <span className="px-1.5 py-0.5 rounded bg-[#FFCB07]/30 text-gray-900 text-[10px] font-bold">
                      Transit BRT
                    </span>
                  )}
                  <span className="text-[10px] font-semibold text-[#1AAA4A]">
                    {stop.nextSchedule[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tombol Lanjut ke Ringkasan & Panduan Perjalanan (Flowchart: "User memilih rute?") */}
      {pickupStop &&
        dropoffTarget &&
        isRouteAvailableAtPickup &&
        !isDropoffRestricted && (
          <button
            type="button"
            onClick={onConfirmRoute}
            className="w-full py-3 px-4 rounded-xl bg-[#1AAA4A] hover:bg-[#138037] text-white font-headline font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Lihat Ringkasan & Panduan Perjalanan (FR-12)</span>
            <span>→</span>
          </button>
        )}
    </div>
  );
}