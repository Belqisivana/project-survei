// frontend/app/admin/page.tsx
import React from 'react';

export default function AyanaSurveyDashboard() {
  return (
    <div className="space-y-6">
      
      {/* Header Area */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Survei Ayana</h1>
        <p className="text-gray-500 text-sm mt-1">Pemantauan umpan balik klien cetak dan pemetaan titik pengiriman korporat.</p>
      </div>

      {/* Grid Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Total Kuesioner Masuk</span>
          <span className="text-3xl font-bold text-gray-900 mt-2">210 <span className="text-sm text-gray-500 font-medium">Responden</span></span>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Rata-rata Rating Cetak</span>
          <span className="text-3xl font-bold text-[#3366E3] mt-2">4.9 <span className="text-sm text-gray-500 font-medium">/ 5.0</span></span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Keluhan / Revisi (Pending)</span>
          <span className="text-3xl font-bold text-red-500 mt-2">2 <span className="text-sm text-gray-500 font-medium">Kasus</span></span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Titik Pengiriman (Terpetakan)</span>
          <span className="text-3xl font-bold text-green-600 mt-2">45 <span className="text-sm text-gray-500 font-medium">Lokasi</span></span>
        </div>
      </div>

      {/* Tabel Data Survei Pelanggan */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-6">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900">Survei Kepuasan Pelanggan Terbaru</h2>
          <button className="text-sm text-[#3366E3] font-semibold hover:underline">Ekspor Data CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-gray-200">
                <th className="px-6 py-4 font-medium">Nama Pelanggan / Instansi</th>
                <th className="px-6 py-4 font-medium">Jenis Layanan</th>
                <th className="px-6 py-4 font-medium">Tingkat Kepuasan</th>
                <th className="px-6 py-4 font-medium">Tanggal Masuk</th>
                <th className="px-6 py-4 font-medium">Status Tindak Lanjut</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-gray-900">PT. Maju Mundur</td>
                <td className="px-6 py-4">Cetak Banner & Brosur</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="font-semibold text-gray-900">5.0</span>
                  </div>
                </td>
                <td className="px-6 py-4">11 Ags 2026</td>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Selesai</span></td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-gray-900">Dinas Pariwisata Daerah</td>
                <td className="px-6 py-4">Buku Profil Tahunan</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="font-semibold text-gray-900">4.8</span>
                  </div>
                </td>
                <td className="px-6 py-4">10 Ags 2026</td>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Selesai</span></td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-gray-900">Event Organizer Jatim</td>
                <td className="px-6 py-4">ID Card & Tali Lanyard</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-300 text-lg">★</span>
                    <span className="font-semibold text-gray-900">3.0</span>
                  </div>
                </td>
                <td className="px-6 py-4">09 Ags 2026</td>
                <td className="px-6 py-4"><span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">Butuh Follow-up</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}