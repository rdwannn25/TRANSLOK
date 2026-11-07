// src/components/layout/AppLayout.jsx (atau sesuaikan lokasi file Anda)
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout() {
  // State global untuk moda transportasi ("ALL" | "ANGKOT" | "BRT")
  const [selectedMode, setSelectedMode] = useState("ALL");

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F4] text-gray-900 font-body">
      {/* Oper state & handler ke Header */}
      <Header
        selectedMode={selectedMode}
        onSelectMode={setSelectedMode}
      />

      {/* Teruskan state ke halaman di dalam Outlet (PetaTransportasi) */}
      <main className="flex-1">
        <Outlet context={{ selectedMode, setSelectedMode }} />
      </main>

      <Footer />
    </div>
  );
}