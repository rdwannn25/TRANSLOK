// src/components/RouteMapSVG.jsx
import React, { useState } from "react";
import { STOPS_DATA, ROUTE_SEGMENTS } from "../data/translokdata.js";

export default function RouteMapSVG({
  selectedMode,
  pickupStop,
  dropoffTarget,
  onSelectStop,
  onSelectSegment,
  selectionStep, // "PICKUP" | "DROPOFF"
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const getStopById = (id) => STOPS_DATA.find((s) => s.id === id);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden flex flex-col">
      {/* Top Bar Peta: Instruksi Kontekstual & Legenda */}
      <div className="p-4 border-b border-gray-100 bg-[#F4F6F4]/60 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#1AAA4A] text-white">
              PETA KORIDOR INTERAKTIF (FR-05)
            </span>
            <span className="text-xs font-semibold text-gray-700">
              Mode Aktif:{" "}
              <strong className="text-[#1A72BA]">
                {selectedMode === "ALL"
                  ? "Integrasi BRT & Angkot"
                  : selectedMode === "ANGKOT"
                  ? "Angkot Feeder"
                  : "Bus BRT"}
              </strong>
            </span>
          </div>
          <p className="text-xs text-[#71796F] mt-1">
            {selectionStep === "PICKUP"
              ? "👉 Klik salah satu titik halte pada peta untuk mengecek jadwal & menjadikannya Titik Jemput (FR-06)."
              : selectedMode === "BRT"
              ? "👉 Pilih Titik Halte Tujuan resmi untuk turun dari Bus BRT (FR-07)."
              : "👉 Untuk Angkot: Klik Halte Tujuan ATAU klik garis jalur Hijau/Merah untuk simulasi turun di tengah jalan (FR-07)."}
          </p>
        </div>

        {/* Legenda Visual Sesuai rute.jpg */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium bg-white px-3 py-2 rounded-xl border border-gray-200">
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-1.5 rounded bg-[#1AAA4A] inline-block" />
            Jalur Aman (Boleh Turun Angkot)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-1.5 rounded bg-[#DC2626] inline-block" />
            Zona Merah (Dilarang Berhenti)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FFCB07] border-2 border-gray-900 inline-block" />
            Halte Transit (BRT + Angkot)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#1A72BA] inline-block" />
            Halte Angkot Feeder
          </span>
        </div>
      </div>

      {/* Canvas Peta SVG dengan Kontrol Zoom */}
      <div className="relative w-full overflow-auto bg-[#F8FAF8] max-h-[600px]">
        {/* Kontrol Zoom Floating */}
        <div className="sticky top-3 left-3 z-10 inline-flex items-center gap-1 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-gray-200 shadow-xs m-3">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(0.85, +(z - 0.15).toFixed(2)))}
            className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center cursor-pointer"
            title="Perkecil Peta"
          >
            −
          </button>
          <span className="text-[11px] font-semibold text-gray-700 px-1.5">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(1.6, +(z + 0.15).toFixed(2)))}
            className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center cursor-pointer"
            title="Perbesar Peta"
          >
            +
          </button>
          {zoomLevel !== 1 && (
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="text-[10px] font-semibold text-[#1A72BA] hover:underline ml-1 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        {/* Info Hover Segmen Jalan */}
        {hoveredSegment && (
          <div className="sticky top-3 right-3 z-10 float-right bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-xl mr-3 shadow-sm pointer-events-none">
            <span
              className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                hoveredSegment.status === "RESTRICTED"
                  ? "bg-red-400"
                  : "bg-emerald-400"
              }`}
            />
            <strong>{hoveredSegment.label}</strong> —{" "}
            {hoveredSegment.status === "RESTRICTED"
              ? "Zona Merah (Dilarang Berhenti)"
              : "Zona Hijau (Aman Turun Angkot)"}
          </div>
        )}

        <div
          style={{
            width: `${100 * zoomLevel}%`,
            minWidth: "780px",
          }}
          className="transition-all duration-150"
        >
          <svg
            viewBox="0 0 1200 760"
            className="w-full h-auto select-none block"
          >
            {/* Background Grid Halus Ala Peta Kota Bandung */}
            <defs>
              <pattern
                id="cityGrid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#E5E9E5"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="1200" height="760" fill="url(#cityGrid)" />

            {/* Watermark Wilayah Koridor */}
            <text x="180" y="75" fill="#CBD5E1" fontSize="16" fontWeight="800" letterSpacing="3">
              KORIDOR BARAT (CIBEUREUM - RAJAWALI)
            </text>
            <text x="510" y="75" fill="#CBD5E1" fontSize="16" fontWeight="800" letterSpacing="3">
              PUSAT KOTA
            </text>
            <text x="830" y="75" fill="#CBD5E1" fontSize="16" fontWeight="800" letterSpacing="3">
              KORIDOR TIMUR (KOSAMBI - CICADAS)
            </text>
            <text x="630" y="660" fill="#CBD5E1" fontSize="15" fontWeight="800" letterSpacing="2">
              LOOP SELATAN (TEGALLEGA)
            </text>

            {/* Dekorasi Kontur Sungai Cikapundung & Area Taman Tegallega */}
            <path
              d="M 595 0 Q 610 200 620 350 T 680 760"
              fill="none"
              stroke="#BAE6FD"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.6"
            />
            <rect
              x="550"
              y="595"
              width="36"
              height="110"
              rx="8"
              fill="#DCFCE7"
              stroke="#86EFAC"
              strokeWidth="1.5"
            />

            {/* 1. Render Garis Segmen Rute (Hijau = Aman, Merah = Dilarang Berhenti) */}
            {ROUTE_SEGMENTS.map((seg) => {
              const fromStop = getStopById(seg.from);
              const toStop = getStopById(seg.to);
              if (!fromStop || !toStop) return null;

              const isSelectedSegment =
                dropoffTarget?.type === "SEGMENT" &&
                dropoffTarget?.data?.id === seg.id;

              const strokeColor =
                seg.status === "RESTRICTED" ? "#DC2626" : "#1AAA4A";

              const midX = (fromStop.x + toStop.x) / 2;
              const midY = (fromStop.y + toStop.y) / 2;

              return (
                <g
                  key={seg.id}
                  onClick={() => onSelectSegment(seg)}
                  onMouseEnter={() => setHoveredSegment(seg)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  className={
                    selectedMode === "BRT"
                      ? "cursor-not-allowed"
                      : "cursor-pointer group"
                  }
                >
                  {/* Invisible wider stroke untuk memudahkan klik di layar HP */}
                  <line
                    x1={fromStop.x}
                    y1={fromStop.y}
                    x2={toStop.x}
                    y2={toStop.y}
                    stroke="transparent"
                    strokeWidth="22"
                  />
                  {/* Highlight glow jika segmen jalan ini sedang dipilih */}
                  {isSelectedSegment && (
                    <line
                      x1={fromStop.x}
                      y1={fromStop.y}
                      x2={toStop.x}
                      y2={toStop.y}
                      stroke={seg.status === "RESTRICTED" ? "#FCA5A5" : "#86EFAC"}
                      strokeWidth="18"
                      strokeLinecap="round"
                    />
                  )}
                  {/* Garis Utama Rute */}
                  <line
                    x1={fromStop.x}
                    y1={fromStop.y}
                    x2={toStop.x}
                    y2={toStop.y}
                    stroke={strokeColor}
                    strokeWidth="7"
                    strokeLinecap="round"
                    className="transition-all group-hover:stroke-[10px]"
                  />

                  {/* Pin Indikator jika Segmen Jalan dipilih sebagai Titik Turun Angkot */}
                  {isSelectedSegment && (
                    <g transform={`translate(${midX - 42}, ${midY - 28})`}>
                      <rect
                        width="84"
                        height="20"
                        rx="6"
                        fill={seg.status === "RESTRICTED" ? "#DC2626" : "#1A72BA"}
                      />
                      <text
                        x="42"
                        y="13.5"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="9.5"
                        fontWeight="bold"
                      >
                        {seg.status === "RESTRICTED" ? "⛔ ZONA MERAH" : "TURUN DI SINI"}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* 2. Render Titik Halte (Nodes) */}
            {STOPS_DATA.map((stop) => {
              const isPickup = pickupStop?.id === stop.id;
              const isDropoff =
                dropoffTarget?.type === "STOP" &&
                dropoffTarget?.data?.id === stop.id;

              const isAvailableForMode =
                selectedMode === "ALL" || stop.modes.includes(selectedMode);

              let fillColor = stop.isTransit ? "#FFCB07" : "#1A72BA";
              if (!isAvailableForMode) fillColor = "#CBD5E1";

              return (
                <g
                  key={stop.id}
                  onClick={() => onSelectStop(stop)}
                  className="cursor-pointer group"
                >
                  {/* Pulse Ring untuk Titik Jemput atau Titik Turun Aktif */}
                  {(isPickup || isDropoff) && (
                    <circle
                      cx={stop.x}
                      cy={stop.y}
                      r="16"
                      fill={isPickup ? "#1AAA4A" : "#1A72BA"}
                      opacity="0.25"
                    />
                  )}

                  {/* Lingkaran Halte */}
                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r={stop.isTransit ? "8.5" : "6.5"}
                    fill={fillColor}
                    stroke={
                      isPickup
                        ? "#1AAA4A"
                        : isDropoff
                        ? "#1E293B"
                        : stop.isTransit
                        ? "#1E293B"
                        : "#FFFFFF"
                    }
                    strokeWidth={isPickup || isDropoff ? "3.5" : "2"}
                    className="transition-transform duration-150 group-hover:scale-125"
                  />

                  {/* Badge Pin jika terpilih sebagai Jemput / Turun */}
                  {(isPickup || isDropoff) && (
                    <g transform={`translate(${stop.x - 28}, ${stop.y - 34})`}>
                      <rect
                        width="56"
                        height="18"
                        rx="5"
                        fill={isPickup ? "#1AAA4A" : "#1A72BA"}
                      />
                      <text
                        x="28"
                        y="12.5"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="9.5"
                        fontWeight="bold"
                        fontFamily="Inter, sans-serif"
                      >
                        {isPickup ? "JEMPUT" : "TUJUAN"}
                      </text>
                    </g>
                  )}

                  {/* Label Nama Halte */}
                  <text
                    x={stop.x}
                    y={stop.y - 12}
                    textAnchor="middle"
                    fill={isAvailableForMode ? "#1E293B" : "#94A3B8"}
                    fontSize="11"
                    fontWeight={stop.isTransit || isPickup ? "700" : "600"}
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    className="pointer-events-none drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]"
                  >
                    {stop.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}