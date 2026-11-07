import React, { useState } from "react";
import { STOPS_DATA, ROUTE_SEGMENTS } from "../data/translokdata.js";
import mapImage from "../assets/images/rute1.png";

export default function RouteMapSVG({
  selectedMode,
  pickupStop,
  dropoffTarget,
  onSelectStop,
  onSelectSegment,
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const getStopById = (id) => STOPS_DATA.find((s) => s.id === id);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1AAA4A] animate-pulse"></span>
            Peta Rute Interaktif
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Moda: <strong className="text-[#1A72BA]">
              {selectedMode === "ALL" ? "Integrasi BRT & Angkot" : selectedMode === "ANGKOT" ? "Angkot Feeder" : "Bus BRT"}
            </strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium bg-white px-3 py-2 rounded-lg border border-gray-200">
          <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded bg-[#1AAA4A]" />Jalur Aman</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded bg-[#DC2626]" />Zona Merah</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#FFCB07] border border-gray-900" />Transit</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1A72BA]" />Halte</span>
        </div>
      </div>

      <div className="relative w-full overflow-auto bg-[#F8FAF8] max-h-[600px]">
        <div className="sticky top-3 left-3 z-10 inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1.5 rounded-lg border border-gray-200 shadow-sm m-3">
          <button onClick={() => setZoomLevel((z) => Math.max(0.85, +(z - 0.15).toFixed(2)))} className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold flex items-center justify-center">−</button>
          <span className="text-[11px] font-bold text-gray-700 px-1.5 w-10 text-center">{Math.round(zoomLevel * 100)}%</span>
          <button onClick={() => setZoomLevel((z) => Math.min(1.6, +(z + 0.15).toFixed(2)))} className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold flex items-center justify-center">+</button>
        </div>

        {hoveredSegment && (
          <div className="sticky top-3 right-3 z-10 float-right bg-gray-900/90 text-white text-xs px-3 py-2 rounded-lg mr-3 shadow-md pointer-events-none">
            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${hoveredSegment.status === "RESTRICTED" ? "bg-red-400" : "bg-green-400"}`} />
            <strong>{hoveredSegment.label}</strong>
          </div>
        )}

        <div style={{ width: `${100 * zoomLevel}%`, minWidth: "780px" }} className="transition-all duration-150">
          <svg viewBox="0 0 1200 760" className="w-full h-auto select-none block">
            <image 
              href={mapImage}
              x="0" 
              y="0" 
              width="1200" 
              height="760" 
              preserveAspectRatio="xMidYMid slice"
              className="opacity-90" 
            />
            <defs><pattern id="cityGrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E9E5" strokeWidth="1"/></pattern></defs>
            <rect width="1200" height="760" fill="url(#cityGrid)" />
            <text x="180" y="75" fill="#CBD5E1" fontSize="16" fontWeight="800" letterSpacing="3">KORIDOR BARAT</text>
            <text x="510" y="75" fill="#CBD5E1" fontSize="16" fontWeight="800" letterSpacing="3">PUSAT KOTA</text>
            <text x="830" y="75" fill="#CBD5E1" fontSize="16" fontWeight="800" letterSpacing="3">KORIDOR TIMUR</text>
            
            {ROUTE_SEGMENTS.map((seg) => {
              const fromStop = getStopById(seg.from);
              const toStop = getStopById(seg.to);
              if (!fromStop || !toStop) return null;
              const isSelectedSegment = dropoffTarget?.type === "SEGMENT" && dropoffTarget?.data?.id === seg.id;
              const strokeColor = seg.status === "RESTRICTED" ? "#DC2626" : "#1AAA4A";
              return (
                <g key={seg.id} onClick={() => onSelectSegment(seg)} onMouseEnter={() => setHoveredSegment(seg)} onMouseLeave={() => setHoveredSegment(null)} className={selectedMode === "BRT" ? "cursor-not-allowed" : "cursor-pointer group"}>
                  <line x1={fromStop.x} y1={fromStop.y} x2={toStop.x} y2={toStop.y} stroke="transparent" strokeWidth="22" />
                  {isSelectedSegment && <line x1={fromStop.x} y1={fromStop.y} x2={toStop.x} y2={toStop.y} stroke={seg.status === "RESTRICTED" ? "#FCA5A5" : "#86EFAC"} strokeWidth="18" strokeLinecap="round" />}
                  <line x1={fromStop.x} y1={fromStop.y} x2={toStop.x} y2={toStop.y} stroke={strokeColor} strokeWidth="7" strokeLinecap="round" className="transition-all group-hover:stroke-[10px]" />
                </g>
              );
            })}
            
            {STOPS_DATA.map((stop) => {
              const isPickup = pickupStop?.id === stop.id;
              const isDropoff = dropoffTarget?.type === "STOP" && dropoffTarget?.data?.id === stop.id;
              const isAvailableForMode = selectedMode === "ALL" || stop.modes.includes(selectedMode);
              let fillColor = stop.isTransit ? "#FFCB07" : "#1A72BA";
              if (!isAvailableForMode) fillColor = "#CBD5E1";
              return (
                <g key={stop.id} onClick={() => onSelectStop(stop)} className="cursor-pointer group">
                  {(isPickup || isDropoff) && <circle cx={stop.x} cy={stop.y} r="16" fill={isPickup ? "#1AAA4A" : "#1A72BA"} opacity="0.25" />}
                  <circle cx={stop.x} cy={stop.y} r={stop.isTransit ? "8.5" : "6.5"} fill={fillColor} stroke={isPickup ? "#1AAA4A" : isDropoff ? "#1E293B" : stop.isTransit ? "#1E293B" : "#FFFFFF"} strokeWidth={isPickup || isDropoff ? "3.5" : "2"} className="transition-transform duration-150 group-hover:scale-125" />
                  <text x={stop.x} y={stop.y - 12} textAnchor="middle" fill={isAvailableForMode ? "#1E293B" : "#94A3B8"} fontSize="11" fontWeight={stop.isTransit || isPickup ? "700" : "600"} className="pointer-events-none drop-shadow-sm">{stop.name}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}