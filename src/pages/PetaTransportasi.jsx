// src/pages/PetaTransportasi.jsx
import React, { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";

import RouteMapSVG from "../components/RouteMapSVG.jsx";
import StopExplorerPanel from "../components/StopExplorerPanel.jsx";
import TripSummaryCard from "../components/TripSummaryCard.jsx";
import { STOPS_DATA, ROUTE_SEGMENTS } from "../data/translokdata.js";

export default function PetaTransportasi() {
  // Ambil state selectedMode dari AppLayout (jika menggunakan Outlet React Router)
  const outletContext = useOutletContext() || {};
  const [localMode, setLocalMode] = useState("ALL");

  const selectedMode = outletContext.selectedMode ?? localMode;
  const setSelectedMode = outletContext.setSelectedMode ?? setLocalMode;

  // FR-06 & FR-07: State Titik Jemput (Halte) & Titik Turun (Halte / Segmen Jalan)
  const [pickupStop, setPickupStop] = useState(STOPS_DATA[7]); // Default: Stasiun Hall (H08)
  const [dropoffTarget, setDropoffTarget] = useState({
    type: "STOP",
    data: STOPS_DATA[28], // Default: Pasar Kosambi (H29)
  });

  // Langkah aktif pemilihan ("PICKUP" | "DROPOFF")
  const [selectionStep, setSelectionStep] = useState("DROPOFF");

  // State menampilkan kartu ringkasan perjalanan (FR-12)
  const [showTripSummary, setShowTripSummary] = useState(false);

  const summaryRef = useRef(null);

  // Efek sinkronisasi ketika user mengganti moda transportasi di Header
  useEffect(() => {
    setShowTripSummary(false);
    // Jika user memilih Bus BRT padahal titik turun sebelumnya adalah Segmen Jalan Angkot, reset titik turun
    if (selectedMode === "BRT" && dropoffTarget?.type === "SEGMENT") {
      setDropoffTarget(null);
      setSelectionStep("DROPOFF");
    }
  }, [selectedMode]);

  // Handler saat user mengklik titik halte di Peta SVG atau di Daftar Halte
  const handleSelectStop = (stop) => {
    setShowTripSummary(false);
    if (selectionStep === "PICKUP") {
      setPickupStop(stop);
      // Jika titik turun sebelumnya sama dengan halte jemput baru, kosongkan titik turun
      if (dropoffTarget?.type === "STOP" && dropoffTarget.data.id === stop.id) {
        setDropoffTarget(null);
      }
      setSelectionStep("DROPOFF");
    } else {
      // Jika di mode DROPOFF user mengklik halte yang sama dengan halte jemput, jadikan sebagai fokus jemput
      if (pickupStop && pickupStop.id === stop.id) {
        setPickupStop(stop);
        return;
      }
      setDropoffTarget({ type: "STOP", data: stop });
    }
  };

  // Handler saat user mengklik garis jalur Hijau/Merah di Peta (Khusus simulasi turun Angkot FR-07)
  const handleSelectSegment = (segment) => {
    if (selectedMode === "BRT") {
      return; // Bus BRT wajib turun di halte resmi
    }
    setShowTripSummary(false);
    setSelectionStep("DROPOFF");
    setDropoffTarget({ type: "SEGMENT", data: segment });
  };

  // Handler Reset Pilihan
  const handleResetSelection = () => {
    setPickupStop(null);
    setDropoffTarget(null);
    setShowTripSummary(false);
    setSelectionStep("PICKUP");
  };

  // Handler Konfirmasi Rute & Auto-scroll ke Ringkasan Perjalanan
  const handleConfirmRoute = () => {
    setShowTripSummary(true);
    setTimeout(() => {
      summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Helper Skenario Demo Cepat untuk Pengujian Fitur
  const applyQuickScenario = (scenarioType) => {
    setShowTripSummary(false);
    if (scenarioType === "TRANSIT") {
      setSelectedMode("ALL");
      setPickupStop(STOPS_DATA.find((s) => s.id === "H02")); // RS Rajawali (Angkot)
      setDropoffTarget({
        type: "STOP",
        data: STOPS_DATA.find((s) => s.id === "H34"), // Cicadas (Hub BRT)
      });
      setShowTripSummary(true);
    } else if (scenarioType === "SAFE_ZONE") {
      setSelectedMode("ANGKOT");
      setPickupStop(STOPS_DATA.find((s) => s.id === "H08")); // Stasiun Hall
      setDropoffTarget({
        type: "SEGMENT",
        data: ROUTE_SEGMENTS.find((s) => s.id === "S28"), // Jl. Asia Afrika (Zona Hijau)
      });
    } else if (scenarioType === "RED_ZONE") {
      setSelectedMode("ANGKOT");
      setPickupStop(STOPS_DATA.find((s) => s.id === "H08")); // Stasiun Hall
      setDropoffTarget({
        type: "SEGMENT",
        data: ROUTE_SEGMENTS.find((s) => s.id === "S18"), // Jl. Banceuy (Zona Merah)
      });
    } else if (scenarioType === "BRT_UNAVAILABLE") {
      setSelectedMode("BRT");
      setPickupStop(STOPS_DATA.find((s) => s.id === "H02")); // RS Rajawali (Khusus Angkot)
      setDropoffTarget(null);
      setSelectionStep("PICKUP");
    }
  };

  return (
    <div className="bg-[#F4F6F4] text-slate-800 flex flex-col pb-12">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        {/* Bar Simulasi Cepat (Memudahkan Demo Presentasi / Pengujian FR) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-3.5 mb-5 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
          <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1AAA4A]" />
            Uji Skenario Cepat:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => applyQuickScenario("TRANSIT")}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1AAA4A]/10 text-[#1AAA4A] hover:bg-[#1AAA4A] hover:text-white transition cursor-pointer"
            >
              1. Integrasi Angkot + BRT (Rp 7.900)
            </button>
            <button
              type="button"
              onClick={() => applyQuickScenario("SAFE_ZONE")}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1A72BA]/10 text-[#1A72BA] hover:bg-[#1A72BA] hover:text-white transition cursor-pointer"
            >
              2. Turun Angkot Jalur Hijau (FR-07)
            </button>
            <button
              type="button"
              onClick={() => applyQuickScenario("RED_ZONE")}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition cursor-pointer"
            >
              3. Simulasi Larangan Zona Merah
            </button>
            <button
              type="button"
              onClick={() => applyQuickScenario("BRT_UNAVAILABLE")}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FFCB07]/25 text-gray-900 hover:bg-[#FFCB07] transition cursor-pointer"
            >
              4. Rekomendasi Transit BRT (FR-11)
            </button>
          </div>
        </div>

        {/* Grid Utama: Peta SVG (8 Kolom) & Panel Eksplorasi Halte (4 Kolom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <RouteMapSVG
              selectedMode={selectedMode}
              pickupStop={pickupStop}
              dropoffTarget={dropoffTarget}
              selectionStep={selectionStep}
              onSelectStop={handleSelectStop}
              onSelectSegment={handleSelectSegment}
            />
          </div>

          <div className="lg:col-span-4">
            <StopExplorerPanel
              selectedMode={selectedMode}
              pickupStop={pickupStop}
              dropoffTarget={dropoffTarget}
              selectionStep={selectionStep}
              onSetSelectionStep={setSelectionStep}
              onSelectStop={handleSelectStop}
              onResetSelection={handleResetSelection}
              onConfirmRoute={handleConfirmRoute}
            />
          </div>
        </div>

        {/* Kartu Ringkasan Perjalanan & Panduan Langkah demi Langkah (FR-10, FR-12) */}
        <div ref={summaryRef}>
          {showTripSummary && (
            <TripSummaryCard
              selectedMode={selectedMode}
              pickupStop={pickupStop}
              dropoffTarget={dropoffTarget}
              onCancelRoute={() => setShowTripSummary(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}