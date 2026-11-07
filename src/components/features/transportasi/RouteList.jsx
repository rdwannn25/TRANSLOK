import React from 'react';
import { MapPin } from 'lucide-react';
import RouteCard from './RouteCard';

export default function RouteList() {
    const routesData = [
    {
        id: 'tmb-1',
        code: 'BRT KORIDOR 1',
        status: 'Beroperasi Normal',
        route: 'Cicaheum',
        destination: 'Elang',
        via: 'Jl. Jend. Sudirman, Alun-Alun, Kosambi, Cicaheum',
        price: '4.000',
        type: 'brt', // untuk menentukan warna (hijau)
    },
    {
        id: 'tmb-2',
        code: 'BRT KORIDOR 2',
        status: 'Beroperasi Normal',
        route: 'Cicaheum',
        destination: 'Cibeureum',
        via: 'Jl. Ahmad Yani, Asia Afrika, Sudirman, Rajawali',
        price: '4.000',
        type: 'brt',
    },
    {
        id: 'tmb-4',
        code: 'BRT KORIDOR 4',
        status: 'Beroperasi Normal',
        route: 'Antapani',
        destination: 'Leuwipanjang',
        via: 'Jl. Terusan Jakarta, Kiaracondong, Soekarno Hatta',
        price: '4.000',
        type: 'brt',
    },
    {
        id: 'angkot-01',
        code: 'ANGKOT 01',
        status: 'Beroperasi Normal',
        route: 'Kebon Kalapa',
        destination: 'Cicaheum',
        via: 'Abdul Muis, Supratman, Ahmad Yani, Cicaheum',
        price: '3.000',
        type: 'angkot', // untuk menentukan warna (biru)
    },
    {
        id: 'angkot-02',
        code: 'ANGKOT 02',
        status: 'Beroperasi Normal',
        route: 'Dago',
        destination: 'Kebon Kalapa',
        via: 'Ir. H. Djuanda (Dago), Merdeka, Nias, Kalapa',
        price: '3.000',
        type: 'angkot',
    },
    {
        id: 'angkot-08',
        code: 'ANGKOT 08',
        status: 'Beroperasi Normal',
        route: 'Cicaheum',
        destination: 'Leuwipanjang',
        via: 'By-pass Soekarno Hatta, Kiaracondong, Moh. Toha',
        price: '3.000',
        type: 'angkot',
    }
    ];
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Daftar Koridor Utama & Trayek Aktif Hari Ini</h2>
          <p className="text-sm text-slate-500 mt-1">Data resmi Dinas Perhubungan Kota Bandung terverifikasi 2026</p>
        </div>
        <div className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <MapPin className="w-4 h-4 text-green-600" /> Tarif Flat Tunai / QRIS: Rp 3.000 - Rp 5.000
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {routesData.map((route) => (
          <RouteCard key={route.id} data={route} />
        ))}
      </div>
    </div>
  );
}