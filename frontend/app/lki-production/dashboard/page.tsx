// frontend/app/lki-production/dashboard/page.tsx
import React from 'react';

export default function LKISurveyDashboard() {
  return (
    <div className="space-y-6">
      
      {/* Header Area */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Survei LKI</h1>
        <p className="text-gray-500 text-sm mt-1">Pemetaan akses lokasi event (venue) dan rekapan survei kepuasan klien.</p>
      </div>

      {/* Grid Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Survei Venue (Maps)</span>
          <span className="text-3xl font-bold text-gray-900 mt-2">86 <span className="text-sm text-gray-500 font-medium">Titik</span></span>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Kendala Akses Lokasi</span>
          <span className="text-3xl font-bold text-red-500 mt-2">3 <span className="text-sm text-gray-500 font-medium">Laporan</span></span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Kepuasan Klien</span>
          <span className="text-3xl font-bold text-[#E33333] mt-2">94% <span className="text-sm text-gray-500 font-medium">Puas</span></span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Venue Siap Loading</span>
          <span className="text-3xl font-bold text-green-600 mt-2">12 <span className="text-sm text-gray-500 font-medium">Lokasi</span></span>
        </div>
      </div>

      {/* Tabel Data Survei Venue */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-6">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Hasil Pemetaan Akses Venue</h2>
          <button className="text-sm text-[#E33333] font-semibold hover:underline">Lihat Semua Data</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                <th className="px-6 py-4 font-medium">Nama Klien / Acara</th>
                <th className="px-6 py-4 font-medium">Titik Lokasi (Maps)</th>
                <th className="px-6 py-4 font-medium">Kesesuaian Loading Dock</th>
                <th className="px-6 py-4 font-medium">Tgl Survei</th>
                <th className="px-6 py-4 font-medium">Status Venue</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Pernikahan Bpk. Budi</td>
                <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">Graha Cakrawala (-7.961, 112.616)</td>
                <td className="px-6 py-4 text-green-600 font-medium">Akses Truk Aman</td>
                <td className="px-6 py-4">9 Ags 2026</td>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Siap Digunakan</span></td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Pensi SMAN 1</td>
                <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">Lapangan SMAN 1 (-7.978, 112.631)</td>
                <td className="px-6 py-4 text-orange-500 font-medium">Gang Sempit (Perlu Pickup)</td>
                <td className="px-6 py-4">11 Ags 2026</td>
                <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">Perlu Perhatian</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}