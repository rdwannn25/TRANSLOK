import React, { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";

import RouteMapSVG from "../components/RouteMapSVG.jsx";
import StopExplorerPanel from "../components/StopExplorerPanel.jsx";
import TripSummaryCard from "../components/TripSummaryCard.jsx";
import { STOPS_DATA, ROUTE_SEGMENTS } from "../data/translokdata.js";
import posterImage from "../assets/images/poster1.jpg";

export default function Home() {
  const outletContext = useOutletContext() || {};
  const [localMode, setLocalMode] = useState("ALL");

  const selectedMode = outletContext.selectedMode ?? localMode;
  const setSelectedMode = outletContext.setSelectedMode ?? setLocalMode;

  const [pickupStop, setPickupStop] = useState(STOPS_DATA[7]);
  const [dropoffTarget, setDropoffTarget] = useState({
    type: "STOP",
    data: STOPS_DATA[28],
  });

  const [selectionStep, setSelectionStep] = useState("DROPOFF");

  const [showTripSummary, setShowTripSummary] = useState(false);

  const summaryRef = useRef(null);

  useEffect(() => {
    setShowTripSummary(false);
    if (selectedMode === "BRT" && dropoffTarget?.type === "SEGMENT") {
      setDropoffTarget(null);
      setSelectionStep("DROPOFF");
    }
  }, [selectedMode]);

  const handleSelectStop = (stop) => {
    setShowTripSummary(false);
    if (selectionStep === "PICKUP") {
      setPickupStop(stop);
      if (dropoffTarget?.type === "STOP" && dropoffTarget.data.id === stop.id) {
        setDropoffTarget(null);
      }
      setSelectionStep("DROPOFF");
    } else {
      if (pickupStop && pickupStop.id === stop.id) {
        setPickupStop(stop);
        return;
      }
      setDropoffTarget({ type: "STOP", data: stop });
    }
  };

  // Tambahkan fungsi ini di dalam komponen Home.jsx
const handleSwapLocations = () => {
  // Cegah penukaran jika titik turun adalah 'Segment' (Area jalan raya)
  // karena pengguna tidak bisa mulai naik angkot dari tengah jalan sembarangan.
  if (dropoffTarget && dropoffTarget.type === "SEGMENT") {
    alert("Titik awal keberangkatan wajib dari Halte Resmi. Tidak bisa menukar dengan Area Jalan Raya.");
    return;
  }

  // Jika aman, tukar datanya
  const tempPickup = pickupStop;
  
  // Set titik tujuan menjadi titik jemput sebelumnya
  setDropoffTarget(tempPickup ? { type: "STOP", data: tempPickup } : null);
  
  // Set titik jemput menjadi titik tujuan sebelumnya
  setPickupStop(dropoffTarget ? dropoffTarget.data : null);
  
  // Sembunyikan summary (biar user pencet tombol lihat panduan lagi)
  setShowTripSummary(false); 
};

  const handleSelectSegment = (segment) => {
    if (selectedMode === "BRT") {
      return;
    }
    setShowTripSummary(false);
    setSelectionStep("DROPOFF");
    setDropoffTarget({ type: "SEGMENT", data: segment });
  };

  const handleResetSelection = () => {
    setPickupStop(null);
    setDropoffTarget(null);
    setShowTripSummary(false);
    setSelectionStep("PICKUP");
  };

  const handleConfirmRoute = () => {
    setShowTripSummary(true);
    setTimeout(() => {
      summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const applyQuickScenario = (scenarioType) => {
    setShowTripSummary(false);
    if (scenarioType === "TRANSIT") {
      setSelectedMode("ALL");
      setPickupStop(STOPS_DATA.find((s) => s.id === "H02"));
      setDropoffTarget({
        type: "STOP",
        data: STOPS_DATA.find((s) => s.id === "H34"),
      });
      setShowTripSummary(true);
    } else if (scenarioType === "SAFE_ZONE") {
      setSelectedMode("ANGKOT");
      setPickupStop(STOPS_DATA.find((s) => s.id === "H08"));
      setDropoffTarget({
        type: "SEGMENT",
        data: ROUTE_SEGMENTS.find((s) => s.id === "S28"),
      });
    } else if (scenarioType === "RED_ZONE") {
      setSelectedMode("ANGKOT");
      setPickupStop(STOPS_DATA.find((s) => s.id === "H08"));
      setDropoffTarget({
        type: "SEGMENT",
        data: ROUTE_SEGMENTS.find((s) => s.id === "S18"),
      });
    } else if (scenarioType === "BRT_UNAVAILABLE") {
      setSelectedMode("BRT");
      setPickupStop(STOPS_DATA.find((s) => s.id === "H02")); 
      setDropoffTarget(null);
      setSelectionStep("PICKUP");
    }
  };

  return (
    <div className="bg-[#F4F6F4] text-slate-800 flex flex-col pb-12">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5">
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
              onSwapLocations={handleSwapLocations}
            />
          </div>
        </div>

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