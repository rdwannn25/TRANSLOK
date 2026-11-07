// src/components/TripSummaryCard.jsx
import React, { useState, useEffect } from "react";
import { OPERATIONAL_INFO, STOPS_DATA } from "../data/translokdata.js";

export default function TripSummaryCard({
  selectedMode,
  pickupStop,
  dropoffTarget,
  onCancelRoute,
}) {
  // State untuk cabang Flowchart: "User memilih rute? -> Ya (Tampilkan Panduan)"
  const [isGuideActive, setIsGuideActive] = useState(false);

  // Reset langkah panduan ke awal jika titik jemput/turun berubah
  useEffect(() => {
    setIsGuideActive(false);
  }, [pickupStop, dropoffTarget, selectedMode]);

  if (!pickupStop || !dropoffTarget) return null;

  // Menentukan apakah perjalanan membutuhkan Transit (Integrasi Angkot + BRT)
  const dropoffStop =
    dropoffTarget.type === "STOP"
      ? dropoffTarget.data
      : STOPS_DATA.find((s) => s.id === dropoffTarget.data.to);

  const isDifferentCorridor =
    dropoffStop && pickupStop.corridor !== dropoffStop.corridor;

  const needsTransit =
    selectedMode === "ALL" &&
    (isDifferentCorridor ||
      !pickupStop.isTransit ||
      (dropoffStop && !dropoffStop.isTransit));

  // Mencari Halte Hub Transit penghubung (Stasiun Hall / Alun-alun / Kosambi)
  const transitHub = needsTransit
    ? STOPS_DATA.find(
        (s) =>
          s.isTransit &&
          s.category === "hub" &&
          s.id !== pickupStop.id &&
          s.id !== dropoffStop?.id
      ) || STOPS_DATA.find((s) => s.isTransit)
    : null;

  // Kalkulasi Estimasi Biaya (FR-09 & FR-10)
  const calculateTotalTariff = () => {
    if (selectedMode === "ANGKOT") return OPERATIONAL_INFO.modes.ANGKOT.tariff;
    if (selectedMode === "BRT") return OPERATIONAL_INFO.modes.BRT.tariff;
    if (needsTransit) {
      return (
        OPERATIONAL_INFO.modes.ANGKOT.tariff + OPERATIONAL_INFO.modes.BRT.tariff
      );
    }
    return OPERATIONAL_INFO.modes.ANGKOT.tariff;
  };

  const totalTariff = calculateTotalTariff();

  return (
    <div className="bg-white rounded-2xl border-2 border-[#1AAA4A] shadow-md overflow-hidden font-body mt-6 transition-all">
      {/* Header Ringkasan Perjalanan (FR-12) */}
      <div className="bg-[#1AAA4A] px-6 py-4 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
            {isGuideActive
              ? "PANDUAN PERJALANAN AKTIF"
              : "RINGKASAN PERJALANAN (FR-12)"}
          </span>
          <h3 className="font-headline font-bold text-lg sm:text-xl mt-1">
            {pickupStop.name} →{" "}
            {dropoffTarget.type === "STOP"
              ? dropoffTarget.data.name
              : `Jalur Aman (${dropoffTarget.data.label})`}
          </h3>
        </div>

        {/* Estimasi Total Tarif (FR-10) */}
        <div className="bg-white text-gray-900 px-4 py-2 rounded-xl text-right shadow-xs">
          <span className="text-[11px] text-[#71796F] font-semibold block">
            Estimasi Total Biaya (FR-10)
          </span>
          <span className="font-headline font-extrabold text-xl text-[#1AAA4A]">
            Rp {totalTariff.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6">
        {/* Ringkasan 4 Metrik Utama (Rute, Halte, Jadwal, Armada) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-3.5 rounded-xl bg-[#F4F6F4] border border-gray-200">
            <span className="text-xs text-[#71796F] block">
              Titik Penjemputan (FR-06)
            </span>
            <strong className="font-headline text-sm text-gray-900 mt-0.5 block">
              Halte {pickupStop.name}
            </strong>
            <span className="text-[11px] text-[#1AAA4A] font-semibold">
              Jadwal Terdekat: {pickupStop.nextSchedule[0]} WIB
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F4F6F4] border border-gray-200">
            <span className="text-xs text-[#71796F] block">
              Titik Penurunan (FR-07)
            </span>
            <strong className="font-headline text-sm text-gray-900 mt-0.5 block">
              {dropoffTarget.type === "STOP"
                ? `Halte ${dropoffTarget.data.name}`
                : dropoffTarget.data.label}
            </strong>
            <span className="text-[11px] text-[#1A72BA] font-semibold">
              {dropoffTarget.type === "STOP"
                ? "Pemberhentian Halte Resmi"
                : "Zona Hijau (Aman Berhenti)"}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F4F6F4] border border-gray-200">
            <span className="text-xs text-[#71796F] block">
              Skema Moda & Integrasi
            </span>
            <strong className="font-headline text-sm text-gray-900 mt-0.5 block">
              {needsTransit
                ? "Angkot Feeder + Bus BRT"
                : selectedMode === "BRT"
                ? "Bus BRT Bandung Raya"
                : "Angkot Feeder Langsung"}
            </strong>
            <span className="text-[11px] text-[#71796F]">
              {needsTransit && transitHub
                ? `Transit di ${transitHub.name}`
                : "Tanpa Perpindahan Armada"}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F4F6F4] border border-gray-200">
            <span className="text-xs text-[#71796F] block">
              Rincian Tarif (FR-09 & FR-10)
            </span>
            <strong className="font-headline text-sm text-gray-900 mt-0.5 block">
              {needsTransit
                ? "Rp 3.000 + Rp 4.900"
                : `Rp ${totalTariff.toLocaleString("id-ID")} (Flat)`}
            </strong>
            <span className="text-[11px] text-[#71796F]">
              Operasional {OPERATIONAL_INFO.operationalHours}
            </span>
          </div>
        </div>

        {/* Kondisi Flowchart: Sebelum vs Sesudah User Klik "Pilih Rute (Ya)" */}
        {!isGuideActive ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-[#71796F]">
              Apakah Anda ingin menggunakan rute perjalanan ini untuk melihat
              panduan langkah demi langkah?
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Cabang Flowchart: "Tidak" -> Kembali ke input lokasi */}
              <button
                type="button"
                onClick={onCancelRoute}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                Tidak, Ubah Rute
              </button>
              {/* Cabang Flowchart: "Ya" -> User melihat panduan perjalanan */}
              <button
                type="button"
                onClick={() => setIsGuideActive(true)}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#1AAA4A] hover:bg-[#138037] text-white text-xs font-bold shadow-xs transition cursor-pointer"
              >
                Ya, Lihat Panduan Perjalanan →
              </button>
            </div>
          </div>
        ) : (
          /* Mode Panduan Perjalanan Step-by-Step (Output Akhir Flowchart) */
          <div className="pt-5 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-headline font-bold text-base text-gray-900">
                Panduan Perjalanan Langkah demi Langkah
              </h4>
              <button
                type="button"
                onClick={onCancelRoute}
                className="text-xs font-semibold text-[#1A72BA] hover:underline cursor-pointer"
              >
                Selesai / Cari Rute Baru
              </button>
            </div>

            <ol className="relative border-l-2 border-[#1AAA4A] ml-3 space-y-5">
              {/* Langkah 1: Naik di Halte Penjemputan */}
              <li className="ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-[#1AAA4A] rounded-full ring-4 ring-white text-white text-xs font-bold">
                  1
                </span>
                <div className="bg-[#F4F6F4] p-3.5 rounded-xl border border-gray-200">
                  <span className="text-[11px] font-bold text-[#1AAA4A] uppercase">
                    Titik Penjemputan Resmi (FR-06)
                  </span>
                  <h5 className="font-headline font-bold text-sm text-gray-900">
                    Menunggu di Halte {pickupStop.name} (Koridor{" "}
                    {pickupStop.corridor})
                  </h5>
                  <p className="text-xs text-[#71796F] mt-1">
                    Armada berikutnya tiba pukul{" "}
                    <strong className="text-gray-900">
                      {pickupStop.nextSchedule[0]} WIB
                    </strong>{" "}
                    (tersedia juga pukul {pickupStop.nextSchedule[1]} &{" "}
                    {pickupStop.nextSchedule[2]} WIB). Siapkan tarif{" "}
                    {selectedMode === "BRT" ? "Rp 4.900" : "Rp 3.000"}.
                  </p>
                </div>
              </li>

              {/* Langkah 2 (Opsional): Jika menggunakan Integrasi / Transit */}
              {needsTransit && transitHub && (
                <li className="ml-6">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-[#FFCB07] rounded-full ring-4 ring-white text-gray-900 text-xs font-bold">
                    2
                  </span>
                  <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200">
                    <span className="text-[11px] font-bold text-amber-800 uppercase">
                      Titik Transit Integrasi (Angkot ↔ Bus BRT)
                    </span>
                    <h5 className="font-headline font-bold text-sm text-gray-900">
                      Transit di Halte Hub {transitHub.name}
                    </h5>
                    <p className="text-xs text-gray-700 mt-1">
                      Turun di halte transit resmi{" "}
                      <strong>{transitHub.name}</strong>, kemudian lanjutkan
                      perjalanan menggunakan armada penghubung menuju koridor{" "}
                      {dropoffStop?.corridor || "Tujuan"}.
                    </p>
                  </div>
                </li>
              )}

              {/* Langkah Terakhir: Turun di Tujuan */}
              <li className="ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-[#1A72BA] rounded-full ring-4 ring-white text-white text-xs font-bold">
                  {needsTransit && transitHub ? "3" : "2"}
                </span>
                <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-200">
                  <span className="text-[11px] font-bold text-[#1A72BA] uppercase">
                    Titik Tujuan Akhir (FR-07)
                  </span>
                  <h5 className="font-headline font-bold text-sm text-gray-900">
                    {dropoffTarget.type === "STOP"
                      ? `Turun di Halte Resmi ${dropoffTarget.data.name}`
                      : `Turun di Sepanjang ${dropoffTarget.data.label}`}
                  </h5>
                  <p className="text-xs text-gray-700 mt-1">
                    {dropoffTarget.type === "STOP"
                      ? "Pastikan Anda turun tepat setelah armada berhenti sempurna di titik halte."
                      : "Karena Anda menggunakan Angkot Feeder dan ruas ini adalah Zona Hijau (Aman), beri tahu pengemudi untuk menepi di titik aman sepanjang ruas jalan ini."}
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