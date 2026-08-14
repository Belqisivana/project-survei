// frontend/app/lkb/dashboard/page.tsx
import React from 'react';

export default function BalitarSurveyDashboard() {
  return (
    <div className="space-y-6">
      
      {/* Header Area */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Survei LKB</h1>
        <p className="text-gray-500 text-sm mt-1">Pemetaan lokasi mitra dan rekapan survei kepuasan.</p>
      </div>

      {/* Grid Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Total Titik Survei</span>
          <span className="text-3xl font-bold text-gray-900 mt-2">142 <span className="text-sm text-gray-500 font-medium">Lokasi</span></span>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Menunggu Review</span>
          <span className="text-3xl font-bold text-yellow-500 mt-2">12 <span className="text-sm text-gray-500 font-medium">Data</span></span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Rating Rata-rata</span>
          <span className="text-3xl font-bold text-green-600 mt-2">4.6 <span className="text-sm text-gray-500 font-medium">/ 5.0</span></span>
        </div>
      </div>

      {/* Tabel Data Survei (Struktur HTML yang valid untuk menghindari Hydration Error) */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden mt-6">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900">Hasil Pemetaan Akses Venue</h2>
          <button className="text-sm text-[#3366E3] font-semibold hover:underline">Lihat Semua Data</button>
        </div>
        
        <div className="overflow-x-auto">
          {/* HARUS ADA STRUKTUR <table> -> <thead> -> <tbody> */}
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-gray-200 bg-white">
                <th className="px-6 py-4 font-medium">Nama Mitra / Lokasi</th>
                {/* <th className="px-6 py-4 font-medium">Titik Lokasi (Maps)</th> */}
                <th className="px-6 py-4 font-medium">Rating</th>
                <th className="px-6 py-4 font-medium">Tgl Survei</th>
                <th className="px-6 py-4 font-medium">Status Validasi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5 font-bold text-gray-900">Pusat Oleh-Oleh Jaya</td>
                <td className="px-6 py-5 text-blue-500 hover:underline cursor-pointer font-medium">-8.1255, 112.1677</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="font-semibold text-gray-900">4.8</span>
                  </div>
                </td>
                <td className="px-6 py-5">11 Juli 2026</td>
                <td className="px-6 py-5">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-lg text-xs font-bold">Pending Review</span>
                </td>
              </tr>

              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5 font-bold text-gray-900">Toko Lapis Berkah</td>
                <td className="px-6 py-5 text-blue-500 hover:underline cursor-pointer font-medium">-8.1344, 112.1788</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="font-semibold text-gray-900">4.5</span>
                  </div>
                </td>
                <td className="px-6 py-5">10 Juli 2026</td>
                <td className="px-6 py-5">
                  <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold">Tervalidasi</span>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}