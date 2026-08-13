// frontend/app/lkb/dashboard/page.tsx
import React from 'react';

export default function BalitarSurveyDashboard() {
  return (
    <div className="space-y-6">
      
      {/* Header Area */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Survei Balitar</h1>
        <p className="text-gray-500 text-sm mt-1">Pemantauan titik lokasi mitra dan hasil survei kepuasan pelanggan.</p>
      </div>

      {/* Grid Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Total Titik Survei</span>
          <span className="text-3xl font-bold text-gray-900 mt-2">142 <span className="text-sm text-gray-500 font-medium">Lokasi</span></span>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Menunggu Validasi Maps</span>
          <span className="text-3xl font-bold text-orange-500 mt-2">18 <span className="text-sm text-gray-500 font-medium">Titik</span></span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Rata-rata Rating Outlet</span>
          <span className="text-3xl font-bold text-[#3366E3] mt-2">4.8 <span className="text-sm text-gray-500 font-medium">/ 5.0</span></span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Surveyor Lapangan</span>
          <span className="text-3xl font-bold text-green-600 mt-2">5 <span className="text-sm text-gray-500 font-medium">Aktif</span></span>
        </div>
      </div>

      {/* Tabel Data Survei */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-6">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Data Pemetaan Mitra Terbaru</h2>
          <button className="text-sm text-[#3366E3] font-semibold hover:underline">Lihat Semua Data</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                <th className="px-6 py-4 font-medium">Nama Mitra/Toko</th>
                <th className="px-6 py-4 font-medium">Kordinat (Maps)</th>
                <th className="px-6 py-4 font-medium">Rating</th>
                <th className="px-6 py-4 font-medium">Tanggal Rating</th>
                <th className="px-6 py-4 font-medium">Status Validasi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Toko Oleh-Oleh Bu Rudy</td>
                <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">-8.1123, 112.1543</td>
                <div className="flex items-center gap-1">
                    <span className="text-yellow-300 text-lg">★</span>
                    <span className="font-semibold text-gray-900">5.0</span>
                  </div>
                <td className="px-6 py-4">10 Agustus 2026</td>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Tervalidasi</span></td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Pusat Oleh-Oleh Jaya</td>
                <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">-8.1255, 112.1677</td>
                <div className="flex items-center gap-1">
                    <span className="text-yellow-300 text-lg">★</span>
                    <span className="font-semibold text-gray-900">4.8</span>
                  </div>
                <td className="px-6 py-4">11 Juli 2026</td>
                <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">Pending Review</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}