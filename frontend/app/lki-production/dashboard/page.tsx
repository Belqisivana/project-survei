// frontend/app/lki-production/dashboard/page.tsx
'use client'; 

import React, { useState } from 'react';

export default function LKIDashboardPage() {
  const [stats, setStats] = useState({
    survei: 86,
    kendala: 3,
    kepuasan: 94,
    siap: 12
  });

  const [dataVenue, setDataVenue] = useState([
    {
      id: 1,
      klien: "Pernikahan Bpk. Budi",
      lokasi: "Graha Cakrawala (-7.961, 112.616)",
      kesesuaian: "Akses Truk Aman",
      kesesuaianColor: "text-green-600",
      tgl: "9 Ags 2026",
      status: "Siap Digunakan",
      statusColor: "bg-green-100 text-green-700"
    },
    {
      id: 2,
      klien: "Pensi SMAN 1",
      lokasi: "Lapangan SMAN 1 (-7.978, 112.631)",
      kesesuaian: "Gang Sempit (Perlu Pickup)",
      kesesuaianColor: "text-orange-600",
      tgl: "11 Ags 2026",
      status: "Perlu Perhatian",
      statusColor: "bg-yellow-100 text-yellow-700"
    }
  ]);

  const handleDownloadAndReset = () => {
    alert("Laporan PDF berhasil di-download! Data di dashboard akan direset untuk periode baru.");
    
    setStats({
      survei: 0,
      kendala: 0,
      kepuasan: 0, 
      siap: 0
    });

    setDataVenue([]);
  };

  return (
    <div className="space-y-6">
      
      {/* ================= HEADER UTAMA ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Survei LKI</h1>
          <p className="text-gray-500 text-sm mt-1">Pemetaan akses lokasi event (venue) dan rekapan survei kepuasan klien.</p>
        </div>
        {/* Tulisan Lihat Semua Data pindah ke sini */}
        {/* <button className="text-sm text-[#E33333] font-semibold hover:underline">
          Lihat Semua Data
        </button> */}
      </div>

      {/* ================= KARTU STATISTIK ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center transition-all">
          <span className="text-sm font-semibold text-gray-600">Survei Venue (Maps)</span>
          <span className="text-3xl font-bold text-gray-900 mt-2">{stats.survei} <span className="text-sm text-gray-500 font-medium">Titik</span></span>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center transition-all">
          <span className="text-sm font-semibold text-gray-600">Kendala Akses Lokasi</span>
          <span className="text-3xl font-bold text-[#E33333] mt-2">{stats.kendala} <span className="text-sm text-gray-500 font-medium">Laporan</span></span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center transition-all">
          <span className="text-sm font-semibold text-gray-600">Kepuasan Klien</span>
          <span className="text-3xl font-bold text-[#E33333] mt-2">{stats.kepuasan}% <span className="text-sm text-gray-500 font-medium">Puas</span></span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center transition-all">
          <span className="text-sm font-semibold text-gray-600">Venue Siap Loading</span>
          <span className="text-3xl font-bold text-green-600 mt-2">{stats.siap} <span className="text-sm text-gray-500 font-medium">Lokasi</span></span>
        </div>
      </div>

      {/* ================= TABEL DATA SURVEI ================= */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden mt-6">
        <div className="px-6 py-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white">
          <h2 className="text-lg font-bold text-gray-900">Hasil Pemetaan Akses Venue</h2>
          
          {/* Tombol Download PDF pindah ke sini (di dalam kotak tabel) */}
          {/* <button 
            onClick={handleDownloadAndReset} 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-5 rounded-xl transition-colors text-sm flex items-center gap-2 shadow-sm whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download Laporan PDF
          </button> */}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 font-medium">Nama Klien / Acara</th>
                <th className="px-6 py-4 font-medium">Titik Lokasi (Maps)</th>
                <th className="px-6 py-4 font-medium">Kesesuaian Loading Dock</th>
                <th className="px-6 py-4 font-medium">Tgl Survei</th>
                <th className="px-6 py-4 font-medium">Status Venue</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              
              {dataVenue.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400 font-medium">
                    Belum ada data venue baru untuk periode ini.
                  </td>
                </tr>
              ) : (
                dataVenue.map((venue) => (
                  <tr key={venue.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5 font-bold text-gray-900">{venue.klien}</td>
                    <td className="px-6 py-5 text-blue-500 hover:underline cursor-pointer font-medium">{venue.lokasi}</td>
                    <td className={`px-6 py-5 font-medium ${venue.kesesuaianColor}`}>{venue.kesesuaian}</td>
                    <td className="px-6 py-5">{venue.tgl}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${venue.statusColor}`}>
                        {venue.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}